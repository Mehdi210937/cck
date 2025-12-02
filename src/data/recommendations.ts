export interface Recommendation {
  id: string;
  date: string;
  movie: {
    title: string;
    director?: string;
    year?: string;
    image_url?: string;
    description?: string;
    link?: string;
  };
  album: {
    title: string;
    artist: string;
    year?: string;
    image_url?: string;
    description?: string;
    spotify_url?: string;
  };
}

export const recommendations: Recommendation[] = [
  {
    id: "1",
    date: "2 Décembre 2025",
    movie: {
      title: "Placeholder Movie",
      director: "Director Name",
      year: "2024",
      image_url: "/images/placeholder-movie.jpg",
      description: "Description du film à ajouter...",
      link: "https://www.imdb.com"
    },
    album: {
      title: "Placeholder Album",
      artist: "Artist Name",
      year: "2024",
      image_url: "/images/placeholder-album.jpg",
      description: "Description de l'album à ajouter...",
      spotify_url: "https://open.spotify.com"
    }
  }
];
