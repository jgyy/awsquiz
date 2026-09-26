/**
 * Requests catalog images the way the app does and reports any that are not a 200 image of
 * 1.5 MB or less. Needs the network, so it is not part of the build. Exits 1 on any failure.
 *   node scripts/check-images.mts                 the whole catalog (compiled dist/image-catalog.js)
 *   node scripts/check-images.mts a.json b.json   sourcing batches shaped { "entries": ImageEntry[] }
 */
import { readFile } from "node:fs/promises";
import { imageCatalog, type ImageEntry } from "../dist/image-catalog.js";
import { checkImageUrl } from "./lib/image-check.mts";
import { mapLimit } from "./lib/map-limit.mts";

const files = process.argv.slice(2);
const entries: ImageEntry[] = files.length
  ? (await Promise.all(files.map(async (f) => JSON.parse(await readFile(f, "utf8")).entries as ImageEntry[]))).flat()
  : imageCatalog;

let failures = 0;
await mapLimit(entries, 6, async (entry) => {
  const problem = await checkImageUrl(entry.url);
  if (problem) {
    failures++;
    console.log(`${entry.id}  ${problem}\n    ${entry.url}`);
  }
});
console.log(`\nchecked ${entries.length} images, ${failures} with problems`);
process.exitCode = failures > 0 ? 1 : 0;
