import { describe, expect, test } from "bun:test";
import { releases } from "./releases";
import { artists } from "./artists";

describe("release announcements", () => {
  test("Pablo Hassan's supplied album belongs to his profile", () => {
    const release = releases.find((item) => item.spotify_url === "https://open.spotify.com/album/0HqekYUh8fVR9P7mfl4WS2");
    expect(release?.artist_name).toBe("Pablo Hassan");
    expect(artists.find((artist) => artist.id === release?.artist_id)?.name).toBe("Pablo Hassan");
  });
  test("the supplied track belongs to meurs un autre jour", () => {
    const release = releases.find((item) => item.spotify_url === "https://open.spotify.com/track/3YYNKI3nDWCujbdxRj6bmS");
    expect(release?.artist_name).toBe("meurs un autre jour");
    expect(artists.find((artist) => artist.id === release?.artist_id)?.name).toBe("meurs un autre jour");
  });
  test("Don Badder's EP remains upcoming with no invented date or listening link", () => {
    const release = releases.find((item) => item.artist_id === "3");
    expect(release?.coming_soon).toBe(true);
    expect(release?.release_date).toBeUndefined();
    expect(release?.spotify_url).toBeUndefined();
  });
  test("Pablo Hassan's player uses his current SoundCloud account", () => {
    expect(artists.find((artist) => artist.name === "Pablo Hassan")?.soundcloud_embed_url).toBe("https://w.soundcloud.com/player/?url=https://soundcloud.com/pablohassan");
  });
});