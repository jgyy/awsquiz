/**
 * Imports every module that checks its own data at load time, so a bad question bank or media
 * catalog fails `npm run build`. Run after `tsc`.
 */
await import("../dist/certifications.js");
await import("../dist/videos.js");
console.log("question bank and video catalog are valid");
