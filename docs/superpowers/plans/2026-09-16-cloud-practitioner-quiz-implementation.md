# AWS Cloud Practitioner Exam Simulator Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static TypeScript web app under `cloud-practitioner/` that simulates the AWS Certified Cloud Practitioner (CLF-C02) exam: a 65-question/90-minute timed mode with AWS-style scoring, and an untimed practice mode with instant feedback.

**Architecture:** Plain HTML/CSS/TypeScript, no framework, no bundler. `tsc` compiles `src/*.ts` to `dist/*.js`, loaded by `index.html` as native ES modules. A ~90-question data bank (`src/questions/`) feeds pure sampling/scoring logic (`src/scoring.ts`), driven by a small DOM state machine (`src/main.ts`).

**Tech Stack:** TypeScript (compiled with `tsc`, no bundler), plain HTML/CSS, Google Fonts (Lora + IBM Plex Mono) via `<link>`. No backend, no dependencies beyond the `typescript` dev dependency.

**Spec:** `docs/superpowers/specs/2026-09-16-cloud-practitioner-quiz-design.md`

## Visual direction (informs Task 1 CSS)

Treat the interface like a calm exam answer sheet, not a SaaS dashboard: a
soft paper-grey background (`#EDEFEA`), near-black ink (`#1B2320`), white
content surfaces with hairline borders (no card shadows, no heavy rounded
corners), and a single deep teal-green accent (`#2B6E63`) for actions,
focus rings, and the timer. Correct/incorrect feedback uses a forest green
(`#2F7D4F`) and a muted brick red (`#B3432B`), always paired with text, not
color alone. Question and explanation text is set in a serif (Lora) for
comfortable long-session reading; all chrome — labels, meta lines, the
timer, buttons, the results score — is set in a monospace (IBM Plex Mono),
encoding "content to read" vs. "instrument-panel data." Layout is a single
centered column (max ~640px), left-aligned, mimicking a paper answer
sheet: options are flat bordered rows (not cards), selected via native
radio/checkbox inputs tinted with `accent-color`. One light theme only
(no dark mode) — this is a single-session personal study tool, not a
published multi-user surface.

## Global Constraints

- No framework (React/Vue/etc.) and no bundler — `tsc` only, output loaded via native `<script type="module">`.
- No backend and no persistence — everything lives in one browser session's memory.
- No automated test framework or test dependency is added to the project (per spec). Verification is `tsc` compiling cleanly, plus manual browser walkthroughs and ad hoc `node` commands run at the terminal (not committed to the repo).
- Question bank: 90 questions total — Cloud Concepts 21, Security and Compliance 27, Cloud Technology and Services 31, Billing/Pricing/Support 11.
- Full Exam Simulation always samples exactly 65 questions: 16 Cloud Concepts, 20 Security and Compliance, 22 Cloud Technology and Services, 7 Billing/Pricing/Support.
- Full Exam timer: 90:00 (5400 seconds), auto-submits at zero.
- Scoring: `scaledScore = round((correctCount / totalCount) * 900) + 100`, range 100–1000, pass at `>= 700`. Multi-select ("select two") questions score correct only on an exact match — no partial credit.
- All internal relative imports in `.ts` files use an explicit `.js` extension (e.g. `from "./types.js"`), required for the compiled output to load as native browser ES modules.

---

## Task 1: Project scaffolding, shared types, and app shell

**Files:**
- Create: `cloud-practitioner/package.json`
- Create: `cloud-practitioner/tsconfig.json`
- Create: `cloud-practitioner/.gitignore`
- Create: `cloud-practitioner/index.html`
- Create: `cloud-practitioner/styles.css`
- Create: `cloud-practitioner/src/types.ts`
- Create: `cloud-practitioner/src/main.ts` (temporary stub, replaced in Task 7)

**Interfaces:**
- Produces (used by every later task): from `src/types.ts` —
  `Domain` (union of the four domain string literals), `Option { id, text }`,
  `Question { id, domain, text, options, correctOptionIds, explanation }`,
  `Mode = "full-exam" | "practice"`,
  `DomainBreakdownEntry { domain, correct, total }`,
  `PerQuestionResult { question, selectedOptionIds, isCorrect }`,
  `SessionResult { correctCount, totalCount, scaledScore, passed, domainBreakdown, perQuestion }`.

- [ ] **Step 1: Scaffold the npm project**

```bash
mkdir -p cloud-practitioner/src
cd cloud-practitioner
npm init -y
npm install --save-dev typescript
cd ..
```

- [ ] **Step 2: Edit `cloud-practitioner/package.json`**

Open the generated file and replace its contents with:

```json
{
  "name": "aws-cloud-practitioner-quiz",
  "version": "1.0.0",
  "private": true,
  "description": "Static AWS Certified Cloud Practitioner (CLF-C02) exam simulator.",
  "scripts": {
    "build": "tsc",
    "watch": "tsc --watch"
  },
  "devDependencies": {
    "typescript": "^5.7.0"
  }
}
```

Use whatever `typescript` version `npm install` actually wrote in this
file's `devDependencies` if it differs from `^5.7.0` — don't downgrade it.

- [ ] **Step 3: Create `cloud-practitioner/tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ES2020",
    "moduleResolution": "Node",
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*.ts"]
}
```

- [ ] **Step 4: Create `cloud-practitioner/.gitignore`**

```
node_modules/
dist/
```

- [ ] **Step 5: Create `cloud-practitioner/src/types.ts`**

```ts
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
```

- [ ] **Step 6: Create `cloud-practitioner/src/main.ts` (temporary stub)**

```ts
const app = document.getElementById("app");
if (app) {
  app.textContent = "AWS Cloud Practitioner Exam Simulator — loading…";
}
```

- [ ] **Step 7: Create `cloud-practitioner/index.html`**

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>AWS Cloud Practitioner Exam Simulator</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Lora:ital,wght@0,400;0,600;1,400&display=swap"
    rel="stylesheet"
  />
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <main id="app">Loading…</main>
  <script type="module" src="dist/main.js"></script>
</body>
</html>
```

- [ ] **Step 8: Create `cloud-practitioner/styles.css`**

```css
:root {
  --bg: #edefea;
  --surface: #ffffff;
  --ink: #1b2320;
  --muted: #5b6660;
  --border: #c9cfc6;
  --accent: #2b6e63;
  --accent-contrast: #ffffff;
  --correct: #2f7d4f;
  --incorrect: #b3432b;
  --font-serif: "Lora", Georgia, serif;
  --font-mono: "IBM Plex Mono", "SFMono-Regular", Consolas, monospace;
}

* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
}

body {
  background: var(--bg);
  color: var(--ink);
  font-family: var(--font-serif);
  line-height: 1.5;
}

#app {
  max-width: 640px;
  margin: 0 auto;
  padding: 2rem 1.25rem 4rem;
}

.screen {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

h1,
h2 {
  font-family: var(--font-mono);
  font-weight: 600;
  letter-spacing: -0.01em;
  margin: 0;
}

h1 {
  font-size: 1.375rem;
}

h2 {
  font-size: 1.125rem;
}

p {
  margin: 0;
}

a {
  color: var(--accent);
}

button:focus-visible,
input:focus-visible,
select:focus-visible,
a:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.btn {
  font-family: var(--font-mono);
  font-size: 0.9375rem;
  font-weight: 500;
  background: var(--accent);
  color: var(--accent-contrast);
  border: 1px solid var(--accent);
  border-radius: 4px;
  padding: 0.6rem 1.1rem;
  cursor: pointer;
}

.btn:hover {
  opacity: 0.92;
}

.btn-secondary {
  background: transparent;
  color: var(--incorrect);
  border-color: var(--incorrect);
}

.mode-cards {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: flex-start;
}

.card p {
  color: var(--muted);
}

.card select {
  font-family: var(--font-mono);
  padding: 0.4rem;
  border: 1px solid var(--border);
  border-radius: 4px;
  background: var(--surface);
  color: var(--ink);
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  color: var(--muted);
}

.timer {
  font-family: var(--font-mono);
  font-weight: 600;
  color: var(--accent);
}

.progress,
.domain-label {
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  color: var(--muted);
  margin: 0;
}

.question-text {
  font-family: var(--font-serif);
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1.4;
}

.option {
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 0.75rem 0.9rem;
  background: var(--surface);
  cursor: pointer;
}

.option input {
  accent-color: var(--accent);
  margin-top: 0.2rem;
}

.nav-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  flex-wrap: wrap;
}

@media (max-width: 480px) {
  .nav-buttons {
    justify-content: stretch;
  }

  .nav-buttons .btn {
    flex: 1;
  }
}
```

- [ ] **Step 9: Build and verify the toolchain end to end**

```bash
cd cloud-practitioner
npm run build
```

Expected: no TypeScript errors; `dist/types.js` and `dist/main.js` exist.
Then open `cloud-practitioner/index.html` directly in a browser (e.g.
`open cloud-practitioner/index.html` or drag it into a browser tab) and
confirm the page shows the styled "AWS Cloud Practitioner Exam Simulator —
loading…" text in the serif font, with no console errors.

- [ ] **Step 10: Commit**

```bash
git add cloud-practitioner
git commit -m "Scaffold Cloud Practitioner quiz project with shared types and app shell"
```

---

## Task 2: Cloud Concepts question bank

**Files:**
- Create: `cloud-practitioner/src/questions/cloud-concepts.ts`

**Interfaces:**
- Consumes: `Question` from `../types.js` (Task 1).
- Produces: `cloudConceptsQuestions: Question[]` (21 questions), consumed by Task 5's `questions/index.ts`.

- [ ] **Step 1: Create `cloud-practitioner/src/questions/cloud-concepts.ts`**

```ts
import { Question } from "../types.js";

