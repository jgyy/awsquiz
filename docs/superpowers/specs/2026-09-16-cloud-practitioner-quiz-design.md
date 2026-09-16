# AWS Cloud Practitioner Exam Simulator — Design

Date: 2026-09-16
Status: Approved

## Purpose

Give a learner a realistic way to practice for the AWS Certified Cloud
Practitioner (CLF-C02) exam: a full timed mock exam with AWS-style
scoring, plus an untimed practice mode with instant feedback, both
backed by a hand-written question bank aligned to the official exam
guide's four domains.

This is the first of several cert quizzes the repo's README anticipates
(AI Practitioner, Solutions Architect – Associate, etc.), so it is
scoped and located to not block those follow-ups, without building any
infrastructure for them yet (YAGNI).

## Non-goals

- No backend, no accounts, no persistence across sessions (single
  in-browser session only).
- No claim of matching AWS's actual (non-public) scoring algorithm —
  the 100–1000 scaled score is a clearly-labeled approximation.
- No shared "quiz platform" abstraction for other certs yet — this is
  a single, self-contained quiz. Extracting shared code happens if and
  when a second cert quiz is actually built.

## Repo layout

```
cloud-practitioner/
  index.html
  styles.css
  package.json        # devDependency: typescript only
  tsconfig.json
  src/
    types.ts          # Question, Domain, ExamSession types
    questions.ts       # ~90-question data bank
    scoring.ts         # sampling, scoring, domain breakdown logic
    main.ts             # DOM rendering + event wiring, screen flow
  dist/                # tsc build output (gitignored), loaded by index.html
```

Root `README.md` is left as-is; a one-line pointer to
`cloud-practitioner/` can be added once the quiz exists.

## Stack

Plain HTML/CSS + TypeScript. No framework, no bundler. `tsc` compiles
`src/*.ts` → `dist/*.js` as ES modules; `index.html` loads
`dist/main.js` via `<script type="module">`. `npm run build` runs
`tsc`; `npm run watch` runs `tsc --watch`. Any static file server (e.g.
`npx http-server`, `python -m http.server`) can serve the folder for
local testing — no server dependency is added to the project.

## Data model (`src/types.ts`)

```ts
type Domain =
  | "cloud-concepts"
  | "security-and-compliance"
  | "cloud-technology-and-services"
  | "billing-pricing-and-support";

interface Option {
  id: string;
  text: string;
}

interface Question {
  id: string;
  domain: Domain;
  text: string;
  options: Option[];
  correctOptionIds: string[]; // length 1 = single-select, 2 = multi-select
  explanation: string;
}
```

## Question bank (`src/questions.ts`)

~90 hand-written questions, weighted to the official CLF-C02 exam
guide domain percentages:

| Domain                          | Weight | ~Count |
|----------------------------------|-------:|-------:|
| Cloud Concepts                   |    24% |     21 |
| Security and Compliance          |    30% |     27 |
| Cloud Technology and Services    |    34% |     31 |
| Billing, Pricing, and Support    |    12% |     11 |

~85% of questions are single-answer (radio-button UI); ~15% are
two-answer "select two" (checkbox UI), matching the real exam's mix of
MCQ/MRQ formats. Multi-select questions score correct only if the
exact correct set is chosen (no partial credit), matching AWS's own
all-or-nothing MRQ scoring.

## Exam modes

### Full Exam Simulation

- Samples 65 questions from the 90-question pool, proportionally by
  domain (approximately 16 / 20 / 22 / 7, adjusted to sum to 65).
- Shuffles question order and each question's option order per
  attempt.
- 90:00 countdown timer, auto-submits at zero.
- Manual "End Exam" button to submit early.
- No feedback shown during the exam — results appear only after
  submission, matching real exam conditions.

### Practice Mode

- Untimed.
- User can filter to one domain or take the full pool.
- Instant feedback after each answer: correct/incorrect plus the
  explanation, before moving to the next question.

## Scoring & review (shown after submission, either mode)

- Overall score displayed on AWS's 100–1000 scale
  (`scaled = round((correctCount / totalCount) * 900) + 100`), with a
  clear "PASS" / "FAIL" banner at the 700 threshold, and a one-line
  note that this is an approximation, not AWS's real (non-public)
  scoring algorithm.
- Per-domain breakdown: correct/total and percentage for each of the
  four domains.
- Full review list: every question with the user's selected option(s),
  the correct option(s), a correct/incorrect marker, and the
  explanation.
- "Retake" (returns to mode selection) action from the results screen.

## Screen flow

1. **Mode selection** — choose Full Exam Simulation or Practice Mode
   (with domain filter for Practice).
2. **Exam/practice session** — one question at a time; Practice Mode
   shows feedback inline, Full Exam does not.
3. **Results** — score, pass/fail, domain breakdown, full review,
   retake action.

## Testing approach

No automated test framework is introduced for this static/no-backend
app. Verification is:

- `tsc` compiles with no errors (`npm run build`).
- Manual run-through in a browser covering the golden path and edge
  cases: complete a full timed exam, let the timer expire to confirm
  auto-submit, complete a practice session filtered to one domain,
  verify single- and multi-select scoring (including a partially-wrong
  multi-select scored as incorrect), and confirm the domain breakdown
  and review screen render correctly.
