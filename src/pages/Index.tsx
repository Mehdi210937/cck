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
    { type: 'image', src: louPics, alt: 'Lou Pics' },
    ...illustrations.map(src => ({ type: 'image' as const, src, alt: 'CRACRAKREW Illustration' })),
    ...releases.map(release => ({ type: 'release' as const, data: release })),
    { type: 'placeholder' as const, media_type: 'video' as const },
    { type: 'placeholder' as const, media_type: 'spotify' as const },
    { type: 'placeholder' as const, media_type: 'image' as const },
    { type: 'placeholder' as const, media_type: 'video' as const },
  ];

  return (
    <div className="min-h-screen bg-background pb-16">
      <Header />
      
      <main className="container mx-auto px-4 md:px-6 pb-20">
        {/* Desktop Grid - Masonry Style */}
        <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-2 auto-rows-min">
          {contentItems.map((item, index) => {
            const spanTwo = index % 5 === 0 || index % 7 === 0;
            const tallCard = index % 3 === 0;
            
            if (item.type === 'image') {
              return (
                <div
                  key={`image-${index}`}
                  className={`
                    ${spanTwo ? 'md:col-span-2' : 'col-span-1'}
                    overflow-hidden hover-invert transition-all duration-300 block
                  `}
                >
                  <img 
                    src={item.src} 
                    alt={item.alt} 
                    className="w-full h-auto block"
                  />
                </div>
              );
            }

            if (item.type === 'release') {
              const release = item.data;
              return (
                <div
                  key={`release-${release.id}`}
                  className={`
                    ${spanTwo ? 'md:col-span-2' : 'col-span-1'}
                    overflow-hidden hover-invert transition-all duration-300 relative block
                  `}
                >
                  {release.coming_soon && (
                    <Link to={`/releases?release=${release.id}`}>
                      <Badge className="absolute top-2 left-2 z-10 bg-primary text-xs hover:bg-primary/90 cursor-pointer transition-colors">
                        À venir
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
                        className="w-full h-auto block"
                      />
                    </a>
                  ) : (
                    <img 
                      src={release.image_url} 
                      alt={release.title}
                      className="w-full h-auto block"
                    />
                  )}
                </div>
              );
            }
            
            return (
              <Card
                key={`placeholder-${index}`}
                className={`
                  ${spanTwo ? 'md:col-span-2' : 'col-span-1'}
                  ${item.media_type === 'video' && tallCard ? 'row-span-2' : 'row-span-1'}
                  overflow-hidden hover-invert transition-all duration-300
                `}
              >
                <div className="h-full flex items-center justify-center p-0">
                  {item.media_type === 'video' ? (
                    <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
                      Video Placeholder
                    </div>
                  ) : item.media_type === 'spotify' ? (
                    <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
                      Spotify Embed
                    </div>
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
                      Image Placeholder
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Mobile Grid - Intelligent Masonry Pattern */}
        <div className="md:hidden grid grid-cols-2 gap-1.5 auto-rows-min">
          {contentItems.map((item, index) => {
            const isFullWidth = (index + 2) % 5 === 0;
            
            if (item.type === 'image') {
              return (
                <div
                  key={`mobile-image-${index}`}
                  className={`
                    ${isFullWidth ? 'col-span-2' : 'col-span-1'}
                    overflow-hidden hover-invert transition-all duration-300 block
                  `}
                >
                  <img 
                    src={item.src} 
                    alt={item.alt} 
                    className="w-full h-auto block"
                  />
                </div>
              );
            }

            if (item.type === 'release') {
              const release = item.data;
              return (
                <div
                  key={`mobile-release-${release.id}`}
                  className={`
                    ${isFullWidth ? 'col-span-2' : 'col-span-1'}
                    overflow-hidden hover-invert transition-all duration-300 relative block
                  `}
                >
                  {release.coming_soon && (
                    <Link to={`/releases?release=${release.id}`}>
                      <Badge className="absolute top-1 left-1 z-10 bg-primary text-xs px-2 py-0.5 hover:bg-primary/90 cursor-pointer transition-colors">
                        À venir
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
                        className="w-full h-auto block"
                      />
                    </a>
                  ) : (
                    <img 
                      src={release.image_url} 
                      alt={release.title}
                      className="w-full h-auto block"
                    />
                  )}
                </div>
              );
            }
            
            return (
              <Card
                key={`mobile-placeholder-${index}`}
                className={`
                  ${isFullWidth ? 'col-span-2' : 'col-span-1'}
                  ${item.media_type === 'spotify' ? 'row-span-1' : 'aspect-square'}
                  overflow-hidden hover-invert transition-all duration-300
                `}
              >
                <div className="h-full flex items-center justify-center p-0">
                  {item.media_type === 'video' ? (
                    <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground text-xs">
                      Video
                    </div>
                  ) : item.media_type === 'spotify' ? (
                    <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground text-xs">
                      Spotify
                    </div>
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground text-xs">
                      Image
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
