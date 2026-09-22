# Multi-Certification Support Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let the simulator host Cloud Practitioner (CLF-C02) and AI Practitioner (AIF-C01) behind a certification picker, with each cert's own domains, blueprint, timer, and question bank.

**Architecture:** A `Certification` descriptor in `src/certifications.ts` carries every cert-specific value (domains, per-domain exam counts, minutes, pass mark, questions). `scoring.ts`, `videos.ts`, and `main.ts` read from the descriptor instead of module constants. Questions move into per-cert folders under `src/questions/`. A hash router (`#/<cert-id>`) plus a `localStorage` key selects the active cert.

**Tech Stack:** Plain TypeScript compiled by `tsc` to ES modules, no framework, no bundler, no test framework. Verification is `npm run build`, a startup assertion in `certifications.ts`, and a Node import smoke check.

**Spec:** `docs/superpowers/specs/2026-09-22-multi-certification-design.md`

## Global Constraints

- No new runtime or dev dependencies. `package.json` devDependencies stay `mermaid` and `typescript` only.
- `Question` interface is unchanged except `domain: string`. Existing CLF question content is moved, never edited.
- Question ids are globally unique. AIF ids use prefixes `aif-ml`, `aif-gen`, `aif-fm`, `aif-ra`, `aif-sec` followed by a number starting at 1.
- Cert ids are exactly `clf-c02` and `aif-c01`. Pass mark is 700 for both. Both full exams are 65 questions. CLF is 90 minutes, AIF is 120 minutes.
- Per-domain full-exam counts: CLF 16/20/22/7; AIF 13/16/18/9/9 in the domain order given in Task 1.
- User-facing name of the app is "AWS Certification Exam Simulator". Apple short name stays "AWS Quiz".
- `localStorage` key is `awsquiz.cert`. Hash routes are `#/` (picker) and `#/<cert-id>`.
- Every AIF question has an option pool of 5 to 8 options, `optionRationale` for every option, an `explanation`, and a `referenceUrl` to a docs.aws.amazon.com or aws.amazon.com page. Roughly 15% (3 or 4 per domain file) are two-answer questions.
- Every commit message ends with `Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>`.
- Build command for verification everywhere: `npm run build`. It runs `tsc`, vendors Mermaid, and regenerates `sw.js`. `sw.js` and `vendor/` are gitignored build outputs.

---

## File structure

| File | Responsibility |
|---|---|
| `src/types.ts` | `Domain` becomes `string`. Nothing else changes. |
| `src/certifications.ts` (new) | `Certification`, `CertDomain`, `CertificationId` types; `certifications` array; `findCertification`; startup validation. |
| `src/questions/clf-c02/*.ts` (moved) | Existing four CLF domain files plus `index.ts` exporting `clfQuestions`. |
| `src/questions/aif-c01/*.ts` (new) | Five AIF domain files plus `index.ts` exporting `aifQuestions`. |
| `src/questions/index.ts` (deleted) | Replaced by `certifications.ts`. |
| `src/scoring.ts` | Cert-parameterised `sampleFullExam`, `scoreSession`, `domainLabel`. |
| `src/videos.ts` | `VideoEntry.cert`; `resolveVideo(question, certId)`; per-domain fallback keyed by domain id. |
| `src/main.ts` | Router, picker screen, `currentCert` state, cert-aware mode/session/results. |
| `scripts/assign-videos.mts` | Iterates every cert's questions and scopes candidates by cert. |
| `index.html`, `manifest.webmanifest`, `README.md`, `package.json` | Generic naming. |
| `styles.css` | `.cert-cards` and `.cert-meta` styles for the picker. |

---

### Task 1: Certification descriptor and CLF question move

**Files:**
- Modify: `src/types.ts:1-5`
- Create: `src/certifications.ts`
- Move: `src/questions/{cloud-concepts,security-and-compliance,technology-and-services,billing-pricing-and-support}.ts` to `src/questions/clf-c02/`
- Create: `src/questions/clf-c02/index.ts`
- Delete: `src/questions/index.ts`
- Modify: `src/main.ts:1`, `scripts/assign-videos.mts:17` (temporary import fix so the build stays green)

**Interfaces:**
- Produces:
  ```ts
  export type CertificationId = "clf-c02" | "aif-c01";
  export interface CertDomain { id: string; label: string; fullExamCount: number }
  export interface Certification {
    id: CertificationId; name: string; shortName: string; examCode: string; description: string;
    domains: CertDomain[]; fullExamQuestionCount: number; fullExamMinutes: number;
    passScaledScore: number; questions: Question[];
  }
  export const certifications: Certification[];
  export function findCertification(id: string | null | undefined): Certification | undefined;
  export function allQuestions(): Question[];
  ```
  AIF is added to the array in Task 6; in this task only CLF is present.

- [ ] **Step 1: Loosen `Domain` to a string**

Replace lines 1-5 of `src/types.ts` with:

```ts
/** A domain id declared by one certification in src/certifications.ts. */
export type Domain = string;
```

- [ ] **Step 2: Move the CLF question files with git so history follows**

```bash
mkdir -p src/questions/clf-c02
git mv src/questions/cloud-concepts.ts src/questions/clf-c02/cloud-concepts.ts
git mv src/questions/security-and-compliance.ts src/questions/clf-c02/security-and-compliance.ts
git mv src/questions/technology-and-services.ts src/questions/clf-c02/technology-and-services.ts
git mv src/questions/billing-pricing-and-support.ts src/questions/clf-c02/billing-pricing-and-support.ts
git rm src/questions/index.ts
```

Each moved file imports `../types.js`; that now needs to be `../../types.js`:

```bash
sed -i 's#from "../types.js"#from "../../types.js"#' src/questions/clf-c02/*.ts
```

- [ ] **Step 3: Create the CLF index**

`src/questions/clf-c02/index.ts`:

```ts
import { Question } from "../../types.js";
import { cloudConceptsQuestions } from "./cloud-concepts.js";
import { securityAndComplianceQuestions } from "./security-and-compliance.js";
import { cloudTechnologyAndServicesQuestions } from "./technology-and-services.js";
import { billingPricingAndSupportQuestions } from "./billing-pricing-and-support.js";

export const clfQuestions: Question[] = [
  ...cloudConceptsQuestions,
  ...securityAndComplianceQuestions,
  ...cloudTechnologyAndServicesQuestions,
  ...billingPricingAndSupportQuestions,
];
```

