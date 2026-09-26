/**
 * Imports every module that checks its own data at load time, so a bad question bank or media
 * catalog fails `npm run build`. Run after `tsc`.
 */
await import("../dist/certifications.js");
await import("../dist/videos.js");
await import("../dist/images.js");
console.log("question bank, video catalog and image catalog are valid");
