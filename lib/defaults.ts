import { artist, platforms, releases, socials, videos } from "@/data/site";
import type { SiteConfig } from "./types";

// Valeurs de départ du site : servies telles quelles tant que la base de
// données n'est pas configurée, puis utilisées comme socle que la config
// enregistrée vient recouvrir champ par champ.
export const DEFAULT_CONFIG: SiteConfig = {
  artist: {
    name: artist.name,
    nameAr: artist.nameAr,
    tagline: artist.tagline,
    taglineAr: artist.taglineAr,
    bio: artist.bio,
    bioAr: artist.bioAr,
    bookingEmail: artist.bookingEmail,
    whatsapp: artist.whatsapp,
    whatsappMessage: artist.whatsappMessage,
  },
  assets: {
    artistPhoto: "/artist.jpg",
    logo: "/logo.png",
  },
  socials,
  platforms,
  videos,
  releases,
  music: { url: "", enabled: false },
  showEvents: false,
};
