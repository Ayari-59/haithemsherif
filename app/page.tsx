import Image from "next/image";
import VideoCard from "@/components/VideoCard";
import {
  artist,
  featuredVideo,
  platforms,
  releases,
  socials,
  videos,
} from "@/data/site";

const navLinks = [
  { href: "#artiste", label: "L'artiste" },
  { href: "#videos", label: "Vidéos" },
  { href: "#musique", label: "Musique" },
  { href: "#ecouter", label: "Écouter" },
  { href: "#contact", label: "Contact" },
];

// Séparateur ornemental : filet doré avec étoile à 8 branches au centre
function Ornament() {
  return (
    <svg
      viewBox="0 0 320 24"
      className="mx-auto mt-4 h-6 w-64 text-gold"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
    >
      <line x1="8" y1="12" x2="126" y2="12" strokeOpacity="0.5" />
      <line x1="194" y1="12" x2="312" y2="12" strokeOpacity="0.5" />
      <circle cx="136" cy="12" r="2" fill="currentColor" stroke="none" />
      <circle cx="184" cy="12" r="2" fill="currentColor" stroke="none" />
      <rect x="152" y="4" width="16" height="16" transform="rotate(45 160 12)" strokeOpacity="0.9" />
      <rect x="152" y="4" width="16" height="16" strokeOpacity="0.9" />
    </svg>
  );
}

// Titre de section bilingue français / arabe
function SectionTitle({ fr, frGold, ar }: { fr: string; frGold: string; ar: string }) {
  return (
    <div className="mb-10 text-center">
      <h2 className="text-3xl font-bold sm:text-4xl">
        <span className="text-gold">{frGold}</span> {fr}
      </h2>
      <p dir="rtl" className="font-ar mt-1 text-xl text-gold-light/80">{ar}</p>
      <Ornament />
    </div>
  );
}

export default function Home() {
  return (
    <main>
      {/* Navigation */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-gold/20 bg-night/80 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2">
          <a href="#" className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Logo Haithem Sherif" className="h-10 w-auto" />
            <span className="text-lg font-bold tracking-[0.2em] uppercase">
              <span className="text-gold">Haïthem</span> Sherif
            </span>
          </a>
          <div className="hidden gap-6 text-sm sm:flex">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="text-white/70 transition hover:text-gold">
                {l.label}
              </a>
            ))}
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative flex min-h-svh items-center justify-center overflow-hidden">
        <Image
          src="/artist.jpg"
          alt="Haithem Sherif"
          fill
          priority
          className="object-cover object-top opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night/40 via-night/60 to-night" />
        <div className="pattern-oriental absolute inset-0 opacity-40" />
        <div className="relative z-10 px-4 text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt=""
            aria-hidden="true"
            className="mx-auto mb-6 h-28 w-auto drop-shadow-[0_0_24px_rgba(217,164,65,0.35)] sm:h-36"
          />
          <p dir="rtl" className="font-ar mb-2 text-3xl text-gold-light sm:text-4xl">
            {artist.nameAr}
          </p>
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl">
            {artist.name}
          </h1>
          <p className="mt-4 text-lg text-white/70">{artist.tagline}</p>
          <Ornament />
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#musique"
              className="rounded-full bg-gold px-6 py-3 font-semibold text-night transition hover:bg-gold-light"
            >
              Écouter sa musique
            </a>
            <a
              href={`https://www.youtube.com/watch?v=${featuredVideo.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-gold/40 px-6 py-3 font-semibold text-white transition hover:border-gold hover:text-gold"
            >
              Dernier clip : {featuredVideo.title}
            </a>
          </div>
        </div>
      </section>

      {/* L'artiste — présentation bilingue */}
      <section id="artiste" className="mx-auto max-w-5xl scroll-mt-20 px-4 py-16">
        <SectionTitle frGold="L'artiste" fr="" ar="نبذة عن الفنان" />
        <div className="grid items-start gap-10 md:grid-cols-2 md:gap-12">
          <p className="text-base leading-relaxed text-white/80 md:border-r md:border-gold/20 md:pr-12 md:text-lg">
            {artist.bio}
          </p>
          <p dir="rtl" lang="ar" className="font-ar text-xl leading-relaxed text-white/85 md:text-2xl">
            {artist.bioAr}
          </p>
        </div>
      </section>

      {/* Vidéos */}
      <section id="videos" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16">
        <SectionTitle frGold="Clips" fr="vidéo" ar="الكليبات" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((v) => (
            <VideoCard key={v.id} {...v} />
          ))}
        </div>
        <p className="mt-8 text-center">
          <a
            href={socials.find((s) => s.label === "YouTube")?.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold underline-offset-4 hover:underline"
          >
            Voir toutes les vidéos sur YouTube →
          </a>
        </p>
      </section>

      {/* Discographie */}
      <section id="musique" className="pattern-oriental scroll-mt-20 bg-night-soft py-16">
        <div className="mx-auto max-w-6xl px-4">
          <SectionTitle frGold="Discographie" fr="" ar="الألبومات" />
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {releases.map((r) => (
              <div key={r.title} className="group text-center">
                <div className="arch overflow-hidden border border-gold/30 shadow-[0_0_30px_rgba(217,164,65,0.08)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={r.cover}
                    alt={`${r.title} — pochette`}
                    className="aspect-[4/5] w-full object-cover object-top transition duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="mt-3">
                  <p className="font-semibold">{r.title}</p>
                  <p dir="rtl" className="font-ar text-lg leading-tight text-gold-light/80">{r.titleAr}</p>
                  <p className="mt-1 text-sm text-gold">
                    {r.type} · {r.year}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plateformes */}
      <section id="ecouter" className="mx-auto max-w-4xl scroll-mt-20 px-4 py-16 text-center">
        <SectionTitle frGold="Écouter" fr="partout" ar="استمعوا" />
        <p className="mb-8 text-white/70">
          Retrouvez Haithem Sherif sur votre plateforme préférée.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {platforms.map((p) => (
            <a
              key={p.label}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-gold/30 px-6 py-3 font-semibold transition hover:border-gold hover:text-gold"
            >
              {p.label}
            </a>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="pattern-oriental scroll-mt-20 bg-night-soft py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <SectionTitle frGold="Contact" fr="& booking" ar="للتواصل والحجز" />
          <p className="mb-8 text-white/70">
            Pour une demande de concert, d&apos;événement privé ou de collaboration,
            contactez Haithem directement :
          </p>
          <div className="mb-6 flex justify-center">
            <a
              href={`https://wa.me/${artist.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(artist.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full bg-[#25D366] px-8 py-4 text-lg font-semibold text-night shadow-[0_0_30px_rgba(37,211,102,0.25)] transition hover:bg-[#4ce082]"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.511-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.884 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" />
              </svg>
              WhatsApp
            </a>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {artist.bookingEmail && (
              <a
                href={`mailto:${artist.bookingEmail}`}
                className="rounded-full bg-gold px-6 py-3 font-semibold text-night transition hover:bg-gold-light"
              >
                {artist.bookingEmail}
              </a>
            )}
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-gold/30 px-6 py-3 font-semibold transition hover:border-gold hover:text-gold"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gold/20 py-10 text-center text-sm text-white/50">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="" aria-hidden="true" className="mx-auto mb-3 h-12 w-auto opacity-80" />
        <p dir="rtl" className="font-ar mb-1 text-base">{artist.taglineAr}</p>
        <p>
          © {new Date().getFullYear()} {artist.name} — Tous droits réservés
        </p>
      </footer>
    </main>
  );
}
