/** Largest image the app should hotlink; bigger files slow the feedback panel on phones. */
export const MAX_IMAGE_BYTES = 1_500_000;

const USER_AGENT = "awsquiz-image-check/1.0 (+https://github.com/jgyy/awsquiz)";

/**
 * What is wrong with an image response, or null when it is usable. A
 * Cross-Origin-Resource-Policy of same-origin or same-site makes the browser refuse the
 * hotlinked image even though the request itself succeeds; an absent header or
 * "cross-origin" is fine.
 */
export function imageResponseProblem(
  status: number,
  contentType: string | null,
  bytes: number | null,
  crossOriginResourcePolicy: string | null = null
): string | null {
  if (status !== 200) return `HTTP ${status}`;
  const corp = crossOriginResourcePolicy?.trim().toLowerCase();
  if (corp && corp !== "cross-origin") return `Cross-Origin-Resource-Policy is ${corp}, so browsers block the hotlinked image`;
  if (!contentType?.toLowerCase().startsWith("image/")) return `content type is ${contentType ?? "missing"}, not an image`;
  if (bytes !== null && bytes > MAX_IMAGE_BYTES) {
    return `${(bytes / 1e6).toFixed(1)} MB is over the ${MAX_IMAGE_BYTES / 1e6} MB limit`;
  }
  return null;
}

/** Fetches an image the way the app does (no Referer, redirects followed) and returns its problem, if any. */
export async function checkImageUrl(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, { headers: { "User-Agent": USER_AGENT }, redirect: "follow" });
    const length = res.headers.get("content-length");
    let bytes = length === null ? null : Number(length);
    if (bytes === null && res.ok) bytes = (await res.arrayBuffer()).byteLength;
    else await res.body?.cancel();
    return imageResponseProblem(res.status, res.headers.get("content-type"), bytes, res.headers.get("cross-origin-resource-policy"));
  } catch (error) {
    return `request failed: ${(error as Error).message}`;
  }
}
