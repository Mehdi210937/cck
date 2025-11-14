import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Music, ExternalLink } from "lucide-react";

interface Artist {
  id: string;
  name: string;
  photo_url: string | null;
  soundcloud_url: string | null;
  spotify_url: string | null;
  other_url: string | null;
}

const Artists = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadArtists();
  }, []);

  const loadArtists = async () => {
    try {
      const { data, error } = await (supabase as any)
        .from('artists')
        .select('*')
        .order('name');

      if (error) throw error;
      setArtists(data || []);
    } catch (error) {
      console.error('Error loading artists:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-16">
      <Header />
      
      <main className="container mx-auto px-4 py-6 mb-24">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Chargement...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {artists.map((artist) => (
              <Dialog key={artist.id}>
                <DialogTrigger asChild>
                  <div className="border border-border p-6 hover-invert transition-all cursor-pointer">
                    <h2 className="text-2xl font-bold">{artist.name}</h2>
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-2xl">{artist.name}</DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-6">
                    {/* Photo */}
                    {artist.photo_url ? (
                      <div className="w-full aspect-square overflow-hidden rounded-lg border border-border">
                        <img 
                          src={artist.photo_url} 
                          alt={artist.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-full aspect-square flex items-center justify-center bg-muted rounded-lg border border-border">
                        <Music className="w-16 h-16 text-muted-foreground" />
                      </div>
                    )}

                    {/* Links */}
                    <div className="space-y-2">
                      {artist.soundcloud_url && (
                        <Button 
                          asChild 
                          variant="outline" 
                          className="w-full justify-between"
                        >
                          <a 
                            href={artist.soundcloud_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            <span>SoundCloud</span>
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                      )}
                      
                      {artist.spotify_url && (
                        <Button 
                          asChild 
                          variant="outline" 
                          className="w-full justify-between"
                        >
                          <a 
                            href={artist.spotify_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            <span>Spotify</span>
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                      )}
                      
                      {artist.other_url && (
                        <Button 
                          asChild 
                          variant="outline" 
                          className="w-full justify-between"
                        >
                          <a 
                            href={artist.other_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            <span>Autre lien</span>
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                      )}

                      {!artist.soundcloud_url && !artist.spotify_url && !artist.other_url && (
                        <p className="text-sm text-muted-foreground text-center py-4">
                          Aucun lien disponible pour le moment
                        </p>
                      )}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Artists;
