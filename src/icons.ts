/**
 * Inline SVG icons used instead of Unicode symbols so the UI stays ASCII-only.
 * Every icon uses currentColor, so it inherits the color of its parent link or button.
 */
const ATTRS =
  'xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"';

function svg(cls: string, body: string): string {
  return `<svg class="icon ${cls}" ${ATTRS}>${body}</svg>`;
}

export const icons = {
  /** Open book: documentation links. */
  book: svg("icon-book", '<path d="M2 4h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7z"/>'),
  /** Terminal prompt: AWS console links. */
  terminal: svg("icon-terminal", '<polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>'),
  /** Play button: video links. */
  play: svg("icon-play", '<polygon points="6 4 20 12 6 20 6 4" fill="currentColor" stroke="none"/>'),
  /** Box with outward arrow: opens in a new tab. */
  external: svg("icon-external", '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>'),
  check: svg("icon-check", '<polyline points="20 6 9 17 4 12"/>'),
  cross: svg("icon-cross", '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>'),
  /** Cloud with a slash: shown while the app is offline. */
  offline: svg("icon-offline", '<path d="M18.7 18.7A5 5 0 0 0 18 9h-1.3A7 7 0 0 0 5.6 6.6"/><path d="M3.5 9.5A4.5 4.5 0 0 0 6 18h10"/><line x1="2" y1="2" x2="22" y2="22"/>'),
  arrowLeft: svg("icon-arrow-left", '<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>'),
};
