# awsquiz

A static, no-backend AWS Certified Cloud Practitioner (CLF-C02) exam simulator.

    npm install
    npm run dev

`npm run dev` compiles the TypeScript in watch mode and serves the app at http://localhost:5173/ — opening index.html directly via a file:// URL will not work, since browsers block ES module imports from the file:// scheme.

For a one-off production build without the dev server:

    npm run build
    npx http-server .   # or: python3 -m http.server
