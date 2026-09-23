# Practice Media Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Show a relevant hotlinked image after each practice answer, and make every per-question YouTube video 3 minutes or less unless it is from the official AWS channel. Service questions link to official AWS videos, and far fewer questions share a video.

**Architecture:** The keyword matcher and the offline assignment pass behind today's video links move into shared modules (`src/matching.ts`, `scripts/lib/assign-media.mts`). Videos and a new image catalog both use them. Videos gain length and channel metadata, which the build enforces. A YouTube helper library supports catalog checks and sourcing. Images are a data-only catalog (URL, alt, caption, credit, source page) rendered in the practice feedback panel. The large content work (new videos, the image catalog) is split across parallel subagents that write JSON batches, which are checked and then merged.

**Tech Stack:** TypeScript 5.9 compiled by `tsc` to `dist/`. Node 26 runs `.mts` scripts and tests directly (type stripping) and runs tests with `node:test`. No new npm dependencies.

**Spec:** `docs/superpowers/specs/2026-09-23-practice-media-design.md`

## Global Constraints

- No new npm dependencies. Tests use `node:test` and `node:assert/strict`. Scripts and tests are `.mts` files run by plain `node`.
- Video length cap: **180 seconds** (`lengthSeconds`); exactly 180 is allowed.
- "Official AWS" means only channel **`UCd6MoB9NC6uYN2grvUNT-Zg`** (Amazon Web Services). AWS Events, AWS Developers, AWS Partner Network and similar channels count as third-party.
- Official preference multiplier: **1.35**, applied only when a correct option names an AWS service (`/\b(?:Amazon|AWS)\s+[A-Z]/`).
- At most **3 questions per video** and **900 or more distinct videos in use**. Weak video matches no more than today's **1**. Unmatched questions: **0**.
- Images: hotlink only. **Never commit an image file.** `url` and `sourceUrl` must be `https://`. Every image must be downloaded and viewed before it is catalogued. At most **1.5 MB** each.
- At most **6 questions per image**. Weak plus fallback image matches at most **5% (61 of 1,235)**.
- The image appears only in the practice feedback panel (`renderFeedbackPanel`) and is hidden offline. It is not added to the full-exam results review.
- The full-course cards (`courses` in `src/certifications.ts`) are exempt from the length cap.
- Commit messages use the repo's prefixes (`feat:`, `fix:`, `content:`, `docs:`, `refactor:`, `test:`) and end with `Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>`.
- Work happens on branch `feat/question-images`. When everything is verified, fast-forward `main` to it without asking (the user asked for this). Do not push unless asked.
- Scratch tooling and sourcing batches go in `.superpowers/` (gitignored).

## Review Focus

1. **Oversized hotlinked images** (a 4 MB PNG from a docs page) make the feedback panel slow on phones. Expect `images:check` to reject anything over 1.5 MB. Tested in Task 9.
2. **An image URL that redirects to a web page** (a Commons file page, or an AWS page that now redirects) returns `200 text/html`, and the browser shows nothing. Expect `images:check` to reject non-image content types. Tested in Task 9.
3. **YouTube throttling during `videos:check`** could look like hundreds of deleted videos. Expect "private or removed" (from oEmbed) to be reported separately from "could not read metadata, retry later". Tested in Task 3.
4. **Transparent diagrams in dark mode** would be invisible: black lines on a dark card. Expect a light backdrop behind every image in both themes. Verified in the Task 10 browser check.
5. **A very long official AWS video** (a 52-minute webinar) passes the length rule but is a poor quiz link. Expect the `videos:assign` report to list official videos over 10 minutes in use, and Task 7 to swap each for a shorter one or record why it stays.

---

## File Structure

| File | Responsibility |
|---|---|
| `src/matching.ts` (new) | Keyword scoring shared by videos and images: `KeywordEntry`, `Haystacks`, `haystacksFor`, `countHits`, `keywordScore`, `entryScore`, `namesAwsService`. |
| `src/videos.ts` (modify) | Video catalog data, `seconds`/`channelId` metadata, length rule, catalog validation, official preference, `resolveVideo`. |
| `src/html.ts` (new) | `escapeHtml`, moved out of `main.ts` so markup helpers can be unit-tested. |
| `src/image-catalog.ts` (new) | `ImageEntry` type, `imageCatalog` data, `domainImageFallback`. |
| `src/images.ts` (new) | `imageCatalogFor`, `pickImage`, `resolveImage`, `imageCatalogProblems`, validation at load. |
| `src/image-assignments.ts` (generated) | `imageAssignments` map written by `images:assign`. |
| `src/image-figure.ts` (new) | `renderImageFigure(entry)` markup. |
| `src/main.ts` (modify) | Render the image in the practice feedback panel and remove it if it fails to load. |
| `styles.css` (modify) | `.question-image` card, backdrop, mobile height, offline hiding. |
| `scripts/lib/assign-media.mts` (new) | IDF scoring, rebalance, generated-module writer and report (moved from `assign-videos.mts`). |
| `scripts/lib/video-config.mts` / `image-config.mts` (new) | Assignment settings per medium; accept extra entries for previews. |
| `scripts/lib/map-limit.mts` (new) | Concurrency-limited `mapLimit`. |
| `scripts/lib/youtube.mts` (new) | YouTube metadata, oEmbed and search (parsers plus fetchers). |
| `scripts/lib/video-check.mts` (new) | `videoCheckProblems`: classifies one video's check result. |
| `scripts/lib/image-check.mts` (new) | `imageResponseProblem`, `checkImageUrl`. |
| `scripts/assign-videos.mts` (modify) | Thin wrapper plus video-specific report sections. |
| `scripts/assign-images.mts` (new) | Thin wrapper plus image report line. |
| `scripts/check-videos.mts` / `check-images.mts` (new) | Network checks of the catalogs or of sourcing batches. |
| `scripts/youtube.mts` (new) | CLI: `meta` and `search`, for curators and sourcing agents. |
| `scripts/preview-match.mts` (new) | Shows how one question would be matched, including unmerged batches. |
| `scripts/validate.mts` (new) | Build step that imports every self-validating data module. |
| `tests/*.test.mts` (new) | Unit tests, run by `npm test`. |

---

### Task 1: Shared matcher, shared assignment pass, test harness

**Files:**
- Create: `src/matching.ts`, `scripts/lib/assign-media.mts`, `scripts/lib/video-config.mts`, `tests/matching.test.mts`
- Modify: `src/videos.ts:659-735` (remove the moved code), `scripts/assign-videos.mts` (replace body), `package.json` (add `test`)

**Interfaces:**
- Produces: `KeywordEntry { id: string; keywords: string[] }`, `Haystacks`, `haystacksFor(q)`, `countHits(k, text)`, `keywordScore(k, h)`, `entryScore(entry: KeywordEntry, h, weightFor?)` from `dist/matching.js`.
- Produces: `AssignConfig<E>`, `Candidate<E>`, `AssignResult<E> { questionBank; assignment: Map<Question, Candidate<E>>; moved }`, `rankCandidates(config): Map<Question, Candidate<E>[]>`, `assignMedia(config): Promise<AssignResult<E>>` from `scripts/lib/assign-media.mts`.
- Produces: `videoAssignConfig(extra?: VideoEntry[]): AssignConfig<VideoEntry>` from `scripts/lib/video-config.mts`.

- [ ] **Step 1: Add the test script and a failing matcher test**

In `package.json` `scripts`, add after `"watch"`:

```json
    "test": "tsc && node --test \"tests/**/*.test.mts\"",
```

Create `tests/matching.test.mts`:

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { countHits, entryScore, haystacksFor, keywordScore } from "../dist/matching.js";

const question = {
  id: "t1",
  domain: "cloud-technology-and-services",
  text: "Which service stores objects?",
  options: [
    { id: "a", text: "Amazon S3" },
    { id: "b", text: "Amazon EBS" },
  ],
  correctOptionIds: ["a"],
  answerType: "single",
  explanation: "S3 is object storage, unlike EBS.",
};

test("haystacksFor lowercases and keeps only the correct answers", () => {
  const h = haystacksFor(question);
  assert.equal(h.stem, "which service stores objects?");
  assert.equal(h.answers, "amazon s3");
  assert.equal(h.explanation, "s3 is object storage, unlike ebs.");
});

test("countHits matches whole words only and caps at 2", () => {
  assert.equal(countHits("scp", "the scope of an scp"), 1);
  assert.equal(countHits("s3", "s3 s3 s3"), 2);
});

test("keywordScore weights answer over stem over explanation, scaled by capped length", () => {
  assert.equal(keywordScore("s3", { stem: "", answers: "amazon s3", explanation: "" }), 4 * 2);
  const long = "a-very-long-keyword-phrase";
  assert.equal(keywordScore(long, { stem: long, answers: "", explanation: "" }), 3 * 15);
});

test("entryScore sums lowercased keywords and applies weightFor", () => {
  const h = haystacksFor(question);
  const entry = { id: "e", keywords: ["S3", "object storage"] };
  const base = entryScore(entry, h);
  assert.equal(base, keywordScore("s3", h) + keywordScore("object storage", h));
  assert.equal(entryScore(entry, h, () => 2), base * 2);
});
```

- [ ] **Step 2: Run it and confirm it fails**

Run: `npm test`
Expected: FAIL, `Cannot find module '.../dist/matching.js'`.

- [ ] **Step 3: Create `src/matching.ts`**

Move lines 659–735 of `src/videos.ts` (from the `Haystacks` doc comment through the end of `entryScore`) into the new file unchanged, except that `entryScore` takes a `KeywordEntry`:

```ts
import { Question } from "./types.js";

/** Anything the keyword matcher can score: a catalog entry with an id and its trigger phrases. */
export interface KeywordEntry {
  id: string;
  /** Case-insensitive phrases that indicate a question is about this entry's topic. Longer phrases score higher. */
  keywords: string[];
}

/**
 * The three text fields a keyword is matched against. The question stem is weighted highest
 * because it names the topic being tested; the explanation often name-drops neighbouring
 * services (for example "unlike Lambda, ...") that must not steal the match.
 */
export interface Haystacks {
  stem: string;
  answers: string;
  explanation: string;
}

const STEM_WEIGHT = 3;
/** The correct answer names the tested service or concept outright, so it is the strongest signal. */
const ANSWER_WEIGHT = 4;
const EXPLANATION_WEIGHT = 1;
/** Hits per keyword per field are capped so a service mentioned ten times does not swamp a more specific phrase. */
const MAX_HITS_PER_KEYWORD = 2;
/** Long phrases are more specific than single words, but beyond this length extra characters add no certainty. */
const MAX_KEYWORD_LENGTH_CREDIT = 15;

