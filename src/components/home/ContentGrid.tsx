import { ReleaseItem, YouTubeItem } from "./ContentItem";
import { releases } from "@/data/releases";

export const DesktopGrid = () => {
  const mainRelease = releases[0]; // La release avec les liens

  return (
    <div className="grid grid-cols-3 gap-1">
      {/* Ligne 1 : YouTube (2 cols) + Release (1 col) */}
      <div className="col-span-2">
        <YouTubeItem videoId="tOcCIcOuul8" />
      </div>
      <div className="col-span-1">
        <ReleaseItem release={mainRelease} scaleClass="" />
      </div>

      {/* Ligne 2 : 3 images verticales égales */}
      <div className="col-span-1 overflow-hidden">
        <img
          src="/images/releases/mykindofbird.jpg"
          alt="My Kind of Bird"
          className="w-full h-full object-cover hover-invert transition-all duration-300"
        />
      </div>
      <div className="col-span-1 overflow-hidden">
        <div className="w-full h-full flex items-center justify-center">
          <img
            src="/images/releases/mil.jpg"
            alt="MIL"
            className="h-full w-auto object-cover rotate-90 hover-invert transition-all duration-300"
          />
        </div>
      </div>
      <div className="col-span-1 overflow-hidden">
        <img
          src="/images/releases/mykindofbird.jpg"
          alt="My Kind of Bird (placeholder)"
          className="w-full h-full object-cover hover-invert transition-all duration-300"
        />
      </div>

      {/* Ligne 3 : mill (1 col) + INSIGHT (2 cols) */}
      <div className="col-span-1 overflow-hidden">
        <img
          src="/images/releases/mill.jpg"
          alt="MILL"
          className="w-full h-full object-cover hover-invert transition-all duration-300"
        />
      </div>
      <div className="col-span-2 overflow-hidden">
        <img
          src="/images/releases/INSIGHT cracra.jpg"
          alt="INSIGHT cracra"
          className="w-full h-full object-cover hover-invert transition-all duration-300"
        />
      </div>

      {/* Ligne 4 : LOU_PICS (1 col) + vidmil.mp4 (2 cols) */}
      <div className="col-span-1 overflow-hidden">
        <img
          src="/images/releases/LOU PICS.jpg"
          alt="LOU PICS"
          className="w-full h-full object-cover hover-invert transition-all duration-300"
        />
      </div>
      <div className="col-span-2 overflow-hidden">
        <video src="/videos/vidmil.mp4" autoPlay muted loop playsInline className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export const MobileGrid = () => {
  const mainRelease = releases[0];

  return (
    <div className="grid grid-cols-2 gap-1">
      {/* YouTube pleine largeur */}
      <div className="col-span-2">
        <YouTubeItem videoId="tOcCIcOuul8" />
      </div>

      {/* Release */}
      <div className="col-span-2">
        <ReleaseItem release={mainRelease} scaleClass="" />
      </div>

      {/* Images 2 par ligne */}
      <div className="col-span-1 overflow-hidden">
        <img
          src="/images/releases/mykindofbird.jpg"
          alt="My Kind of Bird"
          className="w-full object-cover hover-invert"
        />
      </div>
      <div className="col-span-1 overflow-hidden">
        <img src="/images/releases/mil.jpg" alt="MIL" className="w-full object-cover hover-invert" />
      </div>

      <div className="col-span-1 overflow-hidden">
        <img src="/images/releases/mill.jpg" alt="MILL" className="w-full object-cover hover-invert" />
      </div>
      <div className="col-span-1 overflow-hidden">
        <img src="/images/insight-cracra.jpg" alt="INSIGHT CRACRA" className="w-full object-cover hover-invert" />
      </div>

      <div className="col-span-1 overflow-hidden">
        <img src="/images/lou-pics.jpg" alt="LOU PICS" className="w-full object-cover hover-invert" />
      </div>
      <div className="col-span-1 overflow-hidden">
        <video src="/videos/vidmil.mp4" autoPlay muted loop playsInline className="w-full object-cover" />
      </div>
    </div>
  );
};
