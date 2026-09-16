export type Domain =
  | "cloud-concepts"
  | "security-and-compliance"
  | "cloud-technology-and-services"
  | "billing-pricing-and-support";

export interface Option {
  id: string;
  text: string;
}

export interface CliExample {
  description: string;
  command: string;
}

export interface Question {
  id: string;
  domain: Domain;
  text: string;
  options: Option[];
  correctOptionIds: string[];
  explanation: string;
  /** Per-option explanation, keyed by Option.id, covering why each option is right or wrong. */
  optionRationale?: Record<string, string>;
  referenceUrl?: string;
  referenceLabel?: string;
  /** Mermaid diagram definition, rendered only when present. */
  diagram?: string;
  cliExample?: CliExample;
}

export type Mode = "full-exam" | "practice";

export interface DomainBreakdownEntry {
  domain: Domain;
  correct: number;
  total: number;
}

export interface PerQuestionResult {
  question: Question;
  selectedOptionIds: string[];
  isCorrect: boolean;
}

export interface SessionResult {
  correctCount: number;
  totalCount: number;
  scaledScore: number;
  passed: boolean;
  domainBreakdown: DomainBreakdownEntry[];
  perQuestion: PerQuestionResult[];
}
