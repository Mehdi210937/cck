import { useEffect } from "react";

/**
 * Mobile browsers (notably iOS Safari) can be picky about autoplay.
 * We retry play() on a few readiness events and ensure properties are set
 * before attempting playback.
 */
export function useForceAutoplay(
  refs: Array<React.RefObject<HTMLVideoElement | null>>,
) {
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

    const onVisible = () => {
      if (document.visibilityState === "visible") tryAll();
    };
    document.addEventListener("visibilitychange", onVisible);

    const handlers = videos.map((v) => {
      const onReady = () => tryPlay(v);
      v.addEventListener("loadeddata", onReady);
      v.addEventListener("canplay", onReady);
      v.addEventListener("canplaythrough", onReady);
      return { v, onReady };
    });

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      document.removeEventListener("visibilitychange", onVisible);
      handlers.forEach(({ v, onReady }) => {
        v.removeEventListener("loadeddata", onReady);
        v.removeEventListener("canplay", onReady);
        v.removeEventListener("canplaythrough", onReady);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
