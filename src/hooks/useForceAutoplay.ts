import { useEffect, useCallback, useState } from "react";

/**
 * Mobile browsers (notably iOS Safari) can be picky about autoplay.
 * We retry play() on a few readiness events and ensure properties are set
 * before attempting playback.
 *
 * Returns an `enableSound` callback. Call it on a user interaction to unmute
 * all referenced videos — this bypasses browser autoplay-with-audio blocks.
 */
export function useForceAutoplay(
  refs: Array<React.RefObject<HTMLVideoElement | null>>,
) {
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    const videos = refs
      .map((r) => r.current)
      .filter(Boolean) as HTMLVideoElement[];

    if (videos.length === 0) return;

    const tryPlay = (v: HTMLVideoElement) => {
      // Set properties (not just attributes) before calling play()
      v.muted = true;
      (v as HTMLVideoElement & { playsInline?: boolean }).playsInline = true;
      v.autoplay = true;
      v.loop = true;
      v.preload = "auto";

      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };

    const tryAll = () => videos.forEach(tryPlay);

    // Attempt immediately + on next frames (covers cases where refs resolve late)
    tryAll();
    const raf1 = requestAnimationFrame(tryAll);
    const raf2 = requestAnimationFrame(tryAll);
    const t1 = window.setTimeout(tryAll, 150);
    const t2 = window.setTimeout(tryAll, 600);
    const t3 = window.setTimeout(tryAll, 1000);
    const t4 = window.setTimeout(tryAll, 2000);
    const t5 = window.setTimeout(tryAll, 3000);

    // Aggressive interval: check every 500ms for 5 seconds if video is paused
    const interval = setInterval(() => {
      videos.forEach((v) => {
        if (v.paused) {
          v.muted = true;
          v.play().catch(() => {});
        }
      });
    }, 500);
    const stopInterval = window.setTimeout(() => clearInterval(interval), 5000);

    const onVisible = () => {
      if (document.visibilityState === "visible") tryAll();
    };
    document.addEventListener("visibilitychange", onVisible);

    const handlers = videos.map((v) => {
      const onReady = () => tryPlay(v);
      v.addEventListener("loadeddata", onReady);
      v.addEventListener("canplay", onReady);
      v.addEventListener("canplaythrough", onReady);
      v.addEventListener("loadedmetadata", onReady);
      return { v, onReady };
    });

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.clearTimeout(t4);
      window.clearTimeout(t5);
      window.clearTimeout(stopInterval);
      clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisible);
      handlers.forEach(({ v, onReady }) => {
        v.removeEventListener("loadeddata", onReady);
        v.removeEventListener("canplay", onReady);
        v.removeEventListener("canplaythrough", onReady);
        v.removeEventListener("loadedmetadata", onReady);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const enableSound = useCallback(() => {
    const videos = refs
      .map((r) => r.current)
      .filter(Boolean) as HTMLVideoElement[];

    videos.forEach((v) => {
      v.muted = false;
      v.play().catch(() => {});
    });

    setSoundEnabled(true);
  }, [refs]);

  const disableSound = useCallback(() => {
    const videos = refs
      .map((r) => r.current)
      .filter(Boolean) as HTMLVideoElement[];

    videos.forEach((v) => {
      v.muted = true;
    });

    setSoundEnabled(false);
  }, [refs]);

  return { soundEnabled, enableSound, disableSound, toggleSound: soundEnabled ? disableSound : enableSound };
}
