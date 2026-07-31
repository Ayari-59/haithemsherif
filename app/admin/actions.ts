"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  SESSION_COOKIE,
  checkPassword,
  createSessionToken,
  verifySessionToken,
} from "@/lib/auth";
import { deleteEvent, getConfig, saveConfig, upsertEvent } from "@/lib/db";
import type { EventItem, LinkItem, VideoItem } from "@/lib/types";

async function requireAdmin(): Promise<void> {
  const store = await cookies();
  const ok = await verifySessionToken(store.get(SESSION_COOKIE)?.value);
  if (!ok) redirect("/admin/login");
}

function refresh(): void {
  revalidatePath("/");
  revalidatePath("/admin");
}

// --- Session ---

export async function loginAction(formData: FormData): Promise<void> {
  const password = String(formData.get("password") ?? "");
  if (!checkPassword(password)) redirect("/admin/login?error=1");
  const store = await cookies();
  store.set(SESSION_COOKIE, await createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  redirect("/admin/login");
}

// --- Identité & biographie ---

export async function saveArtistAction(formData: FormData): Promise<void> {
  await requireAdmin();
  await saveConfig({
    artist: {
      ...(await getConfig()).artist,
      name: String(formData.get("name") ?? ""),
      nameAr: String(formData.get("nameAr") ?? ""),
      tagline: String(formData.get("tagline") ?? ""),
      taglineAr: String(formData.get("taglineAr") ?? ""),
      bio: String(formData.get("bio") ?? ""),
      bioAr: String(formData.get("bioAr") ?? ""),
    },
  });
  refresh();
  redirect("/admin?ok=identite");
}

// --- Contact ---

export async function saveContactAction(formData: FormData): Promise<void> {
  await requireAdmin();
  await saveConfig({
    artist: {
      ...(await getConfig()).artist,
      whatsapp: String(formData.get("whatsapp") ?? ""),
      whatsappMessage: String(formData.get("whatsappMessage") ?? ""),
      bookingEmail: String(formData.get("bookingEmail") ?? ""),
    },
  });
  refresh();
  redirect("/admin?ok=contact");
}

// --- Liens (réseaux sociaux et plateformes), un par ligne : "Label | https://url" ---

function parseLinks(raw: string): LinkItem[] {
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [label, ...rest] = line.split("|");
      return { label: (label ?? "").trim(), url: rest.join("|").trim() };
    })
    .filter((l) => l.label && l.url);
}

export async function saveLinksAction(formData: FormData): Promise<void> {
  await requireAdmin();
  await saveConfig({
    socials: parseLinks(String(formData.get("socials") ?? "")),
    platforms: parseLinks(String(formData.get("platforms") ?? "")),
  });
  refresh();
  redirect("/admin?ok=liens");
}

// --- Clips : ordre, ajout, suppression ---

export async function moveVideoAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const index = Number(formData.get("index"));
  const dir = String(formData.get("dir")); // "up" | "down"
  const videos = [...(await getConfig()).videos];
  const target = dir === "up" ? index - 1 : index + 1;
  if (index >= 0 && index < videos.length && target >= 0 && target < videos.length) {
    [videos[index], videos[target]] = [videos[target], videos[index]];
    await saveConfig({ videos });
    refresh();
  }
  redirect("/admin?ok=clips");
}

export async function deleteVideoAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const index = Number(formData.get("index"));
  const videos = [...(await getConfig()).videos];
  if (index >= 0 && index < videos.length) {
    videos.splice(index, 1);
    await saveConfig({ videos });
    refresh();
  }
  redirect("/admin?ok=clips");
}

function extractYouTubeId(input: string): string {
  const trimmed = input.trim();
  const patterns = [
    /[?&]v=([A-Za-z0-9_-]{6,})/,
    /youtu\.be\/([A-Za-z0-9_-]{6,})/,
    /\/embed\/([A-Za-z0-9_-]{6,})/,
    /\/shorts\/([A-Za-z0-9_-]{6,})/,
  ];
  for (const p of patterns) {
    const m = trimmed.match(p);
    if (m) return m[1];
  }
  return trimmed; // déjà un identifiant
}

export async function addVideoAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const video: VideoItem = {
    id: extractYouTubeId(String(formData.get("url") ?? "")),
    title: String(formData.get("title") ?? "").trim(),
    titleAr: String(formData.get("titleAr") ?? "").trim(),
    year: Number(formData.get("year")) || new Date().getFullYear(),
  };
  if (video.id && video.title) {
    const videos = [...(await getConfig()).videos, video];
    await saveConfig({ videos });
    refresh();
  }
  redirect("/admin?ok=clips");
}

// --- Médias uploadés (photo de couverture, logo, musique de fond) ---

export async function saveUploadedAssetAction(kind: string, url: string): Promise<void> {
  await requireAdmin();
  const config = await getConfig();
  if (kind === "artistPhoto" || kind === "logo") {
    await saveConfig({ assets: { ...config.assets, [kind]: url } });
  } else if (kind === "music") {
    await saveConfig({ music: { ...config.music, url } });
  }
  refresh();
}

export async function saveMusicAction(formData: FormData): Promise<void> {
  await requireAdmin();
  const config = await getConfig();
  await saveConfig({
    music: { ...config.music, enabled: formData.get("enabled") === "on" },
  });
  refresh();
  redirect("/admin?ok=musique");
}

// --- Annonce (nouvel album / single) ---

export async function saveAnnouncementAction(formData: FormData): Promise<void> {
  await requireAdmin();
  await saveConfig({
    announcement: {
      enabled: formData.get("enabled") === "on",
      title: String(formData.get("title") ?? "").trim(),
      titleAr: String(formData.get("titleAr") ?? "").trim(),
      url: String(formData.get("url") ?? "").trim(),
    },
  });
  refresh();
  redirect("/admin?ok=annonce");
}

// --- Agenda ---

export async function toggleEventsAction(formData: FormData): Promise<void> {
  await requireAdmin();
  await saveConfig({ showEvents: formData.get("showEvents") === "on" });
  refresh();
  redirect("/admin?ok=agenda");
}

export async function upsertEventAction(formData: FormData): Promise<void> {
  await requireAdmin();
  // Heure « murale » conservée telle que saisie (pas de conversion de fuseau)
  const rawDate = String(formData.get("date") ?? "").trim();
  const event: EventItem = {
    id: String(formData.get("id") || "") || crypto.randomUUID(),
    date: rawDate || new Date().toISOString().slice(0, 16),
    title: String(formData.get("title") ?? "").trim(),
    venue: String(formData.get("venue") ?? "").trim(),
    city: String(formData.get("city") ?? "").trim(),
    link: String(formData.get("link") ?? "").trim(),
    published: formData.get("published") === "on",
  };
  if (event.title) await upsertEvent(event);
  refresh();
  redirect("/admin?ok=agenda");
}

export async function deleteEventAction(formData: FormData): Promise<void> {
  await requireAdmin();
  await deleteEvent(String(formData.get("id") ?? ""));
  refresh();
  redirect("/admin?ok=agenda");
}
