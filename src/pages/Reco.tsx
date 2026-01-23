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
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold font-helvetica">RECO DE LA SEMAINE</h1>
          </div>

          {/* Accordion for weeks */}
          <Accordion type="single" collapsible defaultValue="week-0">
            {recommendations.map((reco, index) => (
              <AccordionItem key={reco.id} value={`week-${index}`} className="border-foreground/20">
                <AccordionTrigger className="text-lg md:text-xl font-medium tracking-widest">
                  SEMAINE DU {reco.week_start.toUpperCase()}
                </AccordionTrigger>
                <AccordionContent>
                  {/* Grid 2x2 */}
                  <div className="grid md:grid-cols-2 gap-1 mt-4">
                    {/* Film */}
                    <a
                      href={reco.film.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative aspect-square overflow-hidden bg-background"
                    >
                      <div className="absolute inset-0 flex items-center justify-center bg-background">
                        <img
                          src={reco.film.image_url}
                          alt={reco.film.title}
                          className="max-w-full max-h-full object-contain opacity-80 group-hover:opacity-40 group-hover:scale-105 transition-all duration-500"
                        />
                      </div>
                      <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
                        <div className="flex items-center gap-2 text-foreground/60 mb-2">
                          <Film size={16} />
                          <span className="text-xs tracking-widest uppercase">Film</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-1">{reco.film.title}</h2>
                        <p className="text-sm text-foreground/60">
                          {reco.film.director} • {reco.film.year}
                        </p>
                        <p className="text-sm text-foreground/80 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {reco.film.description}
                        </p>
                      </div>
                    </a>

                    {/* Album */}
                    <a
                      href={reco.album.spotify_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative aspect-square overflow-hidden bg-background"
                    >
                      <div className="absolute inset-0 flex items-center justify-center bg-background">
                        <img
                          src={reco.album.image_url}
                          alt={reco.album.title}
                          className="max-w-full max-h-full object-contain opacity-80 group-hover:opacity-40 group-hover:scale-105 transition-all duration-500"
                        />
                      </div>
                      <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
                        <div className="flex items-center gap-2 text-foreground/60 mb-2">
                          <Music size={16} />
                          <span className="text-xs tracking-widest uppercase">Album</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-1">{reco.album.title}</h2>
                        <p className="text-sm text-foreground/60">
                          {reco.album.artist} • {reco.album.year}
                        </p>
                        <p className="text-sm text-foreground/80 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {reco.album.description}
                        </p>
                      </div>
                    </a>

                    {/* Club */}
                    <a
                      href={reco.club.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative aspect-square overflow-hidden bg-background"
                    >
                      <div className="absolute inset-0 flex items-center justify-center bg-background">
                        {reco.club.image_url && (
                          <img
                            src={reco.club.image_url}
                            alt={reco.club.name}
                            className="max-w-full max-h-full object-contain opacity-80 group-hover:opacity-40 group-hover:scale-105 transition-all duration-500"
                          />
                        )}
                      </div>
                      <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
                        <div className="flex items-center gap-2 text-foreground/60 mb-2">
                          <MapPin size={16} />
                          <span className="text-xs tracking-widest uppercase">Club</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-1">{reco.club.name}</h2>
                        <p className="text-sm text-foreground/60">{reco.club.city}</p>
                        <p className="text-sm text-foreground/80 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {reco.club.description}
                        </p>
                      </div>
                    </a>

                    {/* Expo */}
                    <a
                      href={reco.expo.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative aspect-square overflow-hidden bg-background"
                    >
                      <div className="absolute inset-0 flex items-center justify-center bg-background">
                        {reco.expo.image_url && (
                          <img
                            src={reco.expo.image_url}
                            alt={reco.expo.title}
                            className="max-w-full max-h-full object-contain opacity-80 group-hover:opacity-40 group-hover:scale-105 transition-all duration-500"
                          />
                        )}
                      </div>
                      <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
                        <div className="flex items-center gap-2 text-foreground/60 mb-2">
                          <Palette size={16} />
                          <span className="text-xs tracking-widest uppercase">Expo</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-1">{reco.expo.title}</h2>
                        <p className="text-sm text-foreground/60">{reco.expo.location}</p>
                        {reco.expo.dates && <p className="text-xs text-foreground/40 mt-1">{reco.expo.dates}</p>}
                        <p className="text-sm text-foreground/80 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
