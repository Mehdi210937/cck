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
    id: "1",
    title: "My Kind of Bird",
    artist_id: "1",
    artist_name: "Pablo Hassan",
    image_url: "/images/releases/mykindofbird.jpg",
    description: "Une exploration sonore entre techno minimale et ambiances organiques. Pablo Hassan nous livre ici un EP intimiste et puissant.",
    release_date: "2024"
  },
  {
    id: "2",
    title: "Mil",
    artist_id: "2",
    artist_name: "Résidence De La Gare",
    image_url: "/images/releases/mil.jpg",
    description: "Textures électroniques et rythmes hypnotiques se rencontrent dans cette production expérimentale de Résidence De La Gare.",
    release_date: "2024"
  },
  {
    id: "3",
    title: "Mill",
    artist_id: "2",
    artist_name: "Résidence De La Gare",
    image_url: "/images/releases/mill.jpg",
    description: "Suite de l'exploration sonore, Mill pousse encore plus loin les frontières de la musique électronique expérimentale.",
    release_date: "2024"
  },
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
