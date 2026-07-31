// Catalogue des réseaux et plateformes proposés dans l'espace Bardo.
// Chaque entrée devient un champ de formulaire ; un champ vide = lien masqué sur le site.

export type CatalogEntry = { label: string; placeholder: string };

export const SOCIAL_CATALOG: CatalogEntry[] = [
  { label: "YouTube", placeholder: "https://www.youtube.com/@…" },
  { label: "Instagram", placeholder: "https://www.instagram.com/…" },
  { label: "TikTok", placeholder: "https://www.tiktok.com/@…" },
  { label: "Facebook", placeholder: "https://www.facebook.com/…" },
  { label: "X (Twitter)", placeholder: "https://x.com/…" },
  { label: "Snapchat", placeholder: "https://www.snapchat.com/add/…" },
];

export const PLATFORM_CATALOG: CatalogEntry[] = [
  { label: "Spotify", placeholder: "https://open.spotify.com/artist/…" },
  { label: "Deezer", placeholder: "https://www.deezer.com/artist/…" },
  { label: "Anghami", placeholder: "https://play.anghami.com/artist/…" },
  { label: "Apple Music", placeholder: "https://music.apple.com/artist/…" },
  { label: "YouTube", placeholder: "https://www.youtube.com/@…" },
  { label: "YouTube Music", placeholder: "https://music.youtube.com/channel/…" },
  { label: "SoundCloud", placeholder: "https://soundcloud.com/…" },
  { label: "Amazon Music", placeholder: "https://music.amazon.com/artists/…" },
];
