import { escapeHtml } from "./html.js";
import { ImageEntry } from "./image-catalog.js";

/**
 * Markup for a question's hotlinked image. The image links to the page it came from and is
 * credited under it; main.ts removes the whole figure if the image fails to load.
 */
export function renderImageFigure(image: ImageEntry): string {
  return `
    <figure class="question-image">
      <a href="${escapeHtml(image.sourceUrl)}" target="_blank" rel="noopener noreferrer">
        <img src="${escapeHtml(image.url)}" alt="${escapeHtml(image.alt)}" loading="lazy" decoding="async" referrerpolicy="no-referrer" />
      </a>
      <figcaption>${escapeHtml(image.caption)} <span class="image-credit">Source: ${escapeHtml(image.credit)}</span></figcaption>
    </figure>`;
}
