import { Certification, certifications, findCertification } from "./certifications.js";

const CERT_STORAGE_KEY = "awsquiz.cert";
/** The certification the learner picked; null while on the picker screen. */
let currentCert: Certification | null = null;
import { icons } from "./icons.js";
import { resolveVideo } from "./videos.js";
import { Domain, Mode, Question, SessionResult, PerQuestionResult } from "./types.js";
import {
  sampleFullExam,
  shuffle,
  sampleQuestionOptions,
  isAnswerCorrect,
  scoreSession,
  scaledScoreFor,
  domainLabel,
} from "./scoring.js";

const OPTION_LETTERS = "ABCDEFGH";
/** Vendored UMD bundle (copied from node_modules at build time) so diagrams render offline. */
const MERMAID_URL = "vendor/mermaid.min.js";

interface Session {
  mode: Mode;
  questions: Question[];
  currentIndex: number;
  answers: Record<string, string[]>;
  timerId: number | null;
  remainingSeconds: number;
  deadlineAt: number | null;
  revealed: boolean;
  answeredSoFar: number;
  correctSoFar: number;
}

let session: Session | null = null;

const app = document.getElementById("app") as HTMLElement;

let diagramCounter = 0;
let pendingDiagrams: { id: string; source: string }[] = [];
let mermaidModulePromise: Promise<any> | null = null;

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function loadMermaid(): Promise<any> {
  if (!mermaidModulePromise) {
    mermaidModulePromise = new Promise<any>((resolve, reject) => {
      const existing = (window as any).mermaid;
      if (existing) {
        resolve(existing);
        return;
      }
      const script = document.createElement("script");
      script.src = MERMAID_URL;
      script.async = true;
      script.onload = () => resolve((window as any).mermaid);
      script.onerror = () => reject(new Error("Failed to load Mermaid"));
      document.head.appendChild(script);
    }).then((mermaid: any) => {
      mermaid.initialize({ startOnLoad: false, theme: "neutral", securityLevel: "strict" });
      return mermaid;
    });
    mermaidModulePromise.catch(() => {
      // Allow a retry on the next render if the script failed to load.
      mermaidModulePromise = null;
    });
  }
  return mermaidModulePromise;
}

/**
 * Tracks connectivity so external links (docs, console, YouTube) can be hidden while offline.
 * navigator.onLine is a hint, not a guarantee, but it is the best signal the browser offers.
 */
function syncOnlineState(): void {
  document.body.classList.toggle("is-offline", !navigator.onLine);
}
window.addEventListener("online", syncOnlineState);
window.addEventListener("offline", syncOnlineState);
syncOnlineState();

// Matches the mobile breakpoint in styles.css.
const narrowViewport = window.matchMedia("(max-width: 600px)");

/**
 * On narrow screens a left-to-right flowchart gets squeezed into an unreadable strip,
 * so rewrite the top-level direction to top-down. Only the first declaration is touched;
 * question sources contain no subgraph `direction` lines.
 */
function orientDiagramSource(source: string): string {
  if (!narrowViewport.matches) return source;
  return source.replace(/^(\s*(?:flowchart|graph)\s+)(LR|RL)\b/, "$1TD");
}

let lastRenderedDiagrams: { id: string; source: string }[] = [];

async function renderMermaidDiagrams(diagrams: { id: string; source: string }[]): Promise<void> {
  if (diagrams.length === 0) return;
  lastRenderedDiagrams = diagrams;
  try {
    const mermaid = await loadMermaid();
    for (const { id, source } of diagrams) {
      const target = document.getElementById(id);
      if (!target) continue;
      try {
        const { svg } = await mermaid.render(`${id}-svg`, orientDiagramSource(source));
        target.innerHTML = svg;
      } catch {
        target.textContent = "Diagram unavailable.";
      }
    }
  } catch {
    for (const { id } of diagrams) {
      const target = document.getElementById(id);
      if (target) target.textContent = "Diagram unavailable.";
    }
  }
}

