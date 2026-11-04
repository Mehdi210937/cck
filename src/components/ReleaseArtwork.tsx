import { Disc3 } from "lucide-react";
import type { Release } from "@/data/releases";

export const ReleaseArtwork = ({ release, className = "" }: { release: Release; className?: string }) => (
  release.image_url ? (
    <img src={release.image_url} alt={release.title} className={`w-full h-full object-cover ${className}`} />
  ) : (
    <div className="w-full h-full bg-muted flex flex-col items-center justify-center gap-4 text-muted-foreground">
      <Disc3 className="w-16 h-16" aria-hidden="true" />
      <span className="font-serif text-xl">{release.artist_name}</span>
      <span className="text-xs uppercase">EP · Soon</span>
    </div>
  )
);