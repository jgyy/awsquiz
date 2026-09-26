import { test } from "node:test";
import assert from "node:assert/strict";
import { renderImageFigure } from "../dist/image-figure.js";

const image = {
  id: "srm",
  url: "https://example.com/srm.png?a=1&b=2",
  alt: 'Diagram of "security of" vs "in" the cloud',
  caption: "Shared responsibility <model>",
  credit: "AWS",
  sourceUrl: "https://aws.amazon.com/compliance/shared-responsibility-model/",
  keywords: [],
  certs: ["clf-c02"],
};

test("renders a lazy, no-referrer image linked to its source, with credit", () => {
  const html = renderImageFigure(image);
  assert.match(html, /<figure class="question-image">/);
  assert.match(html, /<a href="https:\/\/aws\.amazon\.com\/compliance\/shared-responsibility-model\/" target="_blank" rel="noopener noreferrer">/);
  assert.match(html, /src="https:\/\/example\.com\/srm\.png\?a=1&amp;b=2"/);
  assert.match(html, /loading="lazy"/);
  assert.match(html, /referrerpolicy="no-referrer"/);
  assert.match(html, /<span class="image-credit">Source: AWS<\/span>/);
});

test("escapes every field", () => {
  const html = renderImageFigure(image);
  assert.match(html, /alt="Diagram of &quot;security of&quot; vs &quot;in&quot; the cloud"/);
  assert.match(html, /Shared responsibility &lt;model&gt;/);
  assert.doesNotMatch(html, /<model>/);
});
