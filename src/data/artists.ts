export interface Artist {
  id: string;
  name: string;
  photo_url: string;
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
    instagram_url: "https://www.instagram.com/elpablohassan",
    spotify_url: "https://open.spotify.com/artist/592AK4l03lpoUE9bosrEAB",
    soundcloud_embed_url: "https://w.soundcloud.com/player/?url=https://soundcloud.com/lololadmt"
  },
  {
    id: "2",
    name: "Résidence De La Gare",
    photo_url: "/images/residence-de-la-gare.jpg",
    soundcloud_embed_url: "https://w.soundcloud.com/player/?url=https://soundcloud.com/residence-de-la-gare"
  },
  {
    id: "3",
    name: "Don Badder",
    photo_url: "/images/don-badder.png",
    other_url: "https://quopee.lovable.app"
  }
];
