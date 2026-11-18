/**
 * Builds an HTML contact sheet of Wikimedia Commons candidates for the
 * marketplace and site imagery. Each cell is numbered so a topic's pick can be
 * referenced as `<topic>#<index>`.
 *
 *   node scripts/commons-sheet.mjs <outfile.html>
 *
 * Commons rate-limits aggressive clients, so results are cached per topic+query
 * and requests are spaced out.
 */
import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const cacheDir = path.join(
  process.env.TEMP ?? "C:\\Windows\\Temp",
  "ov-commons-cache",
);
await mkdir(cacheDir, { recursive: true });

const defaultTopics = {
  hero: "agricultural field sunset",
  fieldRows: "crop rows field",
  aerial: "aerial view farmland",
  farmer: "farmer Nigeria",
  greenhouse: "greenhouse tomatoes",
  poultry: "broiler chicken",
  cattle: "cattle herd Africa",
  catfish: "catfish",
  eggs: "eggs crate",
  tomatoes: "tomatoes basket",
  maize: "maize cobs",
  rice: "rice paddy",
  yam: "yam tubers",
  plantain: "plantain bunch",
  fertilizer: "fertilizer bags",
  soybean: "soybean field",
  smokedfish: "smoked fish",
  produce: "vegetables market Nigeria",
  barn: "grain bags warehouse",
};

// `node scripts/commons-sheet.mjs <out.html> [topics.json]`
const topics = process.argv[3]
  ? JSON.parse(await readFile(process.argv[3], "utf8"))
  : defaultTopics;

// Scans, maps, charts and book plates are noise for a photo contact sheet.
const reject =
  /catalogue|catalog\b|\.svg|\.webp|\.tif|sem\b|micrograph|map\b|diagram|chart|graph\b|logo|stamp|poster|book\b|illustration|drawing|engraving|painting|(18|19)\d\d|screenshot|cover\b|seal\b|specimen|herbarium|nematode|seed_00|seed_\d\d/i;

const UA =
  "OpticsViewSiteBuilder/1.0 (static site imagery selection; contact dev@opticsviewfarms.ng)";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function search(term, limit = 10) {
  const url =
    "https://commons.wikimedia.org/w/api.php?action=query&generator=search" +
    "&gsrsearch=" +
    encodeURIComponent(`filetype:bitmap ${term}`) +
    "&gsrnamespace=6" +
    `&gsrlimit=${limit}` +
    "&prop=imageinfo" +
    "&iiprop=url|size|extmetadata" +
    "&iiurlwidth=800" +
    "&format=json&origin=*";

  const response = await fetch(url, {
    headers: { "user-agent": UA },
    signal: AbortSignal.timeout(25_000),
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const json = await response.json();
  const pages = json?.query?.pages ? Object.values(json.query.pages) : [];

  return pages
    .map((page) => {
      const info = page.imageinfo?.[0];
      const meta = info?.extmetadata ?? {};
      const pick = (key) =>
        meta[key]?.value
          ? String(meta[key].value)
              .replace(/<[^>]+>/g, "")
              .replace(/\s+/g, " ")
              .trim()
          : "";
      return {
        title: page.title.replace(/^File:/, ""),
        thumb: info?.thumburl?.split("?")[0]?.replace(
          "thumb.wikimedia.org",
          "upload.wikimedia.org",
        ),
        width: info?.width ?? 0,
        height: info?.height ?? 0,
        license: pick("LicenseShortName") || "Unknown",
        artist: pick("Artist").slice(0, 60) || "Unknown",
        page: `https://commons.wikimedia.org/wiki/${encodeURIComponent(
          page.title,
        )
          .replace(/%20/g, "_")
          .replace(/%3A/g, ":")}`,
      };
    })
    .filter((item) => {
      if (!item.thumb) return false;
      if (item.width < 1200 || item.height < 700) return false;
      const ratio = item.width / item.height;
      if (ratio < 0.7 || ratio > 2.4) return false;
      return !reject.test(item.title);
    });
}

async function cachedSearch(key, term) {
  const hash = createHash("sha1").update(term).digest("hex").slice(0, 8);
  const file = path.join(cacheDir, `${key}-${hash}.json`);
  try {
    return JSON.parse(await readFile(file, "utf8"));
  } catch {
    // no cache yet
  }

  for (let attempt = 0; attempt < 4; attempt += 1) {
    try {
      const items = await search(term);
      try {
        await writeFile(file, JSON.stringify(items), "utf8");
      } catch (error) {
        console.warn(`${key}: cache write failed (${error.code})`);
      }
      return items;
    } catch (error) {
      if (attempt === 3) throw error;
      await sleep(3000 * (attempt + 1));
    }
  }
  return [];
}

const data = {};
for (const [key, term] of Object.entries(topics)) {
  try {
    data[key] = await cachedSearch(key, term);
  } catch (error) {
    data[key] = [];
    console.error(`${key}: ${error.message}`);
  }
  await sleep(1200);
}

const esc = (value) =>
  String(value).replace(
    /[&<>"]/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[char],
  );

const sections = Object.entries(data)
  .map(([key, items]) => {
    const cells = items
      .map(
        (item, index) => `
      <figure>
        <img src="${esc(item.thumb)}" alt="${esc(item.title)}">
        <figcaption>
          <b>${key}#${index}</b> ${esc(item.title.slice(0, 64))}
          <span>${esc(item.license)} · ${esc(item.artist)} · ${item.width}×${item.height}</span>
        </figcaption>
      </figure>`,
      )
      .join("");
    return `<h2>${key} <em>${esc(topics[key])}</em></h2><div class="grid">${cells || "<p>none</p>"}</div>`;
  })
  .join("\n");

const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><style>
  body{margin:0;background:#101512;color:#f3efe4;font:12px/1.4 Inter,Arial,sans-serif}
  h2{margin:0;padding:14px 12px 10px;font:600 15px/1 Inter,Arial;background:#1b241f;letter-spacing:.02em}
  h2 em{font-style:normal;font-weight:400;color:#9fb3a5;margin-left:8px}
  .grid{display:grid;grid-template-columns:repeat(4,1fr);gap:2px;padding:0 2px 2px}
  figure{margin:0;position:relative;background:#000}
  img{width:100%;height:190px;object-fit:cover;display:block}
  figcaption{position:absolute;inset:auto 0 0 0;padding:6px 7px;background:linear-gradient(transparent,rgba(0,0,0,.88))}
  figcaption b{color:#e7bc61}
  figcaption span{display:block;color:#9fb3a5;font-size:10px}
</style></head><body>${sections}</body></html>`;

await writeFile(process.argv[2] ?? "commons-sheet.html", html, "utf8");

const total = Object.values(data).reduce((sum, items) => sum + items.length, 0);
console.log(`wrote ${process.argv[2]} with ${total} candidates`);
for (const [key, items] of Object.entries(data)) {
  console.log(`${key}: ${items.length}`);
}