export const cloudConceptsQuestions: Question[] = [
  {
    id: "cc1",
    domain: "cloud-concepts",
    text: "Which AWS pricing benefit allows customers to pay only for the compute capacity they actually use, with no upfront commitment?",
    options: [
      { id: "a", text: "Economies of scale" },
      { id: "b", text: "Pay-as-you-go pricing" },
      { id: "c", text: "Reserved capacity guarantee" },
      { id: "d", text: "Fixed monthly billing" },
    ],
    correctOptionIds: ["b"],
    explanation: "Pay-as-you-go pricing means you pay only for what you consume, with no long-term contracts required.",
  },
  {
    id: "cc2",
    domain: "cloud-concepts",
    text: "What does 'elasticity' mean in the context of cloud computing?",
    options: [
      { id: "a", text: "The ability to automatically scale resources up or down to match demand" },
      { id: "b", text: "The physical durability of AWS data centers" },
      { id: "c", text: "The ability to run workloads across multiple regions simultaneously" },
      { id: "d", text: "The encryption of data at rest" },
    ],
    correctOptionIds: ["a"],
    explanation: "Elasticity is the ability to grow or shrink infrastructure resources dynamically to meet changing demand.",
  },
  {
    id: "cc3",
    domain: "cloud-concepts",
    text: "A company wants to convert its large upfront hardware purchases into ongoing, usage-based expenses. Which cloud economic benefit does this describe?",
    options: [
      { id: "a", text: "Economies of scale" },
      { id: "b", text: "Trading capital expense for variable expense" },
      { id: "c", text: "Increased speed and agility" },
      { id: "d", text: "Going global in minutes" },
    ],
    correctOptionIds: ["b"],
    explanation: "Cloud computing replaces large upfront capital expenditure with variable operational expense based on actual usage.",
  },
  {
    id: "cc4",
    domain: "cloud-concepts",
    text: "Which AWS Cloud Adoption Framework (AWS CAF) perspective focuses on aligning IT strategy with business goals?",
    options: [
      { id: "a", text: "Technology" },
      { id: "b", text: "Operations" },
      { id: "c", text: "Business" },
      { id: "d", text: "Security" },
    ],
    correctOptionIds: ["c"],
    explanation: "The Business perspective of AWS CAF focuses on ensuring IT aligns with and enables business strategy and outcomes.",
  },
  {
    id: "cc5",
    domain: "cloud-concepts",
    text: "What is the primary advantage of AWS's global infrastructure for a company launching an application to customers on multiple continents?",
    options: [
      { id: "a", text: "It eliminates the need for a content delivery network" },
      { id: "b", text: "It allows the company to deploy in new geographic regions in minutes instead of months" },
      { id: "c", text: "It guarantees zero latency worldwide" },
      { id: "d", text: "It removes the need for an internet connection" },
    ],
    correctOptionIds: ["b"],
    explanation: "AWS's global footprint of Regions lets companies deploy infrastructure close to customers worldwide in minutes.",
  },
  {
    id: "cc6",
    domain: "cloud-concepts",
    text: "An Availability Zone (AZ) consists of one or more discrete data centers with redundant power, networking, and connectivity. What is the main purpose of having multiple AZs within a Region?",
    options: [
      { id: "a", text: "To reduce data transfer costs" },
      { id: "b", text: "To provide high availability and fault tolerance within a Region" },
      { id: "c", text: "To enable multi-factor authentication" },
      { id: "d", text: "To provide a global content delivery network" },
    ],
    correctOptionIds: ["b"],
    explanation: "Spreading resources across multiple, isolated Availability Zones protects applications from a single data center failure.",
  },
  {
    id: "cc7",
    domain: "cloud-concepts",
    text: "Which TWO of the following are pillars of the AWS Well-Architected Framework?",
    options: [
      { id: "a", text: "Operational Excellence" },
      { id: "b", text: "Cost Optimization" },
      { id: "c", text: "Marketing Efficiency" },
      { id: "d", text: "Vendor Lock-in Avoidance" },
      { id: "e", text: "Customer Obsession" },
    ],
    correctOptionIds: ["a", "b"],
    explanation: "The six pillars are Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization, and Sustainability.",
  },
  {
    id: "cc8",
    domain: "cloud-concepts",
    text: "A company is deciding between building its own data center and using AWS. Which factor is a common advantage of AWS over on-premises infrastructure?",
    options: [
      { id: "a", text: "No need to ever patch software" },
      { id: "b", text: "Ability to stop guessing capacity and scale based on actual demand" },
      { id: "c", text: "Guaranteed lower cost regardless of usage" },
      { id: "d", text: "Unlimited free data transfer" },
    ],
    correctOptionIds: ["b"],
    explanation: "Cloud computing removes the need to guess infrastructure capacity in advance; you can scale up or down as actual demand changes.",
  },
  {
    id: "cc9",
    domain: "cloud-concepts",
    text: "Which migration strategy (one of the '6 R's') involves moving an application to the cloud with no code changes?",
    options: [
      { id: "a", text: "Refactor" },
      { id: "b", text: "Rehost ('lift and shift')" },
      { id: "c", text: "Replatform" },
      { id: "d", text: "Retire" },
    ],
    correctOptionIds: ["b"],
    explanation: "Rehosting, or 'lift and shift', moves an application to the cloud as-is, without changing its code or architecture.",
  },
  {
    id: "cc10",
    domain: "cloud-concepts",
    text: "Which migration strategy involves making minor optimizations to take advantage of cloud capabilities without changing the application's core architecture?",
    options: [
      { id: "a", text: "Rehost" },
      { id: "b", text: "Replatform ('lift and reshape')" },
      { id: "c", text: "Repurchase" },
      { id: "d", text: "Retain" },
    ],
    correctOptionIds: ["b"],
    explanation: "Replatforming makes a few targeted cloud optimizations, such as swapping a self-managed database for a managed one, without a full rearchitecture.",
  },
  {
    id: "cc11",
    domain: "cloud-concepts",
    text: "A business decides to stop using a legacy on-premises application and instead subscribe to a SaaS alternative. Which migration strategy does this represent?",
    options: [
      { id: "a", text: "Retire" },
      { id: "b", text: "Repurchase" },
      { id: "c", text: "Rehost" },
      { id: "d", text: "Refactor" },
    ],
    correctOptionIds: ["b"],
    explanation: "Repurchasing means replacing an existing application with a different product, typically a SaaS offering.",
  },
  {
    id: "cc12",
    domain: "cloud-concepts",
    text: "Which cloud computing benefit refers to the increased speed and ease with which IT resources can be provisioned, enabling faster experimentation?",
    options: [
      { id: "a", text: "Agility" },
      { id: "b", text: "Elasticity" },
      { id: "c", text: "Durability" },
      { id: "d", text: "Compliance" },
    ],
    correctOptionIds: ["a"],
    explanation: "Agility describes how quickly teams can provision resources, experiment, and iterate compared to traditional infrastructure.",
  },
  {
    id: "cc13",
    domain: "cloud-concepts",
    text: "What is a key characteristic that differentiates fault tolerance from high availability?",
    options: [
      { id: "a", text: "Fault-tolerant systems continue operating with zero downtime even if a component fails, while highly available systems minimize but may not eliminate downtime" },
      { id: "b", text: "Fault tolerance only applies to storage services" },
      { id: "c", text: "High availability requires multiple AWS accounts" },
      { id: "d", text: "Fault tolerance is only achieved through manual intervention" },
    ],
    correctOptionIds: ["a"],
    explanation: "Fault tolerance masks failures entirely with no downtime, while high availability aims to minimize downtime but may involve a brief interruption.",
  },
  {
    id: "cc14",
    domain: "cloud-concepts",
    text: "Which TWO of the following are perspectives in the AWS Cloud Adoption Framework (AWS CAF)?",
    options: [
      { id: "a", text: "Governance" },
      { id: "b", text: "Platform" },
      { id: "c", text: "Advertising" },
      { id: "d", text: "Sales Enablement" },
      { id: "e", text: "Human Resources" },
    ],
    correctOptionIds: ["a", "b"],
    explanation: "The six CAF perspectives are Business, People, Governance, Platform, Security, and Operations.",
  },
  {
    id: "cc15",
    domain: "cloud-concepts",
    text: "A startup wants to test a new idea with minimal upfront investment. Which cloud benefit best supports this goal?",
    options: [
      { id: "a", text: "Stop spending money running and maintaining data centers" },
      { id: "b", text: "Guaranteed 100% uptime" },
      { id: "c", text: "Mandatory long-term contracts" },
      { id: "d", text: "Fixed hardware refresh cycles" },
    ],
    correctOptionIds: ["a"],
    explanation: "By not owning data centers, a startup avoids large upfront investments and can redirect resources toward its product.",
  },
  {
    id: "cc16",
    domain: "cloud-concepts",
    text: "What is the relationship between a Region and Availability Zones in AWS?",
    options: [
      { id: "a", text: "A Region contains multiple, isolated Availability Zones" },
      { id: "b", text: "An Availability Zone contains multiple Regions" },
      { id: "c", text: "Regions and Availability Zones are the same thing" },
      { id: "d", text: "Availability Zones exist outside of Regions" },
    ],
    correctOptionIds: ["a"],
    explanation: "Each AWS Region is a separate geographic area made up of multiple isolated Availability Zones.",
  },
  {
    id: "cc17",
    domain: "cloud-concepts",
    text: "Which of the following best describes an AWS edge location?",
    options: [
      { id: "a", text: "A primary data center used exclusively for compute workloads" },
      { id: "b", text: "A site used by Amazon CloudFront and other services to cache content closer to end users" },
      { id: "c", text: "A backup Region used only for disaster recovery" },
      { id: "d", text: "A physical office where AWS support staff work" },
    ],
    correctOptionIds: ["b"],
    explanation: "Edge locations cache content near end users to reduce latency for services like Amazon CloudFront.",
  },
  {
    id: "cc18",
    domain: "cloud-concepts",
    text: "A company currently runs all its workloads on-premises but occasionally bursts to the cloud during peak demand. Which deployment model does this describe?",
    options: [
      { id: "a", text: "All-in cloud" },
      { id: "b", text: "On-premises only" },
      { id: "c", text: "Hybrid" },
      { id: "d", text: "Multi-cloud" },
    ],
    correctOptionIds: ["c"],
    explanation: "A hybrid deployment combines on-premises infrastructure with cloud resources, often used for cloud bursting.",
  },
  {
    id: "cc19",
    domain: "cloud-concepts",
    text: "Which TWO of the following are benefits commonly associated with cloud computing over traditional on-premises IT?",
    options: [
      { id: "a", text: "Trade capital expense for variable expense" },
      { id: "b", text: "Benefit from massive economies of scale" },
      { id: "c", text: "Guaranteed zero cost" },
      { id: "d", text: "Elimination of the shared responsibility model" },
      { id: "e", text: "No need for any security controls" },
    ],
    correctOptionIds: ["a", "b"],
    explanation: "Cloud computing's core benefits include trading capex for variable opex and benefiting from AWS's economies of scale.",
  },
  {
    id: "cc20",
    domain: "cloud-concepts",
    text: "Which statement best describes 'economies of scale' as an AWS Cloud benefit?",
    options: [
      { id: "a", text: "As AWS grows, higher volumes lead to lower costs, which AWS can pass on as lower pricing to customers" },
      { id: "b", text: "Each customer negotiates a unique lower price directly" },
      { id: "c", text: "Costs decrease only for customers using a single AWS service" },
      { id: "d", text: "Economies of scale apply only to compute services" },
    ],
    correctOptionIds: ["a"],
    explanation: "AWS's massive scale of operation drives down per-unit costs, savings that are passed on to customers through lower prices.",
  },
  {
    id: "cc21",
    domain: "cloud-concepts",
    text: "What is the main purpose of the AWS Well-Architected Framework?",
    options: [
      { id: "a", text: "To provide a consistent approach for evaluating and improving cloud architectures against best practices" },
      { id: "b", text: "To replace the AWS Shared Responsibility Model" },
      { id: "c", text: "To calculate exact monthly billing" },
      { id: "d", text: "To manage IAM permissions automatically" },
    ],
    correctOptionIds: ["a"],
    explanation: "The Well-Architected Framework gives a consistent set of questions and best practices for reviewing cloud architectures.",
  },
];
```

- [ ] **Step 2: Build and verify**

```bash
cd cloud-practitioner
npm run build
node --input-type=module -e "
import { cloudConceptsQuestions as qs } from './dist/questions/cloud-concepts.js';
if (qs.length !== 21) throw new Error('expected 21 questions, got ' + qs.length);
for (const q of qs) {
  const ids = new Set(q.options.map((o) => o.id));
  if (ids.size !== q.options.length) throw new Error('duplicate option ids in ' + q.id);
  if (![1, 2].includes(q.correctOptionIds.length)) throw new Error('unexpected correct-answer count in ' + q.id);
  for (const c of q.correctOptionIds) {
    if (!ids.has(c)) throw new Error('correctOptionIds references missing option in ' + q.id);
  }
}
console.log('cloud-concepts bank OK:', qs.length, 'questions');
"
```

Expected: `tsc` compiles cleanly and the script prints `cloud-concepts bank
OK: 21 questions` with no thrown error. This check is run ad hoc at the
terminal — it is not added as a file to the repo (per the spec's "no
automated test framework" constraint).

- [ ] **Step 3: Commit**

```bash
git add cloud-practitioner/src/questions/cloud-concepts.ts
git commit -m "Add Cloud Concepts question bank"
```

---

## Task 3: Security and Compliance question bank

**Files:**
- Create: `cloud-practitioner/src/questions/security-and-compliance.ts`

**Interfaces:**
- Consumes: `Question` from `../types.js` (Task 1).
- Produces: `securityAndComplianceQuestions: Question[]` (27 questions), consumed by Task 5's `questions/index.ts`.

- [ ] **Step 1: Create `cloud-practitioner/src/questions/security-and-compliance.ts`**

```ts
import { Question } from "../types.js";

