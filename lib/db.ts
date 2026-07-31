import { neon } from "@neondatabase/serverless";
import { DEFAULT_CONFIG } from "./defaults";
import type { EventItem, SiteConfig } from "./types";

// Couche d'accès aux données. Sans DATABASE_URL (base non configurée),
// le site fonctionne en lecture seule sur les valeurs par défaut.

export function hasDb(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

function sql() {
  return neon(process.env.DATABASE_URL as string);
}

let schemaReady: Promise<void> | null = null;

function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = (async () => {
      const q = sql();
      await q`CREATE TABLE IF NOT EXISTS site_config (
        id INTEGER PRIMARY KEY,
        data JSONB NOT NULL,
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      )`;
      await q`CREATE TABLE IF NOT EXISTS events (
        id TEXT PRIMARY KEY,
        date TEXT NOT NULL,
        title TEXT NOT NULL,
        venue TEXT NOT NULL DEFAULT '',
        city TEXT NOT NULL DEFAULT '',
        link TEXT NOT NULL DEFAULT '',
        published BOOLEAN NOT NULL DEFAULT true
      )`;
    })().catch((e) => {
      schemaReady = null;
      throw e;
    });
  }
  return schemaReady;
}

export async function getConfig(): Promise<SiteConfig> {
  if (!hasDb()) return DEFAULT_CONFIG;
  await ensureSchema();
  const rows = await sql()`SELECT data FROM site_config WHERE id = 1`;
  if (rows.length === 0) return DEFAULT_CONFIG;
  const stored = rows[0].data as Partial<SiteConfig>;
  return {
    ...DEFAULT_CONFIG,
    ...stored,
    artist: { ...DEFAULT_CONFIG.artist, ...stored.artist },
    assets: { ...DEFAULT_CONFIG.assets, ...stored.assets },
    music: { ...DEFAULT_CONFIG.music, ...stored.music },
  };
}

export async function saveConfig(patch: Partial<SiteConfig>): Promise<void> {
  if (!hasDb()) throw new Error("Base de données non configurée (DATABASE_URL absente).");
  const current = await getConfig();
  const next: SiteConfig = {
    ...current,
    ...patch,
    artist: { ...current.artist, ...patch.artist },
    assets: { ...current.assets, ...patch.assets },
    music: { ...current.music, ...patch.music },
  };
  await sql()`INSERT INTO site_config (id, data, updated_at)
    VALUES (1, ${JSON.stringify(next)}::jsonb, now())
    ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data, updated_at = now()`;
}

// La date est stockée telle que saisie (datetime-local, heure « murale » sans
// fuseau) pour qu'un concert à 20 h reste affiché à 20 h quel que soit le serveur.
function rowToEvent(r: Record<string, unknown>): EventItem {
  return {
    id: String(r.id),
    date: String(r.date),
    title: String(r.title),
    venue: String(r.venue),
    city: String(r.city),
    link: String(r.link),
    published: Boolean(r.published),
  };
}

export async function listEvents(opts?: { publishedOnly?: boolean }): Promise<EventItem[]> {
  if (!hasDb()) return [];
  await ensureSchema();
  const rows = opts?.publishedOnly
    ? await sql()`SELECT * FROM events WHERE published = true ORDER BY date ASC`
    : await sql()`SELECT * FROM events ORDER BY date ASC`;
  return rows.map(rowToEvent);
}

export async function upsertEvent(e: EventItem): Promise<void> {
  if (!hasDb()) throw new Error("Base de données non configurée.");
  await ensureSchema();
  await sql()`INSERT INTO events (id, date, title, venue, city, link, published)
    VALUES (${e.id}, ${e.date}, ${e.title}, ${e.venue}, ${e.city}, ${e.link}, ${e.published})
    ON CONFLICT (id) DO UPDATE SET
      date = EXCLUDED.date, title = EXCLUDED.title, venue = EXCLUDED.venue,
      city = EXCLUDED.city, link = EXCLUDED.link, published = EXCLUDED.published`;
}

export async function deleteEvent(id: string): Promise<void> {
  if (!hasDb()) throw new Error("Base de données non configurée.");
  await ensureSchema();
  await sql()`DELETE FROM events WHERE id = ${id}`;
}
