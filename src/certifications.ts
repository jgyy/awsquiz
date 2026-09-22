import { Question } from "./types.js";
import { clfQuestions } from "./questions/clf-c02/index.js";
import { aifQuestions } from "./questions/aif-c01/index.js";
import { displayedOptionCount, isMultiAnswer, requiredCorrectCount } from "./scoring.js";

export type CertificationId = "clf-c02" | "aif-c01";

export interface CertDomain {
  id: string;
  label: string;
  /** Questions drawn from this domain in a full exam. The counts sum to fullExamQuestionCount. */
  fullExamCount: number;
}

/** A long-form YouTube course that covers the whole exam blueprint. */
export interface CertCourse {
  /** YouTube video ID (the `v=` query parameter). Verified live against YouTube's oEmbed endpoint when added. */
  videoId: string;
  title: string;
  author: string;
  /** Running time, e.g. "14 h 18 min". */
  duration: string;
}

export interface Certification {
  id: CertificationId;
  name: string;
  shortName: string;
  examCode: string;
  /** One line shown on the picker card. */
  description: string;
  /** Display order for dropdowns and the results table. */
  domains: CertDomain[];
  fullExamQuestionCount: number;
  fullExamMinutes: number;
  passScaledScore: number;
  questions: Question[];
  /** Longest, most detailed free video courses for this exam, shown on the certification landing page. */
  courses: CertCourse[];
}

export const certifications: Certification[] = [
  {
    id: "clf-c02",
    name: "AWS Certified Cloud Practitioner",
    shortName: "Cloud Practitioner",
    examCode: "CLF-C02",
    description: "Foundational AWS knowledge: cloud concepts, security, core services, and billing.",
    domains: [
      { id: "cloud-concepts", label: "Cloud Concepts", fullExamCount: 16 },
      { id: "security-and-compliance", label: "Security and Compliance", fullExamCount: 20 },
      { id: "cloud-technology-and-services", label: "Cloud Technology and Services", fullExamCount: 22 },
      { id: "billing-pricing-and-support", label: "Billing, Pricing, and Support", fullExamCount: 7 },
    ],
    fullExamQuestionCount: 65,
    fullExamMinutes: 90,
    passScaledScore: 700,
    questions: clfQuestions,
    courses: [
      {
        videoId: "7HKot-brXFE",
        title: "AWS Certified Cloud Practitioner Certification Course 2026 (CLF-C02) - Pass the Exam!",
        author: "freeCodeCamp.org (Andrew Brown)",
        duration: "13 h 46 min",
      },
    ],
  },
  {
    id: "aif-c01",
    name: "AWS Certified AI Practitioner",
    shortName: "AI Practitioner",
    examCode: "AIF-C01",
    description: "AI, machine learning, and generative AI concepts, Amazon Bedrock and SageMaker, responsible AI, and governance.",
    domains: [
      { id: "ai-ml-fundamentals", label: "Fundamentals of AI and ML", fullExamCount: 13 },
      { id: "genai-fundamentals", label: "Fundamentals of Generative AI", fullExamCount: 16 },
      { id: "foundation-model-applications", label: "Applications of Foundation Models", fullExamCount: 18 },
      { id: "responsible-ai", label: "Guidelines for Responsible AI", fullExamCount: 9 },
      { id: "ai-security-governance", label: "Security, Compliance, and Governance for AI Solutions", fullExamCount: 9 },
    ],
    fullExamQuestionCount: 65,
    fullExamMinutes: 90,
    passScaledScore: 700,
    questions: aifQuestions,
    courses: [
      {
        videoId: "WZeZZ8_W-M4",
        title: "AWS Certified AI Practitioner (AIF-C01) - Full Course to PASS the Certification Exam",
        author: "freeCodeCamp.org (Andrew Brown)",
        duration: "14 h 59 min",
      },
    ],
  },
];

export function findCertification(id: string | null | undefined): Certification | undefined {
  return certifications.find((c) => c.id === id);
}

export function allQuestions(): Question[] {
  return certifications.flatMap((c) => c.questions);
}

/**
 * A multi-answer question needs at least 2 correct ids to pick its 2 shown answers from; a
 * single-answer question needs at least 1. The option pool must also be large enough to fill
 * the remaining slots with distractors once the shown correct answers are set aside.
 */
function validateQuestion(q: Question): void {
  const needed = requiredCorrectCount(q);
  if (q.correctOptionIds.length < needed) {
    throw new Error(
      `question ${q.id}: ${isMultiAnswer(q) ? "multi" : "single"}-answer but only ${q.correctOptionIds.length} correct option id(s), needs at least ${needed}`
    );
  }
  if (q.options.length < displayedOptionCount(q)) {
    throw new Error(`question ${q.id}: only ${q.options.length} options, needs at least ${displayedOptionCount(q)}`);
  }
}

/**
 * Fail fast at module load if a cert's blueprint or bank is inconsistent. This runs in the
 * browser on startup and in Node when scripts import the compiled module.
 */
function validate(): void {
  const seen = new Set<string>();
  for (const cert of certifications) {
    const sum = cert.domains.reduce((n, d) => n + d.fullExamCount, 0);
    if (sum !== cert.fullExamQuestionCount) {
      throw new Error(`${cert.id}: domain counts sum to ${sum}, expected ${cert.fullExamQuestionCount}`);
    }
    const domainIds = new Set(cert.domains.map((d) => d.id));
    for (const q of cert.questions) {
      if (!domainIds.has(q.domain)) throw new Error(`${cert.id}: question ${q.id} has unknown domain ${q.domain}`);
      if (seen.has(q.id)) throw new Error(`duplicate question id ${q.id}`);
      seen.add(q.id);
      validateQuestion(q);
    }
    for (const d of cert.domains) {
      const available = cert.questions.filter((q) => q.domain === d.id).length;
      if (available < d.fullExamCount) {
        throw new Error(`${cert.id}: domain ${d.id} has ${available} questions, needs at least ${d.fullExamCount}`);
      }
    }
  }
}

validate();
