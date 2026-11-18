/**
 * Downloads the chosen site photography into public/images and writes the
 * attribution file used by the credits page.
 *
 *   node scripts/download-images.mjs
 *
 * Commons picks reference the cached search results written by
 * scripts/commons-sheet.mjs, so run that first if the cache is cold.
 */
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const cacheDir = path.join(
  process.env.TEMP ?? "C:\\Windows\\Temp",
  "ov-commons-cache",
);
const outDir = path.join(process.cwd(), "public", "images");
const UA =
  "OpticsViewSiteBuilder/1.0 (static site imagery; contact dev@opticsviewfarms.ng)";

const picks = [
  { key: "hero", unsplash: "1500382017468-9049fed747ef", width: 2400 },
  { key: "fieldRows", unsplash: "1560493676-04071c5f467b", width: 1800 },
  { key: "aerial", commons: { topic: "aerial", index: 7 } },
  { key: "farmer", commons: { topic: "farmer", index: 0 } },
  { key: "greenhouse", commons: { topic: "greenhouse", index: 2 } },
  { key: "poultry", commons: { topic: "poultry", index: 1 } },
  { key: "cattle", commons: { topic: "cattle", index: 3 } },
  { key: "fish", commons: { topic: "catfish", index: 5 } },
  { key: "eggs", commons: { topic: "eggs", index: 0 } },
  { key: "tomatoes", commons: { topic: "vegMarket", index: 1 } },
  { key: "maize", commons: { topic: "maizeGrain", index: 0 } },
  { key: "rice", commons: { topic: "riceGrain", index: 6 } },
  { key: "yam", commons: { topic: "yam", index: 5 } },
  { key: "plantain", commons: { topic: "plantain", index: 1 } },
  { key: "fertilizer", commons: { topic: "fertA", index: 0 } },
  { key: "smokedFish", commons: { topic: "smokedfish", index: 2 } },
  { key: "grainMarket", commons: { topic: "grainSacks", index: 2 } },
  { key: "soybean", commons: { topic: "soybean", index: 0 } },
  { key: "marketAerial", commons: { topic: "vegMarket", index: 0 } },
  { key: "pepper", commons: { topic: "pepper", index: 1 } },
];

async function loadCommonsPick(topic, index) {
  const files = (await readdir(cacheDir)).filter(
    (file) => file.startsWith(`${topic}-`) && file.endsWith(".json"),
  );
  if (files.length === 0) {
    throw new Error(`no cache for topic "${topic}" — run commons-sheet first`);
  }
  const items = JSON.parse(
    await readFile(path.join(cacheDir, files[0]), "utf8"),
  );
  const item = items[index];
  if (!item) throw new Error(`topic "${topic}" has no index ${index}`);
  return item;
}

function sizedThumbs(thumb) {
  // Try progressively smaller renders, then the original file.
  const candidates = [1600, 1280, 960, 800].map((width) =>
    thumb.replace(/\/\d+px-/, `/${width}px-`),
  );
  const original = thumb
    .replace("/thumb/", "/")
    .replace(/\/\d+px-[^/]+$/, "");
  candidates.push(original);
  return [...new Set(candidates)];
}

async function download(url) {
  const response = await fetch(url, {
    headers: { "user-agent": UA, accept: "image/jpeg,image/*" },
    signal: AbortSignal.timeout(60_000),
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const type = response.headers.get("content-type") ?? "";
  if (!type.startsWith("image/")) {
    throw new Error(`unexpected content type ${type}`);
  }
  const buffer = Buffer.from(await response.arrayBuffer());
  if (buffer.byteLength < 20_000) {
    throw new Error(`suspiciously small (${buffer.byteLength} bytes)`);
  }
  return { buffer, type };
}

await mkdir(outDir, { recursive: true });

// Optional key filter: `node scripts/download-images.mjs pepper smokedFish`
const only = process.argv.slice(2);
const selected = only.length
  ? picks.filter((pick) => only.includes(pick.key))
  : picks;

const credits = [];
const failures = [];

for (const pick of selected) {
  const file = path.join(outDir, `${pick.key}.jpg`);
  try {
    if (pick.unsplash) {
      const url =
        `https://images.unsplash.com/photo-${pick.unsplash}` +
        `?fm=jpg&fit=crop&w=${pick.width ?? 1800}&q=80`;
      const { buffer } = await download(url);
      await writeFile(file, buffer);
      credits.push({
        file: `/images/${pick.key}.jpg`,
        title: "Unsplash photograph",
        artist: "Unsplash contributor",
        license: "Unsplash License",
        source: `https://unsplash.com/photos/${pick.unsplash}`,
      });
      console.log(`ok   ${pick.key}.jpg  ${(buffer.length / 1024).toFixed(0)} KB`);
    } else {
      const item = await loadCommonsPick(pick.commons.topic, pick.commons.index);
      let result;
      let lastError;
      for (const candidate of sizedThumbs(item.thumb)) {
        try {
          result = await download(candidate);
          break;
        } catch (error) {
          lastError = error;
        }
      }
      if (!result) throw lastError ?? new Error("no candidate URL worked");
      await writeFile(file, result.buffer);
      credits.push({
        file: `/images/${pick.key}.jpg`,
        title: item.title,
        artist: item.artist,
        license: item.license,
        source: item.page,
      });
      console.log(
        `ok   ${pick.key}.jpg  ${(result.buffer.length / 1024).toFixed(0)} KB  ${item.license}`,
      );
    }
  } catch (error) {
    failures.push(`${pick.key}: ${error.message}`);
    console.error(`FAIL ${pick.key}: ${error.message}`);
  }
}

const creditsPath = path.join(
  process.cwd(),
  "lib",
  "data",
  "photo-credits.json",
);

// Merge with whatever is already recorded so partial re-runs keep the rest.
let existing = [];
try {
  existing = JSON.parse(await readFile(creditsPath, "utf8"));
} catch {
  // first run
}

const merged = new Map(existing.map((entry) => [entry.file, entry]));
for (const entry of credits) merged.set(entry.file, entry);
const ordered = [...merged.values()].sort((a, b) =>
  a.file.localeCompare(b.file),
);

await writeFile(creditsPath, `${JSON.stringify(ordered, null, 2)}\n`, "utf8");

console.log(
  `\nwrote ${credits.length} images and lib/data/photo-credits.json (${ordered.length} credits)`,
);
if (failures.length > 0) {
  console.error(`\n${failures.length} failures:`);
  for (const failure of failures) console.error(` - ${failure}`);
  process.exitCode = 1;
}
