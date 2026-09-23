# Practice Media: Question Images and Video Rules — Design

Date: 2026-09-23
Status: Approved in chat; spec pending review

## Purpose

Two changes to what a learner sees after submitting an answer in practice
mode:

1. **Images.** Show one image from the internet that is the most relevant
   picture for the question, such as the shared responsibility model diagram
   on a shared-responsibility question. Every question in both banks
   (1,040 CLF-C02 and 195 AIF-C01) gets an image.
2. **Video rules.** Every per-question YouTube video is at most 3 minutes
   long, unless it comes from the official AWS channel. Questions whose
   correct answer names an AWS service link to an official AWS video. And
   far fewer questions share the same video.

## Starting point (measured 2026-09-23)

- The video catalog has 516 entries (458 CLF, 58 AIF). 464 are in use across
  1,234 assigned questions; `aif-fm43` has no match. Only 157 questions have
  a video to themselves; 87 videos serve 5 or more.
- 24 videos run over 3 minutes. 11 of them are official AWS, so 13 break the
  new rule, all in the AIF bank, serving 35 questions.
- 512 questions link to an official AWS video. 269 questions (244 CLF,
  25 AIF) have an AWS service in the correct answer but link to a
  third-party video. For about 42 of them the catalog already holds an
  official video scoring within 25% of the best match. 453 questions test
  general concepts and link to third-party videos.

## Decisions

- **Images appear after submitting**, in the practice feedback panel next to
  the docs, console and YouTube links. The most relevant image usually shows
  the answer, so showing it earlier would give it away.
- **Images are hotlinked with credit.** The repo stores only each image's
  URL, alt text, caption, credit and source page. Nothing is copied into the
  public repo. Images are hidden offline, like the other links.
- **Images come from a shared topic catalog** of about 250–300 checked
  images, matched to questions the way videos are.
- **Video length cap: 180 seconds**, measured as YouTube's `lengthSeconds`.
  A video of exactly 3:00 is allowed.
- **"Official AWS" means one channel:** Amazon Web Services,
  `UCd6MoB9NC6uYN2grvUNT-Zg` (@amazonwebservices). Its videos may be any
  length. Other AWS-run channels (AWS Events, AWS Developers, AWS Partner
  Network) and similarly named channels are third-party for this rule. When
  two official videos fit equally well, the shorter one is chosen.
- **Service questions use official videos.** If a question's correct answer
  names an AWS service or feature, its video comes from the official channel.
  Where no on-topic official video exists after searching, it keeps the best
  third-party video of 3 minutes or less and is listed in the report.
- **Concept questions** (precision and recall, temperature, transformers,
  RLHF and similar) use the best explainer of 3 minutes or less from any
  channel. The official channel rarely has short videos on these.
- **More unique videos.** At most 3 questions per video (was 5), and at
  least 900 distinct videos in use (was 464). Relevance comes first: a
  question moves to a less-used video only if that video scores at least
  75% of its best match, as today.

## Non-goals

- Images are not shown in the full-exam results review, which also calls
  `renderFeedbackExtras`. They are added in `renderFeedbackPanel`, which only
  practice mode uses.
- The full-course cards on the mode screen (`courses` in
  `src/certifications.ts`, 14–15 hours each) are not per-question videos
  and are exempt from the length cap.
- No offline copies or service worker caching of images. The service worker
  already ignores cross-origin requests.
- No per-question override field on `Question` for images.
- The video's duration is not shown next to the YouTube link.

## Shared matcher (refactor)

The video pipeline already scores catalog keywords against the question
stem, the correct answers (weighted highest) and the explanation. It
weights keywords by rarity (IDF) per certification and spreads questions
across entries. Both media use one copy of that logic:

- `src/matching.ts` gets the keyword scoring moved out of `src/videos.ts`:
  `Haystacks`, `haystacksFor`, `countHits`, `keywordScore`, `entryScore`,
  and a minimal `KeywordEntry { id: string; keywords: string[] }` that
  `entryScore` accepts.
- `scripts/lib/assign-media.mts` gets the offline pass moved out of
  `scripts/assign-videos.mts`: IDF per cert, the answer-hit bonus, the
  rebalance loop, writing the generated module, and the report. It takes a
  config: the catalog, a `catalogFor(certId)` filter, a label function, the
  maximum questions per entry, an optional `bonus(entry, question)` score
  multiplier, the output path, the exported constant name and the header
  comment.
