import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { artists } from "@/data/artists";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ExternalLink } from "lucide-react";

const Artists = () => {
  return (
    <div className="min-h-screen bg-background pb-16">
      <Header />

      <main className="container mx-auto px-4 py-8 mb-24">
        <Accordion type="single" collapsible className="w-full">
          {artists.map((artist, index) => (
            <AccordionItem key={artist.id} value={artist.id} className="border-b border-border/50">
              <AccordionTrigger className="py-8 hover:no-underline group">
                <div className="flex items-baseline gap-4">
                  <span className="text-xs text-muted-foreground font-mono tabular-nums">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-3xl md:text-4xl font-serif group-hover:text-accent transition-colors duration-300">
                    {artist.name}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="py-6">
                  {/* Desktop */}
                  <div className="hidden lg:grid lg:grid-cols-2 gap-8">
                    <div className="flex gap-8">
                      <div className="space-y-6 flex-shrink-0 max-w-xs">
                        {artist.bio && (
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {artist.bio}
                          </p>
                        )}
                        <div className="space-y-3">
                          {artist.soundcloud_embed_url && (
                            <a href={artist.soundcloud_embed_url.replace('https://w.soundcloud.com/player/?url=', '')} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-foreground/70 hover:text-accent transition-colors duration-300 link-reveal">
                              <span>SoundCloud</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                          {artist.other_url && (
                            <a href={artist.other_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-foreground/70 hover:text-accent transition-colors duration-300 link-reveal">
                              <span>Quopee</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                          {artist.instagram_url && (
                            <a href={artist.instagram_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-foreground/70 hover:text-accent transition-colors duration-300 link-reveal">
                              <span>Instagram</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                          {artist.resident_advisor_url && (
                            <a href={artist.resident_advisor_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-foreground/70 hover:text-accent transition-colors duration-300 link-reveal">
                              <span>Resident Advisor</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                          {artist.spotify_url && (
                            <a href={artist.spotify_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-foreground/70 hover:text-accent transition-colors duration-300 link-reveal">
                              <span>Spotify</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>

                      <div className="flex items-start">
                        <img src={artist.photo_url} alt={artist.name} className="w-[416px] h-[416px] object-cover border border-border/30 grayscale hover:grayscale-0 transition-all duration-700" />
                      </div>
                    </div>

                    <div className="space-y-4">
                      {artist.soundcloud_embed_url ? (
                        <iframe width="100%" height="200" scrolling="no" frameBorder="no" allow="autoplay" src={artist.soundcloud_embed_url} />
                      ) : (
                        <p className="text-sm text-muted-foreground italic font-serif">En parution hebdo</p>
                      )}

                      {artist.spotify_url && (
                        <iframe
                          style={{ borderRadius: '0px' }}
                          src={`https://open.spotify.com/embed/artist/${artist.spotify_url.split('/artist/')[1]?.split('?')[0]}`}
                          width="100%"
                          height="200"
                          frameBorder="0"
                          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                          loading="lazy"
                        />
                      )}
                    </div>
                  </div>

                  {/* Mobile */}
                  <div className="lg:hidden space-y-6">
                    <div className="w-full">
                      <img src={artist.photo_url} alt={artist.name} className="w-full aspect-square object-cover border border-border/30 grayscale hover:grayscale-0 transition-all duration-700" />
                    </div>

                    {artist.bio && (
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {artist.bio}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-4">
                      {artist.soundcloud_embed_url && (
                        <a href={artist.soundcloud_embed_url.replace('https://w.soundcloud.com/player/?url=', '')} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-foreground/70 hover:text-accent transition-colors duration-300">
                          <span>SoundCloud</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      {artist.other_url && (
                        <a href={artist.other_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-foreground/70 hover:text-accent transition-colors duration-300">
                          <span>Quopee</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      {artist.instagram_url && (
                        <a href={artist.instagram_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-foreground/70 hover:text-accent transition-colors duration-300">
                          <span>Instagram</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      {artist.resident_advisor_url && (
                        <a href={artist.resident_advisor_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-foreground/70 hover:text-accent transition-colors duration-300">
                          <span>Resident Advisor</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      {artist.spotify_url && (
                        <a href={artist.spotify_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-foreground/70 hover:text-accent transition-colors duration-300">
                          <span>Spotify</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>

                    <div className="space-y-4">
                      {artist.soundcloud_embed_url ? (
                        <iframe width="100%" height="200" scrolling="no" frameBorder="no" allow="autoplay" src={artist.soundcloud_embed_url} />
                      ) : (
                        <p className="text-sm text-muted-foreground italic font-serif">Quopee en parution</p>
                      )}

                      {artist.spotify_url && (
                        <iframe
                          style={{ borderRadius: '0px' }}
                          src={`https://open.spotify.com/embed/artist/${artist.spotify_url.split('/artist/')[1]?.split('?')[0]}`}
                          width="100%"
                          height="200"
                          frameBorder="0"
                          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                          loading="lazy"
                        />
                      )}
                    </div>
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
