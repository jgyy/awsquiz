export type Domain =
  | "cloud-concepts"
  | "security-and-compliance"
  | "cloud-technology-and-services"
  | "billing-pricing-and-support";

export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  domain: Domain;
  text: string;
  options: Option[];
  correctOptionIds: string[];
  explanation: string;
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
