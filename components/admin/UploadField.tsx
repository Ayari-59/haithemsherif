"use client";

import { upload } from "@vercel/blob/client";
import { useRef, useState } from "react";

type Props = {
  kind: "artistPhoto" | "logo" | "music";
  accept: string;
  label: string;
  currentUrl?: string;
  onSaved: (kind: string, url: string) => Promise<void>;
};

// Upload direct vers Vercel Blob puis enregistrement dans la config.
export default function UploadField({ kind, accept, label, currentUrl, onSaved }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<"idle" | "busy" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setStatus("busy");
    setMessage("Envoi en cours…");
    try {
      const blob = await upload(`${kind}/${file.name}`, file, {
        access: "public",
        handleUploadUrl: "/api/blob",
      });
      await onSaved(kind, blob.url);
      setStatus("done");
      setMessage("Enregistré ✓ — recharge la page publique pour voir le résultat.");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Erreur d'upload");
    } finally {
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-2">
      <p className="font-semibold">{label}</p>
      {currentUrl && (
        <p className="truncate text-xs text-white/50">Actuel : {currentUrl}</p>
      )}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        disabled={status === "busy"}
        className="block w-full text-sm text-white/70 file:mr-3 file:cursor-pointer file:rounded-full file:border-0 file:bg-gold file:px-4 file:py-2 file:font-semibold file:text-night hover:file:bg-gold-light"
      />
      {message && (
        <p
          className={`text-sm ${
            status === "error" ? "text-red-400" : "text-emerald-400"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
