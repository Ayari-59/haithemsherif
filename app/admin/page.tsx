import UploadField from "@/components/admin/UploadField";
import { getConfig, hasDb, listEvents } from "@/lib/db";
import {
  addVideoAction,
  saveAnnouncementAction,
  deleteEventAction,
  deleteVideoAction,
  logoutAction,
  moveVideoAction,
  saveArtistAction,
  saveContactAction,
  saveLinksAction,
  saveMusicAction,
  saveUploadedAssetAction,
  toggleEventsAction,
  upsertEventAction,
} from "./actions";

export const dynamic = "force-dynamic";
export const metadata = { title: "Administration — Haithem Sherif" };

const input =
  "w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 outline-none focus:border-gold";
const btn =
  "rounded-full bg-gold px-5 py-2 font-semibold text-night transition hover:bg-gold-light";
const btnGhost =
  "rounded-full border border-white/20 px-4 py-2 text-sm transition hover:border-gold hover:text-gold";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-night-soft p-6">
      <h2 className="mb-4 text-xl font-bold text-gold">{title}</h2>
      {children}
    </section>
  );
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string }>;
}) {
  const { ok } = await searchParams;
  const dbReady = hasDb();
  const config = await getConfig();
  const events = await listEvents();

  return (
    <main className="mx-auto max-w-4xl space-y-6 px-4 py-10">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">
          Administration — <span className="text-gold">{config.artist.name}</span>
        </h1>
        <div className="flex gap-2">
          <a href="/" target="_blank" className={btnGhost}>
            Voir le site ↗
          </a>
          <form action={logoutAction}>
            <button type="submit" className={btnGhost}>
              Déconnexion
            </button>
          </form>
        </div>
      </header>

      {ok && (
        <p className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">
          Modifications enregistrées ✓
        </p>
      )}

      {!dbReady && (
        <p className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-300">
          La base de données n&apos;est pas encore configurée (variable{" "}
          <code>DATABASE_URL</code>). Le site affiche ses valeurs par défaut et les
          enregistrements sont désactivés.
        </p>
      )}

      <Section title="Identité & biographie">
        <form action={saveArtistAction} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-1">
              <span className="text-sm text-white/60">Nom de scène</span>
              <input name="name" defaultValue={config.artist.name} className={input} />
            </label>
            <label className="space-y-1">
              <span className="text-sm text-white/60">Nom en arabe</span>
              <input name="nameAr" dir="rtl" defaultValue={config.artist.nameAr} className={input} />
            </label>
            <label className="space-y-1">
              <span className="text-sm text-white/60">Sous-titre</span>
              <input name="tagline" defaultValue={config.artist.tagline} className={input} />
            </label>
            <label className="space-y-1">
              <span className="text-sm text-white/60">Sous-titre en arabe (pied de page)</span>
              <input name="taglineAr" dir="rtl" defaultValue={config.artist.taglineAr} className={input} />
            </label>
          </div>
          <label className="block space-y-1">
            <span className="text-sm text-white/60">Biographie (français)</span>
            <textarea name="bio" rows={5} defaultValue={config.artist.bio} className={input} />
          </label>
          <label className="block space-y-1">
            <span className="text-sm text-white/60">Biographie (arabe)</span>
            <textarea name="bioAr" dir="rtl" rows={5} defaultValue={config.artist.bioAr} className={input} />
          </label>
          <p className="text-xs text-white/50">
            Astuce : viser des longueurs proches pour que les deux colonnes gardent le
            même nombre de lignes sur le site.
          </p>
          <button type="submit" className={btn} disabled={!dbReady}>
            Enregistrer
          </button>
        </form>
      </Section>

      <Section title="Photo de couverture & logo">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={config.assets.artistPhoto}
              alt="Photo de couverture actuelle"
              className="aspect-square w-full rounded-xl border border-white/10 object-cover"
            />
            <UploadField
              kind="artistPhoto"
              accept="image/*"
              label="Photo de couverture"
              onSaved={saveUploadedAssetAction}
            />
          </div>
          <div className="space-y-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={config.assets.logo}
              alt="Logo actuel"
              className="mx-auto h-32 w-auto rounded-xl border border-white/10 bg-black/30 p-4"
            />
            <UploadField
              kind="logo"
              accept="image/*"
              label="Logo (PNG transparent conseillé)"
              onSaved={saveUploadedAssetAction}
            />
          </div>
        </div>
      </Section>

      <Section title="Contact & booking">
        <form action={saveContactAction} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-1">
              <span className="text-sm text-white/60">Numéro WhatsApp</span>
              <input name="whatsapp" defaultValue={config.artist.whatsapp} className={input} />
            </label>
            <label className="space-y-1">
              <span className="text-sm text-white/60">E-mail de booking (vide = masqué)</span>
              <input name="bookingEmail" defaultValue={config.artist.bookingEmail} className={input} />
            </label>
          </div>
          <label className="block space-y-1">
            <span className="text-sm text-white/60">Message WhatsApp pré-rempli</span>
            <input name="whatsappMessage" defaultValue={config.artist.whatsappMessage} className={input} />
          </label>
          <button type="submit" className={btn} disabled={!dbReady}>
            Enregistrer
          </button>
        </form>
      </Section>

      <Section title="Réseaux sociaux & plateformes d'écoute">
        <form action={saveLinksAction} className="space-y-4">
          <label className="block space-y-1">
            <span className="text-sm text-white/60">
              Réseaux sociaux — un par ligne, au format <code>Label | https://lien</code>
            </span>
            <textarea
              name="socials"
              rows={5}
              defaultValue={config.socials.map((s) => `${s.label} | ${s.url}`).join("\n")}
              className={`${input} font-mono text-sm`}
            />
          </label>
          <label className="block space-y-1">
            <span className="text-sm text-white/60">
              Plateformes d&apos;écoute — même format
            </span>
            <textarea
              name="platforms"
              rows={5}
              defaultValue={config.platforms.map((p) => `${p.label} | ${p.url}`).join("\n")}
              className={`${input} font-mono text-sm`}
            />
          </label>
          <button type="submit" className={btn} disabled={!dbReady}>
            Enregistrer
          </button>
        </form>
      </Section>

      <Section title="Clips — ordre d'affichage">
        <p className="mb-4 text-sm text-white/60">
          Le premier clip de la liste est mis en avant sur la page d&apos;accueil
          (bouton « Dernier clip »).
        </p>
        <ul className="space-y-2">
          {config.videos.map((v, i) => (
            <li
              key={`${v.id}-${i}`}
              className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://i.ytimg.com/vi/${v.id}/default.jpg`}
                alt=""
                className="h-12 w-16 rounded object-cover"
              />
              <span className="min-w-0 flex-1 truncate">
                <span className="font-semibold">{v.title}</span>{" "}
                <span className="text-sm text-white/50">· {v.year}</span>
              </span>
              <form action={moveVideoAction} className="flex gap-1">
                <input type="hidden" name="index" value={i} />
                <button type="submit" name="dir" value="up" className={btnGhost} disabled={i === 0 || !dbReady} aria-label="Monter">
                  ↑
                </button>
                <button type="submit" name="dir" value="down" className={btnGhost} disabled={i === config.videos.length - 1 || !dbReady} aria-label="Descendre">
                  ↓
                </button>
              </form>
              <form action={deleteVideoAction}>
                <input type="hidden" name="index" value={i} />
                <button type="submit" className={`${btnGhost} text-red-400 hover:border-red-400 hover:text-red-300`} disabled={!dbReady} aria-label="Supprimer">
                  ✕
                </button>
              </form>
            </li>
          ))}
        </ul>
        <form action={addVideoAction} className="mt-5 grid gap-3 sm:grid-cols-2">
          <label className="space-y-1 sm:col-span-2">
            <span className="text-sm text-white/60">Lien YouTube (ou identifiant de la vidéo)</span>
            <input name="url" placeholder="https://www.youtube.com/watch?v=…" className={input} />
          </label>
          <label className="space-y-1">
            <span className="text-sm text-white/60">Titre</span>
            <input name="title" className={input} />
          </label>
          <label className="space-y-1">
            <span className="text-sm text-white/60">Titre en arabe</span>
            <input name="titleAr" dir="rtl" className={input} />
          </label>
          <label className="space-y-1">
            <span className="text-sm text-white/60">Année</span>
            <input name="year" type="number" defaultValue={new Date().getFullYear()} className={input} />
          </label>
          <div className="flex items-end">
            <button type="submit" className={btn} disabled={!dbReady}>
              Ajouter le clip
            </button>
          </div>
        </form>
      </Section>

      <Section title="Annonce — nouvel album ou single">
        <form action={saveAnnouncementAction} className="space-y-4">
          <label className="flex items-center gap-2">
            <input type="checkbox" name="enabled" defaultChecked={config.announcement.enabled} className="h-4 w-4 accent-[#d9a441]" />
            <span>Afficher l&apos;annonce sur la page d&apos;accueil</span>
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-1">
              <span className="text-sm text-white/60">Titre (français)</span>
              <input name="title" placeholder="Nouvel album : …" defaultValue={config.announcement.title} className={input} />
            </label>
            <label className="space-y-1">
              <span className="text-sm text-white/60">Titre (arabe)</span>
              <input name="titleAr" dir="rtl" defaultValue={config.announcement.titleAr} className={input} />
            </label>
          </div>
          <label className="block space-y-1">
            <span className="text-sm text-white/60">Lien de la vidéo d&apos;annonce (YouTube…)</span>
            <input name="url" placeholder="https://www.youtube.com/watch?v=…" defaultValue={config.announcement.url} className={input} />
          </label>
          <button type="submit" className={btn} disabled={!dbReady}>
            Enregistrer
          </button>
        </form>
      </Section>

      <Section title="Musique de fond">
        <div className="space-y-4">
          <UploadField
            kind="music"
            accept="audio/*"
            label="Fichier audio (MP3 conseillé)"
            currentUrl={config.music.url}
            onSaved={saveUploadedAssetAction}
          />
          <form action={saveMusicAction} className="flex items-center gap-3">
            <label className="flex items-center gap-2">
              <input type="checkbox" name="enabled" defaultChecked={config.music.enabled} className="h-4 w-4 accent-[#d9a441]" />
              <span>Activer le lecteur sur le site public</span>
            </label>
            <button type="submit" className={btn} disabled={!dbReady}>
              Enregistrer
            </button>
          </form>
          <p className="text-xs text-white/50">
            Les navigateurs bloquent le son automatique : le visiteur verra un bouton
            play discret en bas à droite du site.
          </p>
        </div>
      </Section>

      <Section title="Agenda des événements">
        <form action={toggleEventsAction} className="mb-6 flex items-center gap-3">
          <label className="flex items-center gap-2">
            <input type="checkbox" name="showEvents" defaultChecked={config.showEvents} className="h-4 w-4 accent-[#d9a441]" />
            <span>Révéler l&apos;agenda sur le site public</span>
          </label>
          <button type="submit" className={btn} disabled={!dbReady}>
            Enregistrer
          </button>
        </form>

        <ul className="space-y-4">
          {events.map((e) => (
            <li key={e.id} className="rounded-lg border border-white/10 bg-white/5 p-4">
              <form action={upsertEventAction} className="grid gap-3 sm:grid-cols-2">
                <input type="hidden" name="id" value={e.id} />
                <label className="space-y-1">
                  <span className="text-sm text-white/60">Date & heure</span>
                  <input name="date" type="datetime-local" defaultValue={e.date.slice(0, 16)} className={input} />
                </label>
                <label className="space-y-1">
                  <span className="text-sm text-white/60">Titre</span>
                  <input name="title" defaultValue={e.title} className={input} />
                </label>
                <label className="space-y-1">
                  <span className="text-sm text-white/60">Salle / lieu</span>
                  <input name="venue" defaultValue={e.venue} className={input} />
                </label>
                <label className="space-y-1">
                  <span className="text-sm text-white/60">Ville</span>
                  <input name="city" defaultValue={e.city} className={input} />
                </label>
                <label className="space-y-1 sm:col-span-2">
                  <span className="text-sm text-white/60">Lien billetterie (optionnel)</span>
                  <input name="link" defaultValue={e.link} className={input} />
                </label>
                <div className="flex items-center justify-between gap-3 sm:col-span-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" name="published" defaultChecked={e.published} className="h-4 w-4 accent-[#d9a441]" />
                    <span>Publié</span>
                  </label>
                  <div className="flex gap-2">
                    <button type="submit" className={btn} disabled={!dbReady}>
                      Enregistrer
                    </button>
                    <button
                      type="submit"
                      formAction={deleteEventAction}
                      className={`${btnGhost} text-red-400 hover:border-red-400 hover:text-red-300`}
                      disabled={!dbReady}
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </form>
            </li>
          ))}
        </ul>

        <h3 className="mt-6 mb-2 font-semibold text-gold-light">Ajouter un événement</h3>
        <form action={upsertEventAction} className="grid gap-3 rounded-lg border border-dashed border-white/20 p-4 sm:grid-cols-2">
          <label className="space-y-1">
            <span className="text-sm text-white/60">Date & heure</span>
            <input name="date" type="datetime-local" className={input} />
          </label>
          <label className="space-y-1">
            <span className="text-sm text-white/60">Titre</span>
            <input name="title" placeholder="Concert…" className={input} />
          </label>
          <label className="space-y-1">
            <span className="text-sm text-white/60">Salle / lieu</span>
            <input name="venue" className={input} />
          </label>
          <label className="space-y-1">
            <span className="text-sm text-white/60">Ville</span>
            <input name="city" className={input} />
          </label>
          <label className="space-y-1 sm:col-span-2">
            <span className="text-sm text-white/60">Lien billetterie (optionnel)</span>
            <input name="link" className={input} />
          </label>
          <div className="flex items-center justify-between sm:col-span-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" name="published" defaultChecked className="h-4 w-4 accent-[#d9a441]" />
              <span>Publié</span>
            </label>
            <button type="submit" className={btn} disabled={!dbReady}>
              Ajouter
            </button>
          </div>
        </form>
      </Section>
    </main>
  );
}
