// Production URL. Set NEXT_PUBLIC_SITE_URL at deploy time; the fallback is a PLACEHOLDER
// that scripts/check-launch.mjs rejects.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://rammal-placeholder.example.org";