export function haystacksFor(question: Question): Haystacks {
  const correctOptions = question.options
    .filter((o) => question.correctOptionIds.includes(o.id))
    .map((o) => o.text);
  return {
    stem: question.text.toLowerCase(),
    answers: correctOptions.join(" \n ").toLowerCase(),
    explanation: question.explanation.toLowerCase(),
  };
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const patternCache = new Map<string, RegExp>();

function patternFor(keyword: string): RegExp {
  let pattern = patternCache.get(keyword);
  if (!pattern) {
    pattern = new RegExp(`(^|[^a-z0-9])${escapeRegExp(keyword)}(?=$|[^a-z0-9])`, "g");
    patternCache.set(keyword, pattern);
  }
  return pattern;
}

/** Whole-word occurrences of `keyword` in `text`, so "scp" does not match "scope". */
export function countHits(keyword: string, text: string): number {
  const hits = text.match(patternFor(keyword))?.length ?? 0;
  return Math.min(hits, MAX_HITS_PER_KEYWORD);
}

/**
 * Scores a keyword against the question. Each hit is worth the keyword's length so multi-word
 * phrases dominate single words, scaled by where the hit occurred.
 */
export function keywordScore(keyword: string, h: Haystacks): number {
  const weighted =
    countHits(keyword, h.stem) * STEM_WEIGHT +
    countHits(keyword, h.answers) * ANSWER_WEIGHT +
    countHits(keyword, h.explanation) * EXPLANATION_WEIGHT;
  return weighted * Math.min(keyword.length, MAX_KEYWORD_LENGTH_CREDIT);
}

/**
 * Total score of a catalog entry for a question. `weightFor` lets the offline assignment
 * script scale each keyword by its rarity across the whole bank; at runtime every keyword
 * weighs 1.
 */
export function entryScore(entry: KeywordEntry, h: Haystacks, weightFor: (keyword: string) => number = () => 1): number {
  let score = 0;
  for (const keyword of entry.keywords) {
    const k = keyword.toLowerCase();
    score += keywordScore(k, h) * weightFor(k);
  }
  return score;
}
```

In `src/videos.ts`, delete lines 659–735 and add below the existing imports:

```ts
import { entryScore, haystacksFor } from "./matching.js";
```

- [ ] **Step 4: Run the tests and confirm they pass**

Run: `npm test`
Expected: PASS, 4 tests.

- [ ] **Step 5: Create `scripts/lib/assign-media.mts`**

```ts
/**
 * Offline assignment pass shared by the keyword-matched media catalogs (YouTube videos and
 * images). Compared with the runtime matcher this pass knows the whole question bank, so it can:
 *  - weight each keyword by rarity (IDF): "step functions" hits a handful of questions and is
 *    decisive, "function" hits hundreds and is nearly noise;
 *  - spread questions across entries: when an entry is over-subscribed, questions that also
 *    match a close runner-up are moved to the less-used entry so more links are unique.
 *
 * Callers run after `tsc`, since this imports the compiled dist/ output.
 */
import { writeFile } from "node:fs/promises";
import { certifications } from "../../dist/certifications.js";
import { countHits, entryScore, haystacksFor, type Haystacks, type KeywordEntry } from "../../dist/matching.js";
import type { Question } from "../../dist/types.js";

/** How many of a question's best matches are kept as candidates for the rebalance. */
const CANDIDATES_PER_QUESTION = 6;
/** The rebalance stops after this many passes, or sooner once a pass moves nothing. */
const MAX_REBALANCE_PASSES = 10;

export interface AssignConfig<E extends KeywordEntry> {
  /** Every entry across all certs; used for labels and the unused-entry report. */
  catalog: E[];
  /** The entries a question in this cert may be matched to. */
  catalogFor: (certId: string) => E[];
  label: (entry: E) => string;
  /** Singular noun for the report, e.g. "video". */
  noun: string;
  /** An entry may serve at most this many questions before the rebalance looks for alternatives. */
  maxPerEntry: number;
  /** A runner-up must score at least this fraction of the best match to be used instead. */
  runnerUpRatio: number;
  /** Matches scoring below this are reported as weak so new entries can be sourced. */
  weakScore: number;
  /**
   * Multiplier for entries with at least one keyword hit in the correct answer text. The answer
   * names the service or concept being tested, so such entries are almost always the better pick.
   */
  answerHitBonus: number;
  /** Optional extra multiplier for one entry on one question. Defaults to 1. */
  bonus?: (entry: E, question: Question) => number;
  /** Where the generated module is written. */
  outPath: string;
  /** Name of the exported Record<questionId, entryId>. */
  constName: string;
  /** Lines of the generated file's doc comment. */
  header: string[];
}

export interface Candidate<E> {
  entry: E;
  score: number;
}

export interface AssignResult<E> {
  questionBank: Question[];
  assignment: Map<Question, Candidate<E>>;
  /** Questions moved to a runner-up by the rebalance. */
  moved: number;
}

/**
 * Keyword rarity weight for one cert's bank. Document frequency is counted per certification
 * rather than across the whole bank: rarity only means anything inside the bank a question is
 * drawn from, and keeping the count local keeps certifications independent. With a shared
 * count, adding questions to one cert would move every other cert's weights and silently
 * re-assign links that did not change.
 */
function idfForCert(catalog: KeywordEntry[], bank: Haystacks[]): (keyword: string) => number {
  const df = new Map<string, number>();
  for (const entry of catalog) {
    for (const keyword of entry.keywords) {
      const k = keyword.toLowerCase();
      if (df.has(k)) continue;
      let n = 0;
      for (const h of bank) {
        if (countHits(k, h.stem) + countHits(k, h.answers) + countHits(k, h.explanation) > 0) n++;
      }
      df.set(k, n);
    }
  }
  return (k) => Math.log(1 + bank.length / ((df.get(k) ?? 0) + 1));
}

/** Every question's best matches, strongest first, scored with per-cert IDF and the bonuses. */
export function rankCandidates<E extends KeywordEntry>(config: AssignConfig<E>): Map<Question, Candidate<E>[]> {
  const bonus = config.bonus ?? (() => 1);
  const candidates = new Map<Question, Candidate<E>[]>();
  for (const cert of certifications) {
    const catalog = config.catalogFor(cert.id);
    const haystacks = new Map<Question, Haystacks>(cert.questions.map((q) => [q, haystacksFor(q)]));
    const idf = idfForCert(catalog, [...haystacks.values()]);
    for (const q of cert.questions) {
      const h = haystacks.get(q)!;
      const scored: Candidate<E>[] = [];
      for (const entry of catalog) {
        let score = entryScore(entry, h, idf);
        if (score <= 0) continue;
        const hitsAnswer = entry.keywords.some((k) => countHits(k.toLowerCase(), h.answers) > 0);
        if (hitsAnswer) score *= config.answerHitBonus;
        score *= bonus(entry, q);
        scored.push({ entry, score });
      }
      scored.sort((a, b) => b.score - a.score);
      candidates.set(q, scored.slice(0, CANDIDATES_PER_QUESTION));
    }
  }
  return candidates;
}

/** Assigns every question its best entry, spreads over-used entries, writes the module and prints the report. */
export async function assignMedia<E extends KeywordEntry>(config: AssignConfig<E>): Promise<AssignResult<E>> {
  const candidates = rankCandidates(config);
  const questionBank: Question[] = certifications.flatMap((c) => c.questions);

  const assignment = new Map<Question, Candidate<E>>();
  const load = new Map<string, number>();
  const bump = (id: string, delta: number) => load.set(id, (load.get(id) ?? 0) + delta);

  for (const q of questionBank) {
    const best = candidates.get(q)![0];
    if (best) {
      assignment.set(q, best);
      bump(best.entry.id, 1);
    }
  }

  // Rebalance: move questions off over-subscribed entries when a close alternative has room.
  let moved = 0;
  for (let pass = 0; pass < MAX_REBALANCE_PASSES; pass++) {
    let movedThisPass = 0;
    for (const q of questionBank) {
      const current = assignment.get(q);
      if (!current || (load.get(current.entry.id) ?? 0) <= config.maxPerEntry) continue;
      const best = candidates.get(q)![0].score;
      const alternatives = candidates
        .get(q)!
        .filter((c) => c.entry.id !== current.entry.id && c.score >= best * config.runnerUpRatio)
        .filter((c) => (load.get(c.entry.id) ?? 0) < config.maxPerEntry)
        .sort((a, b) => (load.get(a.entry.id) ?? 0) - (load.get(b.entry.id) ?? 0) || b.score - a.score);
      const target = alternatives[0];
      if (!target) continue;
      bump(current.entry.id, -1);
      bump(target.entry.id, 1);
      assignment.set(q, target);
      movedThisPass++;
    }
    moved += movedThisPass;
    if (movedThisPass === 0) break;
  }

  const lines = questionBank
    .filter((q) => assignment.has(q))
    .map((q) => `  ${JSON.stringify(q.id)}: ${JSON.stringify(assignment.get(q)!.entry.id)},`);
  const header = config.header.map((line) => ` * ${line}`).join("\n");
  await writeFile(
    config.outPath,
    `/**\n${header}\n */\nexport const ${config.constName}: Record<string, string> = {\n${lines.join("\n")}\n};\n`
  );

  const result = { questionBank, assignment, moved };
  printReport(config, result);
  return result;
}

function printReport<E extends KeywordEntry>(config: AssignConfig<E>, { questionBank, assignment, moved }: AssignResult<E>): void {
  const { noun } = config;
  const byEntry = new Map<string, Question[]>();
  for (const [q, c] of assignment) {
    const list = byEntry.get(c.entry.id) ?? [];
    list.push(q);
    byEntry.set(c.entry.id, list);
  }
  const label = (id: string) => config.label(config.catalog.find((e) => e.id === id)!);
  const unmatched = questionBank.filter((q) => !assignment.has(q));
  const weak = questionBank.filter((q) => assignment.has(q) && assignment.get(q)!.score < config.weakScore);
  const unused = config.catalog.filter((e) => !byEntry.has(e.id));
  const overCap = [...byEntry.values()].filter((qs) => qs.length > config.maxPerEntry).length;

  console.log(`questions ${questionBank.length}, catalog ${config.catalog.length}, ${noun}s used ${byEntry.size}, moved ${moved}`);
  console.log(`unique (1 question): ${[...byEntry.values()].filter((l) => l.length === 1).length}`);
  console.log(`over ${config.maxPerEntry} questions: ${overCap}`);
  for (const cert of certifications) {
    const done = cert.questions.filter((q) => assignment.has(q)).length;
    console.log(`${cert.id}: ${done}/${cert.questions.length} assigned`);
  }
  console.log(`\nMost shared ${noun}s:`);
  for (const [id, qs] of [...byEntry.entries()].sort((a, b) => b[1].length - a[1].length).slice(0, 25)) {
    console.log(`  ${String(qs.length).padStart(3)}  ${label(id)}  [${qs.map((q) => q.id).join(" ")}]`);
  }
  console.log(`\nUnused catalog entries (${unused.length}):`);
  for (const e of unused) console.log(`  ${config.label(e)}`);
  console.log(`\nWeak matches (${weak.length}):`);
  for (const q of weak) {
    console.log(`  ${q.id}  ${Math.round(assignment.get(q)!.score)}  ${label(assignment.get(q)!.entry.id)}  |  ${q.text.slice(0, 110)}`);
  }
  console.log(`\nUnmatched (${unmatched.length}):`);
  for (const q of unmatched) console.log(`  ${q.id}  ${q.text.slice(0, 110)}`);
}
```

- [ ] **Step 6: Create `scripts/lib/video-config.mts`**

```ts
import path from "node:path";
import { fileURLToPath } from "node:url";
import { videoCatalog, type VideoEntry } from "../../dist/videos.js";
import type { AssignConfig } from "./assign-media.mts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

/** A video may serve at most this many questions before the rebalance looks for alternatives. */
const MAX_PER_VIDEO = 5;
/** A runner-up must score at least this fraction of the best match to be used instead. */
const RUNNER_UP_RATIO = 0.75;
/** Matches scoring below this are reported as weak so new videos can be sourced. */
const WEAK_SCORE = 30;
/** Keyword hits in the correct answer mark the tested service or concept, so such videos win. */
const ANSWER_HIT_BONUS = 1.5;

/** Assignment settings for videos; `extra` adds unmerged sourcing entries for previews. */
export function videoAssignConfig(extra: VideoEntry[] = []): AssignConfig<VideoEntry> {
  const catalog = [...videoCatalog, ...extra];
  return {
    catalog,
    catalogFor: (certId) => catalog.filter((v) => v.cert === certId),
    label: (v) => v.label,
    noun: "video",
    maxPerEntry: MAX_PER_VIDEO,
    runnerUpRatio: RUNNER_UP_RATIO,
    weakScore: WEAK_SCORE,
    answerHitBonus: ANSWER_HIT_BONUS,
    outPath: path.join(root, "src", "video-assignments.ts"),
    constName: "videoAssignments",
    header: [
      "GENERATED by `npm run videos:assign` (scripts/assign-videos.mts). Do not edit by hand.",
      "Maps question id -> YouTube video id from the catalog in videos.ts.",
    ],
  };
}
```

- [ ] **Step 7: Replace `scripts/assign-videos.mts` with a wrapper**

```ts
/**
 * Assigns every question a YouTube video from the curated catalog and writes the result to
 * src/video-assignments.ts. Scoring, spreading and the report live in scripts/lib/assign-media.mts;
 * the video settings live in scripts/lib/video-config.mts. Run after `tsc`.
 */
import { assignMedia } from "./lib/assign-media.mts";
import { videoAssignConfig } from "./lib/video-config.mts";

await assignMedia(videoAssignConfig());
```

- [ ] **Step 8: Regression check: assignments must be byte-identical**

Run: `npm run videos:assign && git diff --exit-code src/video-assignments.ts && echo IDENTICAL`
Expected: the report starts `questions 1235, catalog 516, videos used 464, moved 96`, shows `Weak matches (1)` and `Unmatched (1)`, and ends with `IDENTICAL`. Any diff means the move changed behaviour: compare against `git show HEAD:scripts/assign-videos.mts` and fix before continuing.

- [ ] **Step 9: Build and commit**

Run: `npm run build && npm test`
Expected: both succeed.

```bash
git add src/matching.ts src/videos.ts scripts/lib/assign-media.mts scripts/lib/video-config.mts scripts/assign-videos.mts tests/matching.test.mts package.json
git commit -m "refactor: share keyword matcher and assignment pass between media catalogs

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

---

### Task 2: YouTube lookup helpers and CLI

**Files:**
- Create: `scripts/lib/map-limit.mts`, `scripts/lib/youtube.mts`, `scripts/youtube.mts`, `tests/youtube.test.mts`
- Modify: `src/videos.ts` (two exported constants), `package.json` (add `youtube`)

**Interfaces:**
- Consumes: nothing from earlier tasks.
- Produces: `OFFICIAL_AWS_CHANNEL_ID`, `MAX_VIDEO_SECONDS` from `dist/videos.js`. `mapLimit<T, R>(items, limit, fn): Promise<R[]>`. From `scripts/lib/youtube.mts`: `VideoMeta { id; title; seconds; channelId; channelName }`, `SearchHit { id; title; seconds: number | null; channelId; channelName }`, `parseClock`, `parsePlayerResponse`, `parseWatchPage`, `parseSearchResponse`, `fetchVideoMeta(id): Promise<VideoMeta | null>`, `oembedStatus(id): Promise<number>`, `searchVideos(query): Promise<SearchHit[]>`.

- [ ] **Step 1: Write the failing tests**

Create `tests/youtube.test.mts`:

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { mapLimit } from "../scripts/lib/map-limit.mts";
import { parseClock, parsePlayerResponse, parseSearchResponse, parseWatchPage } from "../scripts/lib/youtube.mts";

test("mapLimit keeps input order and never exceeds the limit", async () => {
  let inFlight = 0;
  let peak = 0;
  const out = await mapLimit([30, 10, 20, 5], 2, async (ms) => {
    inFlight++;
    peak = Math.max(peak, inFlight);
    await new Promise((r) => setTimeout(r, ms));
    inFlight--;
    return ms * 2;
  });
  assert.deepEqual(out, [60, 20, 40, 10]);
  assert.equal(peak, 2);
});

test("parseClock reads m:ss and h:mm:ss", () => {
  assert.equal(parseClock("4:27"), 267);
  assert.equal(parseClock("0:55"), 55);
  assert.equal(parseClock("1:02:03"), 3723);
  assert.equal(parseClock(undefined), null);
  assert.equal(parseClock("LIVE"), null);
});

test("parsePlayerResponse reads videoDetails", () => {
  const json = {
    playabilityStatus: { status: "OK" },
    videoDetails: { videoId: "6lqUtjy_Bek", title: "IAM Role Permission Basics", lengthSeconds: "154", channelId: "UCaCZnknpM1TpUnJHl0fv0OA", author: "Cloud Bart" },
  };
  assert.deepEqual(parsePlayerResponse(json), {
    id: "6lqUtjy_Bek",
    title: "IAM Role Permission Basics",
    seconds: 154,
    channelId: "UCaCZnknpM1TpUnJHl0fv0OA",
    channelName: "Cloud Bart",
  });
});

test("parsePlayerResponse returns null when the video has no details", () => {
  assert.equal(parsePlayerResponse({ playabilityStatus: { status: "ERROR", reason: "Video unavailable" } }), null);
});

test("parseWatchPage reads the same fields from page HTML", () => {
  const html =
    '<meta name="title" content="Cloud Computing in 2 Minutes"> "lengthSeconds":"162" "externalChannelId":"UChqNJc6T93_uRl2nvmoBm4Q" "ownerChannelName":"Codebagel"';
  assert.deepEqual(parseWatchPage(html, "N0SYCyS2xZA"), {
    id: "N0SYCyS2xZA",
    title: "Cloud Computing in 2 Minutes",
    seconds: 162,
    channelId: "UChqNJc6T93_uRl2nvmoBm4Q",
    channelName: "Codebagel",
  });
  assert.equal(parseWatchPage("<html></html>", "x"), null);
});

test("parseSearchResponse walks nested renderers in page order", () => {
  const owner = (text: string, browseId: string) => ({ runs: [{ text, navigationEndpoint: { browseEndpoint: { browseId } } }] });
  const json = {
    contents: {
      sections: [
        {
          items: [
            { videoRenderer: { videoId: "v1", title: { runs: [{ text: "AWS IAM " }, { text: "Roles" }] }, lengthText: { simpleText: "4:27" }, ownerText: owner("Amazon Web Services", "UCd6MoB9NC6uYN2grvUNT-Zg") } },
            { shelfRenderer: { items: [{ videoRenderer: { videoId: "v2", title: { runs: [{ text: "Live now" }] }, ownerText: owner("Someone", "UCx") } }] } },
          ],
        },
      ],
    },
  };
  assert.deepEqual(parseSearchResponse(json), [
    { id: "v1", title: "AWS IAM Roles", seconds: 267, channelId: "UCd6MoB9NC6uYN2grvUNT-Zg", channelName: "Amazon Web Services" },
    { id: "v2", title: "Live now", seconds: null, channelId: "UCx", channelName: "Someone" },
  ]);
});
```

- [ ] **Step 2: Run and confirm failure**

Run: `npm test`
Expected: FAIL, `Cannot find module '.../scripts/lib/map-limit.mts'`.

- [ ] **Step 3: Create `scripts/lib/map-limit.mts`**

```ts
/** Maps `items` through `fn` with at most `limit` calls in flight, keeping input order. */
export async function mapLimit<T, R>(items: T[], limit: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const results = new Array<R>(items.length);
  let next = 0;
  const worker = async () => {
    while (next < items.length) {
      const i = next++;
      results[i] = await fn(items[i]);
    }
  };
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}
```

- [ ] **Step 4: Create `scripts/lib/youtube.mts`**

```ts
/**
 * YouTube lookups for curating the video catalog. They read the public JSON the YouTube web
 * player itself uses, so no API key is needed. YouTube can change or rate-limit it, so every
 * metadata lookup falls back to a second source and retries, and callers should run only a few
 * requests at a time (see map-limit.mts).
 */

export interface VideoMeta {
  id: string;
  title: string;
  seconds: number;
  channelId: string;
  channelName: string;
}

export interface SearchHit {
  id: string;
  title: string;
  /** Null for live streams and results YouTube shows without a length. */
  seconds: number | null;
  channelId: string;
  channelName: string;
}

const CLIENT = { clientName: "WEB", clientVersion: "2.20250101.00.00", hl: "en", gl: "US" };
const BROWSER_HEADERS = { "User-Agent": "Mozilla/5.0", "Accept-Language": "en" };

/** "4:27" -> 267, "1:02:03" -> 3723; null for anything else. */
export function parseClock(text: string | undefined): number | null {
  if (!text || !/^\d+(:\d{1,2}){1,2}$/.test(text)) return null;
  return text.split(":").reduce((total, part) => total * 60 + Number(part), 0);
}

/** Reads a player API response; null when it has no usable videoDetails (removed, private, blocked). */
export function parsePlayerResponse(json: any): VideoMeta | null {
  const d = json?.videoDetails;
  const seconds = Number(d?.lengthSeconds);
  if (!d?.videoId || !d.channelId || !(seconds > 0)) return null;
  return { id: d.videoId, title: d.title ?? "", seconds, channelId: d.channelId, channelName: d.author ?? "" };
}

/** Reads the same fields out of a watch page's HTML; null when they are missing. */
export function parseWatchPage(html: string, id: string): VideoMeta | null {
  const pick = (re: RegExp) => html.match(re)?.[1];
  const seconds = Number(pick(/"lengthSeconds":"(\d+)"/));
  const channelId = pick(/"externalChannelId":"([^"]+)"/) ?? pick(/"channelId":"([^"]+)"/);
  if (!(seconds > 0) || !channelId) return null;
  return {
    id,
    title: pick(/<meta name="title" content="([^"]*)"/) ?? "",
    seconds,
    channelId,
    channelName: pick(/"ownerChannelName":"([^"]+)"/) ?? "",
  };
}

