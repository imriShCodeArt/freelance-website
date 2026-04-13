/**
 * Public Sanity configuration (safe for the browser / Studio).
 *
 * **Two prefixes:**
 * - `NEXT_PUBLIC_*` — inlined by **Next.js** (embedded Studio at `/studio`, API routes, etc.).
 * - `SANITY_STUDIO_*` — inlined by **Sanity’s Vite** when using `yarn studio:dev` / `sanity dev`.
 *   `NEXT_PUBLIC_*` is **not** exposed to that browser bundle, which is why standalone Studio
 *   would otherwise fall back to the placeholder id.
 *
 * `yarn studio:dev` copies `NEXT_PUBLIC_*` → `SANITY_STUDIO_*` when the latter are unset, so
 * one set of values in `.env` is enough. See https://www.sanity.io/docs/studio/environment-variables
 */
export const apiVersion =
  process.env.SANITY_API_VERSION?.trim() || "2025-04-13";

/** Build-time fallback when no real project id is configured. */
export const PLACEHOLDER_SANITY_PROJECT_ID = "placeholder-project-id";

export function getSanityDataset(): string {
  return (
    process.env.SANITY_STUDIO_DATASET?.trim() ||
    process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() ||
    "production"
  );
}

export function getSanityProjectId(): string {
  return (
    process.env.SANITY_STUDIO_PROJECT_ID?.trim() ||
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() ||
    PLACEHOLDER_SANITY_PROJECT_ID
  );
}
