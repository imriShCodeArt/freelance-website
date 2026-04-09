/**
 * Central public profile and branding. Marketing copy lives in `src/messages/*`.
 * For production metadata and sitemap URLs, set NEXT_PUBLIC_SITE_URL (no trailing slash).
 */
export const siteConfig = {
  shortName: "Imri Wainberg",
  publicContactEmail:
    process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "imriwain@gmail.com",
  publicGithubUrl:
    process.env.NEXT_PUBLIC_GITHUB_URL ?? "https://github.com/imriShCodeArt",
  publicLinkedInUrl:
    process.env.NEXT_PUBLIC_LINKEDIN_URL ??
    "https://www.linkedin.com/in/imrish/",
  /** Static file in `public/` */
  resumePath: "/imri-wainberg-resume.pdf",
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