/** Collects every videoRenderer in a search response, in page order. */
export function parseSearchResponse(json: any): SearchHit[] {
  const hits: SearchHit[] = [];
  const walk = (node: any): void => {
    if (!node || typeof node !== "object") return;
    const v = node.videoRenderer;
    if (v?.videoId) {
      const owner = v.ownerText?.runs?.[0];
      hits.push({
        id: v.videoId,
        title: (v.title?.runs ?? []).map((r: any) => r.text).join(""),
        seconds: parseClock(v.lengthText?.simpleText),
        channelId: owner?.navigationEndpoint?.browseEndpoint?.browseId ?? "",
        channelName: owner?.text ?? "",
      });
      return;
    }
    for (const key of Object.keys(node)) walk(node[key]);
  };
  walk(json);
  return hits;
}

async function innertube(endpoint: "player" | "search", body: object): Promise<any> {
  const res = await fetch(`https://www.youtube.com/youtubei/v1/${endpoint}?prettyPrint=false`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...body, context: { client: CLIENT } }),
  });
  if (!res.ok) throw new Error(`YouTube ${endpoint} returned HTTP ${res.status}`);
  return res.json();
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Length and channel for one video: the player API first, then the watch page, retrying with a
 * growing pause because YouTube throttles bursts. Null means neither source had the fields. That
 * usually means the video is gone, but throttling looks the same, so confirm with oembedStatus.
 */
export async function fetchVideoMeta(id: string, attempts = 3): Promise<VideoMeta | null> {
  for (let attempt = 0; attempt < attempts; attempt++) {
    if (attempt > 0) await sleep(1500 * attempt);
    try {
      const meta = parsePlayerResponse(await innertube("player", { videoId: id }));
      if (meta) return meta;
    } catch {
      // The watch page below is the fallback source.
    }
    try {
      const res = await fetch(`https://www.youtube.com/watch?v=${encodeURIComponent(id)}`, { headers: BROWSER_HEADERS });
      const meta = parseWatchPage(await res.text(), id);
      if (meta) return meta;
    } catch {
      // Retried on the next attempt.
    }
  }
  return null;
}

/** HTTP status of YouTube's oEmbed endpoint: 200 public and embeddable, 401 embedding disabled, 404 private or removed. */
export async function oembedStatus(id: string): Promise<number> {
  const watchUrl = `https://www.youtube.com/watch?v=${id}`;
  const res = await fetch(`https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(watchUrl)}`);
  await res.body?.cancel();
  return res.status;
}

export async function searchVideos(query: string): Promise<SearchHit[]> {
  return parseSearchResponse(await innertube("search", { query }));
}
```

- [ ] **Step 5: Run the tests and confirm they pass**

Run: `npm test`
Expected: PASS (matching and youtube tests).

- [ ] **Step 6: Export the rule constants from `src/videos.ts`**

Add after the imports:

```ts
/** The official Amazon Web Services YouTube channel. Its videos are exempt from the length cap. */
export const OFFICIAL_AWS_CHANNEL_ID = "UCd6MoB9NC6uYN2grvUNT-Zg";
/** Per-question videos may run at most this long, unless they come from the official AWS channel. */
export const MAX_VIDEO_SECONDS = 180;
```

- [ ] **Step 7: Create the CLI `scripts/youtube.mts`**

```ts
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
```

In `package.json` `scripts`, add:

```json
    "youtube": "tsc && node scripts/youtube.mts",
```

- [ ] **Step 8: Smoke-test against YouTube**

Run: `npm run -s youtube -- meta N0SYCyS2xZA miij_0HkBws`
Expected: two JSON lines. The first has `"seconds":162,"channelId":"UChqNJc6T93_uRl2nvmoBm4Q"` and `"official":false`; the second has `"official":true`.

Run: `npm run -s youtube -- search "Amazon S3 Vectors" --official`
Expected: at least one line with `OFFICIAL` in the third column.

- [ ] **Step 9: Commit**

```bash
git add scripts/lib/map-limit.mts scripts/lib/youtube.mts scripts/youtube.mts tests/youtube.test.mts src/videos.ts package.json
git commit -m "feat: add YouTube metadata and search helpers for curating videos

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

---

### Task 3: Video length and channel metadata, catalog rules, `videos:check`

**Files:**
- Create: `scripts/lib/video-check.mts`, `scripts/check-videos.mts`, `tests/videos.test.mts`, `.superpowers/fill-video-meta.mts` (scratch, not committed)
- Modify: `src/videos.ts` (`VideoEntry` fields, all 516 catalog lines, `isOfficialAws`, `videoCatalogProblems`), `package.json` (add `videos:check`)

**Interfaces:**
- Consumes: `OFFICIAL_AWS_CHANNEL_ID`, `MAX_VIDEO_SECONDS`, `fetchVideoMeta`, `oembedStatus`, `mapLimit` (Task 2).
- Produces: `VideoEntry.seconds: number`, `VideoEntry.channelId: string`, `isOfficialAws(entry: Pick<VideoEntry, "channelId">): boolean`, `videoCatalogProblems(catalog, fallback, certs): string[]` (exported but **not yet** called at module load; Task 5 wires it in), `videoCheckProblems(entry, oembed, meta): string[]`.

- [ ] **Step 1: Write the failing tests**

Create `tests/videos.test.mts`:

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { MAX_VIDEO_SECONDS, OFFICIAL_AWS_CHANNEL_ID, isOfficialAws, videoCatalog, videoCatalogProblems } from "../dist/videos.js";
import { videoCheckProblems } from "../scripts/lib/video-check.mts";

const THIRD_PARTY = "UCaCZnknpM1TpUnJHl0fv0OA";
const video = (id: string, over: object = {}) => ({ id, label: id, keywords: [], cert: "clf-c02", seconds: 100, channelId: THIRD_PARTY, ...over });
const clfOnly = [{ id: "clf-c02", domains: [{ id: "cloud-concepts" }] }];
const fallback = { "cloud-concepts": "f" };

test("the length cap applies to third-party videos only", () => {
  const catalog = [
    video("f"),
    video("long", { seconds: 181 }),
    video("edge", { seconds: MAX_VIDEO_SECONDS }),
    video("aws", { seconds: 3000, channelId: OFFICIAL_AWS_CHANNEL_ID }),
  ];
  const problems = videoCatalogProblems(catalog, fallback, clfOnly);
  assert.equal(problems.length, 1);
  assert.match(problems[0], /video long .*181s is over the 180s cap/);
});

test("a video may serve both certs but may not repeat within one", () => {
  const bothCerts = [
    { id: "clf-c02", domains: [{ id: "cloud-concepts" }] },
    { id: "aif-c01", domains: [{ id: "responsible-ai" }] },
  ];
  const bothFallbacks = { "cloud-concepts": "f", "responsible-ai": "f" };
  assert.deepEqual(videoCatalogProblems([video("f"), video("f", { cert: "aif-c01" })], bothFallbacks, bothCerts), []);
  assert.match(videoCatalogProblems([video("f"), video("f")], fallback, clfOnly).join("\n"), /clf-c02: duplicate video f/);
});

test("every domain needs a fallback from its own cert", () => {
  assert.match(videoCatalogProblems([video("x")], fallback, clfOnly).join("\n"), /domain cloud-concepts: fallback video f is not in the clf-c02 catalog/);
  assert.match(videoCatalogProblems([video("f", { cert: "aif-c01" })], fallback, clfOnly).join("\n"), /fallback video f is not in the clf-c02 catalog/);
});

test("metadata must look like YouTube's", () => {
  assert.equal(videoCatalogProblems([video("f", { seconds: 0, channelId: "nope" })], fallback, clfOnly).length, 2);
});

test("isOfficialAws recognises only the Amazon Web Services channel", () => {
  assert.equal(isOfficialAws({ channelId: OFFICIAL_AWS_CHANNEL_ID }), true);
  assert.equal(isOfficialAws({ channelId: THIRD_PARTY }), false);
});

test("every catalog entry carries its length and channel", () => {
  for (const v of videoCatalog) {
    assert.ok(Number.isInteger(v.seconds) && v.seconds > 0, `${v.id} seconds`);
    assert.match(v.channelId, /^UC[\w-]{22}$/, `${v.id} channelId`);
  }
});

const entry = video("v", { seconds: 150 });
const meta = { id: "v", title: "V", seconds: 150, channelId: THIRD_PARTY, channelName: "Someone" };

test("videoCheckProblems passes a live, unchanged video", () => {
  assert.deepEqual(videoCheckProblems(entry, 200, meta), []);
});

test("videoCheckProblems tells removed videos apart from throttling", () => {
  assert.deepEqual(videoCheckProblems(entry, 404, null), ["video is private or removed"]);
  assert.deepEqual(videoCheckProblems(entry, 200, null), ["could not read length and channel (likely throttled); retry later"]);
  assert.deepEqual(videoCheckProblems(entry, 401, meta), ["embedding is disabled"]);
  assert.deepEqual(videoCheckProblems(entry, 429, meta), ["oEmbed returned HTTP 429; retry later"]);
});

test("videoCheckProblems reports changed metadata and the length rule", () => {
  assert.deepEqual(videoCheckProblems(entry, 200, { ...meta, seconds: 200 }), ["length is 200s, catalog says 150s"]);
  const over = video("v", { seconds: 200 });
  assert.match(videoCheckProblems(over, 200, { ...meta, seconds: 200 }).join("\n"), /200s is over the 180s cap/);
});
```

- [ ] **Step 2: Run and confirm failure**

Run: `npm test`
Expected: FAIL. `videoCatalogProblems` is not exported, and `scripts/lib/video-check.mts` does not exist.

- [ ] **Step 3: Write the scratch fill script**

Create `.superpowers/fill-video-meta.mts`. It adds `seconds` and `channelId` to every one-line catalog entry, and refuses to write anything if a single video cannot be looked up:

```ts
import { readFile, writeFile } from "node:fs/promises";
import { mapLimit } from "../scripts/lib/map-limit.mts";
import { fetchVideoMeta } from "../scripts/lib/youtube.mts";

const file = "src/videos.ts";
const src = await readFile(file, "utf8");
const entryLine = /^(  \{ id: "([^"]+)", .*, cert: "[a-z0-9-]+")( \},)$/gm;
const ids = [...new Set([...src.matchAll(entryLine)].map((m) => m[2]))];
console.log(`${[...src.matchAll(entryLine)].length} entry lines, ${ids.length} distinct ids`);
const metas = await mapLimit(ids, 4, (id) => fetchVideoMeta(id));
const byId = new Map(metas.filter((m) => m !== null).map((m) => [m!.id, m!]));
const missing = ids.filter((id) => !byId.has(id));
if (missing.length > 0) {
  console.error(`no metadata for ${missing.length}: ${missing.join(" ")} (rerun; YouTube may be throttling)`);
  process.exit(1);
}
const out = src.replace(entryLine, (_line, head: string, id: string, tail: string) => {
  const m = byId.get(id)!;
  return `${head}, seconds: ${m.seconds}, channelId: ${JSON.stringify(m.channelId)}${tail}`;
});
await writeFile(file, out);
console.log("filled");
```

- [ ] **Step 4: Run it**

Run: `node .superpowers/fill-video-meta.mts`
Expected: `516 entry lines, 516 distinct ids`, then `filled`. If it prints `no metadata`, run it again; retries usually succeed. Then confirm:

Run: `grep -c '^  { id: ".*seconds: [0-9]*, channelId: "UC' src/videos.ts`
Expected: `516`

- [ ] **Step 5: Add the fields, `isOfficialAws` and `videoCatalogProblems` to `src/videos.ts`**

Change the imports at the top to:

```ts
import { Question } from "./types.js";
import { Certification, CertificationId } from "./certifications.js";
import { videoAssignments } from "./video-assignments.js";
import { entryScore, haystacksFor } from "./matching.js";
```

Add the two fields to `VideoEntry`, after `cert`:

```ts
  /** Length in seconds (YouTube lengthSeconds), recorded when the video was catalogued. */
  seconds: number;
  /** YouTube channel id of the uploader; OFFICIAL_AWS_CHANNEL_ID marks official AWS videos. */
  channelId: string;
