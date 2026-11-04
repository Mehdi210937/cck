import pabloCover from "@/assets/pablo-hassan-ghettoshit-vol-1.jpg.asset.json";
import echappeeCover from "@/assets/meurs-un-autre-jour-echappee.jpg.asset.json";

export interface Release {
  id: string;
  title: string;
  artist_id: string;
  artist_name: string;
  image_url?: string;
  description: string;
  release_date?: string;
  coming_soon?: boolean;
  spotify_url?: string;
  bandcamp_url?: string;
  soundcloud_url?: string;
}

export const releases: Release[] = [
  {
    id: "meurs-un-autre-jour-echappee",
    title: "L’échappée",
    artist_id: "4",
    artist_name: "meurs un autre jour",
    image_url: echappeeCover.url,
    description: "Single de meurs un autre jour.",
    release_date: "30 Oct 2026",
    spotify_url: "https://open.spotify.com/track/3YYNKI3nDWCujbdxRj6bmS"
  },
  {
    id: "pablo-hassan-ghettoshit-vol-1",
    title: "GHETTOSHIT, Vol. 1",
    artist_id: "1",
    artist_name: "Pablo Hassan",
    image_url: pabloCover.url,
    description: "EP de Pablo Hassan.",
    release_date: "3 Sep 2026",
    spotify_url: "https://open.spotify.com/album/0HqekYUh8fVR9P7mfl4WS2"
  },
  {
    id: "don-badder-ep",
    title: "EP",
    artist_id: "3",
    artist_name: "Don Badder",
    description: "Un EP de Don Badder à venir.",
    coming_soon: true
  },
  {
    id: "4",
    title: "Imaginal Disc",
    artist_id: "2",
    artist_name: "Résidence De La Gare",
    image_url: "/images/releases/release-rdlg.jpg",
    description: "Nouvelle production de Résidence De La Gare qui explore des territoires sonores inédits. Un voyage hypnotique à travers des paysages électroniques évolutifs.",
    release_date: "15 Nov 2024",
    coming_soon: false,
    soundcloud_url: "https://soundcloud.com/residence-de-la-gare/sets/imaginal-disc-forgotten-works"
  }
];
