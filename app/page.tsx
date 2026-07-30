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
  { href: "#videos", label: "Vidéos" },
  { href: "#musique", label: "Musique" },
  { href: "#ecouter", label: "Écouter" },
  { href: "#contact", label: "Contact" },
];

export default function Home() {
  return (
    <main>
      {/* Navigation */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-night/80 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="#" className="text-lg font-bold tracking-wide">
            <span className="text-gold">Haithem</span> Sherif
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
        <div className="relative z-10 px-4 text-center">
          <p dir="rtl" className="mb-3 text-2xl text-gold-light sm:text-3xl">
            {artist.nameAr}
          </p>
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl">
            {artist.name}
          </h1>
          <p className="mt-4 text-lg text-white/70">{artist.tagline}</p>
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
              className="rounded-full border border-white/30 px-6 py-3 font-semibold text-white transition hover:border-gold hover:text-gold"
            >
              Dernier clip : {featuredVideo.title}
            </a>
          </div>
        </div>
      </section>

      {/* Bio */}
      <section className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="text-lg leading-relaxed text-white/80">{artist.bio}</p>
      </section>

      {/* Vidéos */}
      <section id="videos" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16">
        <h2 className="mb-8 text-3xl font-bold">
          <span className="text-gold">Clips</span> vidéo
        </h2>
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
      <section id="musique" className="scroll-mt-20 bg-night-soft py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-8 text-3xl font-bold">
            <span className="text-gold">Discographie</span>
          </h2>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {releases.map((r) => (
              <div key={r.title} className="group">
                <div className="overflow-hidden rounded-xl border border-white/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={r.cover}
                    alt={`${r.title} — pochette`}
                    className="aspect-square w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="mt-3 flex items-baseline justify-between gap-2">
                  <div>
                    <p className="font-semibold">{r.title}</p>
                    <p dir="rtl" className="text-sm text-white/60">{r.titleAr}</p>
                  </div>
                  <p className="shrink-0 text-sm text-gold">
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
        <h2 className="mb-4 text-3xl font-bold">
          <span className="text-gold">Écouter</span> partout
        </h2>
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
              className="rounded-full border border-white/20 px-6 py-3 font-semibold transition hover:border-gold hover:text-gold"
            >
              {p.label}
            </a>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="scroll-mt-20 bg-night-soft py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">
            <span className="text-gold">Contact</span> &amp; booking
          </h2>
          <p className="mb-8 text-white/70">
            Pour une demande de concert, d&apos;événement privé ou de collaboration,
            contactez Haithem directement :
          </p>
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
                className="rounded-full border border-white/20 px-6 py-3 font-semibold transition hover:border-gold hover:text-gold"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-sm text-white/50">
        <p dir="rtl" className="mb-1">{artist.taglineAr}</p>
        <p>
          © {new Date().getFullYear()} {artist.name} — Tous droits réservés
        </p>
      </footer>
    </main>
  );
}
