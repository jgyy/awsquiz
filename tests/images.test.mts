import { test } from "node:test";
import assert from "node:assert/strict";
import { certifications } from "../dist/certifications.js";
import { imageCatalogProblems, pickImage, resolveImage } from "../dist/images.js";

const img = (id: string, over: object = {}) => ({
  id,
  url: `https://example.com/${id}.png`,
  alt: "alt",
  caption: "caption",
  credit: "credit",
  sourceUrl: "https://example.com/page",
  keywords: [] as string[],
  certs: ["clf-c02"],
  ...over,
});
const question = (text: string) => ({
  id: "q1",
  domain: "security-and-compliance",
  text,
  options: [{ id: "a", text: "An answer" }],
  correctOptionIds: ["a"],
  answerType: "single",
  explanation: "",
});
const catalog = [img("srm", { keywords: ["shared responsibility"] }), img("kms", { keywords: ["kms"] }), img("fallback")];

test("pickImage prefers the assignment, then keywords, then the fallback", () => {
  const q = question("Under the shared responsibility model, who patches the guest OS?");
  assert.equal(pickImage(q, catalog, "kms", "fallback")!.id, "kms");
  assert.equal(pickImage(q, catalog, "gone", "fallback")!.id, "srm");
  assert.equal(pickImage(question("Which pricing model fits?"), catalog, undefined, "fallback")!.id, "fallback");
});

const certsFixture = [{ id: "clf-c02", domains: [{ id: "security-and-compliance" }], questions: [{ id: "q1" }] }];

test("a valid catalog has no problems", () => {
  assert.deepEqual(imageCatalogProblems(catalog, { "security-and-compliance": "fallback" }, { q1: "srm" }, certsFixture), []);
});

test("entry fields are checked", () => {
  const bad = [img("Bad_Id"), img("http", { url: "http://x/y.png", sourceUrl: "ftp://x" }), img("blank", { alt: " ", caption: "", credit: "" }), img("nocert", { certs: [] }), img("srm"), img("srm")];
  const problems = imageCatalogProblems([...bad, img("fallback")], { "security-and-compliance": "fallback" }, {}, certsFixture).join("\n");
  assert.match(problems, /Bad_Id: id must be a kebab-case slug/);
  assert.match(problems, /http: url must start with https:\/\//);
  assert.match(problems, /http: sourceUrl must start with https:\/\//);
  assert.match(problems, /blank: alt is empty/);
  assert.match(problems, /blank: caption is empty/);
  assert.match(problems, /blank: credit is empty/);
  assert.match(problems, /nocert: certs is empty/);
  assert.match(problems, /duplicate image id srm/);
});

test("fallbacks and assignments must exist and list the cert", () => {
  const aifOnly = [img("fallback", { certs: ["aif-c01"] }), img("srm", { certs: ["aif-c01"] })];
  const problems = imageCatalogProblems(aifOnly, { "security-and-compliance": "fallback" }, { q1: "srm" }, certsFixture).join("\n");
  assert.match(problems, /domain security-and-compliance: fallback fallback does not list clf-c02/);
  assert.match(problems, /question q1: assigned image srm does not list clf-c02/);
  const missing = imageCatalogProblems(catalog, {}, { q1: "nope" }, certsFixture).join("\n");
  assert.match(missing, /domain security-and-compliance: no fallback image/);
  assert.match(missing, /question q1: assigned image nope is not in the catalog/);
});

test("every real question resolves to an image of its own cert", () => {
  for (const cert of certifications) {
    for (const q of cert.questions) {
      const image = resolveImage(q, cert.id);
      assert.ok(image && image.certs.includes(cert.id), `${q.id} -> ${image?.id}`);
    }
  }
});
