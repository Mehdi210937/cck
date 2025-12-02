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
      image_url: "https://m.media-amazon.com/images/M/MV5BOGQ1NzZiZmItOGU4Ny00MjQ1LTg4NDEtZTI1OTE4NzEzODRiXkEyXkFqcGc@._V1_QL75_UY281_CR1,0,190,281_.jpg",
      description: "Un ancien gangster tente de se racheter et de se réconcilier avec son frère policier, mais les liens avec son ancienne vie criminelle sont difficiles à briser. Chef-d'œuvre du cinéma d'action hongkongais, ce film de John Woo a révolutionné le genre avec ses séquences de gunfights chorégraphiées et son exploration des thèmes de l'honneur et de la loyauté.",
      link: "https://www.imdb.com/title/tt0092263/"
    },
    album: {
      title: "Opening Time",
      artist: "Greg Foat, Jihad Darwish & Moses Boyd",
      year: "2024",
      image_url: "https://i.scdn.co/image/ab67616d0000b2730f7e2aa3a0e0b5b5f5e5f5f5",
      description: "Une collaboration transcendante entre le claviériste britannique Greg Foat, le joueur d'oud libanais Jihad Darwish et le batteur Moses Boyd. Un voyage musical qui fusionne jazz spirituel, traditions moyen-orientales et rythmes contemporains dans une exploration sonore captivante et intemporelle.",
      spotify_url: "https://open.spotify.com/intl-fr/album/08dGAd5zC5DP0hFSU01zZM"
    }
  }
];
