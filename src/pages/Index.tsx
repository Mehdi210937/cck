import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { releases, Release } from "@/data/releases";
import insightImage from "@/assets/insight-cracra.jpg";
import louPics from "@/assets/lou-pics.jpg";
import { Badge } from "@/components/ui/badge";

type ContentItem = 
  | { type: 'image'; src: string; alt: string; }
  | { type: 'release'; data: Release; }
  | { type: 'placeholder'; media_type: 'video' | 'image' | 'spotify'; };

const Index = () => {
  // Mix releases with other content
  const contentItems: ContentItem[] = [
    { type: 'image', src: insightImage, alt: 'CRACRAKREW Insight' },
    { type: 'image', src: louPics, alt: 'Lou Pics' },
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
        <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[200px]">
          {contentItems.map((item, index) => {
            const spanTwo = index % 5 === 0 || index % 7 === 0;
            const tallCard = index % 3 === 0;
            
            if (item.type === 'image') {
              return (
                <Card
                  key={`image-${index}`}
                  className={`
                    ${spanTwo ? 'md:col-span-2' : 'col-span-1'}
                    ${tallCard ? 'row-span-2' : 'row-span-1'}
                    overflow-hidden hover-invert transition-all duration-300
                  `}
                >
                  <div className="h-full p-0">
                    <img 
                      src={item.src} 
                      alt={item.alt} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Card>
              );
            }

            if (item.type === 'release') {
              const release = item.data;
              return (
                <Card
                  key={`release-${release.id}`}
                  className={`
                    ${spanTwo ? 'md:col-span-2' : 'col-span-1'}
                    ${tallCard ? 'row-span-2' : 'row-span-1'}
                    overflow-hidden hover-invert transition-all duration-300 relative
                  `}
                >
                  {release.coming_soon && (
                    <Badge className="absolute top-2 left-2 z-10 bg-primary text-xs">
                      À venir
                    </Badge>
                  )}
                  <div className="h-full p-0">
                    <img 
                      src={release.image_url} 
                      alt={release.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Card>
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
        <div className="md:hidden grid grid-cols-2 gap-2 auto-rows-[40vw]">
          {contentItems.map((item, index) => {
            const isFullWidth = (index + 2) % 5 === 0;
            
            if (item.type === 'image') {
              return (
                <Card
                  key={`mobile-image-${index}`}
                  className={`
                    ${isFullWidth ? 'col-span-2' : 'col-span-1'}
                    aspect-square overflow-hidden hover-invert transition-all duration-300
                  `}
                >
                  <div className="h-full p-0">
                    <img 
                      src={item.src} 
                      alt={item.alt} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Card>
              );
            }

            if (item.type === 'release') {
              const release = item.data;
              return (
                <Card
                  key={`mobile-release-${release.id}`}
                  className={`
                    ${isFullWidth ? 'col-span-2' : 'col-span-1'}
                    aspect-square overflow-hidden hover-invert transition-all duration-300 relative
                  `}
                >
                  {release.coming_soon && (
                    <Badge className="absolute top-1 left-1 z-10 bg-primary text-xs px-2 py-0.5">
                      À venir
                    </Badge>
                  )}
                  <div className="h-full p-0">
                    <img 
                      src={release.image_url} 
                      alt={release.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Card>
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
