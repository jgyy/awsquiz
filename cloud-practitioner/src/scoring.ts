import { Domain, DomainBreakdownEntry, Question, SessionResult } from "./types.js";

export const DOMAIN_LABELS: Record<Domain, string> = {
  "cloud-concepts": "Cloud Concepts",
  "security-and-compliance": "Security and Compliance",
  "cloud-technology-and-services": "Cloud Technology and Services",
  "billing-pricing-and-support": "Billing, Pricing, and Support",
};

export const FULL_EXAM_DOMAIN_COUNTS: Record<Domain, number> = {
  "cloud-concepts": 16,
  "security-and-compliance": 20,
  "cloud-technology-and-services": 22,
  "billing-pricing-and-support": 7,
};

const DOMAIN_ORDER: Domain[] = [
  "cloud-concepts",
  "security-and-compliance",
  "cloud-technology-and-services",
  "billing-pricing-and-support",
];

export function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function sampleFullExam(pool: Question[]): Question[] {
  const byDomain = (domain: Domain) => pool.filter((q) => q.domain === domain);
  const picked = DOMAIN_ORDER.flatMap((domain) =>
    shuffle(byDomain(domain)).slice(0, FULL_EXAM_DOMAIN_COUNTS[domain])
  );
  return shuffle(picked);
}

export function shuffleQuestionOptions(question: Question): Question {
  return { ...question, options: shuffle(question.options) };
}

export function isAnswerCorrect(question: Question, selectedOptionIds: string[]): boolean {
  if (selectedOptionIds.length !== question.correctOptionIds.length) return false;
  const correctSet = new Set(question.correctOptionIds);
  return selectedOptionIds.every((id) => correctSet.has(id));
}

export function scoreSession(
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
  const scaledScore =
    totalCount === 0 ? 100 : Math.round((correctCount / totalCount) * 900) + 100;
  const passed = scaledScore >= 700;

  const domainBreakdown: DomainBreakdownEntry[] = DOMAIN_ORDER.map((domain) => {
    const inDomain = perQuestion.filter((pq) => pq.question.domain === domain);
    return {
      domain,
      correct: inDomain.filter((pq) => pq.isCorrect).length,
      total: inDomain.length,
    };
  }).filter((entry) => entry.total > 0);

  return { correctCount, totalCount, scaledScore, passed, domainBreakdown, perQuestion };
}