```

Add after `videoUrlFor`:

```ts
export function isOfficialAws(entry: Pick<VideoEntry, "channelId">): boolean {
  return entry.channelId === OFFICIAL_AWS_CHANNEL_ID;
}

/**
 * Catalog rules: the length cap, well-formed metadata, no video listed twice for one cert
 * (the same video may serve both certs), and a fallback for every domain that exists in that
 * domain's cert catalog. Returns every problem found, so tests can assert on them.
 */
export function videoCatalogProblems(
  catalog: VideoEntry[],
  fallback: Record<string, string>,
  certs: Pick<Certification, "id" | "domains">[]
): string[] {
  const problems: string[] = [];
  const seen = new Set<string>();
  for (const v of catalog) {
    const key = `${v.cert}/${v.id}`;
    if (seen.has(key)) problems.push(`${v.cert}: duplicate video ${v.id}`);
    seen.add(key);
    if (!Number.isInteger(v.seconds) || v.seconds <= 0) problems.push(`video ${v.id}: seconds must be a positive whole number`);
    if (!/^UC[\w-]{22}$/.test(v.channelId)) problems.push(`video ${v.id}: channelId ${v.channelId} is not a YouTube channel id`);
    if (v.seconds > MAX_VIDEO_SECONDS && !isOfficialAws(v)) {
      problems.push(`video ${v.id} (${v.label}): ${v.seconds}s is over the ${MAX_VIDEO_SECONDS}s cap and not from the official AWS channel`);
    }
  }
  for (const cert of certs) {
    for (const d of cert.domains) {
      const id = fallback[d.id];
      if (!catalog.some((v) => v.cert === cert.id && v.id === id)) {
        problems.push(`domain ${d.id}: fallback video ${id} is not in the ${cert.id} catalog`);
      }
    }
  }
  return problems;
}
```

- [ ] **Step 6: Create `scripts/lib/video-check.mts`**

```ts
import { MAX_VIDEO_SECONDS, isOfficialAws, type VideoEntry } from "../../dist/videos.js";
import type { VideoMeta } from "./youtube.mts";

/**
 * Problems with one catalog video, given YouTube's oEmbed status and metadata. A video that is
 * gone (oEmbed 404) is told apart from metadata that could not be read, which is usually
 * throttling and worth a retry rather than a replacement.
 */
export function videoCheckProblems(entry: VideoEntry, oembed: number, meta: VideoMeta | null): string[] {
  const problems: string[] = [];
  if (oembed === 401) problems.push("embedding is disabled");
  else if (oembed === 404) problems.push("video is private or removed");
  else if (oembed !== 200) problems.push(`oEmbed returned HTTP ${oembed}; retry later`);
  if (!meta) {
    if (oembed === 200) problems.push("could not read length and channel (likely throttled); retry later");
  } else {
    if (meta.seconds !== entry.seconds) problems.push(`length is ${meta.seconds}s, catalog says ${entry.seconds}s`);
    if (meta.channelId !== entry.channelId) {
      problems.push(`channel is ${meta.channelId} (${meta.channelName}), catalog says ${entry.channelId}`);
    }
  }
  if (entry.seconds > MAX_VIDEO_SECONDS && !isOfficialAws(entry)) {
    problems.push(`${entry.seconds}s is over the ${MAX_VIDEO_SECONDS}s cap and not from the official AWS channel`);
  }
  return problems;
}
```

- [ ] **Step 7: Run the tests and confirm they pass**

Run: `npm test`
Expected: PASS.

- [ ] **Step 8: Create `scripts/check-videos.mts` and the npm script**

```ts
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
```

In `package.json` `scripts`, add:

```json
    "videos:check": "tsc && node scripts/check-videos.mts",
```

- [ ] **Step 9: Run the check**

Run: `npm run -s videos:check`
Expected: exit code 1, and exactly the 13 known over-cap entries reported with `is over the 180s cap`: `BR9cTl_SFyY jJ7ff7Gcq34 UqgUXv_G2WA 5wIHu27Rr7Y nTIKwv2Oijk beknlA2BHGo ESPBBEK-cvo vJ4SsfmeQlk dN0lsF2cvm4 xST_Qfg8i1E b0hQ9ikTeyo GfRXX7tqBBI ZXiruGOCn9s`. Anything else reported as `private or removed` or `embedding is disabled` gets replaced in Task 5 as well; note those ids. Rerun anything that says `retry later`.

- [ ] **Step 10: Build and commit**

Run: `npm run build && npm test`
Expected: both succeed. The build does not enforce the rule yet.

```bash
git add src/videos.ts scripts/lib/video-check.mts scripts/check-videos.mts tests/videos.test.mts package.json
git commit -m "feat: record video length and channel, add catalog rules and videos:check

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

---

### Task 4: Official preference, 3 per video, report sections, match preview

**Files:**
- Create: `scripts/preview-match.mts`
- Modify: `src/matching.ts` (add `namesAwsService`), `src/videos.ts` (add `OFFICIAL_BONUS`, `officialPreference`), `scripts/lib/video-config.mts` (cap 3, bonus), `scripts/assign-videos.mts` (report sections), `tests/matching.test.mts`, `tests/videos.test.mts`, `src/video-assignments.ts` (regenerated)

**Interfaces:**
- Consumes: `isOfficialAws`, `MAX_VIDEO_SECONDS` (Tasks 2–3), `rankCandidates`, `assignMedia`, `videoAssignConfig` (Task 1).
- Produces: `namesAwsService(question): boolean` from `dist/matching.js`. `OFFICIAL_BONUS = 1.35` and `officialPreference(entry, question): number` from `dist/videos.js`. The CLI `node scripts/preview-match.mts videos <questionId> [batch.json ...]`.

- [ ] **Step 1: Write the failing tests**

Append to `tests/matching.test.mts`, and add `namesAwsService` to its import list:

```ts
const withAnswers = (texts: string[], correct = ["a"]) => ({
  ...question,
  options: texts.map((text, i) => ({ id: "abc"[i], text })),
  correctOptionIds: correct,
});

test("namesAwsService reads only the correct answers", () => {
  assert.equal(namesAwsService(withAnswers(["Amazon S3", "Tape"])), true);
  assert.equal(namesAwsService(withAnswers(["Enable AWS Shield Advanced"])), true);
  assert.equal(namesAwsService(withAnswers(["Pay-as-you-go pricing", "Amazon S3"])), false);
  assert.equal(namesAwsService(withAnswers(["It is AWS's responsibility"])), false);
  assert.equal(namesAwsService(withAnswers(["AWS manages the hardware"])), false);
});
```

Append to `tests/videos.test.mts`, and add `OFFICIAL_BONUS, officialPreference` to its import from `../dist/videos.js`:

```ts
const baseQuestion = { id: "q", domain: "cloud-concepts", text: "t", answerType: "single", explanation: "e" };

test("official videos get the bonus on service questions only", () => {
  const service = { ...baseQuestion, options: [{ id: "a", text: "Amazon S3" }], correctOptionIds: ["a"] };
  const concept = { ...baseQuestion, options: [{ id: "a", text: "Elasticity" }], correctOptionIds: ["a"] };
  const official = video("o", { channelId: OFFICIAL_AWS_CHANNEL_ID });
  assert.equal(officialPreference(official, service), OFFICIAL_BONUS);
  assert.equal(officialPreference(official, concept), 1);
  assert.equal(officialPreference(video("t"), service), 1);
  assert.equal(OFFICIAL_BONUS, 1.35);
});
```

- [ ] **Step 2: Run and confirm failure**

Run: `npm test`
Expected: FAIL, `namesAwsService` and `officialPreference` are not exported.

- [ ] **Step 3: Implement**

Append to `src/matching.ts`:

```ts
/** A capitalised name straight after "Amazon" or "AWS", as in "Amazon S3" or "AWS Shield". */
const AWS_SERVICE_NAME = /\b(?:Amazon|AWS)\s+[A-Z]/;

/** True when a correct option names an AWS service or feature. */
export function namesAwsService(question: Question): boolean {
  return question.options.some((o) => question.correctOptionIds.includes(o.id) && AWS_SERVICE_NAME.test(o.text));
}
```

In `src/videos.ts`, change the matching import to `import { entryScore, haystacksFor, namesAwsService } from "./matching.js";` and add after `isOfficialAws`:

```ts
/** How much an official AWS video's score is raised on a question whose answer names an AWS service. */
export const OFFICIAL_BONUS = 1.35;

/**
 * Score multiplier for the offline assignment. On a question whose correct answer names an AWS
 * service, an official AWS video wins unless a third-party video scores about a third higher.
 */
export function officialPreference(entry: VideoEntry, question: Question): number {
  return isOfficialAws(entry) && namesAwsService(question) ? OFFICIAL_BONUS : 1;
}
```

In `scripts/lib/video-config.mts`, change the import to `import { officialPreference, videoCatalog, type VideoEntry } from "../../dist/videos.js";`, set `const MAX_PER_VIDEO = 3;`, and add to the returned object after `answerHitBonus`:

```ts
    bonus: officialPreference,
```

- [ ] **Step 4: Run the tests and confirm they pass**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Add the video report sections to `scripts/assign-videos.mts`**

Replace the file body after the doc comment with:

```ts
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
```

- [ ] **Step 6: Create `scripts/preview-match.mts`**

```ts
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
```

Run: `npm run -s build && node scripts/preview-match.mts videos aif-sec3`
Expected: the header lines, then up to 6 scored rows. `5wIHu27Rr7Y` should appear, tagged `third-party, 217s`.

- [ ] **Step 7: Regenerate assignments and record the baseline**

Run: `npm run -s videos:assign | tee .superpowers/video-report-task4.txt | grep -E "^(questions|unique|over 3|Distinct|Service questions|Videos in use that break|Official videos over|Weak|Unmatched)"`
Expected: `over 3 questions:` greater than 0, and `Distinct videos in use:` about 464–480 (the catalog has not grown yet). `Service questions on third-party videos` should be about 227, down from 269 thanks to the bonus. `Videos in use that break the length rule` should be about 13. Record these numbers in the commit body.

- [ ] **Step 8: Commit**

```bash
git add src/matching.ts src/videos.ts scripts/lib/video-config.mts scripts/assign-videos.mts scripts/preview-match.mts tests/matching.test.mts tests/videos.test.mts src/video-assignments.ts
git commit -m "feat: prefer official AWS videos for service questions, cap videos at 3 questions

<paste the Step 7 numbers here>

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

---

### Task 5: Replace the 13 over-cap videos and enforce the rule in the build

**Files:**
- Create: `scripts/validate.mts`, `.superpowers/merge-videos.mts` (scratch), `.superpowers/sourcing/videos-overcap.json` (scratch)
- Modify: `src/videos.ts` (remove 13 entries, add replacements, validate at load), `package.json` (`build`), `tests/videos.test.mts`, `README.md`, `src/video-assignments.ts` (regenerated)

**Interfaces:**
- Consumes: `videoCatalogProblems`, `youtube.mts` CLI, `check-videos.mts`, `preview-match.mts`.
- Produces: `scripts/validate.mts` (Task 8 adds images to it). The batch JSON format used by Tasks 6–7: `{ "entries": VideoEntry[], "extendKeywords": { "id": string, "cert": string, "keywords": string[] }[], "noOfficial": { "questionId": string, "queries": string[] }[] }`. `.superpowers/merge-videos.mts "<section comment>" batch.json ...`.

- [ ] **Step 1: Write the failing test**

Append to `tests/videos.test.mts`, and add `domainFallbackFor` to the import from `../dist/videos.js`. Also add `import { certifications } from "../dist/certifications.js";`:

```ts
test("the real catalog passes every rule", () => {
  assert.deepEqual(videoCatalogProblems(videoCatalog, domainFallbackFor, certifications), []);
});
```

In `src/videos.ts`, export the fallback map under a test-friendly name by adding after `domainFallback`:

```ts
/** Read-only view of the domain fallbacks, for tests. */
export const domainFallbackFor: Readonly<Record<string, string>> = domainFallback;
```

Run: `npm test`
Expected: FAIL, with the 13 `is over the 180s cap` problems (plus any removed videos found in Task 3 Step 9).

- [ ] **Step 2: Write the merge script**

Create `.superpowers/merge-videos.mts`:

```ts
// Usage: node .superpowers/merge-videos.mts "<section comment>" batch.json [batch.json ...]
// Appends new entries to the end of videoCatalog under the section comment, skips entries that
// are already catalogued for that cert, and adds extendKeywords to existing entries.
import { readFile, writeFile } from "node:fs/promises";

