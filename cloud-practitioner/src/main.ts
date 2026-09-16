import { questionBank } from "./questions/index.js";
import { Domain, Mode, Question, SessionResult } from "./types.js";
import {
  sampleFullExam,
  shuffle,
  shuffleQuestionOptions,
  isAnswerCorrect,
  scoreSession,
  DOMAIN_LABELS,
} from "./scoring.js";

const FULL_EXAM_SECONDS = 90 * 60;

interface Session {
  mode: Mode;
  questions: Question[];
  currentIndex: number;
  answers: Record<string, string[]>;
  timerId: number | null;
  remainingSeconds: number;
  deadlineAt: number | null;
}

let session: Session | null = null;

const app = document.getElementById("app") as HTMLElement;

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

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
    deadlineAt: Date.now() + FULL_EXAM_SECONDS * 1000,
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
    deadlineAt: null,
  };
  renderQuestionScreen();
}

function startTimer(): void {
  if (!session) return;
  session.timerId = window.setInterval(() => {
    if (!session) return;
    const remaining = Math.max(0, Math.ceil(((session.deadlineAt ?? Date.now()) - Date.now()) / 1000));
    session.remainingSeconds = remaining;
    updateTimerDisplay();
    if (remaining <= 0) {
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
      <h2 class="question-text">${escapeHtml(question.text)}</h2>
      <form id="question-form">
        ${question.options
          .map(
            (opt) => `
          <label class="option">
            <input type="${isMulti ? "checkbox" : "radio"}" name="option" value="${opt.id}"
              ${selected.includes(opt.id) ? "checked" : ""} />
            <span>${escapeHtml(opt.text)}</span>
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
    <p class="explanation">${escapeHtml(question.explanation)}</p>
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
  renderResultsScreen(result);
}

function renderResultsScreen(result: SessionResult): void {
  app.innerHTML = `
    <section class="screen">
      <h1>Results</h1>
      <p class="scaled-score">${result.scaledScore} / 1000</p>
      <p class="pass-fail ${result.passed ? "pass" : "fail"}">
        ${result.passed ? "Passed" : "Not passed"} — approximate score, not AWS's official scoring algorithm
      </p>
      <table class="domain-breakdown">
        <thead>
          <tr><th>Domain</th><th>Correct</th><th>%</th></tr>
        </thead>
        <tbody>
          ${result.domainBreakdown
            .map(
              (entry) => `
            <tr>
              <td>${DOMAIN_LABELS[entry.domain]}</td>
              <td>${entry.correct} / ${entry.total}</td>
              <td>${Math.round((entry.correct / entry.total) * 100)}%</td>
            </tr>`
            )
            .join("")}
        </tbody>
      </table>
      <h2>Review</h2>
      <div class="review-list">
        ${result.perQuestion
          .map(
            (pq, i) => `
          <div class="review-item ${pq.isCorrect ? "review-correct" : "review-incorrect"}">
            <p class="review-question">${i + 1}. ${escapeHtml(pq.question.text)}</p>
            <p>Your answer: ${describeOptions(pq.question, pq.selectedOptionIds)}</p>
            <p>Correct answer: ${describeOptions(pq.question, pq.question.correctOptionIds)}</p>
            <p class="explanation">${escapeHtml(pq.question.explanation)}</p>
          </div>`
          )
          .join("")}
      </div>
      <div class="nav-buttons">
        <button class="btn" id="back-to-menu">Back to Menu</button>
      </div>
    </section>
  `;

  document.getElementById("back-to-menu")!.addEventListener("click", renderModeSelection);
}

function describeOptions(question: Question, ids: string[]): string {
  if (ids.length === 0) return "(no answer)";
  return question.options
    .filter((opt) => ids.includes(opt.id))
    .map((opt) => escapeHtml(opt.text))
    .join(", ");
}

renderModeSelection();
