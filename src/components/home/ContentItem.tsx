import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Volume2, VolumeX } from "lucide-react";
import { Release } from "@/data/releases";

interface ImageItemProps {
  src: string;
  alt: string;
  scaleClass: string;
}

export const ImageItem = ({ src, alt, scaleClass }: ImageItemProps) => (
  <div className="break-inside-avoid mb-0.5 overflow-hidden hover-invert transition-all duration-300">
    <img
      src={src}
      alt={alt}
      className={`w-full h-auto block origin-center ${scaleClass}`}
      style={{ objectFit: "contain" }}
    />
  </div>
);

interface ReleaseItemProps {
  release: Release;
  scaleClass: string;
}

export const ReleaseItem = ({ release, scaleClass }: ReleaseItemProps) => (
  <div className="break-inside-avoid mb-0.5 overflow-hidden hover-invert transition-all duration-300 relative">
    {release.coming_soon && (
      <Link to={`/releases?release=${release.id}`}>
        <Badge className="absolute top-2 left-2 z-10 bg-primary text-xs hover:bg-primary/90 cursor-pointer transition-colors">
          DISPO
        </Badge>
      </Link>
    )}
    {release.soundcloud_url ? (
      <a href={release.soundcloud_url} target="_blank" rel="noopener noreferrer" className="block">
        <img
          src={release.image_url}
          alt={release.title}
          className={`w-full h-auto block origin-center ${scaleClass}`}
          style={{ objectFit: "contain" }}
        />
      </a>
    ) : (
      <img
        src={release.image_url}
        alt={release.title}
        className={`w-full h-auto block origin-center ${scaleClass}`}
        style={{ objectFit: "contain" }}
      />
    )}
  </div>
);

interface YouTubeItemProps {
  videoId: string;
}

export const YouTubeItem = ({ videoId }: YouTubeItemProps) => {
  const [isMuted, setIsMuted] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const toggleMute = () => {
    if (iframeRef.current?.contentWindow) {
      const command = isMuted ? "unMute" : "mute";
      iframeRef.current.contentWindow.postMessage(JSON.stringify({ event: "command", func: command }), "*");
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="break-inside-avoid mb-0.5 overflow-hidden transition-all duration-300 relative group">
      <div className="aspect-video w-full">
        <iframe
          ref={iframeRef}
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0&enablejsapi=1`}
          title="CRACRAKREW Video"
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      {/* Bouton son */}
      <button
        onClick={toggleMute}
        className="absolute bottom-3 right-3 p-2 bg-black/60 hover:bg-black/80 rounded-full text-white transition-all duration-300 opacity-0 group-hover:opacity-100"
        aria-label={isMuted ? "Activer le son" : "Couper le son"}
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>
    </div>
  );
};