const [section, ...files] = process.argv.slice(2);
const file = "src/videos.ts";
let src = await readFile(file, "utf8");
const catalogued = new Set([...src.matchAll(/^  \{ id: "([^"]+)", .*cert: "([a-z0-9-]+)"/gm)].map((m) => `${m[2]}/${m[1]}`));
const list = (items: string[]) => "[" + items.map((k) => JSON.stringify(k)).join(", ") + "]";
const lines: string[] = [];
let extended = 0;

for (const f of files) {
  const batch = JSON.parse(await readFile(f, "utf8"));
  for (const e of batch.entries ?? []) {
    const key = `${e.cert}/${e.id}`;
    if (catalogued.has(key)) {
      console.log(`skip ${key}: already catalogued (use extendKeywords)`);
      continue;
    }
    catalogued.add(key);
    const keywords = [...new Set<string>(e.keywords.map((k: string) => k.toLowerCase()))];
    lines.push(
      `  { id: ${JSON.stringify(e.id)}, label: ${JSON.stringify(e.label)}, keywords: ${list(keywords)}, cert: ${JSON.stringify(e.cert)}, seconds: ${e.seconds}, channelId: ${JSON.stringify(e.channelId)} },`
    );
  }
  for (const x of batch.extendKeywords ?? []) {
    const re = new RegExp(`^(  \\{ id: "${x.id}", label: .*?, keywords: )(\\[.*?\\])(, cert: "${x.cert}",)`, "m");
    const m = src.match(re);
    if (!m) {
      console.log(`extend ${x.cert}/${x.id}: no such entry`);
      continue;
    }
    const merged = [...new Set<string>([...JSON.parse(m[2]), ...x.keywords.map((k: string) => k.toLowerCase())])];
    src = src.replace(re, `$1${list(merged)}$3`);
    extended++;
  }
}
if (lines.length > 0) {
  const end = src.indexOf("\n];", src.indexOf("export const videoCatalog"));
  src = src.slice(0, end) + `\n\n  // ${section}\n` + lines.join("\n") + src.slice(end);
}
await writeFile(file, src);
console.log(`added ${lines.length} entries, extended ${extended}`);
```

- [ ] **Step 3: Source the replacements**

For each of the 35 questions below, find a video that follows the rules:

- A **service** question gets an official video. Use `npm run -s youtube -- search "<service or feature> Amazon Web Services" --official`.
- A **concept** question gets a video of 3:00 or less from any channel. Use `npm run -s youtube -- search "<concept> explained" --short`, and try adding "in 2 minutes" or "in 60 seconds" to the query.

Confirm each candidate's title and description are on topic by fetching `https://www.youtube.com/watch?v=<id>` and reading the description. Titles mislead: "F1 is Using AWS Machine Learning" is about Formula 1 racing. Get `seconds` and `channelId` from `npm run -s youtube -- meta <id>`. Aim for no more than 3 questions per video.

| Questions | Topic | Kind | Starting candidates (verify; replace if a better one exists) |
|---|---|---|---|
| aif-ml9 | SageMaker Ground Truth | service | `gjiozYXHKc8` Introducing SageMaker Ground Truth (2:57, official; CLF entry exists, add an aif-c01 entry) |
| aif-ra8, aif-ra23 | labelling bias, representative data | concept | extend `1zf_ofk6HSs` (aif, official 3:30) with labelling and annotation keywords |
| aif-fm27, aif-fm28 | OpenSearch / vector stores on AWS | service | `PiRczUzb-sc` OpenSearch Service: Scalable Vector Database (1:51, official) |
| aif-fm8 | Aurora PostgreSQL pgvector | service | search "Aurora PostgreSQL pgvector" `--official` |
| aif-fm7 | job of the vector store in RAG | concept | `ADqa-VKq22s` Vector Databases Explained in 2 Mins (1:50) or `bGNYyK1L41g` (1:49) |
| aif-sec7 | shared responsibility for Bedrock apps | service | `U632-ND7dKQ` AWS Compliance: Shared Responsibility Model (2:37, official; CLF entry exists) |
| aif-sec1 | IAM role on EC2 calling Bedrock | service | `miij_0HkBws` AWS IAM Roles (4:27, official) |
| aif-sec2 | IAM Access Analyzer policy generation | service | search "IAM Access Analyzer policy generation" `--official` |
| aif-sec3 | KMS SSE plus TLS | service | `8Z0wsE2HoSo` What is AWS KMS? (1:33, official; CLF entry exists) |
| aif-ml21 | Model Registry / MLflow | service | `KzwSVsZ4nlc` Track and manage model versions in SageMaker (4:21, official) |
| aif-ra12, aif-ra13 | Model Monitor bias drift | service | search "SageMaker Model Monitor" `--official`; else `FSOBmgT_9aQ` SageMaker MLOps (1:32, official) |
| aif-sec22 | Well-Architected ML Lens | service | search "Machine Learning Lens" `--official`; else `n4BTqappip0` Well-Architected Tool (1:34, official; CLF entry exists) |
| aif-ra19 | SageMaker Model Cards | service | search "SageMaker Model Cards" `--official` |
| aif-ra20 | AWS AI Service Cards | service | search "AI Service Cards" `--official`; `mpvK6Idgx60` Responsible AI part 2 (2:36) only if its description covers service cards |
| aif-sec23 | CAF for AI | service | search "Cloud Adoption Framework AI" `--official`; check `XEYsIKYluc4` (10:24) description |
| aif-gen4, aif-gen14, aif-fm34 | temperature | concept | `lVsodqnh5CQ` LLM Temperature Explained in 2 minutes (2:24) |
| aif-gen5, aif-gen27 | top-p / top-k | concept | `jv-_MSbyrNM` Top-k vs Top-p in 2 Minutes (2:21); `htuoGwh4HrQ` (1:43); `aNCkt-4h0ik` (1:22) |
| aif-gen28, aif-fm3 | stop sequences, max tokens | concept | search "stop sequence LLM", "max tokens LLM" `--short` |
| aif-ml14, aif-ml15 | precision, recall, false positive | concept | `o9A4e7zopu8` Precision and Recall in 100 Seconds (1:41); `zm3QLpjeIpk` (2:48) |
| aif-ml30 | F1 score | concept | `8-6sRTcncaE` What is F1 Score? in 60 Seconds (1:15) |
| aif-ml31 | ROC AUC | concept | search "ROC curve AUC explained" `--short` |
| aif-fm51 | BLEU | concept | search "BLEU score explained" `--short` |
| aif-gen6 | transformers, self-attention | concept | `xh56J5kOaOo` How a Transformer Works in 2 minutes (2:10); `A_mepM0KbJ4` (0:55) |
| aif-ra15 | RLHF | concept | search "RLHF explained" `--short` |
| aif-ra16, aif-ra21, aif-ra22 | explainability vs interpretability | concept | `hTUKuf8uy9Y` (2:09); `dWuPLgPO2Ig` (2:57) |

Write the result to `.superpowers/sourcing/videos-overcap.json`:

```json
{
  "entries": [
    { "id": "PiRczUzb-sc", "label": "Amazon OpenSearch Service: Scalable Vector Database (AWS)", "keywords": ["opensearch", "vector search collection", "..."], "cert": "aif-c01", "seconds": 111, "channelId": "UCd6MoB9NC6uYN2grvUNT-Zg" }
  ],
  "extendKeywords": [
    { "id": "1zf_ofk6HSs", "cert": "aif-c01", "keywords": ["labeling bias", "annotation process", "annotators", "represented in proportion"] }
  ],
  "noOfficial": []
}
```

Draw keywords from the phrases in each question's stem and correct answers; move the matching keywords from the removed entry to its replacement. Then check the batch and preview each question:

Run: `npm run -s videos:check -- .superpowers/sourcing/videos-overcap.json`
Expected: `0 with problems`.

Run: `for q in aif-ml9 aif-sec1 aif-gen5 aif-ml30 aif-ra15; do node scripts/preview-match.mts videos $q .superpowers/sourcing/videos-overcap.json | sed -n 1,5p; done`
Expected: the intended new video ranks first for each. Adjust keywords until it does. Repeat for all 35.

- [ ] **Step 4: Remove the 13 entries and merge**

Run:

```bash
for id in BR9cTl_SFyY jJ7ff7Gcq34 UqgUXv_G2WA 5wIHu27Rr7Y nTIKwv2Oijk beknlA2BHGo ESPBBEK-cvo vJ4SsfmeQlk dN0lsF2cvm4 xST_Qfg8i1E b0hQ9ikTeyo GfRXX7tqBBI ZXiruGOCn9s; do sed -i "/^  { id: \"$id\", .*cert: \"aif-c01\"/d" src/videos.ts; done
node .superpowers/merge-videos.mts "AI Practitioner: replacements for videos over 3 minutes" .superpowers/sourcing/videos-overcap.json
```

Expected: `added N entries, extended M`, where N is 13 or more.

- [ ] **Step 5: Enforce at load and in the build**

At the end of `src/videos.ts`, add:

```ts
const catalogProblems = videoCatalogProblems(videoCatalog, domainFallback, certifications);
if (catalogProblems.length > 0) throw new Error(`video catalog:\n  ${catalogProblems.join("\n  ")}`);
```

and change the certifications import to `import { Certification, CertificationId, certifications } from "./certifications.js";`.

Create `scripts/validate.mts`:

```ts
/**
 * Imports every module that checks its own data at load time, so a bad question bank or media
 * catalog fails `npm run build`. Run after `tsc`.
 */
await import("../dist/certifications.js");
await import("../dist/videos.js");
console.log("question bank and video catalog are valid");
```

In `package.json`, change `build` to:

```json
    "build": "tsc && node scripts/validate.mts && node scripts/vendor.mts && node scripts/build-sw.mts",
```

- [ ] **Step 6: Verify**

Run: `npm test && npm run build`
Expected: PASS, and `question bank and video catalog are valid`.

Run: `npm run -s videos:assign | grep -E "^(Distinct|Service questions|Videos in use that break|Weak|Unmatched)"`
Expected: `Videos in use that break the length rule (0)`. Every one of the 35 questions is on a new or extended entry; check a few with `grep -E '"aif-(ml9|sec1|gen5|ml30)"' src/video-assignments.ts`.

Negative check: temporarily set one catalog entry's `seconds` to `999`, run `npm run build`, and confirm it fails with `is over the 180s cap`. Then revert with `git checkout -p src/videos.ts`, or undo the edit.

- [ ] **Step 7: Document the video rules in `README.md`**

After the `npm run videos:assign` paragraph, add:

```markdown
Every per-question video is at most 3 minutes long unless it comes from the official Amazon Web Services channel (`UCd6MoB9NC6uYN2grvUNT-Zg`). Each catalog entry records its `seconds` and `channelId`, and `npm run build` fails on any entry that breaks the rule. When a question's correct answer names an AWS service, the assignment prefers an official AWS video, and no video serves more than 3 questions if a close alternative exists.

    npm run videos:check
    npm run youtube -- search "Amazon S3 Vectors" --official
    npm run youtube -- meta <videoId>
    node scripts/preview-match.mts videos <questionId> [batch.json]

`videos:check` confirms every catalog video is still public and embeddable, and that its stored length and channel are current. It reads YouTube's public player data without an API key, so run it occasionally rather than in CI, and rerun anything reported as "retry later". The `youtube` helper looks up a video's length and channel, or searches YouTube (`--official` for the AWS channel only, `--short` for 3 minutes or less). `preview-match` shows how a question would be matched, including entries not yet merged into the catalog.
```

- [ ] **Step 8: Commit**

```bash
git add src/videos.ts src/video-assignments.ts scripts/validate.mts package.json tests/videos.test.mts README.md
git commit -m "content: replace videos over 3 minutes and enforce the length rule in the build

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

---

### Task 6: Official AWS videos for service questions

**Files:**
- Create: `.superpowers/sourcing/videos-official-<cluster>.json` (scratch, one per cluster)
- Modify: `src/videos.ts` (merged entries), `src/video-assignments.ts` (regenerated)

**Interfaces:**
- Consumes: the batch format and merge script (Task 5), the `Service questions on third-party videos` report section (Task 4), and the `youtube`, `preview-match` and `videos:check` tools.
- Produces: official entries covering the service questions. Ids of service questions with no on-topic official video are recorded in `noOfficial`.

- [ ] **Step 1: List the work per cluster**

Run: `npm run -s videos:assign > .superpowers/video-report.txt; sed -n '/^Service questions on third-party videos/,/^$/p' .superpowers/video-report.txt > .superpowers/service-on-third-party.txt; wc -l .superpowers/service-on-third-party.txt`

Clusters, by question id:

| Cluster | Questions |
|---|---|
| clf-concepts | `cc1`–`cc251` |
| clf-security | `sec1`–`sec309` |
| clf-tech-a | `tech1`–`tech177` |
| clf-tech-b | `tech178`–`tech354` |
| clf-billing | `bill1`–`bill126` |
| aif | every `aif-*` |

- [ ] **Step 2: Dispatch six sourcing subagents in parallel**

Send all six Agent calls in one message (subagent_type `general-purpose`), each with this brief, filled in with its cluster and its lines from `.superpowers/service-on-third-party.txt`:

```text
You are sourcing official AWS YouTube videos for an AWS certification quiz at
/home/jegoh/Documents/repo/awsquiz (branch feat/question-images). Do not edit any file under src/
or scripts/, and do not commit. Write only .superpowers/sourcing/videos-official-<CLUSTER>.json.

Questions (the correct answer names an AWS service, but the question links to a third-party video):
<paste this cluster's lines from .superpowers/service-on-third-party.txt>

For each question, read it in src/questions/ (grep for `id: "<questionId>"`), then:
1. Search the official channel: `npm run -s youtube -- search "<service or feature from the answer> Amazon Web Services" --official`.
   Try 2-3 phrasings: the service name, the feature, "What is <service>".
2. Open https://www.youtube.com/watch?v=<id> and read the description. Titles mislead, so keep only
   videos whose description shows they explain the tested service or feature. Prefer the shorter
   video when two fit equally well, and avoid anything over 10 minutes unless nothing else fits.
3. Get metadata: `npm run -s youtube -- meta <id>`. `official` must be true.
4. Several questions may share one video, up to 3. When a video already in src/videos.ts for the
   same cert fits (grep its id), add keywords to it through "extendKeywords" instead of a new entry.
5. Keywords: lowercase phrases taken from the question stems and correct answers the video should
   win. Include the service name ("amazon s3 glacier deep archive") and 3-8 distinctive phrases.
   Avoid generic words ("data", "service", "aws").
6. Check ranking: `node scripts/preview-match.mts videos <questionId> .superpowers/sourcing/videos-official-<CLUSTER>.json`.
   Your video should rank first. Adjust keywords until it does, without hijacking other questions.
7. If no on-topic official video exists after 3 searches, add the question to "noOfficial" with the
   queries you tried.

Output file shape:
{ "entries": [{ "id", "label", "keywords", "cert", "seconds", "channelId" }],
  "extendKeywords": [{ "id", "cert", "keywords" }],
  "noOfficial": [{ "questionId", "queries" }] }
Labels: the video's title, trimmed, ending in " (AWS)", matching the existing catalog style.
Before finishing, run `npm run -s videos:check -- .superpowers/sourcing/videos-official-<CLUSTER>.json`.
It must report 0 problems. Reply with counts: entries, extended, noOfficial.
```

- [ ] **Step 3: Merge, check, assign**

Run:

```bash
node .superpowers/merge-videos.mts "Official AWS videos for service questions" .superpowers/sourcing/videos-official-*.json
npm run -s build && npm test
npm run -s videos:check
npm run -s videos:assign > .superpowers/video-report.txt; grep -E "^(questions|over 3|Distinct|Service questions|Videos in use that break|Weak|Unmatched)" .superpowers/video-report.txt
```

Expected: build, tests and check pass. `Service questions on third-party videos` is down to the `noOfficial` questions (collect them with `jq -r '.noOfficial[].questionId' .superpowers/sourcing/videos-official-*.json | sort`). Any extra question in that list means a new entry lost the ranking: tune its keywords with `preview-match`, then merge the keyword change as an `extendKeywords` batch.

- [ ] **Step 4: Commit**

```bash
git add src/videos.ts src/video-assignments.ts
git commit -m "content: link service questions to official AWS videos

<counts: entries added, questions switched, noOfficial ids>

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

---

### Task 7: More unique videos and full coverage

**Files:**
- Create: `.superpowers/sourcing/videos-unique-<cluster>.json` (scratch)
- Modify: `src/videos.ts`, `src/video-assignments.ts`

**Interfaces:**
- Consumes: the Task 6 tooling and the current report.
- Produces: a catalog that meets the video targets: 900 or more distinct in use, no video over 3 questions, weak ≤ 1, unmatched 0, 0 videos breaking the rule, and every service question official except the recorded `noOfficial` ones.

- [ ] **Step 1: Measure the gap**

Run: `npm run -s videos:assign > .superpowers/video-report.txt; grep -E "^(questions|over 3|Distinct|Weak|Unmatched)" .superpowers/video-report.txt`

List each cluster's shared questions, meaning every question whose video serves 2 or more questions, grouped by video:

```bash
node -e '
import("./dist/video-assignments.js").then(({ videoAssignments: a }) => {
  const by = {};
  for (const [q, v] of Object.entries(a)) (by[v] ??= []).push(q);
  const shared = Object.entries(by).filter(([, qs]) => qs.length >= 2).sort((x, y) => y[1].length - x[1].length);
  for (const [v, qs] of shared) console.log(qs.length, v, qs.join(" "));
})' > .superpowers/shared-videos.txt; wc -l .superpowers/shared-videos.txt
```

Needed: `900 − <distinct in use>` more distinct videos, plus a video for `aif-fm43` (prompt components), which is unmatched.

- [ ] **Step 2: Dispatch six sourcing subagents in parallel**

Use the same six clusters. Each brief:

```text
You are adding YouTube videos to an AWS certification quiz at /home/jegoh/Documents/repo/awsquiz
(branch feat/question-images) so that fewer questions share one video. Do not edit src/ or scripts/,
and do not commit. Write only .superpowers/sourcing/videos-unique-<CLUSTER>.json.

Shared videos in your cluster (count, video id, questions sharing it):
<paste this cluster's lines from .superpowers/shared-videos.txt>
Target: at least <N> new videos in use for this cluster (share of the gap, proportional to the
cluster's shared questions). <For aif: also find a video for aif-fm43, the components of a prompt.>

Rules:
- For each group, read the questions (grep `id: "<questionId>"` in src/questions/) and find a video
  that fits one or two of them more closely than the shared one. Give each question the most
  specific video you can.
- Service question (a correct option names "Amazon X" or "AWS X"): the video must be from the
  official AWS channel. Search `npm run -s youtube -- search "<topic> Amazon Web Services" --official`.
- Concept question: the video must be 3:00 or shorter, from any channel. Search `npm run -s youtube -- search "<topic> explained" --short`.
  Official AWS videos are also fine at any length, but prefer 10 minutes or less.
- Read each candidate's description at https://www.youtube.com/watch?v=<id>. Titles mislead.
  Skip reuploads, clickbait, videos under 30 seconds with no explanation, and anything that
  presents a retired AWS service as current.
- Metadata: `npm run -s youtube -- meta <id>`.
- Keywords: lowercase phrases from the question stems and correct answers. Check that each
  new video ranks first for its questions with
  `node scripts/preview-match.mts videos <questionId> .superpowers/sourcing/videos-unique-<CLUSTER>.json`.
  It must not become the top match for questions you did not target, except where it fits them better.
- A video id already in src/videos.ts for the same cert is not new. Add keywords to it through
  "extendKeywords" if that helps.
Output shape: { "entries": [...], "extendKeywords": [...], "noOfficial": [] }. Labels are the
trimmed title plus " (AWS)" for official videos.
Before finishing, run `npm run -s videos:check -- .superpowers/sourcing/videos-unique-<CLUSTER>.json`.
It must report 0 problems. Reply with counts.
```

- [ ] **Step 3: Merge, check, assign, iterate**

Run:

```bash
node .superpowers/merge-videos.mts "More specific videos so fewer questions share one" .superpowers/sourcing/videos-unique-*.json
npm run -s build && npm test && npm run -s videos:check
npm run -s videos:assign > .superpowers/video-report.txt; grep -E "^(questions|over 3|Distinct|Service questions|Videos in use that break|Official videos over|Weak|Unmatched)" .superpowers/video-report.txt
```

Targets (all must hold):
- `Distinct videos in use:` **900** or more
- `over 3 questions: 0`
- `Weak matches (≤ 1)` and `Unmatched (0)`
- `Videos in use that break the length rule (0)`
- `Service questions on third-party videos` contains only the recorded `noOfficial` ids
- `Official videos over 10 minutes in use`: each one swapped for a shorter official video, or listed in the commit body with the reason it stays

If a target is missed, run Step 1 again and dispatch agents for the remaining clusters only. Use new batch file names (`videos-unique2-<cluster>.json`) and repeat Step 3.

- [ ] **Step 4: Commit**

```bash
git add src/videos.ts src/video-assignments.ts
git commit -m "content: add videos so no video serves more than 3 questions

<distinct in use, unique count, weak, unmatched; long official videos kept and why>

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

---

### Task 8: Image catalog, resolver and validation, with domain fallbacks

**Files:**
- Create: `src/image-catalog.ts`, `src/images.ts`, `src/image-assignments.ts`, `tests/images.test.mts`
- Modify: `scripts/validate.mts`

**Interfaces:**
- Consumes: `entryScore`, `haystacksFor` (Task 1), `Certification`, `CertificationId`, `certifications`.
- Produces: `ImageEntry { id; url; alt; caption; credit; sourceUrl; keywords; certs: CertificationId[] }`, `imageCatalog`, `domainImageFallback` from `dist/image-catalog.js`. `imageAssignments` from `dist/image-assignments.js`. From `dist/images.js`: `imageCatalogFor(certId)`, `pickImage(question, catalog, assignedId?, fallbackId?)`, `resolveImage(question, certId): ImageEntry`, `imageCatalogProblems(catalog, fallback, assignments, certs): string[]`.

- [ ] **Step 1: Write the failing tests**

Create `tests/images.test.mts`:

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { certifications } from "../dist/certifications.js";
import { imageCatalogProblems, pickImage, resolveImage } from "../dist/images.js";

const img = (id: string, over: object = {}) => ({
  id,
  url: `https://example.com/${id}.png`,
  alt: "alt",
  caption: "caption",
  credit: "credit",
  sourceUrl: "https://example.com/page",
  keywords: [] as string[],
  certs: ["clf-c02"],
  ...over,
});
const question = (text: string) => ({
  id: "q1",
  domain: "security-and-compliance",
  text,
  options: [{ id: "a", text: "An answer" }],
  correctOptionIds: ["a"],
  answerType: "single",
  explanation: "",
});
const catalog = [img("srm", { keywords: ["shared responsibility"] }), img("kms", { keywords: ["kms"] }), img("fallback")];