// Re-render when the viewport crosses the breakpoint (e.g. phone rotation) so orientation stays correct.
narrowViewport.addEventListener("change", () => {
  const stillMounted = lastRenderedDiagrams.filter(({ id }) => document.getElementById(id));
  if (stillMounted.length > 0) void renderMermaidDiagrams(stillMounted);
});

function wireCopyButtons(): void {
  document.querySelectorAll<HTMLButtonElement>(".copy-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.dataset.copyTarget;
      const codeEl = targetId ? document.getElementById(targetId) : null;
      const text = codeEl?.textContent ?? "";
      navigator.clipboard
        ?.writeText(text)
        .then(() => {
          const original = btn.textContent;
          btn.textContent = "Copied!";
          window.setTimeout(() => {
            btn.textContent = original ?? "Copy";
          }, 1500);
        })
        .catch(() => {});
    });
  });
}

function handleDiagramModalKeydown(event: KeyboardEvent): void {
  if (event.key === "Escape") closeDiagramModal();
}

function closeDiagramModal(): void {
  document.getElementById("diagram-modal-overlay")?.remove();
  document.body.classList.remove("modal-open");
  document.removeEventListener("keydown", handleDiagramModalKeydown);
}

function openDiagramModal(svg: SVGSVGElement): void {
  closeDiagramModal();

  const closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.className = "diagram-modal-close";
  closeBtn.setAttribute("aria-label", "Close");
  closeBtn.innerHTML = icons.cross;
  closeBtn.addEventListener("click", closeDiagramModal);

  const body = document.createElement("div");
  body.className = "diagram-modal-body";
  const clone = svg.cloneNode(true) as SVGSVGElement;
  // Mermaid pins an inline max-width; drop it so the diagram scales to the window.
  clone.style.maxWidth = "none";
  clone.style.width = "100%";
  clone.style.height = "100%";
  clone.removeAttribute("width");
  clone.removeAttribute("height");
  clone.setAttribute("preserveAspectRatio", "xMidYMid meet");
  body.appendChild(clone);

  const modal = document.createElement("div");
  modal.className = "diagram-modal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-label", "Expanded diagram");
  modal.appendChild(closeBtn);
  modal.appendChild(body);

  const overlay = document.createElement("div");
  overlay.id = "diagram-modal-overlay";
  overlay.className = "diagram-modal-overlay";
  overlay.appendChild(modal);
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) closeDiagramModal();
  });

  document.body.appendChild(overlay);
  document.body.classList.add("modal-open");
  document.addEventListener("keydown", handleDiagramModalKeydown);
}

function expandDiagram(target: HTMLElement | null): void {
  const svg = target?.querySelector("svg");
  if (!svg) return;
  openDiagramModal(svg);
}

function wireDiagramExpand(): void {
  document.querySelectorAll<HTMLButtonElement>(".diagram-expand-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.dataset.expandTarget;
      expandDiagram(targetId ? document.getElementById(targetId) : null);
    });
  });
  document.querySelectorAll<HTMLElement>(".mermaid-target").forEach((el) => {
    el.addEventListener("click", () => expandDiagram(el));
  });
}

function readStoredCertId(): string | null {
  try {
    return localStorage.getItem(CERT_STORAGE_KEY);
  } catch {
    return null;
  }
}

function storeCertId(id: string): void {
  try {
    localStorage.setItem(CERT_STORAGE_KEY, id);
  } catch {
    /* private mode or blocked storage: the hash still carries the choice */
  }
}

function certIdFromHash(): string | null {
  const match = /^#\/([a-z0-9-]+)$/i.exec(location.hash);
  return match ? match[1].toLowerCase() : null;
}

function selectCert(cert: Certification): void {
  storeCertId(cert.id);
  if (certIdFromHash() !== cert.id) {
    location.hash = `#/${cert.id}`; // triggers route() via hashchange
  } else {
    route();
  }
}

