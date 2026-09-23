/**
 * Video catalog curation helpers. Run after `tsc` (reads the rule constants from dist/videos.js).
 *   node scripts/youtube.mts meta <id> [<id> ...]
 *       One JSON line per video: id, title, seconds, channelId, channelName, official.
 *   node scripts/youtube.mts search "<query>" [--official] [--short]
 *       Tab-separated results: id, length, OFFICIAL or channel name, title.
 *       --official keeps only the official AWS channel; --short keeps videos within the length cap.
 */
import { MAX_VIDEO_SECONDS, OFFICIAL_AWS_CHANNEL_ID } from "../dist/videos.js";
import { mapLimit } from "./lib/map-limit.mts";
import { fetchVideoMeta, searchVideos } from "./lib/youtube.mts";

const clock = (s: number | null) => (s === null ? "live" : `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`);
const [command, ...rest] = process.argv.slice(2);

if (command === "meta" && rest.length > 0) {
  const metas = await mapLimit(rest, 4, (id) => fetchVideoMeta(id));
  metas.forEach((meta, i) => {
    if (!meta) {
      console.error(`${rest[i]}: no metadata (removed, private, or throttled; retry later)`);
      process.exitCode = 1;
      return;
    }
    console.log(JSON.stringify({ ...meta, official: meta.channelId === OFFICIAL_AWS_CHANNEL_ID }));
  });
} else if (command === "search" && rest.length > 0) {
  const flags = new Set(rest.filter((a) => a.startsWith("--")));
  const query = rest.filter((a) => !a.startsWith("--")).join(" ");
  const hits = (await searchVideos(query))
    .filter((h) => !flags.has("--official") || h.channelId === OFFICIAL_AWS_CHANNEL_ID)
    .filter((h) => !flags.has("--short") || (h.seconds !== null && h.seconds <= MAX_VIDEO_SECONDS));
  for (const h of hits) {
    console.log([h.id, clock(h.seconds), h.channelId === OFFICIAL_AWS_CHANNEL_ID ? "OFFICIAL" : h.channelName, h.title].join("\t"));
  }
} else {
  console.error('usage: node scripts/youtube.mts meta <id>... | search "<query>" [--official] [--short]');
  process.exitCode = 2;
}
