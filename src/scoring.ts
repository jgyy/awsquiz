import { Certification } from "./certifications.js";
import { DomainBreakdownEntry, Question, SessionResult } from "./types.js";

export function domainLabel(cert: Certification, domainId: string): string {
  return cert.domains.find((d) => d.id === domainId)?.label ?? domainId;
}

export function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function sampleFullExam(cert: Certification): Question[] {
  const picked = cert.domains.flatMap((domain) =>
    shuffle(cert.questions.filter((q) => q.domain === domain.id)).slice(0, domain.fullExamCount)
  );
  return shuffle(picked);
}

/** Whether a question takes one selection or two ("Select TWO"). */
export function isMultiAnswer(question: Question): boolean {
  return question.answerType === "multi";
}

/**
 * Smallest correct-answer pool a question may store: twice what's shown (2 for single-answer,
 * 4 for "Select TWO"), so repeat attempts rotate which correct answer(s) appear.
 */
export function minCorrectPoolSize(question: Question): number {
  return requiredCorrectCount(question) * 2;
}

/** Smallest distractor pool a question may store, so the 3 shown wrong answers also rotate. */
export const MIN_DISTRACTOR_POOL = 6;

/** Number of correct options shown per question: 1 for single-answer, 2 for "Select TWO". */
export function requiredCorrectCount(question: Question): number {
  return isMultiAnswer(question) ? 2 : 1;
}

/** Number of options shown per question: 4 for single-answer, 5 for "Select TWO". */
export function displayedOptionCount(question: Question): number {
  return isMultiAnswer(question) ? 5 : 4;
}

/**
 * Each question stores a pool of options: a correct pool larger than what's ever shown at once
 * (see minCorrectPoolSize) plus at least MIN_DISTRACTOR_POOL distractors. Every time it's
 * shown: pick a random subset of the correct pool sized to requiredCorrectCount, draw a random
 * subset of the distractors to fill the rest of the displayed count, and shuffle the result.
 * Unpicked correct-pool members are left out of this render entirely — never shown marked as
 * wrong. correctOptionIds on the returned question is trimmed to just the picked subset, so
 * scoring and review naturally operate on what was actually shown.
 */
export function sampleQuestionOptions(question: Question): Question {
  const correctPool = shuffle(question.options.filter((opt) => question.correctOptionIds.includes(opt.id)));
  const distractors = shuffle(question.options.filter((opt) => !question.correctOptionIds.includes(opt.id)));
  const correct = correctPool.slice(0, requiredCorrectCount(question));
  const wanted = Math.max(displayedOptionCount(question) - correct.length, 0);
  return {
    ...question,
    options: shuffle([...correct, ...distractors.slice(0, wanted)]),
    correctOptionIds: correct.map((opt) => opt.id),
  };
}

export function isAnswerCorrect(question: Question, selectedOptionIds: string[]): boolean {
  const selectedSet = new Set(selectedOptionIds);
  const correctSet = new Set(question.correctOptionIds);
  if (selectedSet.size !== correctSet.size) return false;
  return [...selectedSet].every((id) => correctSet.has(id));
}

/** AWS-style scaled score: 100 + (fraction correct x 900). Pass mark is 700. */
export function scaledScoreFor(correct: number, total: number): number {
  return total === 0 ? 100 : Math.round((correct / total) * 900) + 100;
}

export function scoreSession(
  cert: Certification,
  questions: Question[],
  answers: Record<string, string[]>
): SessionResult {
  const perQuestion = questions.map((question) => {
    const selectedOptionIds = answers[question.id] ?? [];
    return {
      question,
      selectedOptionIds,
      isCorrect: isAnswerCorrect(question, selectedOptionIds),
    };
  });

  const correctCount = perQuestion.filter((pq) => pq.isCorrect).length;
  const totalCount = questions.length;
  const scaledScore = scaledScoreFor(correctCount, totalCount);
  const passed = scaledScore >= cert.passScaledScore;

  const domainBreakdown: DomainBreakdownEntry[] = cert.domains
    .map((domain) => {
      const inDomain = perQuestion.filter((pq) => pq.question.domain === domain.id);
      return {
        domain: domain.id,
        correct: inDomain.filter((pq) => pq.isCorrect).length,
        total: inDomain.length,
      };
    })
    .filter((entry) => entry.total > 0);

  return { correctCount, totalCount, scaledScore, passed, domainBreakdown, perQuestion };
}
