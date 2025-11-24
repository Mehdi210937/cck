import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import insightImage from "@/assets/insight-cracra.jpg";

interface ContentItem {
  id: string;
  media_type?: 'video' | 'image' | 'spotify';
}

const Index = () => {
  // Placeholder cards for empty state
  const placeholderCards = Array.from({ length: 12 }, (_, i) => ({
    id: `placeholder-${i}`,
    media_type: i % 3 === 0 ? 'video' : i % 3 === 1 ? 'image' : 'spotify',
  }));

  return (
    <div className="min-h-screen bg-background pb-16">
      <Header />
      
      <main className="container mx-auto px-4 md:px-6 pb-20">
        {/* Desktop Grid - Masonry Style */}
        <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[200px]">
          {placeholderCards.map((item, index) => {
            // Vary card sizes for masonry effect
            const spanTwo = index % 5 === 0 || index % 7 === 0;
            const tallCard = index % 3 === 0;
            const isSpotify = item.media_type === 'spotify';
            
            return (
              <Card
                key={item.id}
                className={`
                  ${spanTwo ? 'md:col-span-2' : 'col-span-1'}
                  ${tallCard ? 'row-span-2' : 'row-span-1'}
                  ${isSpotify ? 'row-span-1' : ''}
                  overflow-hidden hover-invert transition-all duration-300
                `}
              >
                <div className="h-full flex items-center justify-center p-0">
                  {index === 0 ? (
                    <img 
                      src={insightImage} 
                      alt="CRACRAKREW Insight" 
                      className="w-full h-full object-cover"
                    />
                  ) : item.media_type === 'video' ? (
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
          {placeholderCards.map((item, index) => {
            // Pattern: petit-petit / grand / petit-petit / grand
            const isFullWidth = (index + 2) % 5 === 0;
            const isSpotify = item.media_type === 'spotify';
            
            return (
              <Card
                key={item.id}
                className={`
                  ${isFullWidth ? 'col-span-2' : 'col-span-1'}
                  ${isSpotify ? 'row-span-1' : 'aspect-square'}
                  overflow-hidden hover-invert transition-all duration-300
                `}
              >
                <div className="h-full flex items-center justify-center p-0">
                  {index === 0 ? (
                    <img 
                      src={insightImage} 
                      alt="CRACRAKREW Insight" 
                      className="w-full h-full object-cover"
                    />
                  ) : item.media_type === 'video' ? (
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