import { questionBank } from "./questions/index.js";
import { Domain, Mode, Question } from "./types.js";
import {
  sampleFullExam,
  shuffle,
  shuffleQuestionOptions,
  isAnswerCorrect,
  scoreSession,
  DOMAIN_LABELS,
} from "./scoring.js";

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
  startTimer();
  renderQuestionScreen();
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
  renderQuestionScreen();
}

function startTimer(): void {
  if (!session) return;
  session.timerId = window.setInterval(() => {
    if (!session) return;
    session.remainingSeconds -= 1;
    updateTimerDisplay();
    if (session.remainingSeconds <= 0) {
      finishSession();
    }
  }, 1000);
}

function stopTimer(): void {
  if (session?.timerId != null) {
    window.clearInterval(session.timerId);
    session.timerId = null;
  }
}

function updateTimerDisplay(): void {
  if (!session) return;
  const el = document.getElementById("timer");
  if (!el) return;
  const minutes = Math.floor(session.remainingSeconds / 60).toString().padStart(2, "0");
  const seconds = (session.remainingSeconds % 60).toString().padStart(2, "0");
  el.textContent = `${minutes}:${seconds}`;
}

function renderQuestionScreen(): void {
  if (!session) return;
  const question = session.questions[session.currentIndex];
  const isMulti = question.correctOptionIds.length > 1;
  const selected = session.answers[question.id] ?? [];
  const isLast = session.currentIndex === session.questions.length - 1;

  app.innerHTML = `
    <section class="screen">
      <div class="top-bar">
        <span>Question ${session.currentIndex + 1} of ${session.questions.length}</span>
        ${session.mode === "full-exam" ? `<span class="timer" id="timer">--:--</span>` : ""}
      </div>
      <p class="domain-label">${DOMAIN_LABELS[question.domain]}${isMulti ? " — select two" : ""}</p>
      <h2 class="question-text">${question.text}</h2>
      <form id="question-form">
        ${question.options
          .map(
            (opt) => `
          <label class="option">
            <input type="${isMulti ? "checkbox" : "radio"}" name="option" value="${opt.id}"
              ${selected.includes(opt.id) ? "checked" : ""} />
            <span>${opt.text}</span>
          </label>`
          )
          .join("")}
      </form>
      <div id="feedback"></div>
      <div class="nav-buttons">
        ${session.mode === "full-exam" ? `<button class="btn btn-secondary" id="end-exam">End Exam</button>` : ""}
        ${session.mode === "practice" ? `<button class="btn" id="check-answer">Check Answer</button>` : ""}
        <button class="btn" id="next-question">${isLast ? "Submit" : "Next"}</button>
      </div>
    </section>
  `;

  if (session.mode === "full-exam") updateTimerDisplay();

  document.getElementById("question-form")!.addEventListener("change", (event) => {
    recordAnswer(question, event.target as HTMLInputElement);
  });

  if (session.mode === "practice") {
    document.getElementById("check-answer")!.addEventListener("click", () => showFeedback(question));
  }

  document.getElementById("next-question")!.addEventListener("click", goToNextQuestion);

  if (session.mode === "full-exam") {
    document.getElementById("end-exam")!.addEventListener("click", finishSession);
  }
}

function recordAnswer(question: Question, target: HTMLInputElement): void {
  if (!session) return;
  const isMulti = question.correctOptionIds.length > 1;
  const current = session.answers[question.id] ?? [];
  if (isMulti) {
    session.answers[question.id] = target.checked
      ? [...current, target.value]
      : current.filter((id) => id !== target.value);
  } else {
    session.answers[question.id] = [target.value];
  }
}

function showFeedback(question: Question): void {
  if (!session) return;
  const selected = session.answers[question.id] ?? [];
  const correct = isAnswerCorrect(question, selected);
  const feedback = document.getElementById("feedback")!;
  feedback.innerHTML = `
    <p class="${correct ? "feedback-correct" : "feedback-incorrect"}">${correct ? "Correct" : "Incorrect"}</p>
    <p class="explanation">${question.explanation}</p>
  `;
}

function goToNextQuestion(): void {
  if (!session) return;
  if (session.currentIndex < session.questions.length - 1) {
    session.currentIndex += 1;
    renderQuestionScreen();
  } else {
    finishSession();
  }
}

function finishSession(): void {
  if (!session) return;
  stopTimer();
  const result = scoreSession(session.questions, session.answers);
  console.log("Session finished. Results screen arrives in Task 9.", result);
}

renderModeSelection();
