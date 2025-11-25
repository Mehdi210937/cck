import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { releases } from "@/data/releases";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Releases = () => {
  const [searchParams] = useSearchParams();
  const [openDialogId, setOpenDialogId] = useState<string | null>(null);

  useEffect(() => {
    const releaseId = searchParams.get('release');
    if (releaseId) {
      setOpenDialogId(releaseId);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-background pb-16">
      <Header />
      
      <main className="container mx-auto px-4 py-6 mb-24">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {releases.map((release) => (
            <Dialog 
              key={release.id}
              open={openDialogId === release.id}
              onOpenChange={(open) => setOpenDialogId(open ? release.id : null)}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-all relative">
                {release.coming_soon && (
                  <Badge className="absolute top-2 left-2 z-10 bg-primary">
                    DISPO
                  </Badge>
                )}
                <div className="aspect-square relative">
                  <img 
                    src={release.image_url} 
                    alt={release.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-bold font-helvetica text-sm mb-1 truncate">{release.title}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{release.artist_name}</p>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full text-xs">
                      En savoir plus
                    </Button>
                  </DialogTrigger>
                </div>
              </Card>

              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-helvetica">{release.title}</DialogTitle>
                  <DialogDescription className="text-base">
                    {release.artist_name}
                    {release.release_date && ` • ${release.release_date}`}
                    {release.coming_soon && " • À venir"}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="aspect-square">
                    <img 
                      src={release.image_url} 
                      alt={release.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="space-y-4">
                    <p className="text-foreground leading-relaxed">
                      {release.description}
                    </p>
                    {release.soundcloud_url && (
                      <Button variant="outline" className="w-full" asChild>
                        <a href={release.soundcloud_url} target="_blank" rel="noopener noreferrer">
                          Écouter sur SoundCloud
                        </a>
                      </Button>
                    )}
                    {release.spotify_url && (
                      <Button variant="outline" className="w-full" asChild>
                        <a href={release.spotify_url} target="_blank" rel="noopener noreferrer">
                          Écouter sur Spotify
                        </a>
                      </Button>
                    )}
                    {release.bandcamp_url && (
                      <Button variant="outline" className="w-full" asChild>
                        <a href={release.bandcamp_url} target="_blank" rel="noopener noreferrer">
                          Acheter sur Bandcamp
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Releases;
