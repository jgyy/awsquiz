import { MAX_VIDEO_SECONDS, isOfficialAws, type VideoEntry } from "../../dist/videos.js";
import type { VideoMeta } from "./youtube.mts";

/**
 * Problems with one catalog video, given YouTube's oEmbed status and metadata. A video that is
 * gone (oEmbed 404) is told apart from metadata that could not be read, which is usually
 * throttling and worth a retry rather than a replacement.
 */
export function videoCheckProblems(entry: VideoEntry, oembed: number, meta: VideoMeta | null): string[] {
  const problems: string[] = [];
  if (oembed === 401) problems.push("embedding is disabled");
  else if (oembed === 404) problems.push("video is private or removed");
  else if (oembed !== 200) problems.push(`oEmbed returned HTTP ${oembed}; retry later`);
  if (!meta) {
    if (oembed === 200) problems.push("could not read length and channel (likely throttled); retry later");
  } else {
    if (meta.seconds !== entry.seconds) problems.push(`length is ${meta.seconds}s, catalog says ${entry.seconds}s`);
    if (meta.channelId !== entry.channelId) {
      problems.push(`channel is ${meta.channelId} (${meta.channelName}), catalog says ${entry.channelId}`);
    }
  }
  if (entry.seconds > MAX_VIDEO_SECONDS && !isOfficialAws(entry)) {
    problems.push(`${entry.seconds}s is over the ${MAX_VIDEO_SECONDS}s cap and not from the official AWS channel`);
  }
  return problems;
}
