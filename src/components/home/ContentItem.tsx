import { useState, useRef } from "react";
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
  <div className="break-inside-avoid mb-0.5 overflow-hidden img-zoom transition-all duration-500">
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
  <div className="w-full h-full overflow-hidden transition-all duration-500 relative group">
    {release.coming_soon && (
      <Link to={`/releases?release=${release.id}`}>
        <Badge className="absolute top-3 left-3 z-10 bg-accent text-accent-foreground text-[10px] tracking-[0.15em] uppercase hover:bg-accent/90 cursor-pointer transition-colors">
          DISPO
        </Badge>
      </Link>
    )}
    {release.soundcloud_url ? (
      <a href={release.soundcloud_url} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
        <img src={release.image_url} alt={release.title} className={`w-full h-full object-cover ${scaleClass} transition-transform duration-700 group-hover:scale-[1.03]`} />
      </a>
    ) : (
      <img src={release.image_url} alt={release.title} className={`w-full h-full object-cover ${scaleClass} transition-transform duration-700 group-hover:scale-[1.03]`} />
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
    <div className="w-full h-full overflow-hidden transition-all duration-500 relative group">
      <iframe
        ref={iframeRef}
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0&enablejsapi=1`}
        title="CRACRAKREW Video"
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />

      <button
        onClick={toggleMute}
        className="absolute bottom-4 right-4 p-2 bg-black/50 hover:bg-accent/80 text-white hover:text-black transition-all duration-300 opacity-0 group-hover:opacity-100"
        aria-label={isMuted ? "Activer le son" : "Couper le son"}
      >
        {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>
    </div>
  );
};
