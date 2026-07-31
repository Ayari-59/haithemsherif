import { adminConfigured } from "@/lib/auth";
import { loginAction } from "../actions";

export const metadata = { title: "Espace admin — Haithem Sherif" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const configured = adminConfigured();

  return (
    <main className="flex min-h-svh items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl border border-gold/25 bg-night-soft p-8">
        <h1 className="mb-1 text-center text-2xl font-bold">
          Espace <span className="text-gold">admin</span>
        </h1>
        <p className="mb-6 text-center text-sm text-white/60">Site de Haithem Sherif</p>

        {!configured ? (
          <p className="text-sm text-amber-300">
            L&apos;espace admin n&apos;est pas encore activé : la variable
            d&apos;environnement <code>ADMIN_PASSWORD</code> doit être définie sur Vercel.
          </p>
        ) : (
          <form action={loginAction} className="space-y-4">
            <input
              type="password"
              name="password"
              placeholder="Mot de passe"
              autoFocus
              className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 outline-none focus:border-gold"
            />
            {error && (
              <p className="text-sm text-red-400">Mot de passe incorrect.</p>
            )}
            <button
              type="submit"
              className="w-full rounded-full bg-gold px-6 py-3 font-semibold text-night transition hover:bg-gold-light"
            >
              Entrer
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
