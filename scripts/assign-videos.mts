/**
 * Assigns every question a YouTube video from the curated catalog and writes the result to
 * src/video-assignments.ts. Scoring, spreading and the report live in scripts/lib/assign-media.mts;
 * the video settings live in scripts/lib/video-config.mts. Run after `tsc`.
 */
import { assignMedia } from "./lib/assign-media.mts";
import { videoAssignConfig } from "./lib/video-config.mts";

await assignMedia(videoAssignConfig());
