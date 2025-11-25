export interface Artist {
  id: string;
  name: string;
  photo_url: string;
  bio?: string;
  instagram_url?: string;
  resident_advisor_url?: string;
  spotify_url?: string;
  soundcloud_embed_url?: string;
  other_url?: string;
}

export const artists: Artist[] = [
  {
    id: "1",
    name: "Pablo Hassan",
    photo_url: "https://i1.sndcdn.com/avatars-sOZ5NQe9ynEfCFOU-Q4LK1g-t1080x1080.jpg",
    bio: "Producteur et DJ basé à Paris, Pablo Hassan explore les frontières entre UK garage, house et electronica. Son approche unique mêle textures organiques et rythmes hypnotiques pour créer des ambiances immersives.",
    instagram_url: "https://www.instagram.com/elpablohassan",
    spotify_url: "https://open.spotify.com/artist/592AK4l03lpoUE9bosrEAB",
    soundcloud_embed_url: "https://w.soundcloud.com/player/?url=https://soundcloud.com/lololadmt"
  },
  {
    id: "2",
    name: "Résidence De La Gare",
    photo_url: "/images/residence-de-la-gare.jpg",
    bio: "Artiste multidisciplinaire basé à Berlin, residence de la gare repousse les limites de la création, autant comme musicien que comme graphiste. Entre folktronica, ambient et dub techno, une constante demeure : l'immersion dans les textures sonores et visuelles de son environnement.",
    soundcloud_embed_url: "https://w.soundcloud.com/player/?url=https://soundcloud.com/residence-de-la-gare"
  },
  {
    id: "3",
    name: "Don Badder",
    photo_url: "/images/don-badder.png",
    bio: "Une écriture qui arpente les zones d'ombre de la Ville Lumière. Mêlant la violence du béton à la poésie de l'instant, il capture ce qu'il voit et ce qu'il entend pour le retranscrire de la manière la plus brute possible. Une lecture immersive, à vos risques et périls.",
    other_url: "https://quopee.lovable.app"
  }
];
