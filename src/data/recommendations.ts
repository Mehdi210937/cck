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
    date: "2 Décembre 2024",
    movie: {
      title: "A Better Tomorrow",
      director: "John Woo",
      year: "1986",
      image_url: "/images/a-better-tomorrow.webp",
      description: "Un ancien gangster tente de se racheter et de se réconcilier avec son frère policier, mais les liens avec son ancienne vie criminelle sont difficiles à briser. Chef-d'œuvre du cinéma d'action hongkongais, ce film de John Woo a révolutionné le genre avec ses séquences de gunfights chorégraphiées et son exploration des thèmes de l'honneur et de la loyauté.",
      link: "https://www.imdb.com/title/tt0092263/"
    },
    album: {
      title: "Night Killaz Vol. 1",
      artist: "Snow Strippers",
      year: "2024",
      image_url: "https://i.scdn.co/image/ab67616d0000b273e8b066f70c206551210cc88c",
      description: "EP électronique hypnotique du duo Snow Strippers, fusionnant rave hardcore, breakbeat et soundscapes industriels. Une plongée intense dans l'univers nocturne et dystopique caractéristique du collectif, porté par des productions brutes et des synthés agressifs.",
      spotify_url: "https://open.spotify.com/album/0BYXEDtEXZ1fMYXCOb9Pnw"
    }
  }
];
