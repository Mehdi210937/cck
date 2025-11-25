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
}

export const releases: Release[] = [
  {
    id: "4",
    title: "Untitled",
    artist_id: "2",
    artist_name: "Résidence De La Gare",
    image_url: "/images/releases/release-rdlg.jpg",
    description: "Nouvelle production de Résidence De La Gare qui explore des territoires sonores inédits. Un voyage hypnotique à travers des paysages électroniques évolutifs.",
    coming_soon: true
  }
];
