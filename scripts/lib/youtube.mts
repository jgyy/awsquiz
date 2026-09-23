/**
 * YouTube lookups for curating the video catalog. They read the public JSON the YouTube web
 * player itself uses, so no API key is needed. YouTube can change or rate-limit it, so every
 * metadata lookup falls back to a second source and retries, and callers should run only a few
 * requests at a time (see map-limit.mts).
 */

export interface VideoMeta {
  id: string;
  title: string;
  seconds: number;
  channelId: string;
  channelName: string;
}

export interface SearchHit {
  id: string;
  title: string;
  /** Null for live streams and results YouTube shows without a length. */
  seconds: number | null;
  channelId: string;
  channelName: string;
}

const CLIENT = { clientName: "WEB", clientVersion: "2.20250101.00.00", hl: "en", gl: "US" };
const BROWSER_HEADERS = { "User-Agent": "Mozilla/5.0", "Accept-Language": "en" };

/** "4:27" -> 267, "1:02:03" -> 3723; null for anything else. */
export function parseClock(text: string | undefined): number | null {
  if (!text || !/^\d+(:\d{1,2}){1,2}$/.test(text)) return null;
  return text.split(":").reduce((total, part) => total * 60 + Number(part), 0);
}

/** Reads a player API response; null when it has no usable videoDetails (removed, private, blocked). */
export function parsePlayerResponse(json: any): VideoMeta | null {
  const d = json?.videoDetails;
  const seconds = Number(d?.lengthSeconds);
  if (!d?.videoId || !d.channelId || !(seconds > 0)) return null;
  return { id: d.videoId, title: d.title ?? "", seconds, channelId: d.channelId, channelName: d.author ?? "" };
}

/** Reads the same fields out of a watch page's HTML; null when they are missing. */
export function parseWatchPage(html: string, id: string): VideoMeta | null {
  const pick = (re: RegExp) => html.match(re)?.[1];
  const seconds = Number(pick(/"lengthSeconds":"(\d+)"/));
  const channelId = pick(/"externalChannelId":"([^"]+)"/) ?? pick(/"channelId":"([^"]+)"/);
  if (!(seconds > 0) || !channelId) return null;
  return {
    id,
    title: pick(/<meta name="title" content="([^"]*)"/) ?? "",
    seconds,
    channelId,
    channelName: pick(/"ownerChannelName":"([^"]+)"/) ?? "",
  };
}

/** Collects every videoRenderer in a search response, in page order. */
export function parseSearchResponse(json: any): SearchHit[] {
  const hits: SearchHit[] = [];
  const walk = (node: any): void => {
    if (!node || typeof node !== "object") return;
    const v = node.videoRenderer;
    if (v?.videoId) {
      const owner = v.ownerText?.runs?.[0];
      hits.push({
        id: v.videoId,
        title: (v.title?.runs ?? []).map((r: any) => r.text).join(""),
        seconds: parseClock(v.lengthText?.simpleText),
        channelId: owner?.navigationEndpoint?.browseEndpoint?.browseId ?? "",
        channelName: owner?.text ?? "",
      });
      return;
    }
    for (const key of Object.keys(node)) walk(node[key]);
  };
  walk(json);
  return hits;
}

async function innertube(endpoint: "player" | "search", body: object): Promise<any> {
  const res = await fetch(`https://www.youtube.com/youtubei/v1/${endpoint}?prettyPrint=false`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...body, context: { client: CLIENT } }),
  });
  if (!res.ok) throw new Error(`YouTube ${endpoint} returned HTTP ${res.status}`);
  return res.json();
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Length and channel for one video: the player API first, then the watch page, retrying with a
 * growing pause because YouTube throttles bursts. Null means neither source had the fields. That
 * usually means the video is gone, but throttling looks the same, so confirm with oembedStatus.
 */
export async function fetchVideoMeta(id: string, attempts = 3): Promise<VideoMeta | null> {
  for (let attempt = 0; attempt < attempts; attempt++) {
    if (attempt > 0) await sleep(1500 * attempt);
    try {
      const meta = parsePlayerResponse(await innertube("player", { videoId: id }));
      if (meta) return meta;
    } catch {
      // The watch page below is the fallback source.
    }
    try {
      const res = await fetch(`https://www.youtube.com/watch?v=${encodeURIComponent(id)}`, { headers: BROWSER_HEADERS });
      const meta = parseWatchPage(await res.text(), id);
      if (meta) return meta;
    } catch {
      // Retried on the next attempt.
    }
  }
  return null;
}

/** HTTP status of YouTube's oEmbed endpoint: 200 public and embeddable, 401 embedding disabled, 404 private or removed. */
export async function oembedStatus(id: string): Promise<number> {
  const watchUrl = `https://www.youtube.com/watch?v=${id}`;
  const res = await fetch(`https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(watchUrl)}`);
  await res.body?.cancel();
  return res.status;
}

export async function searchVideos(query: string): Promise<SearchHit[]> {
  return parseSearchResponse(await innertube("search", { query }));
}
