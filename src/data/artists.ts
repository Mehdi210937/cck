export interface Artist {
  id: string;
  name: string;
  photo_url: string;
  instagram_url?: string;
  resident_advisor_url?: string;
  spotify_url?: string;
  soundcloud_embed_url?: string;
}

export const artists: Artist[] = [
  {
    id: "1",
    name: "Artist Name 1",
    photo_url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=800&fit=crop",
    instagram_url: "https://instagram.com/artist1",
    resident_advisor_url: "https://ra.co/dj/artist1",
    spotify_url: "https://open.spotify.com/artist/artist1",
    soundcloud_embed_url: "https://w.soundcloud.com/player/?url=https://soundcloud.com/artist1"
  },
  {
    id: "2",
    name: "Artist Name 2",
    photo_url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&h=800&fit=crop",
    instagram_url: "https://instagram.com/artist2",
    resident_advisor_url: "https://ra.co/dj/artist2",
    spotify_url: "https://open.spotify.com/artist/artist2",
    soundcloud_embed_url: "https://w.soundcloud.com/player/?url=https://soundcloud.com/artist2"
  },
  {
    id: "3",
    name: "Artist Name 3",
    photo_url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=800&fit=crop",
    instagram_url: "https://instagram.com/artist3",
    spotify_url: "https://open.spotify.com/artist/artist3",
    soundcloud_embed_url: "https://w.soundcloud.com/player/?url=https://soundcloud.com/artist3"
  }
];
