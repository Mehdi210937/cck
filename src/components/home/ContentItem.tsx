import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
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
      style={{ objectFit: 'contain' }}
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
      <a 
        href={release.soundcloud_url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block"
      >
        <img 
          src={release.image_url} 
          alt={release.title}
          className={`w-full h-auto block origin-center ${scaleClass}`}
          style={{ objectFit: 'contain' }}
        />
      </a>
    ) : (
      <img 
        src={release.image_url} 
        alt={release.title}
        className={`w-full h-auto block origin-center ${scaleClass}`}
        style={{ objectFit: 'contain' }}
      />
    )}
  </div>
);

interface YouTubeItemProps {
  videoId: string;
}

export const YouTubeItem = ({ videoId }: YouTubeItemProps) => (
  <div className="break-inside-avoid mb-0.5 overflow-hidden hover-invert transition-all duration-300">
    <div className="aspect-video w-full">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0`}
        title="CRACRAKREW Video"
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  </div>
);
