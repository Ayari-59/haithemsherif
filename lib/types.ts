// Types du contenu administrable du site.

export type LinkItem = { label: string; url: string };

export type VideoItem = {
  id: string; // identifiant YouTube
  title: string;
  titleAr: string;
  year: number;
};

export type ReleaseItem = {
  title: string;
  titleAr: string;
  year: number;
  type: string;
  cover: string;
};

export type EventItem = {
  id: string;
  date: string; // ISO
  title: string;
  venue: string;
  city: string;
  link: string;
  published: boolean;
};

export type SiteConfig = {
  artist: {
    name: string;
    nameAr: string;
    tagline: string;
    taglineAr: string;
    bio: string;
    bioAr: string;
    bookingEmail: string;
    whatsapp: string;
    whatsappMessage: string;
  };
  assets: {
    artistPhoto: string; // photo de couverture du hero
    logo: string;
  };
  socials: LinkItem[];
  platforms: LinkItem[];
  videos: VideoItem[]; // l'ordre du tableau = ordre d'affichage, le premier = clip mis en avant
  releases: ReleaseItem[];
  music: { url: string; enabled: boolean };
  showEvents: boolean;
  theme: string; // identifiant du jeu de couleurs (voir lib/themes.ts)
  announcement: {
    enabled: boolean;
    title: string; // ex. « Nouvel album : Barcha Klam »
    titleAr: string;
    url: string; // lien vers la vidéo d'annonce
  };
};
