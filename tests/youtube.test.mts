import { test } from "node:test";
import assert from "node:assert/strict";
import { mapLimit } from "../scripts/lib/map-limit.mts";
import { parseClock, parsePlayerResponse, parseSearchResponse, parseWatchPage } from "../scripts/lib/youtube.mts";

test("mapLimit keeps input order and never exceeds the limit", async () => {
  let inFlight = 0;
  let peak = 0;
  const out = await mapLimit([30, 10, 20, 5], 2, async (ms) => {
    inFlight++;
    peak = Math.max(peak, inFlight);
    await new Promise((r) => setTimeout(r, ms));
    inFlight--;
    return ms * 2;
  });
  assert.deepEqual(out, [60, 20, 40, 10]);
  assert.equal(peak, 2);
});

test("parseClock reads m:ss and h:mm:ss", () => {
  assert.equal(parseClock("4:27"), 267);
  assert.equal(parseClock("0:55"), 55);
  assert.equal(parseClock("1:02:03"), 3723);
  assert.equal(parseClock(undefined), null);
  assert.equal(parseClock("LIVE"), null);
});

test("parsePlayerResponse reads videoDetails", () => {
  const json = {
    playabilityStatus: { status: "OK" },
    videoDetails: { videoId: "6lqUtjy_Bek", title: "IAM Role Permission Basics", lengthSeconds: "154", channelId: "UCaCZnknpM1TpUnJHl0fv0OA", author: "Cloud Bart" },
  };
  assert.deepEqual(parsePlayerResponse(json), {
    id: "6lqUtjy_Bek",
    title: "IAM Role Permission Basics",
    seconds: 154,
    channelId: "UCaCZnknpM1TpUnJHl0fv0OA",
    channelName: "Cloud Bart",
  });
});

test("parsePlayerResponse returns null when the video has no details", () => {
  assert.equal(parsePlayerResponse({ playabilityStatus: { status: "ERROR", reason: "Video unavailable" } }), null);
});

test("parseWatchPage reads the same fields from page HTML", () => {
  const html =
    '<meta name="title" content="Cloud Computing in 2 Minutes"> "lengthSeconds":"162" "externalChannelId":"UChqNJc6T93_uRl2nvmoBm4Q" "ownerChannelName":"Codebagel"';
  assert.deepEqual(parseWatchPage(html, "N0SYCyS2xZA"), {
    id: "N0SYCyS2xZA",
    title: "Cloud Computing in 2 Minutes",
    seconds: 162,
    channelId: "UChqNJc6T93_uRl2nvmoBm4Q",
    channelName: "Codebagel",
  });
  assert.equal(parseWatchPage("<html></html>", "x"), null);
});

test("parseSearchResponse walks nested renderers in page order", () => {
  const owner = (text: string, browseId: string) => ({ runs: [{ text, navigationEndpoint: { browseEndpoint: { browseId } } }] });
  const json = {
    contents: {
      sections: [
        {
          items: [
            { videoRenderer: { videoId: "v1", title: { runs: [{ text: "AWS IAM " }, { text: "Roles" }] }, lengthText: { simpleText: "4:27" }, ownerText: owner("Amazon Web Services", "UCd6MoB9NC6uYN2grvUNT-Zg") } },
            { shelfRenderer: { items: [{ videoRenderer: { videoId: "v2", title: { runs: [{ text: "Live now" }] }, ownerText: owner("Someone", "UCx") } }] } },
          ],
        },
      ],
    },
  };
  assert.deepEqual(parseSearchResponse(json), [
    { id: "v1", title: "AWS IAM Roles", seconds: 267, channelId: "UCd6MoB9NC6uYN2grvUNT-Zg", channelName: "Amazon Web Services" },
    { id: "v2", title: "Live now", seconds: null, channelId: "UCx", channelName: "Someone" },
  ]);
});
