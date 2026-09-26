import { test } from "node:test";
import assert from "node:assert/strict";
import { MAX_IMAGE_BYTES, imageResponseProblem } from "../scripts/lib/image-check.mts";

test("a normal image passes", () => {
  assert.equal(imageResponseProblem(200, "image/png", 120_000), null);
  assert.equal(imageResponseProblem(200, "image/svg+xml", null), null);
});

test("missing files and web pages fail", () => {
  assert.equal(imageResponseProblem(404, "text/html", null), "HTTP 404");
  // A URL that redirects to a web page still returns 200, but it is not an image.
  assert.match(imageResponseProblem(200, "text/html; charset=utf-8", 5_000)!, /not an image/);
  assert.match(imageResponseProblem(200, null, 5_000)!, /content type is missing/);
});

test("oversized images fail", () => {
  assert.equal(MAX_IMAGE_BYTES, 1_500_000);
  assert.match(imageResponseProblem(200, "image/jpeg", 4_200_000)!, /4\.2 MB is over the 1\.5 MB limit/);
});
