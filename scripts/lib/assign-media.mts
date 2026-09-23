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
