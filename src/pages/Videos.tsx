import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";

interface Video {
  id: string;
  title: string;
  description: string;
  video_url: string;
  thumbnail_url?: string;
  created_at: string;
}

const Videos = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const { data, error } = await supabase
        .from("videos")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching videos:", error);
        setVideos([]);
      } else {
        setVideos(data || []);
      }
    } catch (error) {
      console.error("Error:", error);
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Navigation />
      
      <main className="container mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-light tracking-tight mb-4">Videos</h1>
          <p className="text-muted-foreground max-w-2xl">
            Visual works and documentation from the collective
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        ) : videos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No videos available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-foreground">
            {videos.map((video) => (
              <article key={video.id} className="bg-background p-6 border border-foreground hover-invert">
                <div className="aspect-video bg-muted mb-4 flex items-center justify-center border border-foreground">
                  {video.thumbnail_url ? (
                    <img 
                      src={video.thumbnail_url} 
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-muted-foreground text-sm">No Preview</span>
                  )}
                </div>
                
                <h3 className="font-medium mb-2">{video.title}</h3>
                
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {video.description}
                </p>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">
                    {new Date(video.created_at).toLocaleDateString()}
                  </span>
                  <Button variant="ghost" size="sm" className="text-xs">
                    WATCH →
                  </Button>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Videos;