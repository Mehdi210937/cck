import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { artists } from "@/data/artists";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ExternalLink } from "lucide-react";

const Artists = () => {
  return (
    <div className="min-h-screen bg-background pb-16">
      <Header />
      
      <main className="container mx-auto px-4 py-6 mb-24">
        <Accordion type="single" collapsible className="w-full">
          {artists.map((artist) => (
            <AccordionItem key={artist.id} value={artist.id} className="border-b border-border">
              <AccordionTrigger className="text-2xl font-bold py-6 hover:no-underline">
                {artist.name}
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-6">
                  {/* Colonne gauche : Nom + Photo + Liens */}
                  <div className="flex gap-6">
                    <div className="space-y-4 flex-shrink-0">
                      <h3 className="text-xl font-bold mb-4">{artist.name}</h3>
                      <div className="space-y-2">
                        {artist.instagram_url && (
                          <a 
                            href={artist.instagram_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-foreground hover:text-muted-foreground transition-colors"
                          >
                            <span>Instagram</span>
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                        {artist.resident_advisor_url && (
                          <a 
                            href={artist.resident_advisor_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-foreground hover:text-muted-foreground transition-colors"
                          >
                            <span>Resident Advisor</span>
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                        {artist.spotify_url && (
                          <a 
                            href={artist.spotify_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-foreground hover:text-muted-foreground transition-colors"
                          >
                            <span>Spotify</span>
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Photo */}
                    <div className="flex items-start">
                      <img 
                        src={artist.photo_url} 
                        alt={artist.name}
                        className="w-[416px] h-[416px] object-cover rounded-lg border border-border"
                      />
                    </div>
                  </div>

                  {/* Colonne droite : SoundCloud + Spotify */}
                  <div className="space-y-4">
                    {artist.soundcloud_embed_url ? (
                      <iframe 
                        width="100%" 
                        height="200" 
                        scrolling="no" 
                        frameBorder="no" 
                        allow="autoplay"
                        src={artist.soundcloud_embed_url}
                        className="rounded-lg"
                      />
                    ) : (
                      <p className="text-muted-foreground">Aucun SoundCloud disponible</p>
                    )}
                    
                    {artist.spotify_url && (
                      <iframe 
                        style={{ borderRadius: '12px' }}
                        src={`https://open.spotify.com/embed/artist/${artist.spotify_url.split('/artist/')[1]?.split('?')[0]}`}
                        width="100%" 
                        height="200" 
                        frameBorder="0" 
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                        loading="lazy"
                        className="rounded-lg"
                      />
                    )}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </main>
      
      <Footer />
    </div>
  );
};

export default Artists;
