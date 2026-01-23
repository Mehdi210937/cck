import { ReleaseItem, YouTubeItem } from "./ContentItem";
import { releases } from "@/data/releases";
import insightImage from "@/assets/insight-cracra.jpg";
import louPics from "@/assets/lou-pics.jpg";
import vidmil from "@/assets/vidmil.mp4";
import fuckmil from "@/assets/fuckmil.jpg";
import banniereCck from "@/assets/banniere-cck.mp4";

export const DesktopGrid = () => {
  const mainRelease = releases[0];

  return (
    <div className="flex flex-col gap-1">
      {/* Ligne 1 : YouTube (2 cols) + Release (1 col) */}
      <div className="grid grid-cols-3 gap-1 h-[500px]">
        <div className="col-span-2 h-full overflow-hidden">
          <YouTubeItem videoId="tOcCIcOuul8" />
        </div>
        <div className="col-span-1 h-full overflow-hidden">
          <ReleaseItem release={mainRelease} scaleClass="" />
        </div>
      </div>

      {/* Ligne 2 : 3 images verticales égales */}
      <div className="grid grid-cols-3 gap-1 h-[550px]">
        <div className="col-span-1 h-full overflow-hidden">
          <img
            src="/images/releases/mykindofbird.jpg"
            alt="My Kind of Bird"
            className="w-full h-full object-cover hover-invert transition-all duration-300"
          />
        </div>
        <div className="col-span-1 h-full overflow-hidden">
          <img
            src="/images/releases/mil.jpg"
            alt="MIL"
            className="w-full h-full object-cover rotate-90 scale-150 hover-invert transition-all duration-300"
          />
        </div>
        <div className="col-span-1 h-full overflow-hidden">
          <img
            src="/images/releases/fuckmil.jpg"
            alt="fuckmil"
            className="w-full h-full object-cover hover-invert transition-all duration-300"
          />
        </div>
      </div>

      {/* Bannière pleine largeur */}
      <div className="w-full h-[500px] overflow-hidden">
        <video src={banniereCck} autoPlay muted loop playsInline className="w-full h-full object-contain scale-[1.02]" />
      </div>

      {/* Ligne 3 : mill (1 col) + INSIGHT (2 cols) */}
      <div className="grid grid-cols-3 gap-1 h-[500px]">
        <div className="col-span-1 h-full overflow-hidden">
          <img
            src="/images/releases/mill.jpg"
            alt="MILL"
            className="w-full h-full object-cover hover-invert transition-all duration-300"
          />
        </div>
        <div className="col-span-2 h-full overflow-hidden">
          <img
            src={insightImage}
            alt="INSIGHT CRACRA"
            className="w-full h-full object-cover hover-invert transition-all duration-300"
          />
        </div>
      </div>

      {/* Ligne 4 : LOU_PICS (1 col) + vidmil.mp4 (2 cols) */}
      <div className="grid grid-cols-3 gap-1 h-[500px]">
        <div className="col-span-1 h-full overflow-hidden">
          <img
            src={louPics}
            alt="LOU PICS"
            className="w-full h-full object-cover hover-invert transition-all duration-300"
          />
        </div>
        <div className="col-span-2 h-full overflow-hidden">
          <video src={vidmil} autoPlay muted loop playsInline className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export const MobileGrid = () => {
  const mainRelease = releases[0];

  return (
    <div className="flex flex-col gap-1">
      {/* Bannière pleine largeur */}
      <div className="h-[280px] overflow-hidden">
        <video src={banniereCck} autoPlay muted loop playsInline className="w-full h-full object-cover" />
      </div>

      {/* YouTube pleine largeur */}
      <div className="h-[250px] overflow-hidden">
        <YouTubeItem videoId="tOcCIcOuul8" />
      </div>

      {/* Release */}
      <div className="h-[350px] overflow-hidden">
        <ReleaseItem release={mainRelease} scaleClass="" />
      </div>

      {/* Images une par ligne */}
      <div className="h-[400px] overflow-hidden">
        <img
          src="/images/releases/mykindofbird.jpg"
          alt="My Kind of Bird"
          className="w-full h-full object-cover hover-invert"
        />
      </div>

      <div className="h-[400px] overflow-hidden">
        <img src="/images/releases/mil.jpg" alt="MIL" className="w-full h-full object-cover hover-invert" />
      </div>

      <div className="h-[350px] overflow-hidden">
        <img src="/images/releases/mill.jpg" alt="MILL" className="w-full h-full object-cover hover-invert" />
      </div>
      <div className="h-[350px] overflow-hidden">
        <img src="/images/releases/fuckmil.jpg" alt="fuckmil" className="w-full h-full object-cover hover-invert" />
      </div>
      <div className="h-[310px] overflow-hidden">
        <img src={insightImage} alt="INSIGHT CRACRA" className="w-full h-full object-cover hover-invert" />
      </div>

      <div className="h-[350px] overflow-hidden">
        <img src={louPics} alt="LOU PICS" className="w-full h-full object-cover hover-invert" />
      </div>

      <div className="h-[200px] overflow-hidden">
        <video src={vidmil} autoPlay muted loop playsInline className="w-full h-full object-cover" />
      </div>
    </div>
  );
};
