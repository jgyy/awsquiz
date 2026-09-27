/**
 * Assigns every question an image from the hotlinked catalog and writes the result to
 * src/image-assignments.ts. Questions left unmatched use their domain's fallback image at
 * runtime. Run after `tsc`.
 */
import { countHits, haystacksFor, hitsStemOrAnswer } from "../dist/matching.js";
import type { ImageEntry } from "../dist/image-catalog.js";
import type { Question } from "../dist/types.js";
import { assignMedia } from "./lib/assign-media.mts";
import { imageAssignConfig } from "./lib/image-config.mts";

/** The spec allows at most 5% of questions on a weak match or a domain fallback. */
const MAX_WEAK_OR_FALLBACK_SHARE = 0.05;
/** "Amazon"/"AWS" plus the capitalised words after it, as in "AWS Trusted Advisor". */
const CAPTION_SERVICE = /\b(?:Amazon|AWS)((?:\s+[A-Z0-9][\w-]*)+)/g;
/** Capitalised words after "AWS" that are not services, as in "an AWS Region". */
const NOT_A_SERVICE = new Set(["region", "regions", "account", "accounts", "cloud"]);

/**
 * Service names in an image's caption that the question offers only as a wrong option: named
 * by some wrong option, but not by the stem or a correct answer. Showing that image would put
 * a distractor on screen. Each name is tried from its longest form down to two words ("AWS
 * Network Firewall Manager", then "Network Firewall"), and the longest form found in a wrong
 * option is judged.
 */
export function distractorsInCaption(image: ImageEntry, q: Question): string[] {
  const h = haystacksFor(q);
  const wrong = q.options.filter((o) => !q.correctOptionIds.includes(o.id)).map((o) => o.text.toLowerCase()).join(" \n ");
  const found: string[] = [];
  for (const match of image.caption.matchAll(CAPTION_SERVICE)) {
    const words = match[1].trim().split(/\s+/);
    // Stop at two words so "AWS Cost Explorer" is not reduced to a bare "Cost".
    for (let n = words.length; n >= Math.min(2, words.length); n--) {
      const name = words.slice(0, n).join(" ").toLowerCase();
      if (NOT_A_SERVICE.has(name)) break;
      if (countHits(name, wrong) === 0) continue;
      if (countHits(name, h.stem) + countHits(name, h.answers) === 0) found.push(words.slice(0, n).join(" "));
      break;
    }
  }
  return found;
}

const config = imageAssignConfig();
const result = await assignMedia(config);
const { questionBank, assignment } = result;
const byId = new Map(config.catalog.map((e) => [e.id, e]));
const shownImage = (q: Question) => assignment.get(q)?.entry ?? byId.get(config.fallbackFor!(q)!)!;

// Guard for the eligibility rule: an assigned image must have a keyword in the stem or a correct answer.
const explanationOnly = questionBank.filter((q) => assignment.has(q) && !hitsStemOrAnswer(assignment.get(q)!.entry, haystacksFor(q)));
console.log(`\nExplanation-only matches (${explanationOnly.length}):`);
for (const q of explanationOnly) console.log(`  ${q.id}  ${assignment.get(q)!.entry.id}  |  ${q.text.slice(0, 100)}`);

const distractors = questionBank
  .map((q) => ({ q, image: shownImage(q), names: distractorsInCaption(shownImage(q), q) }))
  .filter((d) => d.names.length > 0);
console.log(`\nImages whose caption names a service found only in a wrong option (${distractors.length}):`);
for (const { q, image, names } of distractors) {
  const how = assignment.has(q) ? "" : " (fallback)";
  console.log(`  ${q.id}  ${image.id}${how}  names ${names.join(", ")}  |  ${q.text.slice(0, 90)}`);
}

const weakOrFallback = questionBank.filter((q) => !assignment.has(q) || assignment.get(q)!.score < config.weakScore);
const limit = Math.floor(questionBank.length * MAX_WEAK_OR_FALLBACK_SHARE);
console.log(`\nWeak or fallback: ${weakOrFallback.length} of ${questionBank.length} (target ${limit} or fewer)`);