export const securityAndComplianceQuestions: Question[] = [
  {
    id: "sec1",
    domain: "security-and-compliance",
    text: "Under the AWS Shared Responsibility Model, which of the following is AWS responsible for?",
    options: [
      { id: "a", text: "Configuring security groups" },
      { id: "b", text: "Security 'of' the cloud, including the physical infrastructure and host infrastructure" },
      { id: "c", text: "Guest operating system patching" },
      { id: "d", text: "Customer data encryption choices" },
    ],
    correctOptionIds: ["b"],
    explanation: "AWS secures the underlying infrastructure ('security of the cloud'); the customer secures what they put in it ('security in the cloud').",
  },
  {
    id: "sec2",
    domain: "security-and-compliance",
    text: "Under the AWS Shared Responsibility Model, which of the following is the customer responsible for?",
    options: [
      { id: "a", text: "Physical security of AWS data centers" },
      { id: "b", text: "Maintaining the underlying hardware" },
      { id: "c", text: "Configuring security groups and managing IAM permissions" },
      { id: "d", text: "Decommissioning storage devices" },
    ],
    correctOptionIds: ["c"],
    explanation: "Customers are responsible for their own configuration choices, such as security groups, IAM, and data protection.",
  },
  {
    id: "sec3",
    domain: "security-and-compliance",
    text: "What is the best practice regarding the AWS account root user?",
    options: [
      { id: "a", text: "Use it for daily administrative tasks" },
      { id: "b", text: "Share its credentials with the whole team" },
      { id: "c", text: "Enable multi-factor authentication (MFA) and avoid using it for everyday tasks" },
      { id: "d", text: "Disable it entirely, since it cannot be secured" },
    ],
    correctOptionIds: ["c"],
    explanation: "AWS recommends locking down the root user with MFA and using IAM identities for day-to-day work.",
  },
  {
    id: "sec4",
    domain: "security-and-compliance",
    text: "Which AWS Identity and Access Management (IAM) feature allows you to grant temporary permissions to an AWS service or federated user without sharing long-term credentials?",
    options: [
      { id: "a", text: "IAM group" },
      { id: "b", text: "IAM role" },
      { id: "c", text: "IAM policy" },
      { id: "d", text: "IAM user" },
    ],
    correctOptionIds: ["b"],
    explanation: "IAM roles provide temporary credentials that can be assumed by trusted services, applications, or federated users.",
  },
  {
    id: "sec5",
    domain: "security-and-compliance",
    text: "What is the recommended way to grant permissions to multiple IAM users who perform the same job function?",
    options: [
      { id: "a", text: "Assign policies to each user individually" },
      { id: "b", text: "Create an IAM group, attach a policy to the group, and add users to the group" },
      { id: "c", text: "Share one IAM user's credentials among the team" },
      { id: "d", text: "Grant root access to each user" },
    ],
    correctOptionIds: ["b"],
    explanation: "IAM groups let you manage permissions for many users at once instead of repeating policy assignments per user.",
  },
  {
    id: "sec6",
    domain: "security-and-compliance",
    text: "Which AWS service provides a centralized view of security alerts and compliance status across multiple AWS accounts?",
    options: [
      { id: "a", text: "AWS Security Hub" },
      { id: "b", text: "AWS Config" },
      { id: "c", text: "AWS CloudTrail" },
      { id: "d", text: "Amazon Inspector" },
    ],
    correctOptionIds: ["a"],
    explanation: "AWS Security Hub aggregates and prioritizes security findings from multiple AWS services and accounts in one place.",
  },
  {
    id: "sec7",
    domain: "security-and-compliance",
    text: "Which AWS service uses machine learning to continuously monitor for malicious or unauthorized behavior, such as unusual API calls, within your AWS accounts?",
    options: [
      { id: "a", text: "Amazon Macie" },
      { id: "b", text: "Amazon GuardDuty" },
      { id: "c", text: "AWS Config" },
      { id: "d", text: "AWS Trusted Advisor" },
    ],
    correctOptionIds: ["b"],
    explanation: "Amazon GuardDuty is a threat detection service that continuously monitors for malicious activity and anomalous behavior.",
  },
  {
    id: "sec8",
    domain: "security-and-compliance",
    text: "Which AWS service is designed specifically to discover and protect sensitive data, such as personally identifiable information (PII), stored in Amazon S3?",
    options: [
      { id: "a", text: "Amazon GuardDuty" },
      { id: "b", text: "Amazon Macie" },
      { id: "c", text: "AWS Shield" },
      { id: "d", text: "Amazon Inspector" },
    ],
    correctOptionIds: ["b"],
    explanation: "Amazon Macie uses machine learning to discover, classify, and help protect sensitive data stored in Amazon S3.",
  },
  {
    id: "sec9",
    domain: "security-and-compliance",
    text: "Which service automatically assesses applications for vulnerabilities and deviations from best practices on EC2 instances and container images?",
    options: [
      { id: "a", text: "Amazon Inspector" },
      { id: "b", text: "AWS Config" },
      { id: "c", text: "AWS Artifact" },
      { id: "d", text: "AWS Trusted Advisor" },
    ],
    correctOptionIds: ["a"],
    explanation: "Amazon Inspector automatically scans workloads for software vulnerabilities and unintended network exposure.",
  },
  {
    id: "sec10",
    domain: "security-and-compliance",
    text: "Where can a customer download AWS compliance reports and agreements, such as SOC reports and PCI DSS attestations?",
    options: [
      { id: "a", text: "AWS Trusted Advisor" },
      { id: "b", text: "AWS Artifact" },
      { id: "c", text: "AWS Config" },
      { id: "d", text: "AWS CloudTrail" },
    ],
    correctOptionIds: ["b"],
    explanation: "AWS Artifact is the self-service portal for on-demand access to AWS compliance reports and agreements.",
  },
  {
    id: "sec11",
    domain: "security-and-compliance",
    text: "Which AWS service provides managed Distributed Denial of Service (DDoS) protection?",
    options: [
      { id: "a", text: "AWS WAF" },
      { id: "b", text: "AWS Shield" },
      { id: "c", text: "AWS Firewall Manager" },
      { id: "d", text: "Amazon GuardDuty" },
    ],
    correctOptionIds: ["b"],
    explanation: "AWS Shield protects applications running on AWS against Distributed Denial of Service (DDoS) attacks.",
  },
  {
    id: "sec12",
    domain: "security-and-compliance",
    text: "Which service allows you to create rules that filter malicious web traffic, such as SQL injection or cross-site scripting attempts, to your web applications?",
    options: [
      { id: "a", text: "AWS Shield" },
      { id: "b", text: "AWS WAF (Web Application Firewall)" },
      { id: "c", text: "Amazon Inspector" },
      { id: "d", text: "AWS Config" },
    ],
    correctOptionIds: ["b"],
    explanation: "AWS WAF lets you define rules that filter and monitor HTTP/HTTPS requests forwarded to protected web applications.",
  },
  {
    id: "sec13",
    domain: "security-and-compliance",
    text: "What is the purpose of AWS Key Management Service (KMS)?",
    options: [
      { id: "a", text: "To create and manage cryptographic keys used to encrypt data" },
      { id: "b", text: "To monitor network traffic for threats" },
      { id: "c", text: "To manage IAM user passwords" },
      { id: "d", text: "To store compliance documentation" },
    ],
    correctOptionIds: ["a"],
    explanation: "AWS KMS lets you create, manage, and control the cryptographic keys used to encrypt your data.",
  },
  {
    id: "sec14",
    domain: "security-and-compliance",
    text: "Which service helps you store, rotate, and retrieve database credentials, API keys, and other secrets programmatically instead of hard-coding them?",
    options: [
      { id: "a", text: "AWS Secrets Manager" },
      { id: "b", text: "AWS KMS" },
      { id: "c", text: "AWS IAM" },
      { id: "d", text: "AWS Certificate Manager" },
    ],
    correctOptionIds: ["a"],
    explanation: "AWS Secrets Manager securely stores, retrieves, and automatically rotates secrets such as database credentials.",
  },
  {
    id: "sec15",
    domain: "security-and-compliance",
    text: "What does the principle of least privilege mean in AWS IAM?",
    options: [
      { id: "a", text: "Granting users full administrator access by default" },
      { id: "b", text: "Granting only the permissions required to perform a specific task, and nothing more" },
      { id: "c", text: "Granting root access to all new users" },
      { id: "d", text: "Disabling all permissions until manually enabled" },
    ],
    correctOptionIds: ["b"],
    explanation: "Least privilege means granting only the minimum permissions needed to accomplish a task, reducing security risk.",
  },
  {
    id: "sec16",
    domain: "security-and-compliance",
    text: "Which TWO of the following are examples of factors used in AWS Multi-Factor Authentication (MFA)?",
    options: [
      { id: "a", text: "Something you know (a password)" },
      { id: "b", text: "Something you have (a hardware or virtual MFA device)" },
      { id: "c", text: "Something you inherited from a parent AWS account" },
      { id: "d", text: "Something you purchased separately from AWS" },
      { id: "e", text: "Something your manager approved" },
    ],
    correctOptionIds: ["a", "b"],
    explanation: "MFA combines a password (something you know) with a physical or virtual device (something you have).",
  },
  {
    id: "sec17",
    domain: "security-and-compliance",
    text: "Which AWS service records account activity and API calls for auditing purposes, including who made a request, what actions were taken, and when?",
    options: [
      { id: "a", text: "AWS CloudTrail" },
      { id: "b", text: "Amazon CloudWatch" },
      { id: "c", text: "AWS Config" },
      { id: "d", text: "AWS X-Ray" },
    ],
    correctOptionIds: ["a"],
    explanation: "AWS CloudTrail logs API calls and account activity for governance, compliance, and auditing.",
  },
  {
    id: "sec18",
    domain: "security-and-compliance",
    text: "Which AWS service continuously monitors and records your AWS resource configurations, allowing you to assess compliance against desired configurations?",
    options: [
      { id: "a", text: "AWS Config" },
      { id: "b", text: "AWS CloudTrail" },
      { id: "c", text: "Amazon Inspector" },
      { id: "d", text: "AWS Trusted Advisor" },
    ],
    correctOptionIds: ["a"],
    explanation: "AWS Config tracks resource configuration changes over time and evaluates them against compliance rules.",
  },
  {
    id: "sec19",
    domain: "security-and-compliance",
    text: "What is the difference between a security group and a network ACL (NACL) in Amazon VPC?",
    options: [
      { id: "a", text: "Security groups operate at the subnet level only, while NACLs operate at the instance level" },
      { id: "b", text: "Security groups are stateful and act at the instance level, while NACLs are stateless and act at the subnet level" },
      { id: "c", text: "NACLs are stateful and security groups are stateless" },
      { id: "d", text: "There is no difference; they are interchangeable" },
    ],
    correctOptionIds: ["b"],
    explanation: "Security groups are stateful firewalls attached to instances; NACLs are stateless firewalls applied at the subnet boundary.",
  },
  {
    id: "sec20",
    domain: "security-and-compliance",
    text: "Which AWS Organizations feature allows an administrator to restrict which AWS services and actions can be used across multiple accounts?",
    options: [
      { id: "a", text: "IAM policies" },
      { id: "b", text: "Service Control Policies (SCPs)" },
      { id: "c", text: "Resource-based policies" },
      { id: "d", text: "AWS Config rules" },
    ],
    correctOptionIds: ["b"],
    explanation: "Service Control Policies set the maximum available permissions for accounts within an AWS Organization.",
  },
  {
    id: "sec21",
    domain: "security-and-compliance",
    text: "A company wants to allow its application running on an EC2 instance to access an S3 bucket without embedding AWS access keys in the application code. What should they use?",
    options: [
      { id: "a", text: "An IAM user with access keys stored in the code" },
      { id: "b", text: "An IAM role attached to the EC2 instance" },
      { id: "c", text: "The AWS account root user credentials" },
      { id: "d", text: "A shared secret key emailed to developers" },
    ],
    correctOptionIds: ["b"],
    explanation: "Attaching an IAM role to an EC2 instance provides temporary credentials automatically, avoiding hard-coded keys.",
  },
  {
    id: "sec22",
    domain: "security-and-compliance",
    text: "What does encryption 'in transit' protect against?",
    options: [
      { id: "a", text: "Unauthorized access to data while it moves across a network" },
      { id: "b", text: "Unauthorized access to data stored on disk" },
      { id: "c", text: "Loss of data due to hardware failure" },
      { id: "d", text: "Accidental deletion of data" },
    ],
    correctOptionIds: ["a"],
    explanation: "Encryption in transit protects data as it travels across a network from being intercepted or read.",
  },
  {
    id: "sec23",
    domain: "security-and-compliance",
    text: "Which of the following is a benefit of using AWS Identity and Access Management (IAM) identity federation?",
    options: [
      { id: "a", text: "It allows users to sign in using existing corporate or social identities instead of creating new AWS-specific credentials" },
      { id: "b", text: "It removes the need for any access control" },
      { id: "c", text: "It grants root access to federated users automatically" },
      { id: "d", text: "It disables MFA requirements" },
    ],
    correctOptionIds: ["a"],
    explanation: "Identity federation lets users authenticate with an existing identity provider and receive temporary AWS access.",
  },
  {
    id: "sec24",
    domain: "security-and-compliance",
    text: "Which TWO of the following are AWS services primarily used to help meet compliance and governance requirements?",
    options: [
      { id: "a", text: "AWS Artifact" },
      { id: "b", text: "AWS Config" },
      { id: "c", text: "Amazon Route 53" },
      { id: "d", text: "Amazon EC2 Auto Scaling" },
      { id: "e", text: "Amazon Lightsail" },
    ],
    correctOptionIds: ["a", "b"],
    explanation: "AWS Artifact provides compliance documentation, and AWS Config tracks configuration compliance over time.",
  },
  {
    id: "sec25",
    domain: "security-and-compliance",
    text: "What type of IAM policy is attached directly to an AWS resource (such as an S3 bucket) rather than to an IAM identity?",
    options: [
      { id: "a", text: "Identity-based policy" },
      { id: "b", text: "Resource-based policy" },
      { id: "c", text: "Permissions boundary" },
      { id: "d", text: "Service control policy" },
    ],
    correctOptionIds: ["b"],
    explanation: "Resource-based policies are attached directly to a resource, such as an S3 bucket policy, rather than to a user or role.",
  },
  {
    id: "sec26",
    domain: "security-and-compliance",
    text: "A company must ensure that data stored in Amazon S3 is automatically encrypted at rest. Which feature helps accomplish this?",
    options: [
      { id: "a", text: "Server-side encryption" },
      { id: "b", text: "Security groups" },
      { id: "c", text: "VPC peering" },
      { id: "d", text: "AWS Direct Connect" },
    ],
    correctOptionIds: ["a"],
    explanation: "Server-side encryption automatically encrypts objects before they are written to disk in Amazon S3.",
  },
  {
    id: "sec27",
    domain: "security-and-compliance",
    text: "Which TWO practices help protect the AWS account root user?",
    options: [
      { id: "a", text: "Enabling multi-factor authentication (MFA) on the root user" },
      { id: "b", text: "Using the root user for daily development tasks" },
      { id: "c", text: "Deleting the root user's access keys if they are not needed" },
      { id: "d", text: "Sharing the root user password across the team for convenience" },
      { id: "e", text: "Disabling CloudTrail logging for the root user" },
    ],
    correctOptionIds: ["a", "c"],
    explanation: "Enabling MFA and removing unused root access keys are core best practices for protecting the root user.",
  },
];
```

- [ ] **Step 2: Build and verify**

```bash
cd cloud-practitioner
npm run build
node --input-type=module -e "
import { securityAndComplianceQuestions as qs } from './dist/questions/security-and-compliance.js';
if (qs.length !== 27) throw new Error('expected 27 questions, got ' + qs.length);
for (const q of qs) {
  const ids = new Set(q.options.map((o) => o.id));
  if (ids.size !== q.options.length) throw new Error('duplicate option ids in ' + q.id);
  if (![1, 2].includes(q.correctOptionIds.length)) throw new Error('unexpected correct-answer count in ' + q.id);
  for (const c of q.correctOptionIds) {
    if (!ids.has(c)) throw new Error('correctOptionIds references missing option in ' + q.id);
  }
}
console.log('security-and-compliance bank OK:', qs.length, 'questions');
"
```

Expected: prints `security-and-compliance bank OK: 27 questions` with no
thrown error.

- [ ] **Step 3: Commit**

```bash
git add cloud-practitioner/src/questions/security-and-compliance.ts
git commit -m "Add Security and Compliance question bank"
```

---

## Task 4: Cloud Technology and Services question bank

**Files:**
- Create: `cloud-practitioner/src/questions/technology-and-services.ts`

**Interfaces:**
- Consumes: `Question` from `../types.js` (Task 1).
- Produces: `cloudTechnologyAndServicesQuestions: Question[]` (31 questions), consumed by Task 5's `questions/index.ts`.

- [ ] **Step 1: Create `cloud-practitioner/src/questions/technology-and-services.ts`**

```ts
import { Question } from "../types.js";

