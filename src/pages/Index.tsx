import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";

interface ContentItem {
  id: string;
  title: string;
  content: string;
  media_url?: string;
  media_type?: 'video' | 'image' | 'spotify';
  created_at: string;
}

const Index = () => {
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching content:", error);
      } else {
        setContentItems(data || []);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Placeholder cards for empty state
  const placeholderCards = Array.from({ length: 6 }, (_, i) => ({
    id: `placeholder-${i}`,
    title: '',
    content: '',
    media_type: i % 3 === 0 ? 'video' : i % 3 === 1 ? 'image' : 'spotify',
    created_at: new Date().toISOString()
  }));

  const displayItems = contentItems.length > 0 ? contentItems : placeholderCards;

  return (
    <div className="min-h-screen bg-background pb-16">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        {/* Content Grid - Masonry Style */}
        <section>
          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-bold">Loading...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {displayItems.map((item, index) => {
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
                      <div className={`bg-muted ${spanTwo ? 'aspect-video' : 'aspect-video'}`}>
                        {item.media_url ? (
                          <iframe
                            width="100%"
                            height="100%"
                            src={item.media_url}
                            title={item.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                            Video Embed
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Image */}
                    {item.media_type === 'image' && (
                      <div className={`bg-muted ${tallCard ? 'aspect-[3/4]' : 'aspect-square'}`}>
                        {item.media_url ? (
                          <img
                            src={item.media_url}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                            Image
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Spotify Embed Placeholder */}
                    {item.media_type === 'spotify' && (
                      <div className="aspect-square">
                        {item.media_url ? (
                          <iframe
                            src={item.media_url}
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-muted">
                            Spotify Embed
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Content Info */}
                    {item.title && (
                      <div className="p-4">
                        <h3 className="text-bold text-xl mb-1">{item.title}</h3>
                        {item.content && (
                          <p className="text-base text-muted-foreground leading-snug">
                            {item.content}
                          </p>
                        )}
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          )}
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;