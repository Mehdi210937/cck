import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { recommendations } from "@/data/recommendations";
import { Film, Music, MapPin, Palette } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Reco = () => {
  return (
    <div className="min-h-screen bg-background pb-16">
      <Header />

      <main className="container mx-auto px-4 py-12 mb-24">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <p className="label-editorial mb-3">Selections hebdomadaires</p>
            <h1 className="text-4xl md:text-6xl font-serif">Reco de la semaine</h1>
          </div>

          {/* Accordion for weeks */}
          <Accordion type="single" collapsible>
            {recommendations.map((reco, index) => (
              <AccordionItem key={reco.id} value={`week-${index}`} className="border-border/30">
                <AccordionTrigger className="text-sm md:text-base tracking-[0.15em] uppercase text-foreground/70 hover:text-foreground transition-colors">
                  Semaine du {reco.week_start}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid md:grid-cols-2 gap-[2px] mt-6">
                    {/* Film */}
                    <a
                      href={reco.film.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group"
                    >
                      <div className="relative aspect-square overflow-hidden bg-card">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <img
                            src={reco.film.image_url}
                            alt={reco.film.title}
                            className="max-w-full max-h-full object-contain group-hover:scale-105 transition-all duration-700"
                          />
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="flex items-center gap-2 text-muted-foreground mb-2">
                          <Film size={12} />
                          <span className="label-editorial">Film</span>
                        </div>
                        <h2 className="text-xl md:text-2xl font-serif group-hover:text-accent transition-colors duration-300">{reco.film.title}</h2>
                        <p className="text-xs text-muted-foreground mt-1">
                          {reco.film.director} &mdash; {reco.film.year}
                        </p>
                      </div>
                    </a>

                    {/* Album */}
                    <a
                      href={reco.album.spotify_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group"
                    >
                      <div className="relative aspect-square overflow-hidden bg-card">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <img
                            src={reco.album.image_url}
                            alt={reco.album.title}
                            className="max-w-full max-h-full object-contain group-hover:scale-105 transition-all duration-700"
                          />
                        </div>
                      </div>
                      <div className="mt-4">
                        <div className="flex items-center gap-2 text-muted-foreground mb-2">
                          <Music size={12} />
                          <span className="label-editorial">Album</span>
                        </div>
                        <h2 className="text-xl md:text-2xl font-serif group-hover:text-accent transition-colors duration-300">{reco.album.title}</h2>
                        <p className="text-xs text-muted-foreground mt-1">
                          {reco.album.artist} &mdash; {reco.album.year}
                        </p>
                      </div>
                    </a>

                    {/* Club */}
                    <a
                      href={reco.club.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative aspect-square overflow-hidden bg-card border border-border/20"
                    >
                      {reco.club.image_url && (
                        <img
                          src={reco.club.image_url}
                          alt={reco.club.name}
                          className="w-full h-full object-cover opacity-60 group-hover:opacity-30 group-hover:scale-105 transition-all duration-700"
                        />
                      )}
                      <div className="absolute inset-0 flex flex-col justify-end p-6">
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin size={12} className="text-accent/60" />
                          <span className="label-editorial text-foreground/40">Club</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-1">{reco.club.name}</h2>
                        <p className="text-xs text-muted-foreground">{reco.club.city}</p>
                        <p className="text-xs text-foreground/60 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          {reco.club.description}
                        </p>
                      </div>
                    </a>

                    {/* Expo */}
                    <a
                      href={reco.expo.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative aspect-square overflow-hidden bg-card border border-border/20"
                    >
                      {reco.expo.image_url && (
                        <img
                          src={reco.expo.image_url}
                          alt={reco.expo.title}
                          className="w-full h-full object-cover opacity-60 group-hover:opacity-30 group-hover:scale-105 transition-all duration-700"
                        />
                      )}
                      <div className="absolute inset-0 flex flex-col justify-end p-6">
                        <div className="flex items-center gap-2 mb-2">
                          <Palette size={12} className="text-accent/60" />
                          <span className="label-editorial text-foreground/40">Expo</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-1">{reco.expo.title}</h2>
                        <p className="text-xs text-muted-foreground">{reco.expo.location}</p>
                        {reco.expo.dates && <p className="text-[10px] text-muted-foreground/60 mt-1">{reco.expo.dates}</p>}
                        <p className="text-xs text-foreground/60 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          {reco.expo.description}
                        </p>
                      </div>
                    </a>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Reco;
