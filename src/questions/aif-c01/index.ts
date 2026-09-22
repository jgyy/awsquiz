import { Question } from "../../types.js";
import { aiMlFundamentalsQuestions } from "./ai-ml-fundamentals.js";
import { genaiFundamentalsQuestions } from "./genai-fundamentals.js";

export const aifQuestions: Question[] = [
  ...aiMlFundamentalsQuestions,
  ...genaiFundamentalsQuestions,
];