- `scripts/assign-videos.mts` becomes a thin wrapper.

**Regression guard:** the refactor lands first, with today's video constants
(5 per video, runner-up ratio 0.75, weak score 30, answer bonus 1.5).
`npm run videos:assign` must then produce a byte-identical
`src/video-assignments.ts`. The video rule changes follow as separate
commits.

## Videos

### Metadata and the length rule

Every `VideoEntry` gains two fields, filled in once from YouTube and
committed:

```ts
seconds: number;    // YouTube lengthSeconds
channelId: string;  // YouTube channel id of the uploader
```

`src/videos.ts` exports `OFFICIAL_AWS_CHANNEL_ID` and
`isOfficialAws(entry)`. It checks at module load, and the build imports
`dist/videos.js`, so `npm run build` fails if:

- any entry has `seconds > 180` and is not official AWS;
- two entries share an id within one cert;
- `domainFallback` names an entry missing from that domain's cert.

`npm run videos:check` (`scripts/check-videos.mts`) asks YouTube for each
catalog video's current length, channel and playability. It reports videos
that are gone or private, and any whose stored `seconds` or `channelId` no
longer matches. It needs the network, so it is not part of the build.

### Official preference in the matcher

A question is a **service question** when a correct option names an AWS
service or feature, detected as "Amazon <Name>" or "AWS <Name>" in the
correct answer text (the same `answers` haystack the matcher uses).
`assign-videos.mts` passes a `bonus` that multiplies an official video's
score by 1.35 on service questions. An official video that scores within
about 25% of the best third-party video then wins. Concept questions get no
bonus.

### Sourcing

New catalog entries are found by searching YouTube and are recorded with
their `seconds` and `channelId`. Relevance is judged from the title,
description and channel, and every video must be live and embeddable.
Search results need that check: "F1 is Using AWS Machine Learning" is about
Formula 1 racing, not the F1 score. The work comes in three batches:

1. **Replace the 13 over-limit videos.** 17 of their 35 questions are
   service questions and move to official videos. The other 18 are concept
   questions and move to explainers of 3 minutes or less. Candidates found
   on 2026-09-23 include "Introducing Amazon SageMaker Ground Truth" (2:57)
   and "Amazon OpenSearch Service: Scalable Vector Database" (1:51), both
   official, and "Top-k vs Top-p Sampling Explained in 2 Minutes" (2:21).
2. **Official videos for the 269 service questions.** About 42 switch
   through the bonus alone. For the other ~227, search the official channel
   by the service or feature in the answer and add what fits.
3. **Uniqueness.** Add videos until the report shows at most 3 questions per
   video and 900 or more distinct videos in use. Start with the most shared
   videos, adding closer matches for the questions that share them. Service
   questions get official videos and concept questions get short
   explainers, as above.

The work is split across parallel subagents by topic cluster. Each returns
catalog entries as JSON: id, label, keywords, cert, seconds and channelId.
Every new entry is checked with `videos:check` before assignment.

### Video targets

- Zero entries break the length rule, enforced by the build.
- Every question has an assigned video, including `aif-fm43`.
- At most 3 questions per video, and 900 or more distinct videos in use.
- Every service question has an official video, except the ones listed in
  the report as having no on-topic official video.
- Weak matches no higher than today's count.

## Images

### Data model

```ts
// src/images.ts
export interface ImageEntry extends KeywordEntry {
  id: string;           // kebab-case slug, e.g. "shared-responsibility-model"
  url: string;          // direct https URL of the image file
  alt: string;          // what the image shows, for screen readers
  caption: string;      // one short line under the image
  credit: string;       // e.g. "AWS Documentation", "Wikimedia Commons, CC BY-SA 4.0"
  sourceUrl: string;    // page the image appears on; the figure links here
  keywords: string[];
  certs: CertificationId[];   // an image can serve both certs (IAM, S3, KMS...)
}
export const imageCatalog: ImageEntry[];
export function imageCatalogFor(certId: CertificationId): ImageEntry[];
export function resolveImage(question: Question, certId: CertificationId): ImageEntry;
```

`resolveImage` picks, in order:

1. the generated assignment in `src/image-assignments.ts`
   (`imageAssignments: Record<questionId, imageId>`), if that entry is in the
   cert's catalog;
2. the best live keyword match, for questions added since the last
   assignment run;
