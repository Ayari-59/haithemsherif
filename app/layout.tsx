import type { Metadata } from "next";
import { Amiri, Cairo } from "next/font/google";
import { getConfig } from "@/lib/db";
import "./globals.css";

const cairo = Cairo({
  subsets: ["latin", "arabic"],
  variable: "--font-cairo",
});

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
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

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { theme } = await getConfig();
  return (
    <html lang="fr" data-theme={theme}>
      <body className={`${cairo.variable} ${amiri.variable} font-[family-name:var(--font-cairo)] antialiased`}>
        {children}
      </body>
    </html>
  );
}
