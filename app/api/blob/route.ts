import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

// Émet les jetons d'upload direct vers Vercel Blob, réservé à l'admin connecté.
export async function POST(request: Request): Promise<NextResponse> {
  const store = await cookies();
  const isAdmin = await verifySessionToken(store.get(SESSION_COOKIE)?.value);
  if (!isAdmin) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const body = (await request.json()) as HandleUploadBody;
  try {
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: [
          "image/jpeg",
          "image/png",
          "image/webp",
          "audio/mpeg",
          "audio/mp4",
          "audio/ogg",
          "audio/wav",
        ],
        maximumSizeInBytes: 25 * 1024 * 1024,
        addRandomSuffix: true,
      }),
      onUploadCompleted: async () => {
        // L'enregistrement dans la config est fait côté client via l'action serveur.
      },
    });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erreur d'upload" },
      { status: 400 },
    );
  }
}