3. the domain fallback (`domainImageFallback: Record<domainId, imageId>`),
   so every question has an image.

### Validation

`src/images.ts` runs a check at module load, and the build imports
`dist/images.js` so a bad catalog fails `npm run build`:

- entry ids are unique; `url` and `sourceUrl` start with `https://`;
  `alt`, `caption`, `credit` are non-empty; `certs` is non-empty;
- every domain of every certification has a fallback, and that fallback
  entry lists the domain's cert;
- every assignment names an existing entry that lists the question's cert.

### Scripts

- `npm run images:assign` (`tsc`, then `scripts/assign-images.mts`, then
  `tsc`): writes `src/image-assignments.ts` and prints the report. Up to 6
  questions per image before the rebalance looks for a close alternative.
- `npm run images:check` (`scripts/check-images.mts`): requests every
  catalog URL with no Referer and reports any response that is not 200 with
  an `image/*` content type. It needs the network, so it is not part of the
  build.

### Rendering

In `renderFeedbackPanel`, after the explanation and before the extras:

```html
<figure class="question-image">
  <a href="{sourceUrl}" target="_blank" rel="noopener noreferrer">
    <img src="{url}" alt="{alt}" loading="lazy" decoding="async"
         referrerpolicy="no-referrer" />
  </a>
  <figcaption>{caption} <span class="image-credit">Source: {credit}</span></figcaption>
</figure>
```

- All fields go through `escapeHtml`.
- `body.is-offline .question-image { display: none; }`, next to the existing
  offline rules for reference links.
- An `error` listener on the `<img>` removes the whole figure, so a dead
  hotlink never shows a broken-image icon or an orphaned caption.
- The image is capped in height (about 320px desktop, 220px mobile) with
  `object-fit: contain` on the card background, so wide diagrams and tall
  photos both fit, in light and dark themes.

### Sourcing

Preference order for each topic:

1. Diagrams from AWS documentation, whitepapers, Well-Architected pages and
   AWS blogs. These are the most relevant pictures for exam concepts.
2. Images on AWS product and feature pages (`aws.amazon.com`,
   `d1.awsstatic.com`).
3. Wikimedia Commons, for general concepts (data centres, servers, fibre)
   and where no AWS image fits.

Rules for every entry:

- The URL points directly at the image file and passes `images:check`.
- The image was downloaded and viewed to confirm it shows what `alt` says.
  No entry is added from its URL or filename alone.
- No images of people's faces unless they are incidental to a public
  product photo, no logos of non-AWS companies as the main subject, and
  nothing that reveals a different, wrong answer.
- `credit` names the publisher, and the licence where one applies
  (Commons).

The work is split across about 6 parallel subagents, one per topic cluster:
CLF cloud concepts; CLF security and compliance; CLF compute, networking and
storage; CLF databases, analytics, integration and other services; CLF
billing, pricing and support; and AIF-C01. Each returns entries as JSON with
the images it viewed.

**Target:** at most 5% of questions (about 60) end on a weak match or a
domain fallback, per the `images:assign` report.

## Testing

- `npm run build` passes, including the image and video catalog checks.
- `src/video-assignments.ts` is byte-identical after the matcher refactor,
  before any video rule change.
- `npm run videos:check` and `npm run images:check` report zero failures.
- `npm run videos:assign` and `npm run images:assign` meet their targets.
  The most-shared lists are reviewed for links that no longer fit.
- Browser check in practice mode: the image and caption render after
  submitting; they are hidden when the page goes offline; a catalog entry
  pointed at a dead URL removes the figure with no broken icon; the layout
  holds at phone width and in dark mode; the video link still renders.

## Risks

- **Link rot or hotlink blocking** (images). Mitigated by `referrerpolicy`,
  `images:check`, and the self-removing figure.
- **Licensing** (images). Hotlinking displays images from their publishers'
  own servers, with credit and a link to the source page. No image is copied
  into the repo.
- **YouTube metadata access.** `videos:check` reads YouTube's public
  watch-page and player data, not a keyed API. YouTube can change or
  rate-limit it. The script retries slowly, and falls back from one source
  to the other, as both did on 2026-09-23.
- **Relevance versus uniqueness.** A lower per-video cap can push questions
  onto weaker videos. The 75% runner-up floor stays, and weak matches may
  not rise.
- **Relevance drift** as questions are added. Rerun both assign scripts
  after adding questions.