export const cloudTechnologyAndServicesQuestions: Question[] = [
  {
    id: "tech1",
    domain: "cloud-technology-and-services",
    text: "Which AWS compute service lets you run code without provisioning or managing servers, charging you only for the compute time consumed?",
    options: [
      { id: "a", text: "Amazon EC2" },
      { id: "b", text: "AWS Lambda" },
      { id: "c", text: "Amazon Lightsail" },
      { id: "d", text: "AWS Elastic Beanstalk" },
    ],
    correctOptionIds: ["b"],
    explanation: "AWS Lambda runs your code in response to events without you provisioning or managing servers, billed per use.",
  },
  {
    id: "tech2",
    domain: "cloud-technology-and-services",
    text: "Which AWS service provides resizable virtual servers in the cloud, giving you full control over the operating system?",
    options: [
      { id: "a", text: "Amazon EC2" },
      { id: "b", text: "AWS Lambda" },
      { id: "c", text: "Amazon S3" },
      { id: "d", text: "Amazon RDS" },
    ],
    correctOptionIds: ["a"],
    explanation: "Amazon EC2 provides resizable virtual servers (instances) with full control over the guest operating system.",
  },
  {
    id: "tech3",
    domain: "cloud-technology-and-services",
    text: "Which service automatically adjusts the number of EC2 instances in a group based on demand?",
    options: [
      { id: "a", text: "Elastic Load Balancing" },
      { id: "b", text: "Amazon EC2 Auto Scaling" },
      { id: "c", text: "AWS Lambda" },
      { id: "d", text: "Amazon CloudFront" },
    ],
    correctOptionIds: ["b"],
    explanation: "Amazon EC2 Auto Scaling adds or removes instances automatically to match changing demand.",
  },
  {
    id: "tech4",
    domain: "cloud-technology-and-services",
    text: "What is the primary function of Elastic Load Balancing (ELB)?",
    options: [
      { id: "a", text: "To store static website files" },
      { id: "b", text: "To automatically distribute incoming application traffic across multiple targets, such as EC2 instances" },
      { id: "c", text: "To encrypt data at rest" },
      { id: "d", text: "To provide a managed relational database" },
    ],
    correctOptionIds: ["b"],
    explanation: "Elastic Load Balancing distributes incoming traffic across multiple targets to improve availability and fault tolerance.",
  },
  {
    id: "tech5",
    domain: "cloud-technology-and-services",
    text: "Which AWS service is a fully managed container orchestration option that runs Amazon ECS and Kubernetes-compatible workloads without requiring you to manage the underlying servers?",
    options: [
      { id: "a", text: "AWS Fargate" },
      { id: "b", text: "Amazon EC2" },
      { id: "c", text: "AWS Lambda" },
      { id: "d", text: "Amazon Lightsail" },
    ],
    correctOptionIds: ["a"],
    explanation: "AWS Fargate is a serverless compute engine for containers that removes the need to provision or manage servers.",
  },
  {
    id: "tech6",
    domain: "cloud-technology-and-services",
    text: "A developer wants the simplest way to deploy a web application to AWS without manually configuring the underlying infrastructure like load balancers and EC2 instances. Which service should they use?",
    options: [
      { id: "a", text: "AWS Elastic Beanstalk" },
      { id: "b", text: "Amazon VPC" },
      { id: "c", text: "AWS Direct Connect" },
      { id: "d", text: "Amazon Route 53" },
    ],
    correctOptionIds: ["a"],
    explanation: "AWS Elastic Beanstalk automatically handles provisioning, load balancing, and scaling for deployed applications.",
  },
  {
    id: "tech7",
    domain: "cloud-technology-and-services",
    text: "Which Amazon S3 storage class is best suited for data that is accessed infrequently but requires rapid access when needed?",
    options: [
      { id: "a", text: "S3 Standard" },
      { id: "b", text: "S3 Standard-Infrequent Access (S3 Standard-IA)" },
      { id: "c", text: "S3 Glacier Deep Archive" },
      { id: "d", text: "S3 Intelligent-Tiering configured only for frequent access" },
    ],
    correctOptionIds: ["b"],
    explanation: "S3 Standard-IA offers lower storage cost for infrequently accessed data while still allowing millisecond retrieval.",
  },
  {
    id: "tech8",
    domain: "cloud-technology-and-services",
    text: "Which S3 storage class is designed for long-term archival data that is rarely accessed and can tolerate retrieval times of many hours?",
    options: [
      { id: "a", text: "S3 Standard" },
      { id: "b", text: "S3 One Zone-IA" },
      { id: "c", text: "S3 Glacier Deep Archive" },
      { id: "d", text: "S3 Standard-IA" },
    ],
    correctOptionIds: ["c"],
    explanation: "S3 Glacier Deep Archive is the lowest-cost S3 storage class, meant for long-term archives rarely accessed.",
  },
  {
    id: "tech9",
    domain: "cloud-technology-and-services",
    text: "Which TWO of the following statements about Amazon EBS are true?",
    options: [
      { id: "a", text: "EBS volumes provide block-level storage for use with EC2 instances" },
      { id: "b", text: "EBS volumes can be attached to multiple Availability Zones simultaneously" },
      { id: "c", text: "EBS volumes can persist independently of the life of the instance, when configured to do so" },
      { id: "d", text: "EBS is an object storage service like Amazon S3" },
      { id: "e", text: "EBS volumes cannot be backed up" },
    ],
    correctOptionIds: ["a", "c"],
    explanation: "EBS provides block storage for EC2, and volumes can be configured to persist after an instance is terminated.",
  },
  {
    id: "tech10",
    domain: "cloud-technology-and-services",
    text: "Which AWS storage service provides a scalable, fully managed file system that can be mounted concurrently by multiple EC2 instances?",
    options: [
      { id: "a", text: "Amazon S3" },
      { id: "b", text: "Amazon EFS (Elastic File System)" },
      { id: "c", text: "Amazon EBS" },
      { id: "d", text: "AWS Storage Gateway" },
    ],
    correctOptionIds: ["b"],
    explanation: "Amazon EFS is a managed, elastic file system that many EC2 instances can mount and share at once.",
  },
  {
    id: "tech11",
    domain: "cloud-technology-and-services",
    text: "Which service helps organizations integrate on-premises storage environments with AWS cloud storage?",
    options: [
      { id: "a", text: "AWS Storage Gateway" },
      { id: "b", text: "Amazon S3 Transfer Acceleration" },
      { id: "c", text: "AWS Snowball" },
      { id: "d", text: "Amazon FSx" },
    ],
    correctOptionIds: ["a"],
    explanation: "AWS Storage Gateway is a hybrid cloud storage service connecting on-premises environments with AWS storage.",
  },
  {
    id: "tech12",
    domain: "cloud-technology-and-services",
    text: "Which AWS database service is a fully managed relational database that supports engines such as MySQL, PostgreSQL, and SQL Server?",
    options: [
      { id: "a", text: "Amazon DynamoDB" },
      { id: "b", text: "Amazon RDS" },
      { id: "c", text: "Amazon Redshift" },
      { id: "d", text: "Amazon ElastiCache" },
    ],
    correctOptionIds: ["b"],
    explanation: "Amazon RDS is a managed relational database service supporting multiple engines including MySQL and PostgreSQL.",
  },
  {
    id: "tech13",
    domain: "cloud-technology-and-services",
    text: "Which AWS database service is a key-value and document NoSQL database designed for single-digit millisecond performance at any scale?",
    options: [
      { id: "a", text: "Amazon RDS" },
      { id: "b", text: "Amazon DynamoDB" },
      { id: "c", text: "Amazon Redshift" },
      { id: "d", text: "Amazon Aurora" },
    ],
    correctOptionIds: ["b"],
    explanation: "Amazon DynamoDB is a fully managed NoSQL key-value and document database built for fast, consistent performance.",
  },
  {
    id: "tech14",
    domain: "cloud-technology-and-services",
    text: "Which TWO caching engines are supported by Amazon ElastiCache?",
    options: [
      { id: "a", text: "Redis" },
      { id: "b", text: "Memcached" },
      { id: "c", text: "MySQL" },
      { id: "d", text: "PostgreSQL" },
      { id: "e", text: "MongoDB" },
    ],
    correctOptionIds: ["a", "b"],
    explanation: "Amazon ElastiCache supports the Redis and Memcached in-memory caching engines.",
  },
  {
    id: "tech15",
    domain: "cloud-technology-and-services",
    text: "Which AWS service is purpose-built as a fully managed data warehouse for running complex analytic queries against large volumes of data?",
    options: [
      { id: "a", text: "Amazon RDS" },
      { id: "b", text: "Amazon Redshift" },
      { id: "c", text: "Amazon DynamoDB" },
      { id: "d", text: "Amazon Aurora" },
    ],
    correctOptionIds: ["b"],
    explanation: "Amazon Redshift is a managed data warehouse service optimized for large-scale analytic queries.",
  },
  {
    id: "tech16",
    domain: "cloud-technology-and-services",
    text: "Which AWS networking service lets you provision a logically isolated section of the AWS Cloud where you can launch resources in a virtual network you define?",
    options: [
      { id: "a", text: "Amazon VPC" },
      { id: "b", text: "Amazon Route 53" },
      { id: "c", text: "AWS Direct Connect" },
      { id: "d", text: "Amazon CloudFront" },
    ],
    correctOptionIds: ["a"],
    explanation: "Amazon VPC lets you define and control a logically isolated virtual network within AWS.",
  },
  {
    id: "tech17",
    domain: "cloud-technology-and-services",
    text: "Which AWS service is a scalable Domain Name System (DNS) web service used to route end users to internet applications?",
    options: [
      { id: "a", text: "Amazon CloudFront" },
      { id: "b", text: "Amazon Route 53" },
      { id: "c", text: "AWS Global Accelerator" },
      { id: "d", text: "Amazon API Gateway" },
    ],
    correctOptionIds: ["b"],
    explanation: "Amazon Route 53 is AWS's scalable DNS and domain registration service.",
  },
  {
    id: "tech18",
    domain: "cloud-technology-and-services",
    text: "Which AWS service is a content delivery network (CDN) that securely delivers data, videos, and applications to users with low latency by caching content at edge locations?",
    options: [
      { id: "a", text: "Amazon Route 53" },
      { id: "b", text: "Amazon CloudFront" },
      { id: "c", text: "AWS Direct Connect" },
      { id: "d", text: "Amazon VPC" },
    ],
    correctOptionIds: ["b"],
    explanation: "Amazon CloudFront is AWS's CDN, caching content at edge locations to reduce latency for end users.",
  },
  {
    id: "tech19",
    domain: "cloud-technology-and-services",
    text: "Which service provides a dedicated, private network connection between an on-premises data center and AWS, bypassing the public internet?",
    options: [
      { id: "a", text: "AWS VPN" },
      { id: "b", text: "AWS Direct Connect" },
      { id: "c", text: "Amazon CloudFront" },
      { id: "d", text: "AWS Transit Gateway" },
    ],
    correctOptionIds: ["b"],
    explanation: "AWS Direct Connect establishes a dedicated private network connection between on-premises infrastructure and AWS.",
  },
  {
    id: "tech20",
    domain: "cloud-technology-and-services",
    text: "Which AWS service allows developers to create, publish, and manage APIs at scale, including handling authorization, throttling, and monitoring?",
    options: [
      { id: "a", text: "Amazon API Gateway" },
      { id: "b", text: "AWS AppSync" },
      { id: "c", text: "Amazon Route 53" },
      { id: "d", text: "AWS Lambda" },
    ],
    correctOptionIds: ["a"],
    explanation: "Amazon API Gateway lets you create, publish, and manage APIs, including authorization, throttling, and monitoring.",
  },
  {
    id: "tech21",
    domain: "cloud-technology-and-services",
    text: "Which AWS service provides detailed monitoring through metrics, logs, and alarms for AWS resources and applications?",
    options: [
      { id: "a", text: "AWS CloudTrail" },
      { id: "b", text: "Amazon CloudWatch" },
      { id: "c", text: "AWS Config" },
      { id: "d", text: "AWS X-Ray" },
    ],
    correctOptionIds: ["b"],
    explanation: "Amazon CloudWatch collects metrics and logs and lets you set alarms to monitor AWS resources and applications.",
  },
  {
    id: "tech22",
    domain: "cloud-technology-and-services",
    text: "Which service lets you model, provision, and manage AWS resources by treating infrastructure as code using declarative templates?",
    options: [
      { id: "a", text: "AWS CloudFormation" },
      { id: "b", text: "AWS Systems Manager" },
      { id: "c", text: "AWS OpsWorks" },
      { id: "d", text: "AWS Config" },
    ],
    correctOptionIds: ["a"],
    explanation: "AWS CloudFormation provisions and manages AWS resources using declarative infrastructure-as-code templates.",
  },
  {
    id: "tech23",
    domain: "cloud-technology-and-services",
    text: "Which AWS service gives you visibility into operational data and allows you to automate operational tasks across your AWS resources, such as patch management?",
    options: [
      { id: "a", text: "AWS Systems Manager" },
      { id: "b", text: "Amazon CloudWatch" },
      { id: "c", text: "AWS Config" },
      { id: "d", text: "AWS Trusted Advisor" },
    ],
    correctOptionIds: ["a"],
    explanation: "AWS Systems Manager provides operational visibility and automation, including patch management, across AWS resources.",
  },
  {
    id: "tech24",
    domain: "cloud-technology-and-services",
    text: "Which fully managed message queuing service enables you to decouple and scale microservices, distributed systems, and serverless applications?",
    options: [
      { id: "a", text: "Amazon SNS" },
      { id: "b", text: "Amazon SQS" },
      { id: "c", text: "Amazon EventBridge" },
      { id: "d", text: "AWS Step Functions" },
    ],
    correctOptionIds: ["b"],
    explanation: "Amazon SQS is a fully managed message queuing service used to decouple and scale distributed application components.",
  },
  {
    id: "tech25",
    domain: "cloud-technology-and-services",
    text: "Which AWS service is a fully managed publish/subscribe messaging service used to fan out notifications to multiple subscribers, such as email, SMS, or Lambda functions?",
    options: [
      { id: "a", text: "Amazon SQS" },
      { id: "b", text: "Amazon SNS" },
      { id: "c", text: "Amazon MQ" },
      { id: "d", text: "AWS Step Functions" },
    ],
    correctOptionIds: ["b"],
    explanation: "Amazon SNS is a publish/subscribe messaging service that fans out notifications to multiple types of subscribers.",
  },
  {
    id: "tech26",
    domain: "cloud-technology-and-services",
    text: "Which service allows you to coordinate multiple AWS Lambda functions and other AWS services into serverless workflows using visual state machines?",
    options: [
      { id: "a", text: "AWS Step Functions" },
      { id: "b", text: "Amazon EventBridge" },
      { id: "c", text: "Amazon SQS" },
      { id: "d", text: "AWS Batch" },
    ],
    correctOptionIds: ["a"],
    explanation: "AWS Step Functions coordinates multiple AWS services into serverless workflows using visual state machines.",
  },
  {
    id: "tech27",
    domain: "cloud-technology-and-services",
    text: "Which AWS service converts speech to text?",
    options: [
      { id: "a", text: "Amazon Polly" },
      { id: "b", text: "Amazon Transcribe" },
      { id: "c", text: "Amazon Comprehend" },
      { id: "d", text: "Amazon Lex" },
    ],
    correctOptionIds: ["b"],
    explanation: "Amazon Transcribe is an automatic speech recognition service that converts spoken audio into text.",
  },
  {
    id: "tech28",
    domain: "cloud-technology-and-services",
    text: "Which AWS service provides a fully managed environment for building, training, and deploying machine learning models?",
    options: [
      { id: "a", text: "Amazon SageMaker" },
      { id: "b", text: "Amazon Rekognition" },
      { id: "c", text: "Amazon Comprehend" },
      { id: "d", text: "AWS DeepLens" },
    ],
    correctOptionIds: ["a"],
    explanation: "Amazon SageMaker provides a fully managed environment covering the full machine learning lifecycle.",
  },
  {
    id: "tech29",
    domain: "cloud-technology-and-services",
    text: "Which service allows you to run interactive SQL queries directly against data stored in Amazon S3 without needing to load it into a database?",
    options: [
      { id: "a", text: "Amazon Athena" },
      { id: "b", text: "Amazon Redshift" },
      { id: "c", text: "Amazon EMR" },
      { id: "d", text: "Amazon Kinesis" },
    ],
    correctOptionIds: ["a"],
    explanation: "Amazon Athena is a serverless query service that runs SQL directly against data stored in Amazon S3.",
  },
  {
    id: "tech30",
    domain: "cloud-technology-and-services",
    text: "Which TWO of the following AWS services are primarily used for real-time or near-real-time streaming data ingestion and processing?",
    options: [
      { id: "a", text: "Amazon Kinesis" },
      { id: "b", text: "Amazon MSK (Managed Streaming for Apache Kafka)" },
      { id: "c", text: "Amazon Redshift" },
      { id: "d", text: "Amazon RDS" },
      { id: "e", text: "AWS CloudFormation" },
    ],
    correctOptionIds: ["a", "b"],
    explanation: "Amazon Kinesis and Amazon MSK are both built for ingesting and processing streaming data in real time.",
  },
  {
    id: "tech31",
    domain: "cloud-technology-and-services",
    text: "Which TWO of the following are container-related AWS services?",
    options: [
      { id: "a", text: "Amazon ECS (Elastic Container Service)" },
      { id: "b", text: "Amazon EKS (Elastic Kubernetes Service)" },
      { id: "c", text: "Amazon Route 53" },
      { id: "d", text: "AWS Direct Connect" },
      { id: "e", text: "Amazon SNS" },
    ],
    correctOptionIds: ["a", "b"],
    explanation: "Amazon ECS and Amazon EKS are AWS's managed container orchestration services.",
  },
];
```

- [ ] **Step 2: Build and verify**

```bash
cd cloud-practitioner
npm run build
node --input-type=module -e "
import { cloudTechnologyAndServicesQuestions as qs } from './dist/questions/technology-and-services.js';
if (qs.length !== 31) throw new Error('expected 31 questions, got ' + qs.length);
for (const q of qs) {
  const ids = new Set(q.options.map((o) => o.id));
  if (ids.size !== q.options.length) throw new Error('duplicate option ids in ' + q.id);
  if (![1, 2].includes(q.correctOptionIds.length)) throw new Error('unexpected correct-answer count in ' + q.id);
  for (const c of q.correctOptionIds) {
    if (!ids.has(c)) throw new Error('correctOptionIds references missing option in ' + q.id);
  }
}
console.log('technology-and-services bank OK:', qs.length, 'questions');
"
```

Expected: prints `technology-and-services bank OK: 31 questions` with no
thrown error.

- [ ] **Step 3: Commit**

```bash
git add cloud-practitioner/src/questions/technology-and-services.ts
git commit -m "Add Cloud Technology and Services question bank"
```

---

## Task 5: Billing, Pricing, and Support question bank + full bank aggregation

**Files:**
- Create: `cloud-practitioner/src/questions/billing-pricing-and-support.ts`
- Create: `cloud-practitioner/src/questions/index.ts`

**Interfaces:**
- Consumes: `Question` from `../types.js` (Task 1); `cloudConceptsQuestions` (Task 2), `securityAndComplianceQuestions` (Task 3), `cloudTechnologyAndServicesQuestions` (Task 4).
- Produces: `billingPricingAndSupportQuestions: Question[]` (11 questions); `questionBank: Question[]` (all 90 questions), consumed by Task 6 (`scoring.ts`) and Task 7 (`main.ts`).

- [ ] **Step 1: Create `cloud-practitioner/src/questions/billing-pricing-and-support.ts`**

```ts
import { Question } from "../types.js";