function renderCertPicker(): void {
  session = null;
  currentCert = null;
  document.title = "AWS Certification Exam Simulator";

  app.innerHTML = `
    <section class="screen">
      <h1>AWS Certification Exam Simulator</h1>
      <p class="offline-note">${icons.offline} You are offline. Questions, diagrams, and CLI examples still work; external links are hidden.</p>
      <p class="lede">Choose a certification to practice for.</p>
      <div class="cert-cards">
        ${certifications
          .map(
            (cert) => `
          <button class="card cert-card" type="button" data-cert="${cert.id}">
            <h2>${escapeHtml(cert.name)}</h2>
            <p class="cert-meta">${escapeHtml(cert.examCode)} · ${cert.fullExamQuestionCount} questions · ${cert.fullExamMinutes} min · ${cert.questions.length} in bank</p>
            <p>${escapeHtml(cert.description)}</p>
          </button>`
          )
          .join("")}
      </div>
    </section>
  `;

  document.querySelectorAll<HTMLButtonElement>(".cert-card").forEach((btn) => {
    btn.addEventListener("click", () => {
      const cert = findCertification(btn.dataset.cert);
      if (cert) selectCert(cert);
    });
  });
}

/**
 * Hash router. `#/<cert-id>` shows that cert's mode screen; anything else shows the picker.
 * While a session is running the hash is ignored so the back button cannot discard an exam.
 */
function route(): void {
  if (session) return;
  const cert = findCertification(certIdFromHash());
  if (cert) {
    currentCert = cert;
    storeCertId(cert.id);
    renderModeSelection();
  } else {
    renderCertPicker();
  }
}

function renderModeSelection(): void {
  session = null;
  const cert = currentCert;
  if (!cert) {
    renderCertPicker();
    return;
  }
  if (certIdFromHash() !== cert.id) {
    history.replaceState(null, "", `#/${cert.id}`);
  }
  document.title = `${cert.shortName} Exam Simulator`;
  const domainCounts = cert.domains.map((d) => ({
    value: d.id,
    label: d.label,
    count: cert.questions.filter((q) => q.domain === d.id).length,
  }));

  app.innerHTML = `
    <section class="screen">
      <p class="cert-switch"><a href="#/" class="link-btn" id="change-cert">${icons.arrowLeft} All certifications</a></p>
      <h1>${escapeHtml(cert.name)}</h1>
      <p class="cert-meta">${escapeHtml(cert.examCode)}</p>
      <p class="offline-note">${icons.offline} You are offline. Questions, diagrams, and CLI examples still work; external links are hidden.</p>
      <div class="mode-cards">
        <div class="card">
          <h2>Full Exam Simulation</h2>
          <p>${cert.fullExamQuestionCount} questions, a ${cert.fullExamMinutes} minute timer, and scoring modeled on the real exam.</p>
          <button class="btn" id="start-full-exam" type="button">Start Full Exam</button>
        </div>
        <div class="card">
          <h2>Practice Mode</h2>
          <p>Untimed. Submit each answer to see what's right, what's wrong, and why - with reference links, diagrams, and CLI examples where relevant.</p>
          <label for="practice-domain">Domain</label>
          <select id="practice-domain">
            <option value="all">All domains (${cert.questions.length})</option>
            ${domainCounts
              .map(({ value, label, count }) => `<option value="${value}">${label} (${count})</option>`)
              .join("")}
          </select>
          <button class="btn" id="start-practice" type="button">Start Practice</button>
        </div>
      </div>
    </section>
  `;

  document.getElementById("start-full-exam")!.addEventListener("click", startFullExam);
  document.getElementById("start-practice")!.addEventListener("click", () => {
    const select = document.getElementById("practice-domain") as HTMLSelectElement;
    startPractice(select.value === "all" ? "all" : (select.value as Domain));
  });
  document.getElementById("change-cert")?.addEventListener("click", (e) => {
    e.preventDefault();
    if (location.hash === "#/" || location.hash === "") {
      renderCertPicker();
    } else {
      location.hash = "#/";
    }
  });
}

function startFullExam(): void {
  if (!currentCert) return;
  const seconds = currentCert.fullExamMinutes * 60;
  const questions = sampleFullExam(currentCert).map(sampleQuestionOptions);
  session = {
    mode: "full-exam",
    questions,
    currentIndex: 0,
    answers: {},
    timerId: null,
    remainingSeconds: seconds,
    deadlineAt: Date.now() + seconds * 1000,
    revealed: false,
    answeredSoFar: 0,
    correctSoFar: 0,
  };
  startTimer();
  renderQuestionScreen();
}

