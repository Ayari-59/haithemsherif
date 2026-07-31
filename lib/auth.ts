import { SignJWT, jwtVerify } from "jose";

// Session admin : cookie JWT signé. Un seul secret nécessaire côté Vercel :
// ADMIN_PASSWORD (SESSION_SECRET optionnel pour signer avec une clé distincte).

export const SESSION_COOKIE = "hs_admin";
const SESSION_DURATION = "7d";

export function adminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}

function secretKey(): Uint8Array {
  const secret = process.env.SESSION_SECRET || process.env.ADMIN_PASSWORD;
  if (!secret) throw new Error("ADMIN_PASSWORD non configuré.");
  return new TextEncoder().encode(`hs-session:${secret}`);
}

export function checkPassword(candidate: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || !candidate) return false;
  // Comparaison à longueur constante pour ne pas fuiter la longueur par timing
  const a = new TextEncoder().encode(candidate);
  const b = new TextEncoder().encode(expected);
  let diff = a.length === b.length ? 0 : 1;
  const max = Math.max(a.length, b.length);
  for (let i = 0; i < max; i++) diff |= (a[i % a.length] ?? 0) ^ (b[i % b.length] ?? 0);
  return diff === 0;
}

export async function createSessionToken(): Promise<string> {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(SESSION_DURATION)
    .sign(secretKey());
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, secretKey());
    return payload.role === "admin";
  } catch {
    return false;
  }
}
