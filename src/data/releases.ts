export interface Release {
  id: string;
  title: string;
  artist_id: string;
  artist_name: string;
  image_url: string;
  description: string;
  release_date?: string;
  coming_soon?: boolean;
  spotify_url?: string;
  bandcamp_url?: string;
  soundcloud_url?: string;
}

export const releases: Release[] = [
  {
    id: "4",
    title: "Imaginal Disc",
    artist_id: "2",
    artist_name: "Résidence De La Gare",
    image_url: "/images/releases/release-rdlg.jpg",
    description: "Nouvelle production de Résidence De La Gare qui explore des territoires sonores inédits. Un voyage hypnotique à travers des paysages électroniques évolutifs.",
    release_date: "15 Nov 2024",
    coming_soon: true,
    soundcloud_url: "https://soundcloud.com/residence-de-la-gare/sets/imaginal-disc-forgotten-works"
  }
];
