/** Copies third-party browser bundles out of node_modules so the app has no CDN dependency. */
import { copyFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
await mkdir(path.join(root, "vendor"), { recursive: true });
await copyFile(
  path.join(root, "node_modules/mermaid/dist/mermaid.min.js"),
  path.join(root, "vendor/mermaid.min.js")
);
console.log("vendor/mermaid.min.js copied");
