"use client";

import { useRef, useState } from "react";

// Lecteur de musique de fond : bouton flottant discret, le son ne démarre
// qu'au clic (les navigateurs bloquent l'autoplay sonore).
export default function MusicPlayer({ url }: { url: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  }

  return (
    <>
      <audio ref={audioRef} src={url} loop preload="none" />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Couper la musique" : "Écouter la musique de fond"}
        className={`fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 bg-night/90 text-gold shadow-lg backdrop-blur transition hover:scale-110 ${
          playing ? "animate-pulse" : ""
        }`}
      >
        {playing ? (
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
            <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
            <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3z" />
          </svg>
        )}
      </button>
    </>
  );
}
