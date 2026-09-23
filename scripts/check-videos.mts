/**
 * Checks catalog videos against YouTube: still public and embeddable (oEmbed 200), stored
 * length and channel still current, and within the length rule. Needs the network, so it is
 * not part of the build. Exits 1 when anything fails.
 *   node scripts/check-videos.mts                 the whole catalog (compiled dist/videos.js)
 *   node scripts/check-videos.mts a.json b.json   sourcing batches shaped { "entries": VideoEntry[] }
 */
import { readFile } from "node:fs/promises";
import { videoCatalog, type VideoEntry } from "../dist/videos.js";
import { mapLimit } from "./lib/map-limit.mts";
import { videoCheckProblems } from "./lib/video-check.mts";
import { fetchVideoMeta, oembedStatus } from "./lib/youtube.mts";

const files = process.argv.slice(2);
const entries: VideoEntry[] = files.length
  ? (await Promise.all(files.map(async (f) => JSON.parse(await readFile(f, "utf8")).entries as VideoEntry[]))).flat()
  : videoCatalog;
// The same video can be catalogued for both certs; look it up once.
const unique = [...new Map(entries.map((e) => [e.id, e])).values()];

let failures = 0;
await mapLimit(unique, 4, async (entry) => {
  const [status, meta] = await Promise.all([oembedStatus(entry.id), fetchVideoMeta(entry.id)]);
  const problems = videoCheckProblems(entry, status, meta);
  if (problems.length > 0) {
    failures++;
    console.log(`${entry.id}  ${entry.label}\n    ${problems.join("\n    ")}`);
  }
});
console.log(`\nchecked ${unique.length} videos, ${failures} with problems`);
process.exitCode = failures > 0 ? 1 : 0;