- [ ] **Step 4: Create `src/certifications.ts`**

```ts
import { Question } from "./types.js";
import { clfQuestions } from "./questions/clf-c02/index.js";

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
```

- [ ] **Step 5: Point the two remaining importers at the new module so `tsc` passes**

In `src/main.ts` line 1 replace
`import { questionBank } from "./questions/index.js";`
with
`import { certifications } from "./certifications.js";
const questionBank = certifications[0].questions;`

In `scripts/assign-videos.mts` line 17 replace
`import { questionBank } from "../dist/questions/index.js";`
with
`import { allQuestions } from "../dist/certifications.js";
const questionBank = allQuestions();`

These are temporary; Tasks 3 and 4 replace them.

- [ ] **Step 6: Build and smoke-check validation runs**

Run: `npm run build && node -e "import('./dist/certifications.js').then(m => console.log(m.certifications.map(c => c.id + ':' + c.questions.length)))"`
Expected: build passes, output `[ 'clf-c02:1040' ]` (the count is the existing bank size; it must be greater than 65).

Then confirm validation actually throws: temporarily change `fullExamCount: 7` to `8` in `certifications.ts`, run `npm run build && node -e "import('./dist/certifications.js')"`, expect `Error: clf-c02: domain counts sum to 66, expected 65`. Revert the change.

- [ ] **Step 7: Commit**

```bash
git add -A src scripts
git commit -m "refactor: introduce Certification descriptor and move CLF questions into clf-c02/

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 2: Cert-parameterised scoring

**Files:**
- Modify: `src/scoring.ts` (whole file)
- Modify: `src/main.ts` (only the call sites listed; full rewrite happens in Task 3)

**Interfaces:**
- Consumes: `Certification`, `CertDomain` from Task 1.
- Produces:
  ```ts
  export function sampleFullExam(cert: Certification): Question[];
  export function scoreSession(cert: Certification, questions: Question[], answers: Record<string, string[]>): SessionResult;
  export function domainLabel(cert: Certification, domainId: string): string;
  export function scaledScoreFor(correct: number, total: number): number;   // unchanged
  export function shuffle<T>(items: T[]): T[];                               // unchanged
  export function sampleQuestionOptions(question: Question): Question;      // unchanged
  export function isAnswerCorrect(question: Question, selected: string[]): boolean; // unchanged
  ```
  Removed: `DOMAIN_LABELS`, `FULL_EXAM_DOMAIN_COUNTS`, `PASS_SCALED_SCORE`, `displayedOptionCount` stays.

- [ ] **Step 1: Rewrite the top of `src/scoring.ts`**

Replace everything from line 1 through the end of `sampleFullExam` (line 41) with:

```ts
import { Certification } from "./certifications.js";
import { DomainBreakdownEntry, Question, SessionResult } from "./types.js";

export function domainLabel(cert: Certification, domainId: string): string {
  return cert.domains.find((d) => d.id === domainId)?.label ?? domainId;
}

export function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function sampleFullExam(cert: Certification): Question[] {
  const picked = cert.domains.flatMap((domain) =>
    shuffle(cert.questions.filter((q) => q.domain === domain.id)).slice(0, domain.fullExamCount)
  );
  return shuffle(picked);
}
```

- [ ] **Step 2: Rewrite the scoring tail**

Replace from `export const PASS_SCALED_SCORE = 700;` through the end of the file with:

```ts
export function scoreSession(
  cert: Certification,
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
  const scaledScore = scaledScoreFor(correctCount, totalCount);
  const passed = scaledScore >= cert.passScaledScore;

  const domainBreakdown: DomainBreakdownEntry[] = cert.domains
    .map((domain) => {
      const inDomain = perQuestion.filter((pq) => pq.question.domain === domain.id);
      return {
        domain: domain.id,
        correct: inDomain.filter((pq) => pq.isCorrect).length,
        total: inDomain.length,
      };
    })
    .filter((entry) => entry.total > 0);

  return { correctCount, totalCount, scaledScore, passed, domainBreakdown, perQuestion };
}
```

- [ ] **Step 3: Patch `main.ts` call sites minimally so the build is green**

Edit these exact spots in `src/main.ts`:

- Line 13 import list: replace `DOMAIN_LABELS,` with `domainLabel,` and delete `PASS_SCALED_SCORE,`.
- `renderModeSelection`: replace the `domainCounts` block with
  ```ts
  const cert = certifications[0];
  const domainCounts = cert.domains.map((d) => ({
    value: d.id,
    label: d.label,
    count: cert.questions.filter((q) => q.domain === d.id).length,
  }));
  ```
- `startFullExam`: `sampleFullExam(questionBank)` becomes `sampleFullExam(certifications[0])`.
- `renderPracticeStats`: `>= PASS_SCALED_SCORE` becomes `>= certifications[0].passScaledScore`.
- `renderQuestionScreen`: `DOMAIN_LABELS[question.domain]` becomes `domainLabel(certifications[0], question.domain)`.
- `finishSession`: `scoreSession(session.questions, session.answers)` becomes `scoreSession(certifications[0], session.questions, session.answers)`.
- `renderResultsScreen`: `DOMAIN_LABELS[entry.domain]` becomes `domainLabel(certifications[0], entry.domain)`.

- [ ] **Step 4: Build and check sampling in Node**

Run:
```bash
npm run build && node -e "
import('./dist/certifications.js').then(async ({ certifications }) => {
  const { sampleFullExam, scoreSession } = await import('./dist/scoring.js');
  const cert = certifications[0];
  const qs = sampleFullExam(cert);
  const counts = {};
  for (const q of qs) counts[q.domain] = (counts[q.domain] ?? 0) + 1;
  console.log(qs.length, counts);
  const answers = Object.fromEntries(qs.map(q => [q.id, q.correctOptionIds]));
  const r = scoreSession(cert, qs, answers);
  console.log(r.scaledScore, r.passed, r.domainBreakdown.length);
})"
```
Expected: `65 { 'cloud-concepts': 16, 'security-and-compliance': 20, 'cloud-technology-and-services': 22, 'billing-pricing-and-support': 7 }` (key order may vary) then `1000 true 4`.

- [ ] **Step 5: Commit**

```bash
git add src/scoring.ts src/main.ts
git commit -m "refactor: scoring reads blueprint and pass mark from the Certification

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 3: Picker screen, hash routing, and cert-aware UI

