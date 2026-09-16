# awsquiz
Cloud Practitioner, AI Practitioner, Solutions Architect – Associate, Developer – Associate, CloudOps Engineer – Associate, Data Engineer – Associate, Machine Learning Engineer – Associate, Solutions Architect – Professional, DevOps Engineer – Professional, Generative AI Developer – Professional, Security – Specialty

## Cloud Practitioner

A static, no-backend exam simulator lives in [`cloud-practitioner/`](cloud-practitioner/).

    cd cloud-practitioner
    npm install
    npm run build
    npx http-server .   # or: python3 -m http.server

Then open the URL it prints (e.g. http://localhost:8080/) — opening index.html directly via a file:// URL will not work, since browsers block ES module imports from the file:// scheme.
