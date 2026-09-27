import { test } from "node:test";
import assert from "node:assert/strict";
import { certifications } from "../dist/certifications.js";
import { imageCatalogProblems, pickImage, resolveImage } from "../dist/images.js";
import { rankCandidates } from "../scripts/lib/assign-media.mts";
import { imageAssignConfig } from "../scripts/lib/image-config.mts";

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
const question = (text: string, explanation = "", answer = "An answer") => ({
  id: "q1",
  domain: "security-and-compliance",
  text,
  options: [{ id: "a", text: answer }, { id: "b", text: "Amazon Aurora" }],
  correctOptionIds: ["a"],
  answerType: "single",
  explanation,
});
const catalog = [img("srm", { keywords: ["shared responsibility"] }), img("kms", { keywords: ["kms"] }), img("fallback")];

test("pickImage prefers the assignment, then keywords, then the fallback", () => {
  const q = question("Under the shared responsibility model, who patches the guest OS?");
  assert.equal(pickImage(q, catalog, "kms", "fallback")!.id, "kms");
  assert.equal(pickImage(q, catalog, "gone", "fallback")!.id, "srm");
  assert.equal(pickImage(question("Which pricing model fits?"), catalog, undefined, "fallback")!.id, "fallback");
});

// The explanation name-drops a wrong option; an image of it must not be shown.
const explained = question("Which service stores ledger data?", "Unlike Amazon Aurora, a ledger is immutable. Aurora is relational.", "Amazon Managed Blockchain");
const ledgerCatalog = [img("aurora", { keywords: ["aurora", "amazon aurora"] }), img("blockchain", { keywords: ["managed blockchain"] }), img("fallback")];

test("pickImage never picks an image matched only through the explanation", () => {
  assert.equal(pickImage(explained, [ledgerCatalog[0], ledgerCatalog[2]], undefined, "fallback")!.id, "fallback");
  assert.equal(pickImage(explained, ledgerCatalog, undefined, "fallback")!.id, "blockchain");
});

test("images:assign drops explanation-only candidates and keeps stem or answer hits", () => {
  const config = { ...imageAssignConfig(), catalog: ledgerCatalog, catalogFor: () => ledgerCatalog };
  const ranked = rankCandidates(config, [{ id: "clf-c02", questions: [explained] }]).get(explained)!;
  assert.deepEqual(ranked.map((c) => c.entry.id), ["blockchain"]);
  const inStem = question("How does Amazon Aurora store data?", "Aurora uses shared storage.");
  const rankedStem = rankCandidates(config, [{ id: "clf-c02", questions: [inStem] }]).get(inStem)!;
  assert.deepEqual(rankedStem.map((c) => c.entry.id), ["aurora"]);
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
