import { Question } from "./types.js";
import { clfQuestions } from "./questions/clf-c02/index.js";
import { aifQuestions } from "./questions/aif-c01/index.js";

export type CertificationId = "clf-c02" | "aif-c01";

export interface CertDomain {
  id: string;
  label: string;
  /** Questions drawn from this domain in a full exam. The counts sum to fullExamQuestionCount. */
  fullExamCount: number;
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
    fullExamMinutes: 120,
    passScaledScore: 700,
    questions: aifQuestions,
  },
];

export function findCertification(id: string | null | undefined): Certification | undefined {
  return certifications.find((c) => c.id === id);
}

export function allQuestions(): Question[] {
  return certifications.flatMap((c) => c.questions);
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
