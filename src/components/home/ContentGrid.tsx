import { ReleaseItem, YouTubeItem } from "./ContentItem";
import { releases } from "@/data/releases";
import insightImage from "@/assets/insight-cracra.jpg";
import louPics from "@/assets/lou-pics.jpg";
import vidmil from "@/assets/vidmil.mp4";


export const DesktopGrid = () => {
  const mainRelease = releases[0];

  return (
    <div className="flex flex-col gap-[2px]">
      {/* Row 1 : YouTube (2 cols) + Release (1 col) */}
      <div className="grid grid-cols-3 gap-[2px] h-[500px]">
        <div className="col-span-2 h-full overflow-hidden img-zoom">
          <YouTubeItem videoId="tOcCIcOuul8" />
        </div>
        <div className="col-span-1 h-full overflow-hidden img-zoom">
          <ReleaseItem release={mainRelease} scaleClass="" />
        </div>
      </div>

      {/* Row 2 : 3 vertical images */}
      <div className="grid grid-cols-3 gap-[2px] h-[550px]">
        <div className="col-span-1 h-full overflow-hidden img-zoom">
          <img
            src="/images/releases/mykindofbird.jpg"
            alt="My Kind of Bird"
            className="w-full h-full object-cover transition-all duration-700"
          />
        </div>
        <div className="col-span-1 h-full overflow-hidden img-zoom">
          <img
            src="/images/releases/mil.jpg"
            alt="MIL"
            className="w-full h-full object-cover rotate-90 scale-150 transition-all duration-700"
          />
        </div>
        <div className="col-span-1 h-full overflow-hidden img-zoom">
          <img
            src="/images/releases/fuckmil.jpg"
            alt="fuckmil"
            className="w-full h-full object-cover transition-all duration-700"
          />
        </div>
      </div>

      {/* Row 3 : mill (1 col) + INSIGHT (2 cols) */}
      <div className="grid grid-cols-3 gap-[2px] h-[500px]">
        <div className="col-span-1 h-full overflow-hidden img-zoom">
          <img
            src="/images/releases/mill.jpg"
            alt="MILL"
            className="w-full h-full object-cover transition-all duration-700"
          />
        </div>
        <div className="col-span-2 h-full overflow-hidden img-zoom">
          <img
            src={insightImage}
            alt="INSIGHT CRACRA"
            className="w-full h-full object-cover transition-all duration-700"
          />
        </div>
      </div>

      {/* Row 4 : LOU_PICS (1 col) + vidmil.mp4 (2 cols) */}
      <div className="grid grid-cols-3 gap-[2px] h-[500px]">
        <div className="col-span-1 h-full overflow-hidden img-zoom">
          <img
            src={louPics}
            alt="LOU PICS"
            className="w-full h-full object-cover transition-all duration-700"
          />
        </div>
        <div className="col-span-2 h-full overflow-hidden img-zoom">
          <video src={vidmil} autoPlay muted loop playsInline className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export const MobileGrid = () => {
  const mainRelease = releases[0];

  return (
    <div className="flex flex-col gap-[2px]">

      {/* YouTube full width */}
      <div className="h-[250px] overflow-hidden">
        <YouTubeItem videoId="tOcCIcOuul8" />
      </div>

      {/* Release */}
      <div className="h-[350px] overflow-hidden img-zoom">
        <ReleaseItem release={mainRelease} scaleClass="" />
      </div>

      {/* Images */}
      <div className="h-[400px] overflow-hidden img-zoom">
        <img
          src="/images/releases/mykindofbird.jpg"
          alt="My Kind of Bird"
          className="w-full h-full object-cover transition-all duration-700"
        />
      </div>

      <div className="h-[400px] overflow-hidden img-zoom">
        <img src="/images/releases/mil.jpg" alt="MIL" className="w-full h-full object-cover transition-all duration-700" />
      </div>

      <div className="h-[350px] overflow-hidden img-zoom">
        <img src="/images/releases/mill.jpg" alt="MILL" className="w-full h-full object-cover transition-all duration-700" />
      </div>
      <div className="h-[350px] overflow-hidden img-zoom">
        <img src="/images/releases/fuckmil.jpg" alt="fuckmil" className="w-full h-full object-cover transition-all duration-700" />
      </div>
      <div className="h-[310px] overflow-hidden img-zoom">
        <img src={insightImage} alt="INSIGHT CRACRA" className="w-full h-full object-cover transition-all duration-700" />
      </div>

      <div className="h-[350px] overflow-hidden img-zoom">
        <img src={louPics} alt="LOU PICS" className="w-full h-full object-cover transition-all duration-700" />
      </div>

      <div className="h-[200px] overflow-hidden img-zoom">
        <video src={vidmil} autoPlay muted loop playsInline className="w-full h-full object-cover" />
      </div>
    </div>
  );
};
