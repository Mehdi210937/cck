import { useRef, useEffect, useState } from "react";

interface VideoMirrorProps {
  src: string;
  copies?: number;
  className?: string;
}

const VideoMirror = ({ src, copies = 3, className = "" }: VideoMirrorProps) => {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    const tryPlayAll = () => {
      videoRefs.current.forEach((video) => {
        if (video) {
          video.muted = true;
          video.playsInline = true;
          video.play().catch(() => {});
        }
      });
    };

    // Tentatives multiples
    tryPlayAll();
    const timers = [
      setTimeout(tryPlayAll, 100),
      setTimeout(tryPlayAll, 300),
      setTimeout(tryPlayAll, 600),
      setTimeout(tryPlayAll, 1000),
    ];

    // Fallback sur interaction
    const handleInteraction = () => {
      tryPlayAll();
    };
    document.addEventListener("click", handleInteraction, { once: true });
    document.addEventListener("touchstart", handleInteraction, { once: true });

    return () => {
      timers.forEach(clearTimeout);
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
    };
  }, []);

  const toggleSound = () => {
    const firstVideo = videoRefs.current[0];
    if (!firstVideo) return;

    if (soundEnabled) {
      firstVideo.muted = true;
      setSoundEnabled(false);
    } else {
      firstVideo.muted = false;
      firstVideo.play().catch(() => {});
      setSoundEnabled(true);
    }
  };

  return (
    <div className="relative flex flex-col bg-black" style={{ height: "100svh" }}>
      {Array.from({ length: copies }).map((_, index) => (
        <div key={index} className="flex-1 overflow-hidden">
          <video
            ref={(el) => {
              videoRefs.current[index] = el;
            }}
            src={src}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            // @ts-ignore
            webkit-playsinline="true"
            className={`w-full h-full object-cover ${className}`}
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
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