export const billingPricingAndSupportQuestions: Question[] = [
  {
    id: "bill1",
    domain: "billing-pricing-and-support",
    text: "Which AWS pricing model requires no upfront payment and lets you pay for compute capacity by the second or hour with no long-term commitment?",
    options: [
      { id: "a", text: "Reserved Instances" },
      { id: "b", text: "On-Demand Instances" },
      { id: "c", text: "Spot Instances" },
      { id: "d", text: "Savings Plans" },
    ],
    correctOptionIds: ["b"],
    explanation: "On-Demand Instances let you pay for compute capacity with no upfront payment or long-term commitment.",
  },
  {
    id: "bill2",
    domain: "billing-pricing-and-support",
    text: "Which EC2 purchasing option lets you use spare AWS compute capacity at steep discounts, with the risk that the instance can be interrupted by AWS with short notice?",
    options: [
      { id: "a", text: "On-Demand Instances" },
      { id: "b", text: "Reserved Instances" },
      { id: "c", text: "Spot Instances" },
      { id: "d", text: "Dedicated Hosts" },
    ],
    correctOptionIds: ["c"],
    explanation: "Spot Instances use spare EC2 capacity at a discount but can be reclaimed by AWS with short notice.",
  },
  {
    id: "bill3",
    domain: "billing-pricing-and-support",
    text: "A company plans to run a steady, predictable workload for the next three years and wants the lowest possible price for that commitment. Which pricing option best fits this need?",
    options: [
      { id: "a", text: "On-Demand Instances" },
      { id: "b", text: "Spot Instances" },
      { id: "c", text: "Reserved Instances or Savings Plans" },
      { id: "d", text: "Free Tier" },
    ],
    correctOptionIds: ["c"],
    explanation: "Reserved Instances and Savings Plans offer significant discounts in exchange for a committed usage term.",
  },
  {
    id: "bill4",
    domain: "billing-pricing-and-support",
    text: "Which AWS service allows you to set custom cost and usage budgets and receive alerts when actual or forecasted costs exceed your thresholds?",
    options: [
      { id: "a", text: "AWS Cost Explorer" },
      { id: "b", text: "AWS Budgets" },
      { id: "c", text: "AWS Trusted Advisor" },
      { id: "d", text: "AWS Cost and Usage Report" },
    ],
    correctOptionIds: ["b"],
    explanation: "AWS Budgets lets you set custom cost and usage thresholds and alerts when they are exceeded or forecast to be exceeded.",
  },
  {
    id: "bill5",
    domain: "billing-pricing-and-support",
    text: "Which AWS service provides visualization and analysis of your historical AWS spending and usage patterns?",
    options: [
      { id: "a", text: "AWS Budgets" },
      { id: "b", text: "AWS Cost Explorer" },
      { id: "c", text: "Amazon CloudWatch" },
      { id: "d", text: "AWS Organizations" },
    ],
    correctOptionIds: ["b"],
    explanation: "AWS Cost Explorer visualizes and analyzes historical AWS costs and usage patterns.",
  },
  {
    id: "bill6",
    domain: "billing-pricing-and-support",
    text: "What is a key benefit of using AWS Organizations' consolidated billing feature?",
    options: [
      { id: "a", text: "It combines usage across multiple accounts to potentially achieve volume pricing discounts, with a single bill" },
      { id: "b", text: "It grants every account root-level access to all resources" },
      { id: "c", text: "It automatically encrypts all account data" },
      { id: "d", text: "It eliminates the need for a payment method" },
    ],
    correctOptionIds: ["a"],
    explanation: "Consolidated billing combines usage from multiple accounts into a single bill and can unlock volume discounts.",
  },
  {
    id: "bill7",
    domain: "billing-pricing-and-support",
    text: "Which AWS Support plan is the only paid plan that includes access to a designated Technical Account Manager (TAM)?",
    options: [
      { id: "a", text: "Basic" },
      { id: "b", text: "Developer" },
      { id: "c", text: "Business" },
      { id: "d", text: "Enterprise" },
    ],
    correctOptionIds: ["d"],
    explanation: "Only the Enterprise Support plan includes a designated Technical Account Manager.",
  },
  {
    id: "bill8",
    domain: "billing-pricing-and-support",
    text: "A startup wants free access to basic account and billing support, along with access to AWS Trusted Advisor's core checks, without paying for a support plan. Which support plan provides this?",
    options: [
      { id: "a", text: "Basic Support" },
      { id: "b", text: "Developer Support" },
      { id: "c", text: "Business Support" },
      { id: "d", text: "Enterprise Support" },
    ],
    correctOptionIds: ["a"],
    explanation: "Basic Support is free for all AWS customers and includes core Trusted Advisor checks and account/billing support.",
  },
  {
    id: "bill9",
    domain: "billing-pricing-and-support",
    text: "Which tool helps prospective and current AWS customers estimate the monthly cost of AWS services before deploying them?",
    options: [
      { id: "a", text: "AWS Cost Explorer" },
      { id: "b", text: "AWS Pricing Calculator" },
      { id: "c", text: "AWS Budgets" },
      { id: "d", text: "AWS Trusted Advisor" },
    ],
    correctOptionIds: ["b"],
    explanation: "AWS Pricing Calculator estimates the cost of AWS services before you deploy them.",
  },
  {
    id: "bill10",
    domain: "billing-pricing-and-support",
    text: "Which TWO of the following can help reduce AWS costs?",
    options: [
      { id: "a", text: "Using Reserved Instances or Savings Plans for steady-state workloads" },
      { id: "b", text: "Using Spot Instances for fault-tolerant, flexible workloads" },
      { id: "c", text: "Always choosing On-Demand pricing regardless of workload" },
      { id: "d", text: "Ignoring AWS Budgets alerts" },
      { id: "e", text: "Provisioning maximum capacity at all times 'just in case'" },
    ],
    correctOptionIds: ["a", "b"],
    explanation: "Matching commitment-based pricing to steady workloads and Spot to flexible ones are common cost-reduction strategies.",
  },
  {
    id: "bill11",
    domain: "billing-pricing-and-support",
    text: "Which TWO of the following are ways to organize and track AWS costs across teams or projects?",
    options: [
      { id: "a", text: "Cost allocation tags" },
      { id: "b", text: "AWS Organizations with consolidated billing" },
      { id: "c", text: "Deleting the AWS Cost and Usage Report" },
      { id: "d", text: "Disabling AWS Budgets" },
      { id: "e", text: "Sharing root account credentials" },
    ],
    correctOptionIds: ["a", "b"],
    explanation: "Cost allocation tags and consolidated billing under AWS Organizations both help attribute and track spend across teams.",
  },
];
```

- [ ] **Step 2: Create `cloud-practitioner/src/questions/index.ts`**

```ts
import { Question } from "../types.js";
import { cloudConceptsQuestions } from "./cloud-concepts.js";
import { securityAndComplianceQuestions } from "./security-and-compliance.js";
import { cloudTechnologyAndServicesQuestions } from "./technology-and-services.js";
import { billingPricingAndSupportQuestions } from "./billing-pricing-and-support.js";

