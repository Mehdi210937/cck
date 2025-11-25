import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { releases, Release } from "@/data/releases";
import insightImage from "@/assets/insight-cracra.jpg";
import louPics from "@/assets/lou-pics.jpg";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

type ContentItem = 
  | { type: 'image'; src: string; alt: string; }
  | { type: 'release'; data: Release; }
  | { type: 'video'; src: string; alt: string; }
  | { type: 'placeholder'; media_type: 'video' | 'image' | 'spotify'; };

const Index = () => {
  // Mix releases with other content
  const illustrations = [
    "/images/releases/mykindofbird.jpg",
    "/images/releases/mil.jpg",
    "/images/releases/mill.jpg"
  ];

  const contentItems: ContentItem[] = [
    { type: 'image', src: insightImage, alt: 'CRACRAKREW Insight' },
    { type: 'video', src: '/videos/vidcasa.mp4', alt: 'CRACRAKREW Video' },
    { type: 'image', src: louPics, alt: 'Lou Pics' },
    ...illustrations.map(src => ({ type: 'image' as const, src, alt: 'CRACRAKREW Illustration' })),
    ...releases.map(release => ({ type: 'release' as const, data: release })),
  ];

  return (
    <div className="min-h-screen bg-background pb-16">
      <Header />
      
      <main className="container mx-auto px-4 md:px-6 pb-20">
        {/* Desktop Masonry - CSS Columns */}
        <div className="hidden md:block columns-3 gap-1">
          {contentItems.map((item, index) => {
            // Variation naturelle des tailles: très grande (160%), grande (130%), petite (85%)
            const sizePattern = index % 11;
            const isVeryLarge = sizePattern === 1 || sizePattern === 7;
            const isLarge = sizePattern === 3 || sizePattern === 9;
            const isSmall = sizePattern === 5;
            const scaleClass = isVeryLarge ? 'scale-[1.6]' : isLarge ? 'scale-[1.3]' : isSmall ? 'scale-[0.85]' : '';
            
            if (item.type === 'image') {
              return (
                <div
                  key={`image-${index}`}
                  className="break-inside-avoid mb-1 overflow-hidden hover-invert transition-all duration-300"
                >
                  <img 
                    src={item.src} 
                    alt={item.alt} 
                    className={`w-full h-auto block origin-center ${scaleClass}`}
                  />
                </div>
              );
            }

            if (item.type === 'video') {
              return (
                <div
                  key={`video-${index}`}
                  className="break-inside-avoid mb-1 overflow-hidden hover-invert transition-all duration-300"
                >
                  <video 
                    src={item.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className={`w-full h-auto block origin-center cursor-pointer ${scaleClass}`}
                    onMouseEnter={(e) => {
                      e.currentTarget.muted = false;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.muted = true;
                    }}
                  />
                </div>
              );
            }

            if (item.type === 'release') {
              const release = item.data;
              return (
                <div
                  key={`release-${release.id}`}
                  className="break-inside-avoid mb-1 overflow-hidden hover-invert transition-all duration-300 relative"
                >
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
                      />
                    </a>
                  ) : (
                    <img 
                      src={release.image_url} 
                      alt={release.title}
                      className={`w-full h-auto block origin-center ${scaleClass}`}
                    />
                  )}
                </div>
              );
            }
          })}
        </div>

        {/* Mobile Masonry - CSS Columns */}
        <div className="md:hidden columns-2 gap-0.5">
          {contentItems.map((item, index) => {
            // Variation mobile: très grande (140%), grande (120%), petite (90%)
            const sizePattern = index % 9;
            const isVeryLarge = sizePattern === 1 || sizePattern === 6;
            const isLarge = sizePattern === 3;
            const isSmall = sizePattern === 4;
            const scaleClass = isVeryLarge ? 'scale-[1.4]' : isLarge ? 'scale-[1.2]' : isSmall ? 'scale-90' : '';
            
            if (item.type === 'image') {
              return (
                <div
                  key={`mobile-image-${index}`}
                  className="break-inside-avoid mb-0.5 overflow-hidden hover-invert transition-all duration-300"
                >
                  <img 
                    src={item.src} 
                    alt={item.alt} 
                    className={`w-full h-auto block origin-center ${scaleClass}`}
                  />
                </div>
              );
            }

            if (item.type === 'video') {
              return (
                <div
                  key={`mobile-video-${index}`}
                  className="break-inside-avoid mb-0.5 overflow-hidden hover-invert transition-all duration-300"
                >
                  <video 
                    src={item.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className={`w-full h-auto block origin-center ${scaleClass}`}
                    onTouchStart={(e) => {
                      e.currentTarget.muted = false;
                    }}
                    onTouchEnd={(e) => {
                      e.currentTarget.muted = true;
                    }}
                  />
                </div>
              );
            }

            if (item.type === 'release') {
              const release = item.data;
              return (
                <div
                  key={`mobile-release-${release.id}`}
                  className="break-inside-avoid mb-0.5 overflow-hidden hover-invert transition-all duration-300 relative"
                >
                  {release.coming_soon && (
                    <Link to={`/releases?release=${release.id}`}>
                      <Badge className="absolute top-1 left-1 z-10 bg-primary text-xs px-2 py-0.5 hover:bg-primary/90 cursor-pointer transition-colors">
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
                      />
                    </a>
                  ) : (
                    <img 
                      src={release.image_url} 
                      alt={release.title}
                      className={`w-full h-auto block origin-center ${scaleClass}`}
                    />
                  )}
                </div>
              );
            }
          })}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