test("pickImage prefers the assignment, then keywords, then the fallback", () => {
  const q = question("Under the shared responsibility model, who patches the guest OS?");
  assert.equal(pickImage(q, catalog, "kms", "fallback")!.id, "kms");
  assert.equal(pickImage(q, catalog, "gone", "fallback")!.id, "srm");
  assert.equal(pickImage(question("Which pricing model fits?"), catalog, undefined, "fallback")!.id, "fallback");
});

const certsFixture = [{ id: "clf-c02", domains: [{ id: "security-and-compliance" }], questions: [{ id: "q1" }] }];

test("a valid catalog has no problems", () => {
  assert.deepEqual(imageCatalogProblems(catalog, { "security-and-compliance": "fallback" }, { q1: "srm" }, certsFixture), []);
});

test("entry fields are checked", () => {
  const bad = [img("Bad_Id"), img("http", { url: "http://x/y.png", sourceUrl: "ftp://x" }), img("blank", { alt: " ", caption: "", credit: "" }), img("nocert", { certs: [] }), img("srm"), img("srm")];
  const problems = imageCatalogProblems([...bad, img("fallback")], { "security-and-compliance": "fallback" }, {}, certsFixture).join("\n");
  assert.match(problems, /Bad_Id: id must be a kebab-case slug/);
  assert.match(problems, /http: url must start with https:\/\//);
  assert.match(problems, /http: sourceUrl must start with https:\/\//);
  assert.match(problems, /blank: alt is empty/);
  assert.match(problems, /blank: caption is empty/);
  assert.match(problems, /blank: credit is empty/);
  assert.match(problems, /nocert: certs is empty/);
  assert.match(problems, /duplicate image id srm/);
});

test("fallbacks and assignments must exist and list the cert", () => {
  const aifOnly = [img("fallback", { certs: ["aif-c01"] }), img("srm", { certs: ["aif-c01"] })];
  const problems = imageCatalogProblems(aifOnly, { "security-and-compliance": "fallback" }, { q1: "srm" }, certsFixture).join("\n");
  assert.match(problems, /domain security-and-compliance: fallback fallback does not list clf-c02/);
  assert.match(problems, /question q1: assigned image srm does not list clf-c02/);
  const missing = imageCatalogProblems(catalog, {}, { q1: "nope" }, certsFixture).join("\n");
  assert.match(missing, /domain security-and-compliance: no fallback image/);
  assert.match(missing, /question q1: assigned image nope is not in the catalog/);
});

test("every real question resolves to an image of its own cert", () => {
  for (const cert of certifications) {
    for (const q of cert.questions) {
      const image = resolveImage(q, cert.id);
      assert.ok(image && image.certs.includes(cert.id), `${q.id} -> ${image?.id}`);
    }
  }
});
```

- [ ] **Step 2: Run and confirm failure**

Run: `npm test`
Expected: FAIL, `Cannot find module '.../dist/images.js'`.

- [ ] **Step 3: Source the nine domain fallback images**

For each domain, find one image that fits the domain as a whole. Follow the spec's sourcing rules: AWS docs, whitepapers and blogs first, then AWS product pages, then Wikimedia Commons (use the `upload.wikimedia.org/.../thumb/...800px-...png` thumbnail, not the file page). Download each one and view it:

```bash
mkdir -p .superpowers/sourcing/img && curl -sSL -o .superpowers/sourcing/img/<id>.<ext> "<url>" && file .superpowers/sourcing/img/<id>.<ext>
```

Then open the file with the Read tool and confirm it shows what the alt text will say. Check the response the app will get:

```bash
curl -sS -o /dev/null -w "%{http_code} %{content_type} %{size_download}\n" "<url>"
```

It must be `200 image/...` and at most 1,500,000 bytes.

| Domain | Cert | Suggested subject | Suggested id |
|---|---|---|---|
| cloud-concepts | clf-c02 | AWS Global Infrastructure map (Regions and AZs) | `aws-global-infrastructure-map` |
| security-and-compliance | clf-c02, aif-c01 | AWS shared responsibility model diagram | `shared-responsibility-model` |
| cloud-technology-and-services | clf-c02 | Server racks in a data centre (Commons) | `data-centre-server-racks` |
| billing-pricing-and-support | clf-c02 | AWS Cost Explorer or Billing console screenshot (AWS docs) | `cost-explorer-console` |
| ai-ml-fundamentals | aif-c01 | AI > ML > deep learning nesting, or a neural network diagram | `ai-ml-deep-learning` |
| genai-fundamentals | aif-c01 | Transformer architecture diagram | `transformer-architecture` |
| foundation-model-applications | aif-c01 | RAG with Amazon Bedrock Knowledge Bases diagram (AWS docs/blog) | `bedrock-knowledge-base-rag` |
| responsible-ai | aif-c01 | AWS responsible AI dimensions graphic | `responsible-ai-dimensions` |
| ai-security-governance | aif-c01 | Generative AI Security Scoping Matrix | `genai-security-scoping-matrix` |

- [ ] **Step 4: Create `src/image-catalog.ts`**

Use the images from Step 3. The literal below shows the format with the first entry; fill in all nine from what you verified:

```ts
import { CertificationId } from "./certifications.js";

/** One hotlinked image that illustrates a topic. The repo stores only the link and its credit. */
export interface ImageEntry {
  /** Kebab-case slug, unique across the catalog. */
  id: string;
  /** Direct https URL of the image file, loaded from the publisher's server. */
  url: string;
  /** What the image shows, for screen readers. */
  alt: string;
  /** One short line shown under the image. */
  caption: string;
  /** Publisher, plus the licence where one applies, e.g. "Wikimedia Commons, CC BY-SA 4.0". */
  credit: string;
  /** Page the image appears on; the figure links here. */
  sourceUrl: string;
  /** Case-insensitive phrases that indicate a question is about this image's topic. Longer phrases score higher. */
  keywords: string[];
  certs: CertificationId[];
}

export const imageCatalog: ImageEntry[] = [
  {
    id: "shared-responsibility-model",
    url: "<verified image URL>",
    alt: "<what the diagram shows, e.g. AWS responsible for security of the cloud: hardware, global infrastructure; customer responsible for security in the cloud: data, IAM, OS, network configuration>",
    caption: "The AWS shared responsibility model",
    credit: "AWS",
    sourceUrl: "https://aws.amazon.com/compliance/shared-responsibility-model/",
    keywords: ["shared responsibility", "shared responsibility model", "security of the cloud", "security in the cloud", "customer is responsible", "aws is responsible"],
    certs: ["clf-c02", "aif-c01"],
  },
  // ...the other eight from Step 3, in the same shape
];

/** Image used when no keyword matches, keyed by domain id across all certs. */
export const domainImageFallback: Record<string, string> = {
  "cloud-concepts": "aws-global-infrastructure-map",
  "security-and-compliance": "shared-responsibility-model",
  "cloud-technology-and-services": "data-centre-server-racks",
  "billing-pricing-and-support": "cost-explorer-console",
  "ai-ml-fundamentals": "ai-ml-deep-learning",
  "genai-fundamentals": "transformer-architecture",
  "foundation-model-applications": "bedrock-knowledge-base-rag",
  "responsible-ai": "responsible-ai-dimensions",
  "ai-security-governance": "genai-security-scoping-matrix",
};
```

The angle-bracket values above stand for what you verified in Step 3. None may remain in the committed file: `grep -n '<verified\|<what the' src/image-catalog.ts` must print nothing.

- [ ] **Step 5: Create `src/image-assignments.ts` (empty until Task 9 generates it)**

```ts
/**
 * GENERATED by `npm run images:assign` (scripts/assign-images.mts). Do not edit by hand.
 * Maps question id -> image id from the catalog in image-catalog.ts.
 */
export const imageAssignments: Record<string, string> = {
};
```

- [ ] **Step 6: Create `src/images.ts`**

```ts
import { Certification, CertificationId, certifications } from "./certifications.js";
import { imageAssignments } from "./image-assignments.js";
import { ImageEntry, domainImageFallback, imageCatalog } from "./image-catalog.js";
import { entryScore, haystacksFor } from "./matching.js";
import { Question } from "./types.js";

export function imageCatalogFor(certId: CertificationId): ImageEntry[] {
  return imageCatalog.filter((e) => e.certs.includes(certId));
}

/**
 * Picks an image from an explicit catalog, in priority order:
 * 1. the reviewed assignment generated by `scripts/assign-images.mts`;
 * 2. live keyword scoring, for questions added since the assignments were last generated;
 * 3. the domain fallback.
 */
export function pickImage(question: Question, catalog: ImageEntry[], assignedId?: string, fallbackId?: string): ImageEntry | undefined {
  const assigned = catalog.find((e) => e.id === assignedId);
  if (assigned) return assigned;

  const h = haystacksFor(question);
  let best: ImageEntry | undefined;
  let bestScore = 0;
  for (const entry of catalog) {
    const score = entryScore(entry, h);
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }
  return best ?? catalog.find((e) => e.id === fallbackId);
}

export function resolveImage(question: Question, certId: CertificationId): ImageEntry {
  // Validation at module load guarantees every domain's fallback is in its cert's catalog.
  return pickImage(question, imageCatalogFor(certId), imageAssignments[question.id], domainImageFallback[question.domain])!;
}

/**
 * Catalog rules: well-formed entries, a fallback for every domain that lists the domain's cert,
 * and assignments that point at entries listing the question's cert. Returns every problem
 * found, so tests can assert on them.
 */
export function imageCatalogProblems(
  catalog: ImageEntry[],
  fallback: Record<string, string>,
  assignments: Record<string, string>,
  certs: Pick<Certification, "id" | "domains" | "questions">[]
): string[] {
  const problems: string[] = [];
  const byId = new Map<string, ImageEntry>();
  for (const e of catalog) {
    if (byId.has(e.id)) problems.push(`duplicate image id ${e.id}`);
    byId.set(e.id, e);
    if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(e.id)) problems.push(`image ${e.id}: id must be a kebab-case slug`);
    if (!e.url.startsWith("https://")) problems.push(`image ${e.id}: url must start with https://`);
    if (!e.sourceUrl.startsWith("https://")) problems.push(`image ${e.id}: sourceUrl must start with https://`);
    for (const field of ["alt", "caption", "credit"] as const) {
      if (!e[field].trim()) problems.push(`image ${e.id}: ${field} is empty`);
    }
    if (e.certs.length === 0) problems.push(`image ${e.id}: certs is empty`);
  }
  for (const cert of certs) {
    for (const d of cert.domains) {
      const entry = byId.get(fallback[d.id]);
      if (!entry) problems.push(`domain ${d.id}: no fallback image`);
      else if (!entry.certs.includes(cert.id)) problems.push(`domain ${d.id}: fallback ${entry.id} does not list ${cert.id}`);
    }
    for (const q of cert.questions) {
      const id = assignments[q.id];
      if (id === undefined) continue;
      const entry = byId.get(id);
      if (!entry) problems.push(`question ${q.id}: assigned image ${id} is not in the catalog`);
      else if (!entry.certs.includes(cert.id)) problems.push(`question ${q.id}: assigned image ${id} does not list ${cert.id}`);
    }
  }
  return problems;
}

const catalogProblems = imageCatalogProblems(imageCatalog, domainImageFallback, imageAssignments, certifications);
if (catalogProblems.length > 0) throw new Error(`image catalog:\n  ${catalogProblems.join("\n  ")}`);
```

- [ ] **Step 7: Add images to the build check**

In `scripts/validate.mts`, add `await import("../dist/images.js");` after the videos import, and change the log line to `"question bank, video catalog and image catalog are valid"`.

- [ ] **Step 8: Run tests and build**

Run: `npm test && npm run build`
Expected: PASS, and `question bank, video catalog and image catalog are valid`.

- [ ] **Step 9: Commit**

```bash
git add src/image-catalog.ts src/image-assignments.ts src/images.ts tests/images.test.mts scripts/validate.mts
git commit -m "feat: add hotlinked image catalog with resolver, validation and domain fallbacks

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

---

### Task 9: `images:check` and `images:assign`

**Files:**
- Create: `scripts/lib/image-check.mts`, `scripts/check-images.mts`, `scripts/lib/image-config.mts`, `scripts/assign-images.mts`, `tests/image-check.test.mts`
- Modify: `package.json`, `scripts/preview-match.mts` (add images), `src/image-assignments.ts` (generated)

**Interfaces:**
- Consumes: `assignMedia`, `rankCandidates`, `mapLimit`, `imageCatalog`, `imageCatalogFor`.
- Produces: `MAX_IMAGE_BYTES = 1_500_000`, `imageResponseProblem(status, contentType, bytes): string | null`, `checkImageUrl(url): Promise<string | null>`, `imageAssignConfig(extra?)`, and the npm scripts `images:check` and `images:assign`.

- [ ] **Step 1: Write the failing test**

Create `tests/image-check.test.mts`:

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { MAX_IMAGE_BYTES, imageResponseProblem } from "../scripts/lib/image-check.mts";

test("a normal image passes", () => {
  assert.equal(imageResponseProblem(200, "image/png", 120_000), null);
  assert.equal(imageResponseProblem(200, "image/svg+xml", null), null);
});

test("missing files and web pages fail", () => {
  assert.equal(imageResponseProblem(404, "text/html", null), "HTTP 404");
  // A URL that redirects to a web page still returns 200, but it is not an image.
  assert.match(imageResponseProblem(200, "text/html; charset=utf-8", 5_000)!, /not an image/);
  assert.match(imageResponseProblem(200, null, 5_000)!, /content type is missing/);
});

test("oversized images fail", () => {
  assert.equal(MAX_IMAGE_BYTES, 1_500_000);
  assert.match(imageResponseProblem(200, "image/jpeg", 4_200_000)!, /4\.2 MB is over the 1\.5 MB limit/);
});
```

Run: `npm test`
Expected: FAIL, the module does not exist.

- [ ] **Step 2: Create `scripts/lib/image-check.mts`**

```ts
/** Largest image the app should hotlink; bigger files slow the feedback panel on phones. */
export const MAX_IMAGE_BYTES = 1_500_000;

const USER_AGENT = "awsquiz-image-check/1.0 (+https://github.com/jgyy/awsquiz)";

/** What is wrong with an image response, or null when it is usable. */
export function imageResponseProblem(status: number, contentType: string | null, bytes: number | null): string | null {
  if (status !== 200) return `HTTP ${status}`;
  if (!contentType?.toLowerCase().startsWith("image/")) return `content type is ${contentType ?? "missing"}, not an image`;
  if (bytes !== null && bytes > MAX_IMAGE_BYTES) {
    return `${(bytes / 1e6).toFixed(1)} MB is over the ${MAX_IMAGE_BYTES / 1e6} MB limit`;
  }
  return null;
}

/** Fetches an image the way the app does (no Referer, redirects followed) and returns its problem, if any. */
export async function checkImageUrl(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, { headers: { "User-Agent": USER_AGENT }, redirect: "follow" });
    const length = res.headers.get("content-length");
    let bytes = length === null ? null : Number(length);
    if (bytes === null && res.ok) bytes = (await res.arrayBuffer()).byteLength;
    else await res.body?.cancel();
    return imageResponseProblem(res.status, res.headers.get("content-type"), bytes);
  } catch (error) {
    return `request failed: ${(error as Error).message}`;
  }
}
```

Run: `npm test`
Expected: PASS.

- [ ] **Step 3: Create `scripts/check-images.mts`**

```ts
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
```

- [ ] **Step 4: Create `scripts/lib/image-config.mts` and `scripts/assign-images.mts`**

```ts
// scripts/lib/image-config.mts
import path from "node:path";
import { fileURLToPath } from "node:url";
import { imageCatalog, type ImageEntry } from "../../dist/image-catalog.js";
import type { AssignConfig } from "./assign-media.mts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

