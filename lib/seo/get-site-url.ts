import { env } from "~/data/env/client";

export function getSiteUrl(): string {
  const envUrl = env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL;
  if (envUrl) return envUrl.startsWith("http") ? envUrl : `https://${envUrl}`;

  // On Vercel the production URL is always injected; its absence means a misconfigured
  // deployment that would otherwise bake a localhost canonical/sitemap/OG URL — fail loudly instead.
  if (process.env.VERCEL) {
    throw new Error(
      "NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL is not set on Vercel. Refusing to use a localhost site URL for canonical/sitemap/OG metadata."
    );
  }

  return "https://localhost:3000";
}
