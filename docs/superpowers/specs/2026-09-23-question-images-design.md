# Question Images in Practice Mode — Design

Date: 2026-09-23
Status: Approved (design); spec pending review

## Purpose

After a learner submits an answer in practice mode, show one image from the
internet that is the most relevant picture for that question, such as the
shared responsibility model diagram on a shared-responsibility question or
an AWS Shield diagram on a DDoS question. Every question in both banks
(1,040 CLF-C02 and 195 AIF-C01) gets an image.

## Decisions

- **Placement: after submitting.** The image sits in the practice feedback
  panel next to the docs, console and YouTube links. The most relevant image
  usually shows the answer, so showing it earlier would give it away.
- **Hosting: hotlink with credit.** The repo stores only each image's URL,
  alt text, caption, credit and source page. The browser loads the image
  from its original site. Nothing is copied into the public repo, so AWS's
  own diagrams can be used. Images are hidden offline, like the other links.
- **Granularity: shared topic catalog.** About 250–300 checked images, each
  tagged with keywords, are matched to questions the way videos are. Related
  questions share an image.

## Non-goals

- Not shown in the full-exam results review, which also calls
  `renderFeedbackExtras`. The image is added in `renderFeedbackPanel`, which
  only practice mode uses.
- No offline copies, and no service worker caching of images. The service
  worker already ignores cross-origin requests.
- No per-question override field on `Question`. Weak matches are fixed by
  adding catalog entries or keywords, then rerunning the assignment.
- No change to which video any question gets.

## Shared matcher (refactor)

The video pipeline already does what images need: it scores catalog
keywords against the question stem, the correct answers (weighted highest)
and the explanation, weights keywords by rarity (IDF) per certification, and
spreads questions across entries. Both media use one copy of that logic:

- `src/matching.ts` gets the keyword scoring moved out of `src/videos.ts`:
  `Haystacks`, `haystacksFor`, `countHits`, `keywordScore`, `entryScore`,
  and a minimal `KeywordEntry { id: string; keywords: string[] }` that
  `entryScore` accepts. `src/videos.ts` imports them from there.
- `scripts/lib/assign-media.mts` gets the offline pass moved out of
  `scripts/assign-videos.mts`: IDF per cert, the answer-hit bonus, the
  rebalance loop, writing the generated module, and the report. It takes a
  config: the catalog, a `catalogFor(certId)` filter, a label function, the
  maximum questions per entry, the output path, the exported constant name
  and the header comment.
- `scripts/assign-videos.mts` becomes a thin wrapper with today's constants
  (5 per video, runner-up ratio 0.75, weak score 30, answer bonus 1.5).

**Regression guard:** after the refactor, `npm run videos:assign` must
produce a byte-identical `src/video-assignments.ts`.

## Data model

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

## Validation

`src/images.ts` runs a check at module load, like `certifications.ts`, and
the build imports `dist/images.js` so a bad catalog fails `npm run build`:

- entry ids are unique; `url` and `sourceUrl` start with `https://`;
  `alt`, `caption`, `credit` are non-empty; `certs` is non-empty;
- every domain of every certification has a fallback, and that fallback
  entry lists the domain's cert;
- every assignment names an existing entry that lists the question's cert.

## Scripts

- `npm run images:assign` (`tsc`, then `scripts/assign-images.mts`, then
  `tsc`): writes `src/image-assignments.ts` and prints the report. Images
  allow more sharing than videos: up to 6 questions per image before the
  rebalance looks for a close alternative.
- `npm run images:check` (`scripts/check-images.mts`): requests every
  catalog URL with no Referer and reports any response that is not 200 with
  an `image/*` content type. It needs the network, so it is not part of the
  build. Run it after editing the catalog and before a release.

## Rendering

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

## Sourcing

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

The catalog is built by about 6 parallel subagents, one per topic cluster:
CLF cloud concepts; CLF security and compliance; CLF compute, networking and
storage; CLF databases, analytics, integration and other services; CLF
billing, pricing and support; and AIF-C01. Each returns entries as JSON with
the images it viewed. The merged catalog is deduplicated, URL-checked and
spot-viewed before assignment.

**Target:** at most 5% of questions (about 60) end on a weak match or a
domain fallback, per the `images:assign` report.

## Testing

- `npm run build` passes, including the new catalog validation.
- `src/video-assignments.ts` is byte-identical after the matcher refactor.
- `npm run images:check` reports zero failures.
- `npm run images:assign` meets the weak-match target, and the most-shared
  list is reviewed for images that no longer fit their questions.
- Browser check in practice mode: the image and caption render after
  submitting; they are hidden when the page goes offline; a catalog entry
  pointed at a dead URL removes the figure with no broken icon; the layout
  holds at phone width and in dark mode.

## Risks

- **Link rot or hotlink blocking.** Mitigated by `referrerpolicy`,
  `images:check`, and the self-removing figure.
- **Licensing.** Hotlinking displays images from their publishers' own
  servers, with credit and a link to the source page. No image is copied
  into the repo.
- **Relevance drift** as questions are added. Rerun `images:assign` after
  adding questions, as with videos.