/** Assignment settings for images; `extra` adds unmerged sourcing entries for previews. */
export function imageAssignConfig(extra: ImageEntry[] = []): AssignConfig<ImageEntry> {
  const catalog = [...imageCatalog, ...extra];
  return {
    catalog,
    catalogFor: (certId) => catalog.filter((e) => e.certs.includes(certId as ImageEntry["certs"][number])),
    label: (e) => e.caption,
    noun: "image",
    maxPerEntry: 6,
    runnerUpRatio: 0.75,
    weakScore: 30,
    answerHitBonus: 1.5,
    outPath: path.join(root, "src", "image-assignments.ts"),
    constName: "imageAssignments",
    header: [
      "GENERATED by `npm run images:assign` (scripts/assign-images.mts). Do not edit by hand.",
      "Maps question id -> image id from the catalog in image-catalog.ts.",
    ],
  };
}
```

```ts
// scripts/assign-images.mts
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
```

In `package.json` `scripts`, add:

```json
    "images:assign": "tsc && node scripts/assign-images.mts && tsc",
    "images:check": "tsc && node scripts/check-images.mts",
```

- [ ] **Step 5: Add images to `scripts/preview-match.mts`**

Add the imports:

```ts
import { imageAssignments } from "../dist/image-assignments.js";
import type { ImageEntry } from "../dist/image-catalog.js";
import { imageAssignConfig } from "./lib/image-config.mts";
```

Add to `kinds`:

```ts
  images: {
    config: imageAssignConfig,
    assigned: imageAssignments,
    describe: (e: ImageEntry) => `${e.id}  ${e.caption}  [${e.certs.join(", ")}]`,
  },
```

Update the usage line in the doc comment to include `images`.

- [ ] **Step 6: Run everything**

Run: `npm run -s images:check`
Expected: `checked 9 images, 0 with problems`.

Run: `npm run -s images:assign | tail -3`
Expected: a `Weak or fallback:` line. The number is high at this point (only 9 images). Confirm that `src/image-assignments.ts` was regenerated in the generated format.

Run: `npm test && npm run build && node scripts/preview-match.mts images sec1`
Expected: PASS, the build succeeds, and the preview lists image candidates.

- [ ] **Step 7: Commit**

```bash
git add scripts/lib/image-check.mts scripts/check-images.mts scripts/lib/image-config.mts scripts/assign-images.mts scripts/preview-match.mts tests/image-check.test.mts package.json src/image-assignments.ts
git commit -m "feat: add images:check and images:assign

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

---

### Task 10: Show the image in the practice feedback panel

**Files:**
- Create: `src/html.ts`, `src/image-figure.ts`, `tests/image-figure.test.mts`
- Modify: `src/main.ts` (lines 45–51 `escapeHtml`, 558–568 `renderFeedbackPanel`, 634–647 wiring), `styles.css`

**Interfaces:**
- Consumes: `resolveImage` (Task 8), `ImageEntry`.
- Produces: `escapeHtml(text)` from `dist/html.js`, and `renderImageFigure(image: ImageEntry): string` from `dist/image-figure.js`.

- [ ] **Step 1: Write the failing test**

Create `tests/image-figure.test.mts`:

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { renderImageFigure } from "../dist/image-figure.js";

const image = {
  id: "srm",
  url: "https://example.com/srm.png?a=1&b=2",
  alt: 'Diagram of "security of" vs "in" the cloud',
  caption: "Shared responsibility <model>",
  credit: "AWS",
  sourceUrl: "https://aws.amazon.com/compliance/shared-responsibility-model/",
  keywords: [],
  certs: ["clf-c02"],
};

test("renders a lazy, no-referrer image linked to its source, with credit", () => {
  const html = renderImageFigure(image);
  assert.match(html, /<figure class="question-image">/);
  assert.match(html, /<a href="https:\/\/aws\.amazon\.com\/compliance\/shared-responsibility-model\/" target="_blank" rel="noopener noreferrer">/);
  assert.match(html, /src="https:\/\/example\.com\/srm\.png\?a=1&amp;b=2"/);
  assert.match(html, /loading="lazy"/);
  assert.match(html, /referrerpolicy="no-referrer"/);
  assert.match(html, /<span class="image-credit">Source: AWS<\/span>/);
});

test("escapes every field", () => {
  const html = renderImageFigure(image);
  assert.match(html, /alt="Diagram of &quot;security of&quot; vs &quot;in&quot; the cloud"/);
  assert.match(html, /Shared responsibility &lt;model&gt;/);
  assert.doesNotMatch(html, /<model>/);
});
```

Run: `npm test`
Expected: FAIL, the module does not exist.

- [ ] **Step 2: Create `src/html.ts` and move `escapeHtml`**

```ts
/** Escapes text for use in HTML element content and in single- or double-quoted attributes. */
export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
```

In `src/main.ts`, delete the local `escapeHtml` (lines 45–51) and add `import { escapeHtml } from "./html.js";` to the imports.

- [ ] **Step 3: Create `src/image-figure.ts`**

```ts
import { escapeHtml } from "./html.js";
import { ImageEntry } from "./image-catalog.js";

/**
 * Markup for a question's hotlinked image. The image links to the page it came from and is
 * credited under it; main.ts removes the whole figure if the image fails to load.
 */
export function renderImageFigure(image: ImageEntry): string {
  return `
    <figure class="question-image">
      <a href="${escapeHtml(image.sourceUrl)}" target="_blank" rel="noopener noreferrer">
        <img src="${escapeHtml(image.url)}" alt="${escapeHtml(image.alt)}" loading="lazy" decoding="async" referrerpolicy="no-referrer" />
      </a>
      <figcaption>${escapeHtml(image.caption)} <span class="image-credit">Source: ${escapeHtml(image.credit)}</span></figcaption>
    </figure>`;
}
```

Run: `npm test`
Expected: PASS.

- [ ] **Step 4: Wire the figure into `src/main.ts`**

Add imports:

```ts
import { renderImageFigure } from "./image-figure.js";
import { resolveImage } from "./images.js";
```

In `renderFeedbackPanel`, insert the figure between the explanation and the extras:

```ts
    <p class="explanation">${escapeHtml(question.explanation)}</p>
    ${renderImageFigure(resolveImage(question, currentCert!.id))}
    ${renderFeedbackExtras(question, question.id)}
