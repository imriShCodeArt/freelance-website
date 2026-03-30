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
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "http://localhost:3000"
  );
}
