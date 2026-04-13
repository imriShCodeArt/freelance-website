/**
 * Public Sanity configuration (safe for the browser / Studio).
 * Set `NEXT_PUBLIC_*` in `.env.local`; see `.env.example`.
 */
export const apiVersion =
  process.env.SANITY_API_VERSION?.trim() || "2025-04-13";

/** Allows `next build` before a real project id exists in `.env.local`. */
export const PLACEHOLDER_SANITY_PROJECT_ID = "placeholder-project-id";

export function getSanityDataset(): string {
  return process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || "production";
}

/**
 * Project id is required for Studio and for API reads. Builds can succeed with a
 * placeholder; replace it in `.env.local` before using Studio or the read client.
 */
export function getSanityProjectId(): string {
  return (
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() ||
    PLACEHOLDER_SANITY_PROJECT_ID
  );
}