export const questionBank: Question[] = [
  ...cloudConceptsQuestions,
  ...securityAndComplianceQuestions,
  ...cloudTechnologyAndServicesQuestions,
  ...billingPricingAndSupportQuestions,
];
```

- [ ] **Step 3: Build and verify the full bank**

```bash
cd cloud-practitioner
npm run build
node --input-type=module -e "
import { questionBank } from './dist/questions/index.js';
if (questionBank.length !== 90) throw new Error('expected 90 questions, got ' + questionBank.length);
const ids = new Set(questionBank.map((q) => q.id));
if (ids.size !== questionBank.length) throw new Error('duplicate question ids across the bank');
const counts = {};
for (const q of questionBank) counts[q.domain] = (counts[q.domain] || 0) + 1;
console.log('domain counts:', counts);
const expected = {
  'cloud-concepts': 21,
  'security-and-compliance': 27,
  'cloud-technology-and-services': 31,
  'billing-pricing-and-support': 11,
};
for (const [domain, count] of Object.entries(expected)) {
  if (counts[domain] !== count) throw new Error('domain ' + domain + ' expected ' + count + ' got ' + counts[domain]);
}
console.log('full question bank OK: 90 questions, unique ids, correct domain counts');
"
```

Expected: prints the domain counts object followed by `full question bank
OK: 90 questions, unique ids, correct domain counts`.

- [ ] **Step 4: Commit**

```bash
git add cloud-practitioner/src/questions/billing-pricing-and-support.ts cloud-practitioner/src/questions/index.ts
git commit -m "Add Billing, Pricing, and Support question bank and aggregate the full question bank"
```

---

## Task 6: Sampling and scoring logic

**Files:**
- Create: `cloud-practitioner/src/scoring.ts`

**Interfaces:**
- Consumes: `Domain`, `DomainBreakdownEntry`, `Question`, `SessionResult` from `./types.js` (Task 1).
- Produces (consumed by Task 7/8/9's `main.ts`):
  - `DOMAIN_LABELS: Record<Domain, string>`
  - `FULL_EXAM_DOMAIN_COUNTS: Record<Domain, number>`
  - `shuffle<T>(items: T[]): T[]`
  - `sampleFullExam(pool: Question[]): Question[]`
  - `shuffleQuestionOptions(question: Question): Question`
  - `isAnswerCorrect(question: Question, selectedOptionIds: string[]): boolean`
  - `scoreSession(questions: Question[], answers: Record<string, string[]>): SessionResult`

- [ ] **Step 1: Create `cloud-practitioner/src/scoring.ts`**

```ts
import { Domain, DomainBreakdownEntry, Question, SessionResult } from "./types.js";

