/**
 * Screenshot helper driven through the Chrome DevTools Protocol.
 *
 * Usage:
 *   node scripts/shoot.mjs <url> <outfile> [width] [height] [full|viewport|region]
 *     [offsetY] [sliceHeight] [clickSelector]
 *
 * Flags (safer than empty positional args in PowerShell):
 *   --click="[aria-controls='mobile-menu']"
 *   --region=1200:900
 *   --scroll=<pixels>   scroll before capturing
 *
 * Chrome's `--screenshot` flag clamps narrow window sizes, which makes it
 * useless for real mobile review. This drives Emulation.setDeviceMetricsOverride
 * instead and can capture the full page.
 */
import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const rawArgs = process.argv.slice(2);
const flags = Object.fromEntries(
  rawArgs
    .filter((arg) => arg.startsWith("--"))
    .map((arg) => {
      const [key, ...rest] = arg.slice(2).split("=");
      return [key, rest.join("=") || "true"];
    }),
);
const [, , widthArg, heightArg, modeArg] = rawArgs.filter(
  (arg) => !arg.startsWith("--"),
);

const url = rawArgs.find((arg) => !arg.startsWith("--"));
const outfile = rawArgs.filter((arg) => !arg.startsWith("--"))[1];
if (!url || !outfile) {
  console.error("url and outfile are required");
  process.exit(1);
}

const width = Number(widthArg ?? 1440);
const height = Number(heightArg ?? 900);
const mode = modeArg ?? "viewport";
const port = 9333 + Math.floor(Math.random() * 200);

const chromePath =
  process.env.CHROME_PATH ??
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

const profileDir = path.join(
  process.env.TEMP ?? "C:\\Windows\\Temp",
  `ov-shot-${Date.now()}`,
);

const chrome = spawn(
  chromePath,
  [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--no-first-run",
    "--no-default-browser-check",
    "--disable-extensions",
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profileDir}`,
    "about:blank",
  ],
  { stdio: "ignore" },
);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function getJson(pathname, options) {
  const response = await fetch(`http://127.0.0.1:${port}${pathname}`, options);
  if (!response.ok) throw new Error(`DevTools ${pathname} -> ${response.status}`);
  return response.json();
}

async function waitForChrome() {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      await getJson("/json/version");
      return;
    } catch {
      await sleep(250);
    }
  }
  throw new Error("Chrome did not expose a DevTools endpoint");
}

let socket;
let messageId = 0;
const pending = new Map();

function send(method, params = {}) {
  return new Promise((resolve, reject) => {
    const id = (messageId += 1);
    pending.set(id, { resolve, reject });
    socket.send(JSON.stringify({ id, method, params }));
  });
}

async function main() {
  await waitForChrome();

  const target = await getJson(
    `/json/new?${encodeURIComponent("about:blank")}`,
    { method: "PUT" },
  );

  socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true });
    socket.addEventListener("error", reject, { once: true });
  });

  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      const { resolve, reject } = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) reject(new Error(message.error.message));
      else resolve(message.result);
    }
  });

  await send("Page.enable");
  await send("Runtime.enable");
  await send("Emulation.setDeviceMetricsOverride", {
    width,
    height,
    deviceScaleFactor: 1,
    mobile: width < 640,
  });
  await send("Page.navigate", { url });

  for (let attempt = 0; attempt < 120; attempt += 1) {
    const { result } = await send("Runtime.evaluate", {
      expression: "document.readyState",
      returnByValue: true,
    });
    if (result.value === "complete") break;
    await sleep(250);
  }

  // Let webfonts and remote imagery settle.
  await sleep(3500);

  // Force scroll-reveal elements visible: captureBeyondViewport never scrolls,
  // so IntersectionObserver would otherwise leave whole sections at opacity 0.
  await send("Runtime.evaluate", {
    expression:
      "document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-visible'))",
  });

  // Full-page capture never scrolls, so lazy images would stay unloaded and
  // look broken. Force every image to load before inspecting and capturing.
  await send("Runtime.evaluate", {
    expression:
      "Array.from(document.images).forEach((img) => { img.loading = 'eager'; })",
  });
  await sleep(2500);

  const broken = await send("Runtime.evaluate", {
    expression:
      "Array.from(document.images).filter((img) => !img.complete || img.naturalWidth === 0).map((img) => img.currentSrc || img.src)",
    returnByValue: true,
  });
  if (Array.isArray(broken.result.value) && broken.result.value.length > 0) {
    console.log("broken images:", broken.result.value);
  }

  // Horizontal overflow is the classic mobile layout bug; report it loudly.
  const overflow = await send("Runtime.evaluate", {
    expression: `(() => {
      const vw = window.innerWidth;
      const scrollWidth = document.documentElement.scrollWidth;
      const offenders = Array.from(document.querySelectorAll("body *"))
        .filter((el) => {
          const rect = el.getBoundingClientRect();
          return rect.right > vw + 1 && getComputedStyle(el).position !== "fixed";
        })
        .slice(0, 6)
        .map((el) => {
          const rect = el.getBoundingClientRect();
          const cls = typeof el.className === "string" ? el.className.split(" ").slice(0, 3).join(".") : "";
          return el.tagName.toLowerCase() + (cls ? "." + cls : "") + " right=" + Math.round(rect.right);
        });
      return { scrollWidth, vw, offenders };
    })()`,
    returnByValue: true,
  });
  const layout = overflow.result.value;
  if (layout && layout.scrollWidth > layout.vw + 1) {
    console.log("horizontal overflow:", layout);
  }

  // Optional: click a selector before capture (e.g. to open the mobile menu).
  const clickSelector = flags.click ?? rawArgs[7];
  if (clickSelector && clickSelector !== "true") {
    const clicked = await send("Runtime.evaluate", {
      expression: `(() => {
        const el = document.querySelector(${JSON.stringify(clickSelector)});
        if (!el) return "not-found";
        el.click();
        return "clicked";
      })()`,
      returnByValue: true,
    });
    console.log(`click ${clickSelector}: ${clicked.result.value}`);
    await sleep(1000);
  }

  const scrollTo = Number(flags.scroll ?? 0);
  if (scrollTo > 0) {
    await send("Runtime.evaluate", {
      expression: `window.scrollTo(0, ${scrollTo})`,
    });
    await sleep(900);
  }

  let clip;
  if (mode === "full") {
    const metrics = await send("Page.getLayoutMetrics");
    const contentHeight = Math.min(
      Math.ceil(metrics.cssContentSize.height),
      9000,
    );
    clip = { x: 0, y: 0, width, height: contentHeight, scale: 1 };
  } else if (mode === "region") {
    // `--region=<offsetY>:<sliceHeight>`
    const [offsetY, sliceHeight] = (flags.region ?? "").split(":");
    clip = {
      x: 0,
      y: Number(offsetY ?? rawArgs[5] ?? 0),
      width,
      height: Number(sliceHeight ?? rawArgs[6] ?? height),
      scale: 1,
    };
  }

  const shot = await send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: mode === "full" || mode === "region",
    ...(clip ? { clip } : {}),
  });

  await mkdir(path.dirname(outfile), { recursive: true });
  await writeFile(outfile, Buffer.from(shot.data, "base64"));
  console.log(`saved ${outfile}`);
  // Chrome's child processes keep the event loop alive; exit explicitly.
  process.exit(0);
}

main()
  .catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    try {
      socket?.close();
    } catch {}
    chrome.kill();
  });
