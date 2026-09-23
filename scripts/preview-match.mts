/**
 * Shows how one question would be matched: its top candidates, scored exactly as the assign
 * scripts score them (per-cert IDF, answer bonus, official preference), optionally including
 * unmerged entries from sourcing batches. Use it to tune keywords before merging.
 *   node scripts/preview-match.mts videos <questionId> [batch.json ...]
 * Run after `tsc`.
 */
import { readFile } from "node:fs/promises";
import { certifications } from "../dist/certifications.js";
import { namesAwsService } from "../dist/matching.js";
import { videoAssignments } from "../dist/video-assignments.js";
import { isOfficialAws, type VideoEntry } from "../dist/videos.js";
import { rankCandidates } from "./lib/assign-media.mts";
import { videoAssignConfig } from "./lib/video-config.mts";

const kinds = {
  videos: {
    config: videoAssignConfig,
    assigned: videoAssignments,
    describe: (v: VideoEntry) => `${v.id}  ${v.label}  [${isOfficialAws(v) ? "official" : "third-party"}, ${v.seconds}s]`,
  },
};

const [kind, questionId, ...files] = process.argv.slice(2);
const spec = kinds[kind as keyof typeof kinds];
const question = certifications.flatMap((c) => c.questions).find((q) => q.id === questionId);
if (!spec || !question) {
  console.error(`usage: node scripts/preview-match.mts ${Object.keys(kinds).join("|")} <questionId> [batch.json ...]`);
  process.exit(2);
}
const extra = (await Promise.all(files.map(async (f) => JSON.parse(await readFile(f, "utf8")).entries))).flat();
const ranked = rankCandidates(spec.config(extra)).get(question) ?? [];
const answers = question.options.filter((o) => question.correctOptionIds.includes(o.id)).map((o) => o.text);

console.log(`${question.id}  ${question.text}`);
console.log(`answer: ${answers.join(" | ")}`);
console.log(`service question: ${namesAwsService(question) ? "yes" : "no"}; assigned now: ${spec.assigned[question.id] ?? "none"}\n`);
for (const { entry, score } of ranked) console.log(`  ${score.toFixed(1).padStart(8)}  ${spec.describe(entry as never)}`);
