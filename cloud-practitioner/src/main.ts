import { questionBank } from "./questions/index.js";
import { Domain, Mode, Question } from "./types.js";
import { sampleFullExam, shuffle, shuffleQuestionOptions, DOMAIN_LABELS } from "./scoring.js";

export const FULL_EXAM_SECONDS = 90 * 60;

export interface Session {
  mode: Mode;
  questions: Question[];
  currentIndex: number;
  answers: Record<string, string[]>;
  timerId: number | null;
  remainingSeconds: number;
}

export let session: Session | null = null;

const app = document.getElementById("app") as HTMLElement;

function renderModeSelection(): void {
  session = null;
  app.innerHTML = `
    <section class="screen">
      <h1>AWS Cloud Practitioner Exam Simulator</h1>
      <div class="mode-cards">
        <div class="card">
          <h2>Full Exam Simulation</h2>
          <p>65 questions, a 90 minute timer, and scoring modeled on the real exam.</p>
          <button class="btn" id="start-full-exam">Start Full Exam</button>
        </div>
        <div class="card">
          <h2>Practice Mode</h2>
          <p>Untimed, with feedback and an explanation shown after each question.</p>
          <label for="practice-domain">Domain</label>
          <select id="practice-domain">
            <option value="all">All domains</option>
            ${(Object.entries(DOMAIN_LABELS) as [Domain, string][])
              .map(([value, label]) => `<option value="${value}">${label}</option>`)
              .join("")}
          </select>
          <button class="btn" id="start-practice">Start Practice</button>
        </div>
      </div>
    </section>
  `;

  document.getElementById("start-full-exam")!.addEventListener("click", startFullExam);
  document.getElementById("start-practice")!.addEventListener("click", () => {
    const select = document.getElementById("practice-domain") as HTMLSelectElement;
    startPractice(select.value === "all" ? "all" : (select.value as Domain));
  });
}

function startFullExam(): void {
  const questions = sampleFullExam(questionBank).map(shuffleQuestionOptions);
  session = {
    mode: "full-exam",
    questions,
    currentIndex: 0,
    answers: {},
    timerId: null,
    remainingSeconds: FULL_EXAM_SECONDS,
  };
  console.log("Full exam session started with", questions.length, "questions. Question screen arrives in Task 8.");
}

function startPractice(domain: Domain | "all"): void {
  const pool = domain === "all" ? questionBank : questionBank.filter((q) => q.domain === domain);
  const questions = shuffle(pool).map(shuffleQuestionOptions);
  session = {
    mode: "practice",
    questions,
    currentIndex: 0,
    answers: {},
    timerId: null,
    remainingSeconds: 0,
  };
  console.log("Practice session started with", questions.length, "questions. Question screen arrives in Task 8.");
}

renderModeSelection();
