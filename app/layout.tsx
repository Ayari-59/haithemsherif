import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  subsets: ["latin", "arabic"],
  variable: "--font-cairo",
});

export const metadata: Metadata = {
  title: "Haithem Sherif | هيثم شريف — Chanteur tunisien",
  description:
    "Site officiel de Haithem Sherif (هيثم شريف), chanteur tunisien. Clips, discographie, plateformes de streaming et contact booking.",
  openGraph: {
    title: "Haithem Sherif | هيثم شريف",
    description:
      "Site officiel de Haithem Sherif, chanteur tunisien — clips, musique et booking.",
    images: ["/artist.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className={`${cairo.variable} font-[family-name:var(--font-cairo)] antialiased`}>
        {children}
      </body>
    </html>
  );
}