export const DOMAIN_LABELS: Record<Domain, string> = {
  "cloud-concepts": "Cloud Concepts",
  "security-and-compliance": "Security and Compliance",
  "cloud-technology-and-services": "Cloud Technology and Services",
  "billing-pricing-and-support": "Billing, Pricing, and Support",
};

export const FULL_EXAM_DOMAIN_COUNTS: Record<Domain, number> = {
  "cloud-concepts": 16,
  "security-and-compliance": 20,
  "cloud-technology-and-services": 22,
  "billing-pricing-and-support": 7,
};

const DOMAIN_ORDER: Domain[] = [
  "cloud-concepts",
  "security-and-compliance",
  "cloud-technology-and-services",
  "billing-pricing-and-support",
];

export function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export function sampleFullExam(pool: Question[]): Question[] {
  const byDomain = (domain: Domain) => pool.filter((q) => q.domain === domain);
  const picked = DOMAIN_ORDER.flatMap((domain) =>
    shuffle(byDomain(domain)).slice(0, FULL_EXAM_DOMAIN_COUNTS[domain])
  );
  return shuffle(picked);
}

export function shuffleQuestionOptions(question: Question): Question {
  return { ...question, options: shuffle(question.options) };
}

export function isAnswerCorrect(question: Question, selectedOptionIds: string[]): boolean {
  if (selectedOptionIds.length !== question.correctOptionIds.length) return false;
  const correctSet = new Set(question.correctOptionIds);
  return selectedOptionIds.every((id) => correctSet.has(id));
}

export function scoreSession(
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
  const scaledScore =
    totalCount === 0 ? 100 : Math.round((correctCount / totalCount) * 900) + 100;
  const passed = scaledScore >= 700;

  const domainBreakdown: DomainBreakdownEntry[] = DOMAIN_ORDER.map((domain) => {
    const inDomain = perQuestion.filter((pq) => pq.question.domain === domain);
    return {
      domain,
      correct: inDomain.filter((pq) => pq.isCorrect).length,
      total: inDomain.length,
    };
  }).filter((entry) => entry.total > 0);

  return { correctCount, totalCount, scaledScore, passed, domainBreakdown, perQuestion };
}
```

- [ ] **Step 2: Build and verify the scoring logic**

```bash
cd cloud-practitioner
npm run build
node --input-type=module -e "
import { questionBank } from './dist/questions/index.js';
import { sampleFullExam, isAnswerCorrect, scoreSession, FULL_EXAM_DOMAIN_COUNTS } from './dist/scoring.js';

// sampleFullExam must return exactly 65 questions with the documented per-domain split.
const sample = sampleFullExam(questionBank);
if (sample.length !== 65) throw new Error('expected 65 sampled questions, got ' + sample.length);
const counts = {};
for (const q of sample) counts[q.domain] = (counts[q.domain] || 0) + 1;
for (const [domain, expected] of Object.entries(FULL_EXAM_DOMAIN_COUNTS)) {
  if (counts[domain] !== expected) throw new Error('domain ' + domain + ' expected ' + expected + ' got ' + counts[domain]);
}

// isAnswerCorrect: single-select exact match only.
const single = questionBank.find((q) => q.correctOptionIds.length === 1);
if (!isAnswerCorrect(single, single.correctOptionIds)) throw new Error('single-select exact match should be correct');
if (isAnswerCorrect(single, [single.options.find((o) => !single.correctOptionIds.includes(o.id)).id])) {
  throw new Error('single-select wrong answer should be incorrect');
}

// isAnswerCorrect: multi-select is all-or-nothing, partial credit must fail.
const multi = questionBank.find((q) => q.correctOptionIds.length === 2);
if (!isAnswerCorrect(multi, multi.correctOptionIds)) throw new Error('multi-select exact match should be correct');
if (isAnswerCorrect(multi, [multi.correctOptionIds[0]])) throw new Error('multi-select partial match must be incorrect');

// scoreSession: scaled score and pass/fail boundary.
const answers = {};
for (const q of sample) answers[q.id] = q.correctOptionIds; // answer everything correctly
const perfect = scoreSession(sample, answers);
if (perfect.scaledScore !== 1000 || !perfect.passed) throw new Error('all-correct session should score 1000 and pass');

const none = scoreSession(sample, {});
if (none.scaledScore !== 100 || none.passed) throw new Error('all-blank session should score 100 and fail');