**Files:**
- Modify: `src/main.ts`
- Modify: `styles.css` (append)
- Modify: `index.html:6-7`, `manifest.webmanifest:2-4`, `package.json:2,5`, `README.md:1-3`

**Interfaces:**
- Consumes: `certifications`, `findCertification`, `Certification` (Task 1); `sampleFullExam`, `scoreSession`, `domainLabel` (Task 2).
- Produces: module-level `let currentCert: Certification | null`, `renderCertPicker()`, `selectCert(cert)`, `route()`. Task 4 reads `currentCert.id` when calling `resolveVideo`.

- [ ] **Step 1: Replace the temporary imports and add cert state**

At the top of `src/main.ts`, replace

```ts
import { certifications } from "./certifications.js";
const questionBank = certifications[0].questions;
```

with

```ts
import { Certification, certifications, findCertification } from "./certifications.js";

const CERT_STORAGE_KEY = "awsquiz.cert";
/** The certification the learner picked; null while on the picker screen. */
let currentCert: Certification | null = null;
```

Delete the line `const FULL_EXAM_SECONDS = 90 * 60;`.

- [ ] **Step 2: Add storage helpers, the picker, and the router**

Insert directly above `function renderModeSelection(): void {`:

```ts
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
```

- [ ] **Step 3: Make `renderModeSelection` read `currentCert`**

Rewrite the function body up to `app.innerHTML`:

```ts
function renderModeSelection(): void {
  session = null;
  const cert = currentCert;
  if (!cert) {
    renderCertPicker();
    return;
  }
  document.title = `${cert.shortName} Exam Simulator`;
  const domainCounts = cert.domains.map((d) => ({
    value: d.id,
    label: d.label,
    count: cert.questions.filter((q) => q.domain === d.id).length,
  }));
```

In the template:
- `<h1>AWS Cloud Practitioner Exam Simulator</h1>` becomes
  ```html
  <p class="cert-switch"><a href="#/" class="link-btn" id="change-cert">${icons.arrowLeft} All certifications</a></p>
  <h1>${escapeHtml(cert.name)}</h1>
  <p class="cert-meta">${escapeHtml(cert.examCode)}</p>
  ```
- `<p>65 questions, a 90 minute timer, and scoring modeled on the real exam.</p>` becomes
  `<p>${cert.fullExamQuestionCount} questions, a ${cert.fullExamMinutes} minute timer, and scoring modeled on the real exam.</p>`
- `All domains (${questionBank.length})` becomes `All domains (${cert.questions.length})`.
- The practice button handler: `(select.value as Domain)` stays valid because `Domain` is now `string`.

- [ ] **Step 4: Make session start, stats, question header, scoring, and results use `currentCert`**

`startFullExam`:
```ts
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
```

`startPractice`: first line becomes
```ts
  if (!currentCert) return;
  const pool = domain === "all" ? currentCert.questions : currentCert.questions.filter((q) => q.domain === domain);
```

`renderPracticeStats`: `certifications[0].passScaledScore` becomes `(currentCert?.passScaledScore ?? 700)`.

`renderQuestionScreen`: `domainLabel(certifications[0], question.domain)` becomes `domainLabel(currentCert!, question.domain)`.

`finishSession`: `scoreSession(certifications[0], ...)` becomes `scoreSession(currentCert!, ...)`.

`renderResultsScreen`: `domainLabel(certifications[0], entry.domain)` becomes `domainLabel(currentCert!, entry.domain)`. The `back-to-menu` handler stays `renderModeSelection`.

Remove the `questionBank` const if any reference remains (grep for it; there should be none).

- [ ] **Step 5: Replace the bootstrap line**

Replace the final `renderModeSelection();` with:

```ts
window.addEventListener("hashchange", route);

if (!certIdFromHash()) {
  const remembered = findCertification(readStoredCertId());
  if (remembered) {
    history.replaceState(null, "", `#/${remembered.id}`);
  }
}
route();
```

- [ ] **Step 6: Styles for the picker**

Append to `styles.css`:

```css
.lede {
  color: var(--muted);
  margin-bottom: 1rem;
}

