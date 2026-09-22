# Multi-Certification Support — Design

Date: 2026-09-22
Status: Approved

## Purpose

Let the simulator host more than one AWS certification, starting with the
existing Cloud Practitioner (CLF-C02) bank and a new AI Practitioner
(AIF-C01) bank. A learner picks a certification on a landing screen, then
gets the existing Full Exam and Practice modes configured for that cert.

The 2026-09-16 spec deferred a shared "quiz platform" abstraction until a
second cert existed. This spec introduces the minimum abstraction needed:
one `Certification` descriptor that drives sampling, scoring, labels, the
timer, and the picker.

## Non-goals

- No backend, accounts, or cross-device sync. The only persistence added is
  the last-chosen certification id in `localStorage`.
- No per-question cert tag. A question's cert is determined by which
  folder it lives in.
- No certs beyond CLF-C02 and AIF-C01 in this pass; adding one later means
  adding a folder of questions and one entry in `src/certifications.ts`.

## Data model

`Domain` changes from a closed union to `string`. Each cert declares its
own domain ids; a question's `domain` must be one of its cert's ids.
`Question` is otherwise unchanged, so the ~1,040 existing CLF questions
need no edits.

```ts
// src/certifications.ts
export interface CertDomain {
  id: string;
  label: string;
  /** Questions drawn from this domain in a full exam. Sums to fullExamQuestionCount. */
  fullExamCount: number;
}

export interface Certification {
  id: CertificationId;          // "clf-c02" | "aif-c01"
  name: string;                 // "AWS Certified Cloud Practitioner"
  shortName: string;            // "Cloud Practitioner"
  examCode: string;             // "CLF-C02"
  description: string;          // one line for the picker card
  domains: CertDomain[];        // order = display order
  fullExamQuestionCount: number;   // 65
  fullExamMinutes: number;         // 90 (CLF) / 90 (AIF)
  passScaledScore: number;         // 700
  questions: Question[];
}

export const certifications: Certification[];
export function findCertification(id: string): Certification | undefined;
```

### Blueprints (from the official AWS exam guides)

CLF-C02, 65 questions, 90 minutes:

| Domain id | Label | Weight | Count |
|---|---|---:|---:|
| cloud-concepts | Cloud Concepts | 24% | 16 |
| security-and-compliance | Security and Compliance | 30% | 20 |
| cloud-technology-and-services | Cloud Technology and Services | 34% | 22 |
| billing-pricing-and-support | Billing, Pricing, and Support | 12% | 7 |

AIF-C01, 65 questions, 90 minutes:

| Domain id | Label | Weight | Count |
|---|---|---:|---:|
| ai-ml-fundamentals | Fundamentals of AI and ML | 20% | 13 |
| genai-fundamentals | Fundamentals of Generative AI | 24% | 16 |
| foundation-model-applications | Applications of Foundation Models | 28% | 18 |
| responsible-ai | Guidelines for Responsible AI | 14% | 9 |
| ai-security-governance | Security, Compliance, and Governance for AI Solutions | 14% | 9 |

## Folder layout

```
src/
  certifications.ts          # descriptors above
  questions/
    clf-c02/
      index.ts               # exports clfQuestions
      cloud-concepts.ts      # moved, content unchanged
      security-and-compliance.ts
      technology-and-services.ts
      billing-pricing-and-support.ts
    aif-c01/
      index.ts               # exports aifQuestions
      ai-ml-fundamentals.ts            # ~25 questions, ids aif-ml1..
      genai-fundamentals.ts            # ~25, ids aif-gen1..
      foundation-model-applications.ts # ~25, ids aif-fm1..
      responsible-ai.ts                # ~25, ids aif-ra1..
      ai-security-governance.ts        # ~25, ids aif-sec1..
```

`src/questions/index.ts` is removed; `certifications.ts` imports each
cert's index. Question ids are globally unique (AIF ids carry an `aif-`
prefix) so `video-assignments.ts` stays one flat map.

AIF questions follow the same quality bar as CLF ones: option pool of up to
8, `optionRationale` for every option, `referenceUrl` to AWS docs, and
`consoleUrl`, `diagram`, or `cliExample` where they add value. Roughly 15%
are two-answer questions.

## Scoring and sampling

`scoring.ts` drops the module constants `DOMAIN_LABELS`,
`FULL_EXAM_DOMAIN_COUNTS`, `DOMAIN_ORDER`, and `PASS_SCALED_SCORE`. The
functions take the cert instead:

```ts
sampleFullExam(cert: Certification): Question[]
scoreSession(cert: Certification, questions: Question[], answers): SessionResult
domainLabel(cert: Certification, domainId: string): string
```

`SessionResult.domainBreakdown` iterates `cert.domains` in order and drops
empty entries, as today. Scaled score formula is unchanged; `passed` uses
`cert.passScaledScore`.

## Screens and routing

1. **Certification picker** (new). One card per cert: name, exam code,
   question count in the bank, full-exam length and duration, one-line
   description. Selecting sets `location.hash = "#/<cert-id>"`.
2. **Mode selection** (existing). Heading becomes the cert name; a
   "Change certification" link goes back to the picker (hash `#/`).
   Practice domain dropdown lists the cert's domains with counts.
3. **Session** and **Results** (existing), unchanged apart from reading
   labels, timer length, and pass mark from the cert.

Routing is hash-based. On load and on `hashchange`, `#/<id>` with a known
cert renders mode selection for it; anything else renders the picker. If
the hash is empty on load and `localStorage["awsquiz.cert"]` holds a known
id, the app sets the hash to it so a return visit lands on the last cert.
Picking a cert writes that key. During a session, hash changes are ignored
until the session ends, so back-button presses mid-exam do not lose the
attempt; the "End Exam" flow is unchanged.

Title tag, manifest name, and description become generic: "AWS
Certification Exam Simulator". Apple short name stays "AWS Quiz".

## Videos

`VideoEntry` gains `cert: CertificationId`. Keyword fallback in
`resolveVideo` only considers entries whose cert matches the question's
cert, so no CLF video is ever matched to an AIF question. The catalog gains
an AI section (Bedrock, SageMaker, prompt engineering, RAG, guardrails,
responsible AI, model evaluation, and similar), each id verified against
YouTube's oEmbed endpoint like the existing ones. `scripts/assign-videos.mts`
iterates every cert's questions and writes one map.

## Build and offline

No build script changes are required: `tsc` compiles the new folders and
`build-sw.mts` walks `dist/` so the new modules are precached. The cache
name changes because content changed.

## Testing

No test framework is introduced, matching the existing project. Verification:

- `npm run build` completes with no TypeScript errors.
- A startup assertion in `certifications.ts` throws if any cert's
  `fullExamCount` values do not sum to `fullExamQuestionCount`, if any
  question's `domain` is not one of its cert's domain ids, or if any
  question id is duplicated across certs.
- Manual browser run-through: picker shows both certs; each cert runs a
  full exam and a practice session; AIF timer starts at 90:00 and the
  results table shows five domain rows; CLF behavior is unchanged; back
  button returns from mode selection to the picker; reload after choosing
  a cert lands on that cert; offline mode still loads both banks.