console.log('scoring logic OK: sampling counts, single/multi-select correctness, and scaled scoring all verified');
"
```

Expected: prints `scoring logic OK: sampling counts, single/multi-select
correctness, and scaled scoring all verified` with no thrown error. Since
`sampleFullExam` shuffles randomly, run it two or three times to build
confidence there's no flakiness.

- [ ] **Step 3: Commit**

```bash
git add cloud-practitioner/src/scoring.ts
git commit -m "Add exam sampling and scoring logic"
```

---

## Task 7: Mode selection screen

**Files:**
- Modify: `cloud-practitioner/src/main.ts` (replaces the Task 1 stub entirely)

**Interfaces:**
- Consumes: `questionBank` from `./questions/index.js` (Task 5); `Domain`, `Mode`, `Question` from `./types.js` (Task 1); `shuffle`, `sampleFullExam`, `shuffleQuestionOptions`, `DOMAIN_LABELS` from `./scoring.js` (Task 6).
- Produces (module-level state and functions later tasks build on): a `Session` interface and `session` variable; `renderModeSelection()`; `startFullExam()`; `startPractice(domain: Domain | "all")`. Task 8 adds `renderQuestionScreen()`, called at the end of `startFullExam`/`startPractice` instead of the placeholder used in this task's Step 1.

- [ ] **Step 1: Replace `cloud-practitioner/src/main.ts` with the app shell and mode selection screen**

```ts
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
```

Task 8 will replace the two `console.log` placeholder lines with a call to
`renderQuestionScreen()`; nothing else in this file changes shape.

- [ ] **Step 2: Build and verify in a browser**

```bash
cd cloud-practitioner
npm run build
```

Open `index.html` in a browser. Confirm: the page shows the title, a
"Full Exam Simulation" card with a "Start Full Exam" button, and a
"Practice Mode" card with a domain `<select>` (listing all four domains
plus "All domains") and a "Start Practice" button. Open the browser
console, click "Start Full Exam", and confirm it logs "Full exam session
started with 65 questions...". Reload, choose a domain (e.g. "Security and
Compliance") and click "Start Practice"; confirm the console logs a
question count matching that domain's pool size (27 for Security and
Compliance). No console errors.

- [ ] **Step 3: Commit**

```bash
git add cloud-practitioner/src/main.ts
git commit -m "Add mode selection screen and session bootstrapping"
```

---

## Task 8: Exam/practice session screen

**Files:**
- Modify: `cloud-practitioner/src/main.ts` (adds the question-rendering, timer, and answer-recording functions; wires them into `startFullExam`/`startPractice` from Task 7)
- Modify: `cloud-practitioner/styles.css` (adds feedback styling)

**Interfaces:**
- Consumes: `session`/`Session` and `FULL_EXAM_SECONDS` from Task 7; `isAnswerCorrect` from `./scoring.js` (Task 6, newly imported here).
- Produces (consumed by Task 9): `renderQuestionScreen()`; `finishSession()`, which Task 9 wires to call `renderResultsScreen(result)` instead of this task's placeholder `console.log`.

- [ ] **Step 1: Update the import line in `cloud-practitioner/src/main.ts`**

Find:

```ts
import { sampleFullExam, shuffle, shuffleQuestionOptions, DOMAIN_LABELS } from "./scoring.js";
```

Replace with:

```ts
import {
  sampleFullExam,
  shuffle,
  shuffleQuestionOptions,
  isAnswerCorrect,
  scoreSession,
  DOMAIN_LABELS,
} from "./scoring.js";
```

(`scoreSession` is imported now so Task 9 doesn't need to touch this line again.)

- [ ] **Step 2: Replace the two placeholder `console.log` calls**

In `startFullExam`, find:

```ts
  console.log("Full exam session started with", questions.length, "questions. Question screen arrives in Task 8.");
```

Replace with:

```ts
  startTimer();
  renderQuestionScreen();
```

In `startPractice`, find:

```ts
  console.log("Practice session started with", questions.length, "questions. Question screen arrives in Task 8.");
```

Replace with:

```ts
  renderQuestionScreen();
```

- [ ] **Step 3: Append the question screen, timer, and answer-handling functions**

Add these functions after `startPractice` and before the trailing
`renderModeSelection();` call at the bottom of the file:

```ts
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
```

Task 9 will replace the single `console.log` line inside `finishSession`
with a call to `renderResultsScreen(result)`; nothing else in this
function changes.

- [ ] **Step 4: Add feedback styling to `cloud-practitioner/styles.css`**

Append to the end of the file:

```css
.feedback-correct {
  font-family: var(--font-mono);
  font-weight: 600;
  color: var(--correct);
}

.feedback-incorrect {
  font-family: var(--font-mono);
  font-weight: 600;
  color: var(--incorrect);
}

.explanation {
  color: var(--muted);
}
```

- [ ] **Step 5: Build and verify in a browser**

```bash
cd cloud-practitioner
npm run build
```

Open `index.html`. For **Full Exam Simulation**: click "Start Full Exam",
confirm a question renders with a visible counting-down timer in the top
bar, radio buttons for a single-answer question (find one by paging
through), checkboxes for a "select two" question, and that answering and
clicking "Next" advances through all 65 questions before "Submit"
appears on the last one and logs a result object to the console. Click
"End Exam" partway through and confirm it also logs a result. For
**Practice Mode**: start it filtered to one domain, confirm no timer is
shown, answer a question, click "Check Answer", and confirm the
correct/incorrect message and explanation appear before you click "Next".

- [ ] **Step 6: Commit**

```bash
git add cloud-practitioner/src/main.ts cloud-practitioner/styles.css
git commit -m "Add exam/practice question screen with timer and instant feedback"
```

---

## Task 9: Results screen, final QA pass, and README pointer

**Files:**
- Modify: `cloud-practitioner/src/main.ts` (adds `renderResultsScreen` and `describeOptions`; wires `finishSession` to call it)
- Modify: `cloud-practitioner/styles.css` (adds results/review styling)
- Modify: `/home/jegoh/Documents/repo/awsquiz/README.md` (one-line pointer to the new quiz)

**Interfaces:**
- Consumes: `SessionResult`, `PerQuestionResult` from `./types.js` (Task 1); `DOMAIN_LABELS` from `./scoring.js` (Task 6, already imported); `session`, `renderModeSelection`, `finishSession` from earlier in `main.ts` (Tasks 7–8).
- Produces: nothing further — this is the last task; the app is feature-complete per the spec after this task.

- [ ] **Step 1: Wire `finishSession` to the results screen**

In `cloud-practitioner/src/main.ts`, find:

```ts
  const result = scoreSession(session.questions, session.answers);
  console.log("Session finished. Results screen arrives in Task 9.", result);
```

Replace with:

```ts
  const result = scoreSession(session.questions, session.answers);
  renderResultsScreen(result);
```

- [ ] **Step 2: Append the results screen functions**

Add these functions after `finishSession` at the end of the file, above
the trailing `renderModeSelection();` call, and add the `SessionResult`
import:

Find:

```ts
import { Domain, Mode, Question } from "./types.js";
```

Replace with:

```ts
import { Domain, Mode, Question, SessionResult } from "./types.js";
```

Then append:

```ts
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
            <p class="review-question">${i + 1}. ${pq.question.text}</p>
            <p>Your answer: ${describeOptions(pq.question, pq.selectedOptionIds)}</p>
            <p>Correct answer: ${describeOptions(pq.question, pq.question.correctOptionIds)}</p>
            <p class="explanation">${pq.question.explanation}</p>
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
    .map((opt) => opt.text)
    .join(", ");
}
```

- [ ] **Step 3: Add results/review styling to `cloud-practitioner/styles.css`**

Append to the end of the file:

```css
.scaled-score {
  font-family: var(--font-mono);
  font-size: 2.5rem;
  font-weight: 600;
}

.pass-fail {
  font-family: var(--font-mono);
  font-weight: 600;
}

.pass-fail.pass {
  color: var(--correct);
}

.pass-fail.fail {
  color: var(--incorrect);
}

.domain-breakdown {
  width: 100%;
  border-collapse: collapse;
  font-family: var(--font-mono);
  font-size: 0.875rem;
}

.domain-breakdown th,
.domain-breakdown td {
  text-align: left;
  padding: 0.4rem 0.5rem;
  border-bottom: 1px solid var(--border);
}

.review-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.review-item {
  border: 1px solid var(--border);
  border-left-width: 4px;
  border-radius: 4px;
  padding: 0.85rem 1rem;
  background: var(--surface);
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.review-correct {
  border-left-color: var(--correct);
}

.review-incorrect {
  border-left-color: var(--incorrect);
}

.review-question {
  font-weight: 600;
}
```

- [ ] **Step 4: Add a pointer to the quiz from the root README**

In `/home/jegoh/Documents/repo/awsquiz/README.md`, find:

```
# awsquiz
Cloud Practitioner, AI Practitioner, Solutions Architect – Associate, Developer – Associate, CloudOps Engineer – Associate, Data Engineer – Associate, Machine Learning Engineer – Associate, Solutions Architect – Professional, DevOps Engineer – Professional, Generative AI Developer – Professional, Security – Specialty
```

Replace with:

```
# awsquiz
Cloud Practitioner, AI Practitioner, Solutions Architect – Associate, Developer – Associate, CloudOps Engineer – Associate, Data Engineer – Associate, Machine Learning Engineer – Associate, Solutions Architect – Professional, DevOps Engineer – Professional, Generative AI Developer – Professional, Security – Specialty

## Cloud Practitioner

A static, no-backend exam simulator lives in [`cloud-practitioner/`](cloud-practitioner/). Open `cloud-practitioner/index.html` in a browser after running `npm run build` inside that folder (see its `package.json`).
```

- [ ] **Step 5: Final full-app QA pass**

```bash
cd cloud-practitioner
npm run build
```

Open `index.html` and walk through every case from the spec's testing
approach:

1. Start a **Full Exam Simulation**. Confirm it has exactly 65 questions
   and the timer starts at `90:00` and counts down.
2. Answer a mix of correct and incorrect single- and multi-select
   questions, including at least one multi-select where you pick only
   one of the two correct options (this must score as incorrect, not
   partial credit).
3. Click "Submit" on the final question (or "End Exam" partway through)
   and confirm the results screen shows: a scaled score between 100 and
   1000, a Passed/Not passed banner matching whether the score is
   `>= 700`, a per-domain breakdown table covering all four domains that
   appeared, and a review list with every question showing your answer,
   the correct answer, and its explanation, with correct/incorrect items
   visually distinguished.
4. Click "Back to Menu", start a **Practice Mode** session filtered to a
   single domain, confirm only that domain's questions appear and there
   is no timer, confirm "Check Answer" shows correct/incorrect feedback
   with an explanation before advancing, and confirm the results screen
   at the end shows only that one domain in the breakdown.
5. In the browser console, confirm there are no errors during any of the
   above.
6. Resize the browser to a narrow (phone-width) viewport and confirm the
   layout stays usable (no horizontal scrolling, buttons remain
   tappable).

- [ ] **Step 6: Commit**

```bash
git add cloud-practitioner/src/main.ts cloud-practitioner/styles.css README.md
git commit -m "Add results screen with domain breakdown and review, link quiz from README"
```