.cert-cards {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cert-card {
  font: inherit;
  color: inherit;
  text-align: left;
  cursor: pointer;
  width: 100%;
}

.cert-card:hover,
.cert-card:focus-visible {
  border-color: var(--accent);
  outline: none;
}

.cert-meta {
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  color: var(--muted);
}

.cert-switch {
  margin-bottom: 0.5rem;
}
```

Check `--accent` exists in `:root` in `styles.css` (`grep -n -- "--accent" styles.css`). If the variable has a different name, use the one the `.btn` background uses.

- [ ] **Step 7: Generic naming in shell files**

- `index.html` line 6: `<title>AWS Certification Exam Simulator</title>`; line 7 description: `Practice and full-exam simulator for AWS certifications: Cloud Practitioner (CLF-C02) and AI Practitioner (AIF-C01). Works fully offline.`
- `manifest.webmanifest`: `"name": "AWS Certification Exam Simulator"`, same description as above. `short_name` stays.
- `package.json`: `"name": "aws-certification-quiz"`, `"description": "Static AWS certification exam simulator (Cloud Practitioner CLF-C02, AI Practitioner AIF-C01)."`
- `README.md` first paragraph: `A static, no-backend AWS certification exam simulator. Ships with question banks for Cloud Practitioner (CLF-C02) and AI Practitioner (AIF-C01); pick one on the landing screen. Add a certification by dropping a question folder under src/questions/ and an entry in src/certifications.ts.`

- [ ] **Step 8: Build and check in a browser**

Run: `npm run build` then `npm run dev` and open http://localhost:5173/.

Check:
1. Picker shows one Cloud Practitioner card. Clicking it changes the URL to `#/clf-c02` and shows the mode screen with the cert name.
2. Browser back returns to the picker. Forward returns to the mode screen.
3. Reload on `#/clf-c02` lands on the mode screen. Clear the hash (visit `/`) and reload: it redirects to `#/clf-c02` because of the stored key.
4. Start a full exam, press back: the exam stays on screen. End the exam, then back works again.
5. Practice with a single domain still works and the results table shows domain labels.
6. `localStorage.getItem("awsquiz.cert")` in devtools is `clf-c02`.

- [ ] **Step 9: Commit**

```bash
git add src/main.ts styles.css index.html manifest.webmanifest package.json README.md
git commit -m "feat: certification picker with hash routing and remembered choice

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 4: Cert-scoped video catalog and assignment script

**Files:**
- Modify: `src/videos.ts` (`VideoEntry`, catalog entries, `domainFallback`, `resolveVideo`)
- Modify: `src/main.ts` (`resolveVideo` call in `renderFeedbackExtras`)
- Modify: `scripts/assign-videos.mts`

**Interfaces:**
- Consumes: `CertificationId`, `certifications`, `allQuestions` (Task 1); `currentCert` (Task 3).
- Produces:
  ```ts
  export interface VideoEntry { id: string; label: string; keywords: string[]; cert: CertificationId }
  export function resolveVideo(question: Question, certId: CertificationId): { url: string; label: string };
  ```

- [ ] **Step 1: Add the `cert` field to `VideoEntry` and tag every existing entry**

In `src/videos.ts`, change the import to `import { Question } from "./types.js";` and add `import { CertificationId } from "./certifications.js";`. Add `cert: CertificationId;` to `VideoEntry` after `keywords`.

Tag all existing entries as CLF in one pass:

```bash
sed -i -E 's/^(  \{ id: "[^"]+", label: "[^"]*", keywords: \[.*\])( \},)$/\1, cert: "clf-c02"\2/' src/videos.ts
grep -c 'cert: "clf-c02"' src/videos.ts
grep -c '^  { id: "' src/videos.ts
```

The two counts must match. If any entry spans multiple lines or has a different shape, tag it by hand.

- [ ] **Step 2: Fallback map keyed by domain id, and cert-scoped resolution**

Replace the `domainFallback` declaration with:

```ts
/** Domain-level fallback used when no keyword matches. Keyed by domain id across all certs. */
const domainFallback: Record<string, string> = {
  "cloud-concepts": "a9__D53WsUs",
  "security-and-compliance": "9Pk2J_5qnlk",
  "cloud-technology-and-services": "BtJAsvJOlhM",
  "billing-pricing-and-support": "-t148tYgnJU",
};
```

(AIF fallbacks are added in Task 10 once the AI catalog entries exist.)

Replace `resolveVideo` with:

```ts
export function catalogFor(certId: CertificationId): VideoEntry[] {
  return videoCatalog.filter((v) => v.cert === certId);
}

export function resolveVideo(question: Question, certId: CertificationId): { url: string; label: string } {
  if (question.videoUrl) {
    return { url: question.videoUrl, label: question.videoLabel ?? "YouTube" };
  }

  const catalog = catalogFor(certId);
  const assignedId = videoAssignments[question.id];
  const assigned = assignedId ? catalog.find((v) => v.id === assignedId) : undefined;
  if (assigned) {
    return { url: videoUrlFor(assigned.id), label: assigned.label };
  }

  const haystacks = haystacksFor(question);
  let best: VideoEntry | undefined;
  let bestScore = 0;

  for (const entry of catalog) {
    const score = entryScore(entry, haystacks);
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  const fallbackId = domainFallback[question.domain];
  const chosen = best ?? catalog.find((v) => v.id === fallbackId) ?? catalog[0];
  return { url: videoUrlFor(chosen.id), label: chosen.label };
}
```

- [ ] **Step 3: Pass the cert id from `main.ts`**

In `renderFeedbackExtras`, change `resolveVideo(question)` to `resolveVideo(question, currentCert!.id)`.

- [ ] **Step 4: Make the assignment script cert-aware**

In `scripts/assign-videos.mts`:

- Replace the temporary import lines from Task 1 with
  ```ts
  import { certifications } from "../dist/certifications.js";
  import { catalogFor, countHits, entryScore, haystacksFor, videoCatalog, type VideoEntry } from "../dist/videos.js";
  ```
  and remove the separate `videoCatalog` import if it duplicates.
- Add, after the constants:
  ```ts
  /** Which cert a question belongs to, so candidates are drawn only from that cert's catalog. */
  const certOf = new Map<Question, (typeof certifications)[number]>();
  for (const cert of certifications) for (const q of cert.questions) certOf.set(q, cert);
  const questionBank: Question[] = certifications.flatMap((c) => c.questions);
  ```
- In the candidate loop, replace `for (const entry of videoCatalog) {` (the one inside `for (const q of questionBank)`) with `for (const entry of catalogFor(certOf.get(q)!.id)) {`.
- The document-frequency loop over `videoCatalog` stays as is (rarity across the whole bank is fine).
- In the report section, add a per-cert line before `Most shared videos`:
  ```ts
  for (const cert of certifications) {
    const qs = cert.questions;
    const done = qs.filter((q) => assignment.has(q)).length;
    console.log(`${cert.id}: ${done}/${qs.length} assigned`);
  }
  ```

- [ ] **Step 5: Build and regenerate assignments**

Run: `npm run videos:assign`
Expected: the script prints `clf-c02: N/1040 assigned` with N equal to the previous number of assigned questions, and `git diff --stat src/video-assignments.ts` shows no change (same inputs, same output). If the diff is non-empty, inspect why before committing; the per-cert filter must not change CLF results because every catalog entry is CLF right now.

- [ ] **Step 6: Commit**

```bash
git add src/videos.ts src/main.ts scripts/assign-videos.mts src/video-assignments.ts
git commit -m "refactor: scope video catalog and assignment by certification

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 5: AIF-C01 domain 1 questions, Fundamentals of AI and ML

**Files:**
- Create: `src/questions/aif-c01/ai-ml-fundamentals.ts`
- Create: `src/questions/aif-c01/index.ts`

**Interfaces:**
- Produces: `export const aiMlFundamentalsQuestions: Question[]` with ids `aif-ml1` to `aif-ml25`, all `domain: "ai-ml-fundamentals"`; `export const aifQuestions: Question[]` from the index (grows in Tasks 6 to 9).

- [ ] **Step 1: Write 25 questions in the existing house format**

Every question has this shape (copy the two examples verbatim as the first two entries, then continue in the same style):

```ts
import { Question } from "../../types.js";

export const aiMlFundamentalsQuestions: Question[] = [
  {
    id: "aif-ml1",
    domain: "ai-ml-fundamentals",
    text: "A retailer wants a model that predicts next month's sales figure for each store from historical sales data. Which type of machine learning problem is this?",
    options: [
      { id: "a", text: "Regression" },
      { id: "b", text: "Binary classification" },
      { id: "c", text: "Clustering" },
      { id: "d", text: "Anomaly detection" },
      { id: "e", text: "Multi-class classification" },
      { id: "f", text: "Dimensionality reduction" },
    ],
    correctOptionIds: ["a"],
    explanation: "Predicting a continuous numeric value such as a sales amount is a regression problem.",
    optionRationale: {
      a: "Regression predicts a continuous number, which is exactly a sales figure.",
      b: "Binary classification predicts one of two labels, not a numeric amount.",
      c: "Clustering groups similar records without a target value; it is unsupervised.",
      d: "Anomaly detection flags unusual records rather than forecasting a number.",
      e: "Multi-class classification picks one label from several, not a continuous value.",
      f: "Dimensionality reduction compresses features; it does not produce a prediction.",
    },
    referenceUrl: "https://docs.aws.amazon.com/sagemaker/latest/dg/how-it-works-training.html",
    referenceLabel: "Amazon SageMaker: How training works",
  },
  {
    id: "aif-ml2",
    domain: "ai-ml-fundamentals",
    text: "Which TWO statements describe supervised learning?",
    options: [
      { id: "a", text: "The training data includes labeled target values." },
      { id: "b", text: "The model learns from rewards and penalties while interacting with an environment." },
      { id: "c", text: "Classification and regression are common supervised tasks." },
      { id: "d", text: "The algorithm discovers hidden groupings without any labels." },
      { id: "e", text: "It requires a foundation model as the starting point." },
      { id: "f", text: "It can only be used with image data." },
    ],
    correctOptionIds: ["a", "c"],
    explanation: "Supervised learning trains on examples that already carry the correct answer (labels) and covers classification and regression.",
    optionRationale: {
      a: "Labels are the defining feature of supervised learning.",
      b: "Learning from rewards describes reinforcement learning.",
      c: "Both classification and regression need labeled examples and are the two main supervised task types.",
      d: "Discovering groupings without labels is unsupervised learning (clustering).",
      e: "Supervised learning predates foundation models and does not require one.",
      f: "Supervised learning works with tabular, text, image, audio, and other data types.",
    },
    referenceUrl: "https://aws.amazon.com/what-is/machine-learning/",
    referenceLabel: "What is machine learning? (AWS)",
  },
  // aif-ml3 .. aif-ml25 follow
];
```

Cover these topics across `aif-ml3` to `aif-ml25`, one or two questions each. Use the official exam guide, AWS "What is" pages, and SageMaker docs for reference links:

1. AI vs ML vs deep learning vs generative AI definitions.
2. Neural networks, computer vision, natural language processing terms.
3. Unsupervised learning and clustering use cases.
4. Reinforcement learning example.
5. Structured vs unstructured vs semi-structured data; labeled vs unlabeled.
6. Training, validation, and test splits; overfitting vs underfitting.
7. Inference types: batch transform vs real-time endpoint vs asynchronous inference (SageMaker).
8. Classification metrics: accuracy, precision, recall, F1, confusion matrix, AUC-ROC.
9. Regression metrics: RMSE, MAE.
10. Feature engineering and SageMaker Feature Store.
11. SageMaker Data Wrangler, SageMaker Ground Truth for labeling.
12. SageMaker JumpStart, SageMaker Canvas, SageMaker Studio purposes.
13. MLOps concepts: SageMaker Pipelines, Model Registry, model monitoring for drift.
14. When NOT to use ML (deterministic rules suffice, cost or explainability constraints).
15. Managed AI services and when to use each: Amazon Rekognition, Amazon Textract, Amazon Comprehend, Amazon Transcribe, Amazon Polly, Amazon Translate, Amazon Lex, Amazon Personalize, Amazon Kendra, Amazon Fraud Detector.
16. Bias and variance trade-off; hyperparameters vs parameters.
17. Business metrics for an ML project (cost per user, ROI, customer feedback) vs model metrics.

Include 3 or 4 two-answer questions (option pool 6 to 8 for those). Every question needs `optionRationale` covering every option id. Add `consoleUrl` (for example `https://console.aws.amazon.com/sagemaker/`) on SageMaker questions and a short Mermaid `diagram` on the ML pipeline question, for example:

```ts
    diagram: `flowchart LR
  A[Collect data] --> B[Prepare and label]
  B --> C[Train]
  C --> D[Evaluate]
  D --> E[Deploy endpoint]
  E --> F[Monitor drift]
  F --> B`,
```

- [ ] **Step 2: Create the AIF index**

`src/questions/aif-c01/index.ts`:

```ts
import { Question } from "../../types.js";
import { aiMlFundamentalsQuestions } from "./ai-ml-fundamentals.js";

export const aifQuestions: Question[] = [
  ...aiMlFundamentalsQuestions,
];
```

- [ ] **Step 3: Check the file compiles and ids are unique and sequential**

Run:
```bash
npm run build && node -e "
import('./dist/questions/aif-c01/index.js').then(({ aifQuestions }) => {
  const ids = aifQuestions.map(q => q.id);
  const dup = ids.filter((id, i) => ids.indexOf(id) !== i);
  const missing = aifQuestions.filter(q => !q.optionRationale || q.options.some(o => !q.optionRationale[o.id]) || !q.referenceUrl);
  const multi = aifQuestions.filter(q => q.correctOptionIds.length > 1).length;
  console.log({ count: ids.length, dup, missingRationaleOrRef: missing.map(q => q.id), multi });
})"
```
Expected: `count: 25`, `dup: []`, `missingRationaleOrRef: []`, `multi` between 3 and 4.

- [ ] **Step 4: Commit**

```bash
git add src/questions/aif-c01
git commit -m "feat(aif): add Fundamentals of AI and ML questions

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 6: AIF-C01 domain 2 questions, Fundamentals of Generative AI, and register the cert

**Files:**
- Create: `src/questions/aif-c01/genai-fundamentals.ts`
- Modify: `src/questions/aif-c01/index.ts`
- Modify: `src/certifications.ts` (add the AIF entry)

**Interfaces:**
- Produces: `export const genaiFundamentalsQuestions: Question[]`, ids `aif-gen1` to `aif-gen25`, `domain: "genai-fundamentals"`. The `certifications` array now has two entries.

- [ ] **Step 1: Write 25 questions**

Same file shape as Task 5 with `export const genaiFundamentalsQuestions`. Topics:

1. Tokens, embeddings, vectors, context window, temperature, top-p, top-k.
2. Transformer architecture at a high level; attention.
3. Foundation models vs task-specific models; LLMs, diffusion models, multimodal models.
4. Generative AI use cases: summarisation, chatbots, code generation, image generation, translation, search.
5. Limitations: hallucination, nondeterminism, knowledge cutoff, interpretability.
6. Foundation model lifecycle: data selection, pre-training, fine-tuning, evaluation, deployment, feedback.
7. Amazon Bedrock purpose and model providers; on-demand vs provisioned throughput.
8. Amazon Q Business, Amazon Q Developer, PartyRock as low-code entry points.
9. Amazon SageMaker JumpStart for foundation models.
10. Advantages of AWS generative AI services: security, compliance, responsibility, cost, speed to market.
11. Cost trade-offs: token-based pricing, provisioned throughput, custom model hosting, Regional availability.
12. Business value metrics for generative AI: user satisfaction, conversion rate, average revenue per user, efficiency.
13. Model capability trade-offs: latency vs quality, model size vs cost.

3 or 4 two-answer questions. One Mermaid diagram on the foundation model lifecycle. `consoleUrl: "https://console.aws.amazon.com/bedrock/"` on Bedrock questions. Reference links from `https://docs.aws.amazon.com/bedrock/latest/userguide/` and `https://aws.amazon.com/what-is/generative-ai/`.

- [ ] **Step 2: Add to the AIF index**

```ts
import { genaiFundamentalsQuestions } from "./genai-fundamentals.js";
// ...
export const aifQuestions: Question[] = [
  ...aiMlFundamentalsQuestions,
  ...genaiFundamentalsQuestions,
];
```

- [ ] **Step 3: Register AIF in `src/certifications.ts`**

Add `import { aifQuestions } from "./questions/aif-c01/index.js";` and append this entry after the CLF one:

```ts
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
```

The validation in `certifications.ts` will now throw at load because three AIF domains still have zero questions. To keep the build usable between tasks, relax the per-domain minimum check to a warning until Task 9 completes: wrap only that `throw` in the `available < d.fullExamCount` branch as `console.warn(...)` for now. Task 9 restores the `throw`.

- [ ] **Step 4: Build, check counts, and check the picker**

Run: `npm run build && node -e "import('./dist/certifications.js').then(m => console.log(m.certifications.map(c => c.id + ':' + c.questions.length)))"`
Expected: `[ 'clf-c02:1040', 'aif-c01:50' ]` plus three warnings about domains under their exam count.

Run `npm run dev`, open the app: the picker shows two cards, the AIF card shows `AIF-C01 · 65 questions · 120 min · 50 in bank`. Choose it; the practice dropdown lists five domains.

- [ ] **Step 5: Commit**

```bash
git add src/questions/aif-c01 src/certifications.ts
git commit -m "feat(aif): add Fundamentals of Generative AI questions and register AIF-C01

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 7: AIF-C01 domain 3 questions, Applications of Foundation Models

**Files:**
- Create: `src/questions/aif-c01/foundation-model-applications.ts`
- Modify: `src/questions/aif-c01/index.ts`

**Interfaces:**
- Produces: `export const foundationModelApplicationsQuestions: Question[]`, ids `aif-fm1` to `aif-fm26`, `domain: "foundation-model-applications"`. (26 so the largest-weight domain has a slightly deeper pool.)

- [ ] **Step 1: Write 26 questions**

Same shape as Task 5. Topics:

1. Choosing a pre-trained model: cost, modality, latency, multilingual, model size, customisation, input/output length.
2. Inference parameters: temperature, top-p, top-k, max tokens, stop sequences, and their effect on output.
3. Retrieval Augmented Generation (RAG): what it is, why it reduces hallucination, Amazon Bedrock Knowledge Bases.
4. Vector stores on AWS: Amazon OpenSearch Service, Amazon Aurora PostgreSQL with pgvector, Amazon Neptune, Amazon DocumentDB, Amazon RDS for PostgreSQL.
5. Customisation approaches and cost order: prompt engineering < RAG < fine-tuning < pre-training from scratch.
6. Fine-tuning vs continued pre-training; instruction tuning; data preparation for fine-tuning (labeled JSONL).
7. Agents: Amazon Bedrock Agents for multi-step tasks and tool use; action groups.
8. Prompt engineering techniques: zero-shot, single-shot, few-shot, chain-of-thought, prompt templates, negative prompts.
9. Prompt risks: prompt injection, jailbreaking, hijacking, poisoning, exposure.
10. Model evaluation: human evaluation, benchmark datasets, ROUGE, BLEU, BERTScore; Amazon Bedrock model evaluation.
11. Evaluating whether business objectives are met (productivity, user engagement, task engineering).
12. Amazon Bedrock Guardrails for filtering harmful content and PII.
13. Model latency and throughput considerations; provisioned throughput.
14. Amazon Bedrock Prompt Management and Prompt Flows (Flows) at a high level.

3 or 4 two-answer questions. One Mermaid diagram on the RAG flow:

```ts
    diagram: `flowchart LR
  U[User question] --> E[Embed query]
  E --> V[(Vector store)]
  V --> R[Retrieve relevant chunks]
  R --> P[Augmented prompt]
  P --> M[Foundation model]
  M --> A[Grounded answer]`,
```

Add a `cliExample` on one Bedrock question, for example:

```ts
    cliExample: {
      description: "List the foundation models available in the current Region.",
      command: "aws bedrock list-foundation-models --query 'modelSummaries[].modelId' --output text",
      sampleOutput: "amazon.titan-text-express-v1\tanthropic.claude-3-haiku-20240307-v1:0\tmeta.llama3-70b-instruct-v1:0",
    },
```

- [ ] **Step 2: Add to the index**

Append `...foundationModelApplicationsQuestions,` to `aifQuestions` with the matching import.

- [ ] **Step 3: Verify**

Run the same Node check as Task 5 Step 3 but expect `count: 76`, `dup: []`, `missingRationaleOrRef: []`.

- [ ] **Step 4: Commit**

```bash
git add src/questions/aif-c01
git commit -m "feat(aif): add Applications of Foundation Models questions

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 8: AIF-C01 domain 4 questions, Guidelines for Responsible AI

**Files:**
- Create: `src/questions/aif-c01/responsible-ai.ts`
- Modify: `src/questions/aif-c01/index.ts`

**Interfaces:**
- Produces: `export const responsibleAiQuestions: Question[]`, ids `aif-ra1` to `aif-ra25`, `domain: "responsible-ai"`.

- [ ] **Step 1: Write 25 questions**

Same shape as Task 5. Topics:

1. Responsible AI dimensions: fairness, explainability, privacy and security, robustness, safety, controllability, veracity, transparency, governance.
2. Bias sources: training data, sampling, labeling; effects on demographic groups.
3. Amazon SageMaker Clarify for bias detection and feature attribution (SHAP).
4. Amazon SageMaker Model Monitor for bias drift in production.
5. Amazon Augmented AI (A2I) for human review of low-confidence predictions.
6. Amazon Bedrock Guardrails for responsible outputs: denied topics, content filters, word filters, PII redaction.
7. Model cards (SageMaker Model Cards) and AWS AI Service Cards for transparency.
8. Interpretability vs explainability; trade-off between model performance and transparency.
9. Dataset characteristics: inclusivity, diversity, balanced datasets, curated data sources.
10. Legal risks of generative AI: intellectual property, hallucination harm, toxicity, loss of customer trust.
11. Environmental and sustainability considerations of large models.
12. Choosing the right model: safety, transparency, trustworthiness, level of customisation.
13. Human-centered design for explainable AI; reinforcement learning from human feedback (RLHF) at a high level.

3 or 4 two-answer questions. Reference links: `https://aws.amazon.com/ai/responsible-ai/`, `https://docs.aws.amazon.com/sagemaker/latest/dg/clarify-fairness-and-explainability.html`, `https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html`.

- [ ] **Step 2: Add to the index**

Append `...responsibleAiQuestions,` with the matching import.

- [ ] **Step 3: Verify**

Same Node check; expect `count: 101`, no dups, no missing rationale.

- [ ] **Step 4: Commit**

```bash
git add src/questions/aif-c01
git commit -m "feat(aif): add Guidelines for Responsible AI questions

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 9: AIF-C01 domain 5 questions, Security, Compliance, and Governance, and restore strict validation

**Files:**
- Create: `src/questions/aif-c01/ai-security-governance.ts`
- Modify: `src/questions/aif-c01/index.ts`
- Modify: `src/certifications.ts` (restore the `throw`)

**Interfaces:**
- Produces: `export const aiSecurityGovernanceQuestions: Question[]`, ids `aif-sec1` to `aif-sec25`, `domain: "ai-security-governance"`.

- [ ] **Step 1: Write 25 questions**

Same shape as Task 5. Topics:

1. Securing AI systems: IAM roles and least privilege for Bedrock and SageMaker; encryption at rest with AWS KMS; encryption in transit.
2. Amazon Macie for discovering PII in training data on S3; AWS PrivateLink and VPC endpoints for Bedrock; Amazon Bedrock does not use customer data to train base models.
3. AWS shared responsibility model applied to AI services.
4. Data lineage, data cataloguing (AWS Glue Data Catalog), source citation, documenting data origins.
5. Threat detection and vulnerability management for ML: Amazon GuardDuty, Amazon Inspector, AWS Security Hub.
6. Prompt injection as a security threat; guardrails and input validation.
7. Compliance standards and services: AWS Artifact for reports, AWS Audit Manager, AWS Config, Amazon CloudWatch and AWS CloudTrail for auditability; ISO, SOC, GDPR at a high level; algorithm accountability.
8. Governance frameworks: Generative AI Security Scoping Matrix, AWS Well-Architected Machine Learning Lens, Cloud Adoption Framework for AI.
9. Data governance strategies: data residency, retention, monitoring, lifecycle.
10. Governance protocols: policies, review cadences, review strategies, team training, transparency standards.
11. SageMaker Role Manager for persona-based permissions; SageMaker Model Cards and Model Dashboard for governance.
12. AWS Trusted Advisor and AWS Config rules for continuous compliance.

3 or 4 two-answer questions. `cliExample` on one KMS or CloudTrail question, for example:

```ts
    cliExample: {
      description: "Look up recent Bedrock model invocations recorded by CloudTrail.",
      command: "aws cloudtrail lookup-events --lookup-attributes AttributeKey=EventName,AttributeValue=InvokeModel --max-results 3 --query 'Events[].{time:EventTime,user:Username}'",
      sampleOutput: "[\n  { \"time\": \"2026-09-22T08:14:02+00:00\", \"user\": \"data-scientist\" }\n]",
    },
```

- [ ] **Step 2: Add to the index**

Append `...aiSecurityGovernanceQuestions,` with the matching import. The final index is:

```ts
import { Question } from "../../types.js";
import { aiMlFundamentalsQuestions } from "./ai-ml-fundamentals.js";
import { genaiFundamentalsQuestions } from "./genai-fundamentals.js";
import { foundationModelApplicationsQuestions } from "./foundation-model-applications.js";
import { responsibleAiQuestions } from "./responsible-ai.js";
import { aiSecurityGovernanceQuestions } from "./ai-security-governance.js";

export const aifQuestions: Question[] = [
  ...aiMlFundamentalsQuestions,
  ...genaiFundamentalsQuestions,
  ...foundationModelApplicationsQuestions,
  ...responsibleAiQuestions,
  ...aiSecurityGovernanceQuestions,
];
```

- [ ] **Step 3: Restore the strict per-domain minimum**

In `src/certifications.ts`, change the `console.warn(...)` introduced in Task 6 back to `throw new Error(...)`.

- [ ] **Step 4: Verify the whole bank**

Run:
```bash
npm run build && node -e "
import('./dist/certifications.js').then(async ({ certifications }) => {
  const { sampleFullExam, scoreSession } = await import('./dist/scoring.js');
  for (const cert of certifications) {
    const qs = sampleFullExam(cert);
    const counts = {};
    for (const q of qs) counts[q.domain] = (counts[q.domain] ?? 0) + 1;
    console.log(cert.id, cert.questions.length, qs.length, counts);
  }
})"
```
Expected: no thrown error; `aif-c01 126 65 { 'ai-ml-fundamentals': 13, 'genai-fundamentals': 16, 'foundation-model-applications': 18, 'responsible-ai': 9, 'ai-security-governance': 9 }`.

- [ ] **Step 5: Commit**

```bash
git add src/questions/aif-c01 src/certifications.ts
git commit -m "feat(aif): add Security, Compliance, and Governance questions; enforce bank minimums

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 10: AI video catalog, fallbacks, and assignment pass

**Files:**
- Modify: `src/videos.ts` (append AIF entries, extend `domainFallback`)
- Modify: `src/video-assignments.ts` (generated)
- Modify: `README.md` (one sentence about per-cert catalogs)

**Interfaces:**
- Consumes: `VideoEntry.cert` (Task 4).

- [ ] **Step 1: Verify candidate video ids against YouTube oEmbed**

Write a scratch list of candidate IDs and check each returns HTTP 200 with a title:

```bash
for id in <candidate ids>; do
  printf '%s  ' "$id"; curl -s "https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=$id&format=json" | head -c 120; echo
done
```

Find candidates by searching YouTube for these topics, preferring official AWS channel explainers under about three minutes (the existing catalog caps at three minutes): "What is Amazon Bedrock", "Amazon Bedrock Knowledge Bases RAG", "Amazon Bedrock Guardrails", "Amazon Bedrock Agents", "What is Amazon SageMaker", "SageMaker Clarify bias", "SageMaker JumpStart", "Amazon Q Business", "Amazon Q Developer", "PartyRock", "prompt engineering basics", "what is a foundation model", "supervised vs unsupervised learning", "what is RAG", "fine-tuning vs RAG", "responsible AI AWS", "Amazon Macie PII", "Amazon Rekognition", "Amazon Comprehend", "Amazon Textract", "Amazon Transcribe", "Amazon Lex", "Amazon Personalize", "Amazon Kendra", "AWS Artifact", "AWS Audit Manager". Only IDs that pass the oEmbed check go into the catalog.

- [ ] **Step 2: Append AIF entries to `videoCatalog`**

Add a section after the last CLF entry, one line per entry in the existing style, each with `cert: "aif-c01"` and 5 to 20 keywords drawn from the question text you wrote. Example shape:

```ts
  // AI Practitioner: AI and ML fundamentals
  { id: "<verified-id>", label: "Supervised vs Unsupervised Learning", keywords: ["supervised", "unsupervised", "labeled", "unlabeled", "clustering", "regression", "classification"], cert: "aif-c01" },
```

Aim for 20 to 30 entries across the five domains.

- [ ] **Step 3: Add AIF fallbacks**

Extend `domainFallback` with one verified id per AIF domain:

```ts
  "ai-ml-fundamentals": "<id of the general ML intro video>",
  "genai-fundamentals": "<id of the generative AI intro video>",
  "foundation-model-applications": "<id of the Bedrock intro video>",
  "responsible-ai": "<id of the responsible AI video>",
  "ai-security-governance": "<id of the AI security or Macie video>",
```

- [ ] **Step 4: Run the assignment pass and read the report**

Run: `npm run videos:assign`
Expected: `aif-c01: N/126 assigned` with N at least 110, and the unmatched list containing only AIF questions with no keyword hit. For each unmatched AIF question add keywords to the closest catalog entry, then rerun until unmatched AIF is under 10. Confirm no AIF question id is assigned a CLF video:

```bash
node -e "
import('./dist/video-assignments.js').then(async ({ videoAssignments }) => {
  const { videoCatalog } = await import('./dist/videos.js');
  const bad = Object.entries(videoAssignments).filter(([qid, vid]) => qid.startsWith('aif-') && videoCatalog.find(v => v.id === vid)?.cert !== 'aif-c01');
  console.log('cross-cert assignments:', bad.length);
})"
```
Expected: `cross-cert assignments: 0`.

- [ ] **Step 5: README note**

In `README.md`, after the paragraph about `npm run videos:assign`, add: `The catalog is tagged per certification, so an AI Practitioner question is never matched to a Cloud Practitioner video and vice versa.`

- [ ] **Step 6: Commit**

```bash
git add src/videos.ts src/video-assignments.ts README.md
git commit -m "feat(aif): curated AI video catalog with per-cert fallbacks and assignments

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>"
```

---

### Task 11: End-to-end manual verification

**Files:** none modified unless a check fails.

- [ ] **Step 1: Clean build**

Run: `npm run build`
Expected: no TypeScript errors; `sw.js written: N precached files` where N is larger than before (new `dist/questions/aif-c01/*.js` and `dist/certifications.js` are included). Confirm with `grep -c "aif-c01" sw.js` returning at least 6.

- [ ] **Step 2: Browser run-through**

Run `npm run dev`, open http://localhost:5173/ in a private window (empty storage), and check each item:

1. Picker shows Cloud Practitioner and AI Practitioner cards with correct exam codes, minutes (90 and 120), and bank counts.
2. Choose AI Practitioner: URL is `#/aif-c01`, heading is "AWS Certified AI Practitioner", practice dropdown has "All domains (126)" plus five domains.
3. Start Full Exam: timer reads `120:00` and counts down; question count is 65; the domain pill shows an AIF domain label.
4. Answer a few questions, press browser back: exam remains. End the exam via Submit: results show a 100 to 1000 score, PASS or FAIL, and up to five domain rows.
5. Back to Menu, then "All certifications": picker returns, URL is `#/`.
6. Choose Cloud Practitioner, start Practice on "Billing, Pricing, and Support": feedback panel shows explanation, reference link, video link (a CLF video), and the timer is absent.
7. Reload the tab: lands on the last cert's mode screen. Clear the hash and reload: same result, from localStorage.
8. Toggle offline in devtools and reload: both certs load, external links are hidden.

- [ ] **Step 3: Record outcome**

If every check passes, no commit is needed. If a check fails, fix it in the task that owns that file, rerun `npm run build`, and commit with a `fix:` message ending in the Co-Authored-By line.