function startPractice(domain: Domain | "all"): void {
  if (!currentCert) return;
  const pool = domain === "all" ? currentCert.questions : currentCert.questions.filter((q) => q.domain === domain);
  const questions = shuffle(pool).map(sampleQuestionOptions);
  session = {
    mode: "practice",
    questions,
    currentIndex: 0,
    answers: {},
    timerId: null,
    remainingSeconds: 0,
    deadlineAt: null,
    revealed: false,
    answeredSoFar: 0,
    correctSoFar: 0,
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

/** Live running score for practice mode: raw tally, percentage, and pass/fail at the exam's 700 mark. */
function renderPracticeStats(correct: number, answered: number): string {
  if (answered === 0) {
    return `<span class="practice-stats">0/0 correct</span>`;
  }
  const pct = Math.round((correct / answered) * 100);
  const passing = scaledScoreFor(correct, answered) >= currentCert!.passScaledScore;
  return `<span class="practice-stats">
      ${correct}/${answered} correct | ${pct}%
      <span class="pass-badge ${passing ? "pass" : "fail"}">${passing ? "PASS" : "FAIL"}</span>
    </span>`;
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

function renderOptionRow(question: Question, opt: { id: string; text: string }, letter: string, selected: string[], revealed: boolean): string {
  const isMulti = question.correctOptionIds.length > 1;
  const isChecked = selected.includes(opt.id);
  const isCorrectOption = question.correctOptionIds.includes(opt.id);

  let stateClass = "";
  let icon = "";
  if (revealed) {
    if (isCorrectOption) {
      stateClass = " option-correct";
      icon = `<span class="option-icon">${icons.check}</span>`;
    } else if (isChecked) {
      stateClass = " option-incorrect";
      icon = `<span class="option-icon">${icons.cross}</span>`;
    }
  }

  const rationale = revealed ? question.optionRationale?.[opt.id] : undefined;

  return `
    <label class="option${stateClass}">
      <input type="${isMulti ? "checkbox" : "radio"}" name="option" value="${opt.id}"
        ${isChecked ? "checked" : ""} ${revealed ? "disabled" : ""} />
      <span class="option-body">
        <span class="option-main">
          <span class="option-letter">${letter}</span>
          <span class="option-text">${escapeHtml(opt.text)}</span>
          ${icon}
        </span>
        ${rationale ? `<span class="option-rationale">${escapeHtml(rationale)}</span>` : ""}
      </span>
    </label>`;
}

function renderFeedbackExtras(question: Question, uid: string): string {
  const parts: string[] = [];

  if (question.referenceUrl) {
    parts.push(
      `<a class="reference-link docs-link" href="${escapeHtml(question.referenceUrl)}" target="_blank" rel="noopener noreferrer">${icons.book}<span class="link-kind">Learn more:</span> ${escapeHtml(
        question.referenceLabel ?? "AWS Documentation"
      )}${icons.external}</a>`
    );
  }

  if (question.consoleUrl && question.consoleUrl !== question.referenceUrl) {
    parts.push(
      `<a class="reference-link console-link" href="${escapeHtml(question.consoleUrl)}" target="_blank" rel="noopener noreferrer">${icons.terminal}<span class="link-kind">Open in AWS Console:</span> ${escapeHtml(
        question.consoleLabel ?? "AWS Management Console"
      )}${icons.external}</a>`
    );
  }

  const video = resolveVideo(question, currentCert!.id);
  parts.push(
    `<span class="offline-hint">${icons.offline} Reference links hidden while offline</span>`
  );
  parts.push(
    `<a class="reference-link video-link" href="${escapeHtml(video.url)}" target="_blank" rel="noopener noreferrer">${icons.play}<span class="link-kind">Watch on YouTube:</span> ${escapeHtml(
      video.label
    )}${icons.external}</a>`
  );

  if (question.cliExample) {
    const cliId = `cli-${uid}`;
    const outId = `cli-out-${uid}`;
    const output = question.cliExample.sampleOutput
      ? `
        <pre class="cli-output" id="${outId}"><code>${escapeHtml(question.cliExample.sampleOutput)}</code></pre>`
      : "";
    parts.push(`
      <div class="cli-card">
        <div class="cli-card-header">
          <span>${escapeHtml(question.cliExample.description)}</span>
          <button type="button" class="copy-btn" data-copy-target="${cliId}">Copy</button>
        </div>
        <pre class="cli-command" id="${cliId}"><code>${escapeHtml(question.cliExample.command)}</code></pre>${output}
      </div>`);
  }

  if (question.diagram) {
    const diagramId = `diagram-${uid}-${diagramCounter++}`;
    pendingDiagrams.push({ id: diagramId, source: question.diagram });
    parts.push(`
      <div class="diagram-card">
        <div class="diagram-card-header">
          <p class="diagram-caption">Diagram</p>
          <button type="button" class="diagram-expand-btn" data-expand-target="${diagramId}">Expand</button>
        </div>
        <div class="mermaid-target" id="${diagramId}" title="Click to expand">Rendering diagram...</div>
      </div>`);
  }

  return parts.join("");
}

function renderFeedbackPanel(question: Question, selected: string[]): string {
  const correct = isAnswerCorrect(question, selected);
  return `
    <div class="feedback-banner ${correct ? "feedback-correct" : "feedback-incorrect"}">
      <span class="feedback-icon" aria-hidden="true">${correct ? icons.check : icons.cross}</span>
      <span>${correct ? "Correct" : "Not quite"}</span>
    </div>
    <p class="explanation">${escapeHtml(question.explanation)}</p>
    ${renderFeedbackExtras(question, question.id)}
  `;
}

function renderQuestionScreen(): void {
  if (!session) return;
  pendingDiagrams = [];

  const question = session.questions[session.currentIndex];
  const isMulti = question.correctOptionIds.length > 1;
  const selected = session.answers[question.id] ?? [];
  const isLast = session.currentIndex === session.questions.length - 1;
  const revealed = session.mode === "practice" && session.revealed;
  const progressPct = Math.round((session.currentIndex / session.questions.length) * 100);

  const nextLabel = session.mode === "full-exam" ? (isLast ? "Submit Exam" : "Next Question") : isLast ? "Finish Practice" : "Next Question";

  app.innerHTML = `
    <section class="screen quiz-screen">
      <header class="app-bar">
        ${session.mode === "practice" ? `<button class="link-btn" id="exit-session" type="button">${icons.arrowLeft} Exit</button>` : `<span></span>`}
        <span class="progress-text">Question ${session.currentIndex + 1} of ${session.questions.length}</span>
        ${
          session.mode === "full-exam"
            ? `<span class="timer" id="timer">--:--</span>`
            : renderPracticeStats(session.correctSoFar, session.answeredSoFar)
        }
      </header>
      <div class="progress-track" aria-hidden="true"><div class="progress-fill" style="width: ${progressPct}%"></div></div>

      <p class="domain-label">
        <span class="domain-pill">${domainLabel(currentCert!, question.domain)}</span>
        ${isMulti ? `<span class="multi-hint">Select two</span>` : ""}
      </p>
      <h2 class="question-text">${escapeHtml(question.text)}</h2>

      <form id="question-form" class="options-list">
        ${question.options.map((opt, i) => renderOptionRow(question, opt, OPTION_LETTERS[i], selected, revealed)).join("")}
      </form>

      <div id="feedback">${revealed ? renderFeedbackPanel(question, selected) : ""}</div>

      <div class="nav-buttons">
        ${session.mode === "full-exam" ? `<button class="btn btn-secondary" id="end-exam" type="button">End Exam</button>` : ""}
        ${
          session.mode === "practice" && !revealed
            ? `<button class="btn" id="submit-answer" type="button" ${selected.length === 0 ? "disabled" : ""}>Submit Answer</button>`
            : ""
        }
        ${session.mode === "full-exam" || revealed ? `<button class="btn" id="next-question" type="button">${nextLabel}</button>` : ""}
      </div>
    </section>
  `;

  if (session.mode === "full-exam") updateTimerDisplay();

  document.getElementById("question-form")!.addEventListener("change", (event) => {
    recordAnswer(question, event.target as HTMLInputElement);
    const submitBtn = document.getElementById("submit-answer") as HTMLButtonElement | null;
    if (submitBtn) {
      submitBtn.disabled = (session!.answers[question.id] ?? []).length === 0;
    }
  });

  document.getElementById("exit-session")?.addEventListener("click", () => {
    if (window.confirm("Exit practice mode? Your progress on this session will be discarded.")) {
      stopTimer();
      renderModeSelection();
    }
  });

  document.getElementById("submit-answer")?.addEventListener("click", () => submitAnswer(question));
  document.getElementById("next-question")?.addEventListener("click", goToNextQuestion);
  document.getElementById("end-exam")?.addEventListener("click", () => {
    if (window.confirm("End the exam now and submit for scoring?")) {
      finishSession();
    }
  });

  wireCopyButtons();
  wireDiagramExpand();
  if (revealed) void renderMermaidDiagrams(pendingDiagrams);
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

function submitAnswer(question: Question): void {
  if (!session) return;
  const selected = session.answers[question.id] ?? [];
  if (selected.length === 0) return;
  session.revealed = true;
  session.answeredSoFar += 1;
  if (isAnswerCorrect(question, selected)) session.correctSoFar += 1;
  renderQuestionScreen();
}

function goToNextQuestion(): void {
  if (!session) return;
  session.revealed = false;
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
  const result = scoreSession(currentCert!, session.questions, session.answers);
  renderResultsScreen(result);
}

function renderReviewItem(pq: PerQuestionResult, index: number): string {
  const { question } = pq;
  const uid = `review-${question.id}`;
  return `
    <details class="review-item ${pq.isCorrect ? "review-correct" : "review-incorrect"}" ${pq.isCorrect ? "" : "open"}>
      <summary class="review-summary">
        <span class="review-icon" aria-hidden="true">${pq.isCorrect ? icons.check : icons.cross}</span>
        <span class="review-question">${index + 1}. ${escapeHtml(question.text)}</span>
      </summary>
      <div class="review-body">
        <p>Your answer: ${describeOptions(question, pq.selectedOptionIds)}</p>
        <p>Correct answer: ${describeOptions(question, question.correctOptionIds)}</p>
        <p class="explanation">${escapeHtml(question.explanation)}</p>
        ${renderFeedbackExtras(question, uid)}
      </div>
    </details>`;
}

function renderResultsScreen(result: SessionResult): void {
  session = null;
  pendingDiagrams = [];

  app.innerHTML = `
    <section class="screen results-screen">
      <h1>Results</h1>
      <p class="scaled-score">${result.scaledScore} / 1000</p>
      <p class="pass-fail ${result.passed ? "pass" : "fail"}">
        ${result.passed ? "Passed" : "Not passed"} - approximate score, not AWS's official scoring algorithm
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
              <td>${domainLabel(currentCert!, entry.domain)}</td>
              <td>${entry.correct} / ${entry.total}</td>
              <td>${Math.round((entry.correct / entry.total) * 100)}%</td>
            </tr>`
            )
            .join("")}
        </tbody>
      </table>
      <h2>Review</h2>
      <div class="review-list">
        ${result.perQuestion.map((pq, i) => renderReviewItem(pq, i)).join("")}
      </div>
      <div class="nav-buttons">
        <button class="btn" id="back-to-menu" type="button">Back to Menu</button>
      </div>
    </section>
  `;

  document.getElementById("back-to-menu")!.addEventListener("click", renderModeSelection);
  wireCopyButtons();
  wireDiagramExpand();
  void renderMermaidDiagrams(pendingDiagrams);
}

function describeOptions(question: Question, ids: string[]): string {
  if (ids.length === 0) return "(no answer)";
  return question.options
    .filter((opt) => ids.includes(opt.id))
    .map((opt) => escapeHtml(opt.text))
    .join(", ");
}

window.addEventListener("hashchange", route);

if (location.hash === "" || location.hash === "#") {
  const remembered = findCertification(readStoredCertId());
  if (remembered) {
    history.replaceState(null, "", `#/${remembered.id}`);
  }
}
route();
