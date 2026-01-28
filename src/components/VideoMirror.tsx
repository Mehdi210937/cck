import { useRef, useEffect, useCallback, useState } from "react";

interface VideoMirrorProps {
  src: string;
  copies?: number;
  className?: string;
  onSoundToggle?: (enabled: boolean) => void;
}

/**
 * VideoMirror: Renders ONE hidden video + N canvas copies.
 * iOS Safari blocks multiple autoplay videos, but canvas copies bypass this.
 */
const VideoMirror = ({ src, copies = 3, className = "" }: VideoMirrorProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  const animationRef = useRef<number | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Draw video frame to all canvases
  const drawFrame = useCallback(() => {
    const video = videoRef.current;
    if (!video || video.paused || video.ended) {
      animationRef.current = requestAnimationFrame(drawFrame);
      return;
    }

    canvasRefs.current.forEach((canvas) => {
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Match canvas size to video
      if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
      }

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    });

    animationRef.current = requestAnimationFrame(drawFrame);
  }, []);

  // Force autoplay with aggressive retries
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = () => {
      video.muted = true;
      video.playsInline = true;
      video.autoplay = true;
      video.loop = true;
      video.play().catch(() => {});
    };

    // Immediate + delayed attempts
    tryPlay();
    const timers = [
      setTimeout(tryPlay, 100),
      setTimeout(tryPlay, 300),
      setTimeout(tryPlay, 600),
      setTimeout(tryPlay, 1000),
      setTimeout(tryPlay, 2000),
    ];

    // Retry every 500ms for 5 seconds if paused
    const interval = setInterval(() => {
      if (video.paused) tryPlay();
    }, 500);
    const stopInterval = setTimeout(() => clearInterval(interval), 5000);

    // Event-based triggers
    const onReady = () => tryPlay();
    video.addEventListener("loadeddata", onReady);
    video.addEventListener("canplay", onReady);
    video.addEventListener("canplaythrough", onReady);
    video.addEventListener("loadedmetadata", onReady);

    // Visibility change
    const onVisible = () => {
      if (document.visibilityState === "visible") tryPlay();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(stopInterval);
      clearInterval(interval);
      video.removeEventListener("loadeddata", onReady);
      video.removeEventListener("canplay", onReady);
      video.removeEventListener("canplaythrough", onReady);
      video.removeEventListener("loadedmetadata", onReady);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  // Start drawing loop when video plays
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const startLoop = () => {
      if (animationRef.current === null) {
        animationRef.current = requestAnimationFrame(drawFrame);
      }
    };

    video.addEventListener("play", startLoop);
    video.addEventListener("playing", startLoop);

    // Also start immediately if already playing
    if (!video.paused) startLoop();

    return () => {
      video.removeEventListener("play", startLoop);
      video.removeEventListener("playing", startLoop);
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [drawFrame]);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;

    if (soundEnabled) {
      video.muted = true;
      setSoundEnabled(false);
    } else {
      video.muted = false;
      video.play().catch(() => {});
      setSoundEnabled(true);
    }
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-black">
      {/* Hidden source video */}
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        // @ts-ignore
        webkit-playsinline="true"
        className="absolute opacity-0 pointer-events-none w-0 h-0"
        aria-hidden="true"
      />

      {/* Canvas copies */}
      {Array.from({ length: copies }).map((_, index) => (
        <div key={index} className="flex-1 flex items-center justify-center">
          <canvas
            ref={(el) => {
              canvasRefs.current[index] = el;
            }}
            className={className}
          />
        </div>
      ))}

      {/* Sound toggle button */}
      <button
        onClick={toggleSound}
        className="absolute top-4 right-4 z-20 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
        aria-label={soundEnabled ? "Couper le son" : "Activer le son"}
      >
        {soundEnabled ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="22" y1="9" x2="16" y2="15" />
            <line x1="16" y1="9" x2="22" y2="15" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default VideoMirror;
