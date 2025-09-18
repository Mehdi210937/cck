import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";

interface Track {
  id: string;
  title: string;
  description?: string;
  audio_url: string;
  duration?: string;
  created_at: string;
}

const Sons = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTracks();
  }, []);

  const fetchTracks = async () => {
    try {
      const { data, error } = await supabase
        .from("sons")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching tracks:", error);
      } else {
        setTracks(data || []);
      }
    } catch (error) {
      console.error("Error:", error);
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
          <h1 className="text-4xl font-light tracking-tight mb-4">Audio</h1>
          <p className="text-muted-foreground max-w-2xl">
            Sound productions, mixes, and audio experiments
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        ) : tracks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No tracks available</p>
          </div>
        ) : (
          <div className="space-y-px bg-border">
            {tracks.map((track, index) => (
              <article key={track.id} className="bg-card p-6 hover:bg-muted transition-colors flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-xs text-muted-foreground font-mono w-8">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-medium">{track.title}</h3>
                    {track.description && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {track.description}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  {track.duration && (
                    <span className="text-xs text-muted-foreground font-mono">
                      {track.duration}
                    </span>
                  )}
                  <Button variant="ghost" size="sm" className="text-xs">
                    PLAY →
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

export default Sons;