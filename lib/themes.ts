// Jeux de couleurs proposés dans l'admin. Les couleurs effectives sont
// définies dans app/globals.css ([data-theme=…]) ; ici : id, libellé et
// pastilles d'aperçu pour le sélecteur.
export const THEMES = [
  { id: "or", label: "Noir & or (classique)", bg: "#0b0a08", accent: "#d9a441" },
  { id: "nuit", label: "Bleu nuit & or", bg: "#070d1a", accent: "#d9a441" },
  { id: "emeraude", label: "Émeraude & or", bg: "#06110d", accent: "#d9a441" },
  { id: "bordeaux", label: "Bordeaux & cuivre", bg: "#140808", accent: "#cd7f4e" },
] as const;

export type ThemeId = (typeof THEMES)[number]["id"];

export function isThemeId(value: string): value is ThemeId {
  return THEMES.some((t) => t.id === value);
}
