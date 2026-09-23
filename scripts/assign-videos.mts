/**
 * Assigns every question a YouTube video from the curated catalog and writes the result to
 * src/video-assignments.ts. Scoring, spreading and the report live in scripts/lib/assign-media.mts;
 * the video settings live in scripts/lib/video-config.mts. Run after `tsc`.
 */
import { namesAwsService } from "../dist/matching.js";
import { MAX_VIDEO_SECONDS, isOfficialAws, type VideoEntry } from "../dist/videos.js";
import { assignMedia } from "./lib/assign-media.mts";
import { videoAssignConfig } from "./lib/video-config.mts";

/** The spec's uniqueness target for distinct videos in use. */
const DISTINCT_TARGET = 900;
/** Official videos longer than this are listed so a shorter one can be swapped in where it fits as well. */
const LONG_OFFICIAL_SECONDS = 600;

const result = await assignMedia(videoAssignConfig());
const used = [...new Map([...result.assignment.values()].map((c) => [c.entry.id, c.entry] as [string, VideoEntry])).values()];
const onThirdParty = result.questionBank.filter(
  (q) => namesAwsService(q) && result.assignment.has(q) && !isOfficialAws(result.assignment.get(q)!.entry)
);
const overCap = used.filter((v) => v.seconds > MAX_VIDEO_SECONDS && !isOfficialAws(v));
const longOfficial = used.filter((v) => isOfficialAws(v) && v.seconds > LONG_OFFICIAL_SECONDS);

console.log(`\nDistinct videos in use: ${used.length} (target ${DISTINCT_TARGET} or more)`);
console.log(`\nService questions on third-party videos (${onThirdParty.length}):`);
for (const q of onThirdParty) console.log(`  ${q.id}  ${result.assignment.get(q)!.entry.label}  |  ${q.text.slice(0, 100)}`);
console.log(`\nVideos in use that break the length rule (${overCap.length}):`);
for (const v of overCap) console.log(`  ${v.id}  ${v.seconds}s  ${v.label}`);
console.log(`\nOfficial videos over 10 minutes in use (${longOfficial.length}); swap for a shorter one if it fits as well:`);
for (const v of longOfficial) console.log(`  ${v.id}  ${Math.round(v.seconds / 60)} min  ${v.label}`);
