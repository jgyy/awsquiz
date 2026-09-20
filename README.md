# awsquiz

A static, no-backend AWS Certified Cloud Practitioner (CLF-C02) exam simulator.

    npm install
    npm run dev

`npm run dev` compiles the TypeScript in watch mode and serves the app at http://localhost:5173/ — opening index.html directly via a file:// URL will not work, since browsers block ES module imports from the file:// scheme.

For a one-off production build without the dev server:

    npm run build
    npx http-server .   # or: python3 -m http.server

`npm run build` compiles the TypeScript, copies the Mermaid bundle into `vendor/`, and generates `sw.js` with a precache list of every asset. Both `vendor/` and `sw.js` are build outputs and are not committed.

## Offline and PWA

The app is an installable Progressive Web App. On first visit the service worker caches the app shell, all question modules, the self-hosted fonts in `fonts/`, and the vendored Mermaid bundle, so every screen, diagram, and CLI example works with no network. While offline the docs, console, and YouTube links are hidden and replaced with a short note, since they cannot be opened anyway.

The service worker must be served over HTTPS or from localhost. When you change any asset, rebuild so `sw.js` gets a new cache name; the old cache is evicted on the next activation.
