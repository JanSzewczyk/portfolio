export function getSiteUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL;
  if (envUrl) return envUrl.startsWith("http") ? envUrl : `https://${envUrl}`;
  return "https://localhost:3000";
}
