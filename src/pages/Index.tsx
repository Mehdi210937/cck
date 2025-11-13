import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";

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
      
      <main className="container mx-auto px-4 py-6">
        {/* Content Grid - Masonry Style */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {placeholderCards.map((item, index) => {
                // Vary card sizes for masonry effect
                const spanTwo = index === 0 || index % 7 === 0;
                const tallCard = index % 4 === 2;
                const isSpotify = item.media_type === 'spotify';
                
                return (
                  <Card
                    key={item.id}
                    className={`overflow-hidden border ${
                      spanTwo ? 'md:col-span-2' : ''
                    } ${isSpotify ? 'bg-muted/30' : 'bg-card'}`}
                  >
                {/* Video Embed */}
                {item.media_type === 'video' && (
                  <div className={`bg-muted ${spanTwo ? 'aspect-video' : 'aspect-video'}`} />
                )}
                
                {/* Image */}
                {item.media_type === 'image' && (
                  <div className={`bg-muted ${tallCard ? 'aspect-[3/4]' : 'aspect-square'}`} />
                )}
                
                {/* Spotify Embed Placeholder */}
                {item.media_type === 'spotify' && (
                  <div className="aspect-square bg-muted" />
                )}
                  </Card>
                );
              })}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;