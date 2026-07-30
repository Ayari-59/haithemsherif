"use client";

import { useState } from "react";

type Props = {
  id: string;
  title: string;
  titleAr: string;
  year: number;
};

// Affiche la miniature YouTube et ne charge l'iframe qu'au clic,
// pour garder la page rapide même avec beaucoup de vidéos.
export default function VideoCard({ id, title, titleAr, year }: Props) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="group overflow-hidden rounded-xl border border-gold/25 bg-night-soft">
      <div className="relative aspect-video">
        {playing ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="absolute inset-0 h-full w-full cursor-pointer"
            aria-label={`Lire ${title}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
              alt={title}
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105 group-hover:opacity-80"
            />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/90 text-night shadow-lg transition group-hover:scale-110">
                <svg viewBox="0 0 24 24" fill="currentColor" className="ml-1 h-6 w-6">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </span>
          </button>
        )}
      </div>
      <div className="flex items-baseline justify-between gap-2 px-4 py-3">
        <div>
          <p className="font-semibold">{title}</p>
          <p dir="rtl" className="font-ar text-base leading-tight text-gold-light/70">{titleAr}</p>
        </div>
        <span className="text-sm text-gold">{year}</span>
      </div>
    </div>
  );
}
