export interface WeeklyReco {
  id: string;
  week_start: string; // Date du lundi
  film: {
    title: string;
    director?: string;
    year?: string;
    image_url: string;
    description: string;
    link?: string;
  };
  album: {
    title: string;
    artist: string;
    year?: string;
    image_url: string;
    description: string;
    spotify_url?: string;
  };
  club: {
    name: string;
    city: string;
    image_url: string;
    description: string;
    link?: string;
  };
  expo: {
    title: string;
    location: string;
    dates?: string;
    image_url: string;
    description: string;
    link?: string;
  };
}

export const recommendations: WeeklyReco[] = [
  {
    id: "1",
    week_start: "2 Décembre 2024",
    film: {
      title: "Possession",
      director: "Andrzej Żuławski",
      year: "1981",
      image_url: "/images/reco/possession.jpg",
      description:
        "Un chef-d'œuvre d'horreur psychologique. Isabelle Adjani livre une performance hallucinante dans ce film culte sur la dissolution d'un couple à Berlin.",
      link: "https://www.imdb.com/title/tt0082933/",
    },
    album: {
      title: "Geidi Primes",
      artist: "Grimes",
      year: "2010",
      image_url: "/images/reco/geidi-primes.jpg",
      description:
        "Le premier album de Grimes, une odyssée lo-fi et éthérée inspirée par Dune. Expérimental et hypnotique.",
      spotify_url: "https://open.spotify.com/album/5bfpRtBW7RNRdsm3tRyl3R",
    },
    club: {
      name: "Station - Gare des mines",
      city: "Paris",
      image_url: "/images/reco/concrete.jpg",
      description:
        "Spectrum Waves Annniversary (Nord + Sud);"
        "L'endroit partage nos valeurs et il nous le montre ce samedi : Léa Occhi B2B Raeza",
      link: "https://lastation.paris/stationgdm/rendez-vous/2025-12-06-spectrum-waves",
    },
    expo: {
      title: "Concordances",
      location: "Palais de Tokyo, Paris",
      dates: "Jusqu'au 5 Janvier 2025",
      image_url: "/images/reco/palais-tokyo.jpg",
      description:
        "Une exploration des liens entre art contemporain et nouvelles technologies. Installations immersives et œuvres interactives.",
      link: "https://www.palaisdetokyo.com/",
    },
  },
];
