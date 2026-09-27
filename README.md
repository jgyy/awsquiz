# awsquiz

A static, no-backend AWS certification exam simulator. Ships with question banks for Cloud Practitioner (CLF-C02) and AI Practitioner (AIF-C01); pick one on the landing screen. Add a certification by dropping a question folder under src/questions/ and an entry in src/certifications.ts.

    npm install
    npm run dev

`npm run dev` compiles the TypeScript in watch mode and serves the app at http://localhost:5173/ — opening index.html directly via a file:// URL will not work, since browsers block ES module imports from the file:// scheme.

For a one-off production build without the dev server:

    npm run build
    npx http-server .   # or: python3 -m http.server

`npm run build` compiles the TypeScript, copies the Mermaid bundle into `vendor/`, and generates `sw.js` with a precache list of every asset. Both `vendor/` and `sw.js` are build outputs and are not committed.

    npm run videos:assign

`npm run videos:assign` recomputes which YouTube video each question links to. It scores every question against the curated catalog in `src/videos.ts` (weighting the correct answer and question stem over the explanation, and rare keywords over common ones), spreads questions across videos so few share a link, and writes the result to `src/video-assignments.ts`, which is committed. Run it after adding questions or videos and check the printed report for weak or unmatched questions. Questions not in the map fall back to live keyword matching at runtime. The catalog is tagged per certification, so an AI Practitioner question is never matched to a Cloud Practitioner video and vice versa.

Every per-question video is at most 3 minutes long unless it comes from the official Amazon Web Services channel (`UCd6MoB9NC6uYN2grvUNT-Zg`). Each catalog entry records its `seconds` and `channelId`, and `npm run build` fails on any entry that breaks the rule. When a question's correct answer names an AWS service, the assignment prefers an official AWS video, and no video serves more than 3 questions if a close alternative exists.

    npm run videos:check
    npm run youtube -- search "Amazon S3 Vectors" --official
    npm run youtube -- meta <videoId>
    node scripts/preview-match.mts videos <questionId> [batch.json]

`videos:check` confirms every catalog video is still public and embeddable, and that its stored length and channel are current. It reads YouTube's public player data without an API key, so run it occasionally rather than in CI, and rerun anything reported as "retry later". The `youtube` helper looks up a video's length and channel, or searches YouTube (`--official` for the AWS channel only, `--short` for 3 minutes or less). `preview-match` shows how a question would be matched, including entries not yet merged into the catalog.

## Question images

After each practice answer the app shows one image that illustrates the question: an AWS diagram, a product image, or a Wikimedia Commons picture for general concepts. Images are hotlinked. `src/image-catalog.ts` stores only each image's URL, alt text, caption, credit and source page, and the image loads from the publisher's own server with a link back to that page. Nothing is copied into this repo. Images are hidden offline, and an image that fails to load is removed rather than shown broken.

    npm run images:assign
    npm run images:check
    node scripts/preview-match.mts images <questionId> [batch.json]

`images:assign` matches each question to its most relevant image, the same way videos are matched, and writes `src/image-assignments.ts`. Questions with no match use their domain's fallback image. `images:check` confirms every URL still returns an image of 1.5 MB or less. Run it after editing the catalog and before a release, since hotlinked images can move.

## Offline and PWA

The app is an installable Progressive Web App. On first visit the service worker caches the app shell, all question modules, the self-hosted fonts in `fonts/`, and the vendored Mermaid bundle, so every screen, diagram, and CLI example works with no network. While offline the docs, console, and YouTube links and the question images are hidden and replaced with a short note, since they cannot be loaded anyway.

The service worker must be served over HTTPS or from localhost. When you change any asset, rebuild so `sw.js` gets a new cache name; the old cache is evicted on the next activation.
