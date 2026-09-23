import { test } from "node:test";
import assert from "node:assert/strict";
import { countHits, entryScore, haystacksFor, keywordScore, namesAwsService } from "../dist/matching.js";

const question = {
  id: "t1",
  domain: "cloud-technology-and-services",
  text: "Which service stores objects?",
  options: [
    { id: "a", text: "Amazon S3" },
    { id: "b", text: "Amazon EBS" },
  ],
  correctOptionIds: ["a"],
  answerType: "single",
  explanation: "S3 is object storage, unlike EBS.",
};

test("haystacksFor lowercases and keeps only the correct answers", () => {
  const h = haystacksFor(question);
  assert.equal(h.stem, "which service stores objects?");
  assert.equal(h.answers, "amazon s3");
  assert.equal(h.explanation, "s3 is object storage, unlike ebs.");
});

test("countHits matches whole words only and caps at 2", () => {
  assert.equal(countHits("scp", "the scope of an scp"), 1);
  assert.equal(countHits("s3", "s3 s3 s3"), 2);
});

test("keywordScore weights answer over stem over explanation, scaled by capped length", () => {
  assert.equal(keywordScore("s3", { stem: "", answers: "amazon s3", explanation: "" }), 4 * 2);
  const long = "a-very-long-keyword-phrase";
  assert.equal(keywordScore(long, { stem: long, answers: "", explanation: "" }), 3 * 15);
});

test("entryScore sums lowercased keywords and applies weightFor", () => {
  const h = haystacksFor(question);
  const entry = { id: "e", keywords: ["S3", "object storage"] };
  const base = entryScore(entry, h);
  assert.equal(base, keywordScore("s3", h) + keywordScore("object storage", h));
  assert.equal(entryScore(entry, h, () => 2), base * 2);
});

const withAnswers = (texts: string[], correct = ["a"]) => ({
  ...question,
  options: texts.map((text, i) => ({ id: "abc"[i], text })),
  correctOptionIds: correct,
});

test("namesAwsService reads only the correct answers", () => {
  assert.equal(namesAwsService(withAnswers(["Amazon S3", "Tape"])), true);
  assert.equal(namesAwsService(withAnswers(["Enable AWS Shield Advanced"])), true);
  assert.equal(namesAwsService(withAnswers(["Pay-as-you-go pricing", "Amazon S3"])), false);
  assert.equal(namesAwsService(withAnswers(["It is AWS's responsibility"])), false);
  assert.equal(namesAwsService(withAnswers(["AWS manages the hardware"])), false);
});
