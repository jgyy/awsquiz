/**
 * Assigns every question an image from the hotlinked catalog and writes the result to
 * src/image-assignments.ts. Questions left unmatched use their domain's fallback image at
 * runtime. Run after `tsc`.
 */
import { assignMedia } from "./lib/assign-media.mts";
import { imageAssignConfig } from "./lib/image-config.mts";

/** The spec allows at most 5% of questions on a weak match or a domain fallback. */
const MAX_WEAK_OR_FALLBACK_SHARE = 0.05;

const config = imageAssignConfig();
const result = await assignMedia(config);
const weakOrFallback = result.questionBank.filter((q) => !result.assignment.has(q) || result.assignment.get(q)!.score < config.weakScore);
const limit = Math.floor(result.questionBank.length * MAX_WEAK_OR_FALLBACK_SHARE);
console.log(`\nWeak or fallback: ${weakOrFallback.length} of ${result.questionBank.length} (target ${limit} or fewer)`);
