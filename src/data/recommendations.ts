export interface WeeklyReco {
  id: string;
  week_start: string;
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
}

export const recommendations: WeeklyReco[] = [
  {
    id: "1",
    week_start: "2 Décembre 2025",
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
  },
];
