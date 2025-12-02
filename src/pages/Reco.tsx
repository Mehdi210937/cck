import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { recommendations } from "@/data/recommendations";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Film, Music } from "lucide-react";

const Reco = () => {
  const latestReco = recommendations[0];

  return (
    <div className="min-h-screen bg-background pb-16">
      <Header />
      
      <main className="container mx-auto px-4 py-8 mb-24">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Date de publication */}
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold font-helvetica mb-2">
              RECO DE LA SEMAINE
            </h1>
            <p className="text-muted-foreground text-sm md:text-base">
              {latestReco.date}
            </p>
          </div>

          {/* Grid Film + Album */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Film Section */}
            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="aspect-[2/3] relative">
                <img 
                  src={latestReco.movie.image_url} 
                  alt={latestReco.movie.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Film size={18} />
                  <span className="text-xs uppercase tracking-wider">Film</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold font-helvetica mb-1">
                    {latestReco.movie.title}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {latestReco.movie.director && `Réalisé par ${latestReco.movie.director}`}
                    {latestReco.movie.year && ` • ${latestReco.movie.year}`}
                  </p>
                </div>
                <p className="text-foreground leading-relaxed">
                  {latestReco.movie.description}
                </p>
                {latestReco.movie.link && (
                  <Button variant="outline" className="w-full" asChild>
                    <a href={latestReco.movie.link} target="_blank" rel="noopener noreferrer">
                      Plus d'infos
                    </a>
                  </Button>
                )}
              </div>
            </Card>

            {/* Album Section */}
            <Card className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="aspect-square relative">
                <img 
                  src={latestReco.album.image_url} 
                  alt={latestReco.album.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Music size={18} />
                  <span className="text-xs uppercase tracking-wider">Album</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold font-helvetica mb-1">
                    {latestReco.album.title}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {latestReco.album.artist}
                    {latestReco.album.year && ` • ${latestReco.album.year}`}
                  </p>
                </div>
                <p className="text-foreground leading-relaxed">
                  {latestReco.album.description}
                </p>
                {latestReco.album.spotify_url && (
                  <Button variant="outline" className="w-full" asChild>
                    <a href={latestReco.album.spotify_url} target="_blank" rel="noopener noreferrer">
                      Écouter sur Spotify
                    </a>
                  </Button>
                )}
              </div>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Reco;
