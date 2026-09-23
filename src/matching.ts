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

/** A capitalised name straight after "Amazon" or "AWS", as in "Amazon S3" or "AWS Shield". */
const AWS_SERVICE_NAME = /\b(?:Amazon|AWS)\s+[A-Z]/;

/** True when a correct option names an AWS service or feature. */
export function namesAwsService(question: Question): boolean {
  return question.options.some((o) => question.correctOptionIds.includes(o.id) && AWS_SERVICE_NAME.test(o.text));
}
