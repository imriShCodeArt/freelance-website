/**
 * Edit branding and contact defaults in one place.
 * For production metadata and sitemap URLs, set NEXT_PUBLIC_SITE_URL (no trailing slash).
 * Titles, descriptions, and marketing copy live in `src/messages/*` (i18s).
 */
export const siteConfig = {
  /** Short label in the header (replace with your name or studio). */
  shortName: "Imri W.",
  /** Shown in mailto links when email delivery is not configured. */
  publicContactEmail:
    process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "imriwain@gmail.com",
} as const;

export function getSiteUrl(): string {
  const fallback = "http://localhost:3000";
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!raw) return fallback;
  if (raw.includes("@")) return fallback;

  const normalized = raw.match(/^https?:\/\//i) ? raw : `https://${raw}`;

  try {
    return new URL(normalized).toString().replace(/\/$/, "");
  } catch {
    return fallback;
  }
}