```

Add after `wireCopyButtons`:

```ts
/**
 * A hotlinked image can disappear or be blocked by its host; drop the whole figure rather than
 * show a broken-image icon under an orphaned caption. Listeners are attached in the same task
 * that inserted the markup, so no error event can fire before them.
 */
function wireQuestionImages(): void {
  document.querySelectorAll<HTMLImageElement>(".question-image img").forEach((img) => {
    img.addEventListener("error", () => img.closest("figure")?.remove(), { once: true });
  });
}
```

In `renderQuestionScreen`, after `wireDiagramExpand();`, add `wireQuestionImages();`.

- [ ] **Step 5: Style it in `styles.css`**

Add the backdrop token to `:root` (light), after `--video-link-soft`:

```css
  --image-backdrop: #ffffff;
```

and in the dark `:root`, after `--video-link-soft`:

```css
    --image-backdrop: #e4e9e4;
```

Add after the `.diagram-card` rules:

```css
/* ---------- Question image ---------- */

/* Diagrams are often black lines on a transparent background, so every image sits on a light
   backdrop in both themes; the card border and caption keep it inside the dark palette. */
.question-image {
  margin: 0;
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
  background: var(--surface-sunken);
}

.question-image a {
  display: block;
  background: var(--image-backdrop);
  padding: 0.5rem;
}

.question-image img {
  display: block;
  width: 100%;
  height: auto;
  max-height: 320px;
  object-fit: contain;
}

.question-image figcaption {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--muted);
  padding: 0.5rem 0.75rem;
  border-top: 1px solid var(--border);
}

.image-credit {
  display: block;
  margin-top: 0.15rem;
  overflow-wrap: anywhere;
}
```

Next to `body.is-offline .reference-link`, add:

```css
body.is-offline .question-image {
  display: none;
}
```

Inside the existing `@media (max-width: 600px)` block, add:

```css
  .question-image img {
    max-height: 220px;
  }
```

- [ ] **Step 6: Build and test**

Run: `npm test && npm run build`
Expected: PASS.

- [ ] **Step 7: Browser verification**

Start the dev server in the background with `npm run dev`, then use the Playwright MCP browser tools:

1. Navigate to `http://localhost:5173/#/clf-c02`, click "Start Practice", pick an option, and click "Submit Answer". Snapshot: `figure.question-image` is present after the explanation, the image has loaded (`document.querySelector('.question-image img').naturalWidth > 0`), and the caption ends with "Source: …".
2. Offline: evaluate `document.body.classList.add('is-offline')`, then `getComputedStyle(document.querySelector('.question-image')).display` should be `"none"`. Remove the class again.
3. Broken hotlink: evaluate `document.querySelector('.question-image img').src = 'https://example.invalid/missing.png'`, wait a second, and confirm `document.querySelector('.question-image') === null`.
4. Dark mode: emulate `prefers-color-scheme: dark`, submit another answer, and take a screenshot. The diagram must be readable on its light backdrop.
5. Phone width: resize to 390×844, take a screenshot, and confirm `document.documentElement.scrollWidth <= window.innerWidth`.
6. Full exam: start a full exam, answer one question, and end the exam. The results review must contain no `.question-image`.

Stop the dev server.

- [ ] **Step 8: Commit**

```bash
git add src/html.ts src/image-figure.ts src/main.ts styles.css tests/image-figure.test.mts
git commit -m "feat: show a hotlinked image after each practice answer

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

---

### Task 11: Source the image catalog

**Files:**
- Create: `.superpowers/merge-images.mts`, `.superpowers/sourcing/images-<cluster>.json` (scratch)
- Modify: `src/image-catalog.ts`, `src/image-assignments.ts`

**Interfaces:**
- Consumes: `images:check` (with files), `preview-match images`, `images:assign`.
- Produces: roughly 250–300 checked, viewed image entries.

- [ ] **Step 1: Write the merge script**

Create `.superpowers/merge-images.mts`. It regenerates the `imageCatalog` array from the compiled catalog plus the batches. Entries with the same `url` merge their certs and keywords into the first entry. An id collision with a different url gets a numeric suffix.

```ts
// Usage: npm run -s build && node .superpowers/merge-images.mts batch.json [batch.json ...]
import { readFile, writeFile } from "node:fs/promises";
import { imageCatalog } from "../dist/image-catalog.js";

const file = "src/image-catalog.ts";
const byUrl = new Map<string, any>();
const ids = new Set<string>();
const add = (e: any) => {
  const same = byUrl.get(e.url);
  if (same) {
    same.certs = [...new Set([...same.certs, ...e.certs])];
    same.keywords = [...new Set([...same.keywords, ...e.keywords.map((k: string) => k.toLowerCase())])];
    return;
  }
  let id = e.id;
  for (let n = 2; ids.has(id); n++) id = `${e.id}-${n}`;
  ids.add(id);
  byUrl.set(e.url, { ...e, id, keywords: [...new Set(e.keywords.map((k: string) => k.toLowerCase()))] });
};
imageCatalog.forEach(add);
for (const f of process.argv.slice(2)) for (const e of JSON.parse(await readFile(f, "utf8")).entries) add(e);

const q = JSON.stringify;
const list = (items: string[]) => "[" + items.map((k) => q(k)).join(", ") + "]";
const body = [...byUrl.values()]
  .map(
    (e) => `  {
    id: ${q(e.id)},
    url: ${q(e.url)},
    alt: ${q(e.alt)},
    caption: ${q(e.caption)},
    credit: ${q(e.credit)},
    sourceUrl: ${q(e.sourceUrl)},
    keywords: ${list(e.keywords)},
    certs: ${list(e.certs)},
  },`
  )
  .join("\n");
const src = await readFile(file, "utf8");
const start = src.indexOf("export const imageCatalog: ImageEntry[] = [");
const end = src.indexOf("\n];", start);
await writeFile(file, `${src.slice(0, start)}export const imageCatalog: ImageEntry[] = [\n${body}${src.slice(end)}`);
console.log(`catalog now ${byUrl.size} images`);
```

- [ ] **Step 2: Dispatch six image sourcing subagents in parallel**

Use the same clusters as Task 6. Send all six Agent calls in one message (subagent_type `general-purpose`), each with:

```text
You are building part of a hotlinked image catalog for an AWS certification quiz at
/home/jegoh/Documents/repo/awsquiz (branch feat/question-images). After a learner answers a
practice question, the app shows the single most relevant image for that question. Do not edit
src/ or scripts/, and do not commit. Write only .superpowers/sourcing/images-<CLUSTER>.json.

Your questions: <CLUSTER RANGE, e.g. cc1-cc251 in src/questions/clf-c02/cloud-concepts.ts>.
Read them, group them by topic (service, concept, feature), and source about <45 for clf clusters,
60 for aif> images, so that each topic group that a picture can illustrate has one. An image may
serve up to 6 questions.

Where to look, in this order:
1. Diagrams in AWS documentation (docs.aws.amazon.com), whitepapers, Well-Architected pages and
   AWS blogs (aws.amazon.com/blogs). These are the most relevant. Take the direct image URL
   from the page's <img> tag.
2. Images on AWS product and feature pages (aws.amazon.com, d1.awsstatic.com).
3. Wikimedia Commons, for general concepts (data centres, hardware, networking, ML diagrams).
   Use the upload.wikimedia.org 800px PNG/JPEG thumbnail URL, not the File: page, and put the
   licence in credit, e.g. "Wikimedia Commons, CC BY-SA 4.0".

Rules for every image:
- Download it (`curl -sSL -o .superpowers/sourcing/img/<id>.<ext> "<url>"`) and view it with the
  Read tool. Do not add any image you have not looked at. The alt text must describe what you see.
- `curl -sS -o /dev/null -w "%{http_code} %{content_type} %{size_download}\n" "<url>"` must show
  200, an image/* type, and 1,500,000 bytes or less.
- It must be relevant to its questions, and it must not point to a wrong option (for example, no
  CloudWatch dashboard on a question whose answer is CloudTrail).
- No photos where a person's face is the subject, and no non-AWS company logos as the main
  subject. Never picture a retired AWS service as current.
- Nothing is copied into the repo. The .superpowers/sourcing/img/ files are only for viewing.

Entry shape (ImageEntry in src/image-catalog.ts):
{ "id": "kebab-case-slug", "url": "https://...", "alt": "what the image shows",
  "caption": "one short line", "credit": "AWS" | "AWS Documentation" | "AWS Blog" |
  "Wikimedia Commons, <licence>", "sourceUrl": "https://page the image is on",
  "keywords": ["lowercase phrases from the question stems and correct answers"],
  "certs": ["clf-c02"] or ["aif-c01"] or both if the image fits both banks }
Keywords decide which questions the image wins: use the service or feature name plus 3-8
distinctive phrases from your questions, and avoid generic words.

Check ranking for a sample of questions per topic with
`npm run -s build >/dev/null && node scripts/preview-match.mts images <questionId> .superpowers/sourcing/images-<CLUSTER>.json`.
Your image should rank first for the questions it was chosen for.
Output: { "entries": [...] }. Before finishing, run
`npm run -s images:check -- .superpowers/sourcing/images-<CLUSTER>.json`; it must report 0 problems.
Reply with: entries added, topics covered, and question ids you could not find a fitting image for.
```

- [ ] **Step 3: Check, merge, assign**

Run:

```bash
npm run -s images:check -- .superpowers/sourcing/images-*.json
npm run -s build && node .superpowers/merge-images.mts .superpowers/sourcing/images-*.json
npm test && npm run build && npm run -s images:check
npm run -s images:assign > .superpowers/image-report.txt; grep -E "^(questions|over 6|Weak matches|Unmatched|Weak or fallback)" .superpowers/image-report.txt
```

Expected: every check reports 0 problems, the build passes, and the catalog has about 250–300 images. Record `Weak or fallback`.

- [ ] **Step 4: Spot-check relevance**

Pick 20 questions at random across clusters (`shuf -n 20` over the assignment keys). For each, open its assigned image (the downloaded copy in `.superpowers/sourcing/img/`, found by id) and read the question. Any mismatch is fixed in Task 12.

- [ ] **Step 5: Commit**

```bash
git add src/image-catalog.ts src/image-assignments.ts
git commit -m "content: add hotlinked image catalog for both question banks

<catalog size, weak or fallback count>

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

---

### Task 12: Close image gaps and document images

**Files:**
- Create: `.superpowers/sourcing/images-gaps.json` (scratch)
- Modify: `src/image-catalog.ts`, `src/image-assignments.ts`, `README.md`

**Interfaces:**
- Consumes: the Task 11 report and tooling.
- Produces: an image catalog meeting its target of 61 or fewer weak or fallback matches.

- [ ] **Step 1: List the gaps**

Run: `sed -n '/^Weak matches/,/^$/p;/^Unmatched/,/^$/p' .superpowers/image-report.txt`, and also list the spot-check mismatches from Task 11 Step 4.

- [ ] **Step 2: Fill them**

For each gap, either add keywords to an existing image that fits (edit the batch or the catalog entry directly), or source a new image by the Task 11 rules into `.superpowers/sourcing/images-gaps.json`. If there are more than 40 gaps, split them across up to three parallel subagents with the Task 11 brief. Then:

```bash
npm run -s images:check -- .superpowers/sourcing/images-gaps.json
npm run -s build && node .superpowers/merge-images.mts .superpowers/sourcing/images-gaps.json
npm test && npm run build && npm run -s images:check
npm run -s images:assign | grep -E "^(over 6|Weak matches|Unmatched|Weak or fallback)"
```

Expected: `Weak or fallback:` at 61 or fewer. Repeat until it is.

- [ ] **Step 3: Document images in `README.md`**

After the video section, add:

```markdown
## Question images

After each practice answer the app shows one image that illustrates the question: an AWS diagram, a product image, or a Wikimedia Commons picture for general concepts. Images are hotlinked. `src/image-catalog.ts` stores only each image's URL, alt text, caption, credit and source page, and the image loads from the publisher's own server with a link back to that page. Nothing is copied into this repo. Images are hidden offline, and an image that fails to load is removed rather than shown broken.

    npm run images:assign
    npm run images:check
    node scripts/preview-match.mts images <questionId> [batch.json]

`images:assign` matches each question to its most relevant image, the same way videos are matched, and writes `src/image-assignments.ts`. Questions with no match use their domain's fallback image. `images:check` confirms every URL still returns an image of 1.5 MB or less. Run it after editing the catalog and before a release, since hotlinked images can move.
```

Also update the "Offline and PWA" paragraph's second sentence to: `While offline the docs, console, and YouTube links and the question images are hidden and replaced with a short note, since they cannot be loaded anyway.`

- [ ] **Step 4: Commit**

```bash
git add src/image-catalog.ts src/image-assignments.ts README.md
git commit -m "content: close image coverage gaps and document question images

Co-Authored-By: Claude Opus 5.5 (1M context) <noreply@anthropic.com>"
```

---

### Task 13: Final verification and merge to main

**Files:** none new.

- [ ] **Step 1: Full verification**

Run each command and read its output:

```bash
npm test
npm run build
npm run -s videos:check
npm run -s images:check
npm run -s videos:assign > .superpowers/final-video.txt && git diff --exit-code src/video-assignments.ts
npm run -s images:assign > .superpowers/final-image.txt && git diff --exit-code src/image-assignments.ts
grep -E "^(questions|over 3|Distinct|Service questions|Videos in use that break|Official videos over|Weak|Unmatched)" .superpowers/final-video.txt
grep -E "^(questions|over 6|Weak matches|Unmatched|Weak or fallback)" .superpowers/final-image.txt
```

Expected: tests pass. The build passes. Both checks report 0 problems. Both assignment files are unchanged (the committed files are current). The video targets from Task 7 and the image target from Task 12 all hold.

- [ ] **Step 2: Browser check of the finished app**

Repeat Task 10 Step 7, items 1, 4 and 5, on one CLF question and one AIF question. Also confirm the YouTube link under each answer opens a video of 3:00 or less, or an official AWS video.

- [ ] **Step 3: Whole-branch review**

Dispatch one reviewer (subagent_type `pr-review-toolkit:code-reviewer`) on `git diff main...feat/question-images -- ':!src/videos.ts' ':!src/image-catalog.ts' ':!src/*-assignments.ts'`, pointing it at the spec and this plan. Fix any confirmed findings and commit them.

- [ ] **Step 4: Merge to main**

The user asked for finished work to go straight to main:

```bash
git checkout main
git merge --ff-only feat/question-images
git branch -d feat/question-images
git log --oneline -5
```

Do not push. Tell the user that `main` is ahead of `origin/main` and that they can push when ready.
