import { test } from "node:test";
import assert from "node:assert/strict";
import {
  MAX_VIDEO_SECONDS,
  OFFICIAL_AWS_CHANNEL_ID,
  OFFICIAL_BONUS,
  isOfficialAws,
  officialPreference,
  videoCatalog,
  videoCatalogProblems,
} from "../dist/videos.js";
import { videoCheckProblems } from "../scripts/lib/video-check.mts";

const THIRD_PARTY = "UCaCZnknpM1TpUnJHl0fv0OA";
const video = (id: string, over: object = {}) => ({ id, label: id, keywords: [], cert: "clf-c02", seconds: 100, channelId: THIRD_PARTY, ...over });
const clfOnly = [{ id: "clf-c02", domains: [{ id: "cloud-concepts" }] }];
const fallback = { "cloud-concepts": "f" };

test("the length cap applies to third-party videos only", () => {
  const catalog = [
    video("f"),
    video("long", { seconds: 181 }),
    video("edge", { seconds: MAX_VIDEO_SECONDS }),
    video("aws", { seconds: 3000, channelId: OFFICIAL_AWS_CHANNEL_ID }),
  ];
  const problems = videoCatalogProblems(catalog, fallback, clfOnly);
  assert.equal(problems.length, 1);
  assert.match(problems[0], /video long .*181s is over the 180s cap/);
});

test("a video may serve both certs but may not repeat within one", () => {
  const bothCerts = [
    { id: "clf-c02", domains: [{ id: "cloud-concepts" }] },
    { id: "aif-c01", domains: [{ id: "responsible-ai" }] },
  ];
  const bothFallbacks = { "cloud-concepts": "f", "responsible-ai": "f" };
  assert.deepEqual(videoCatalogProblems([video("f"), video("f", { cert: "aif-c01" })], bothFallbacks, bothCerts), []);
  assert.match(videoCatalogProblems([video("f"), video("f")], fallback, clfOnly).join("\n"), /clf-c02: duplicate video f/);
});

test("every domain needs a fallback from its own cert", () => {
  assert.match(videoCatalogProblems([video("x")], fallback, clfOnly).join("\n"), /domain cloud-concepts: fallback video f is not in the clf-c02 catalog/);
  assert.match(videoCatalogProblems([video("f", { cert: "aif-c01" })], fallback, clfOnly).join("\n"), /fallback video f is not in the clf-c02 catalog/);
});

test("metadata must look like YouTube's", () => {
  assert.equal(videoCatalogProblems([video("f", { seconds: 0, channelId: "nope" })], fallback, clfOnly).length, 2);
});

test("isOfficialAws recognises only the Amazon Web Services channel", () => {
  assert.equal(isOfficialAws({ channelId: OFFICIAL_AWS_CHANNEL_ID }), true);
  assert.equal(isOfficialAws({ channelId: THIRD_PARTY }), false);
});

test("every catalog entry carries its length and channel", () => {
  for (const v of videoCatalog) {
    assert.ok(Number.isInteger(v.seconds) && v.seconds > 0, `${v.id} seconds`);
    assert.match(v.channelId, /^UC[\w-]{22}$/, `${v.id} channelId`);
  }
});

const entry = video("v", { seconds: 150 });
const meta = { id: "v", title: "V", seconds: 150, channelId: THIRD_PARTY, channelName: "Someone" };

test("videoCheckProblems passes a live, unchanged video", () => {
  assert.deepEqual(videoCheckProblems(entry, 200, meta), []);
});

test("videoCheckProblems tells removed videos apart from throttling", () => {
  assert.deepEqual(videoCheckProblems(entry, 404, null), ["video is private or removed"]);
  assert.deepEqual(videoCheckProblems(entry, 200, null), ["could not read length and channel (likely throttled); retry later"]);
  assert.deepEqual(videoCheckProblems(entry, 401, meta), ["embedding is disabled"]);
  assert.deepEqual(videoCheckProblems(entry, 429, meta), ["oEmbed returned HTTP 429; retry later"]);
});

test("videoCheckProblems reports changed metadata and the length rule", () => {
  assert.deepEqual(videoCheckProblems(entry, 200, { ...meta, seconds: 200 }), ["length is 200s, catalog says 150s"]);
  const over = video("v", { seconds: 200 });
  assert.match(videoCheckProblems(over, 200, { ...meta, seconds: 200 }).join("\n"), /200s is over the 180s cap/);
});

const baseQuestion = { id: "q", domain: "cloud-concepts", text: "t", answerType: "single", explanation: "e" };

test("official videos get the bonus on service questions only", () => {
  const service = { ...baseQuestion, options: [{ id: "a", text: "Amazon S3" }], correctOptionIds: ["a"] };
  const concept = { ...baseQuestion, options: [{ id: "a", text: "Elasticity" }], correctOptionIds: ["a"] };
  const official = video("o", { channelId: OFFICIAL_AWS_CHANNEL_ID });
  assert.equal(officialPreference(official, service), OFFICIAL_BONUS);
  assert.equal(officialPreference(official, concept), 1);
  assert.equal(officialPreference(video("t"), service), 1);
  assert.equal(OFFICIAL_BONUS, 1.35);
});
