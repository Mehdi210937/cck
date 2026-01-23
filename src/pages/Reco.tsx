import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { recommendations } from "@/data/recommendations";
import { Film, Music, MapPin, Palette } from "lucide-react";

const Reco = () => {
  const currentReco = recommendations[0];

  return (
    <div className="min-h-screen bg-background pb-16">
      <Header />

      <main className="container mx-auto px-4 py-12 mb-24">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-sm tracking-widest text-muted-foreground mb-2">SEMAINE DU</p>
            <h1 className="text-4xl md:text-5xl font-bold font-helvetica">{currentReco.week_start}</h1>
          </div>

          {/* Grid 2x2 */}
          <div className="grid md:grid-cols-2 gap-1">
            {/* Film */}
            <a
              href={currentReco.film.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden bg-black"
            >
              <img
                src={currentReco.film.image_url}
                alt={currentReco.film.title}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-40 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <div className="flex items-center gap-2 text-white/60 mb-2">
                  <Film size={16} />
                  <span className="text-xs tracking-widest uppercase">Film</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">{currentReco.film.title}</h2>
                <p className="text-sm text-white/60">
                  {currentReco.film.director} • {currentReco.film.year}
                </p>
                <p className="text-sm text-white/80 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {currentReco.film.description}
                </p>
              </div>
            </a>

            {/* Album */}
            <a
              href={currentReco.album.spotify_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden bg-black"
            >
              <img
                src={currentReco.album.image_url}
                alt={currentReco.album.title}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-40 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <div className="flex items-center gap-2 text-white/60 mb-2">
                  <Music size={16} />
                  <span className="text-xs tracking-widest uppercase">Album</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">{currentReco.album.title}</h2>
                <p className="text-sm text-white/60">
                  {currentReco.album.artist} • {currentReco.album.year}
                </p>
                <p className="text-sm text-white/80 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {currentReco.album.description}
                </p>
              </div>
            </a>

            {/* Club */}
            <a
              href={currentReco.club.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden bg-black"
            >
              <img
                src={currentReco.club.image_url}
                alt={currentReco.club.name}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-40 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <div className="flex items-center gap-2 text-white/60 mb-2">
                  <MapPin size={16} />
                  <span className="text-xs tracking-widest uppercase">Club</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">{currentReco.club.name}</h2>
                <p className="text-sm text-white/60">{currentReco.club.city}</p>
                <p className="text-sm text-white/80 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {currentReco.club.description}
                </p>
              </div>
            </a>

            {/* Expo */}
            <a
              href={currentReco.expo.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden bg-black"
            >
              <img
                src={currentReco.expo.image_url}
                alt={currentReco.expo.title}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-40 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <div className="flex items-center gap-2 text-white/60 mb-2">
                  <Palette size={16} />
                  <span className="text-xs tracking-widest uppercase">Expo</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">{currentReco.expo.title}</h2>
                <p className="text-sm text-white/60">{currentReco.expo.location}</p>
                {currentReco.expo.dates && <p className="text-xs text-white/40 mt-1">{currentReco.expo.dates}</p>}
                <p className="text-sm text-white/80 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {currentReco.expo.description}
                </p>
              </div>
            </a>
          </div>

          {/* Navigation vers archives (optionnel) */}
          {recommendations.length > 1 && (
            <div className="mt-12 text-center">
              <p className="text-sm text-muted-foreground tracking-widest">ARCHIVES DISPONIBLES</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Reco;
