import { createClient, type SanityClient } from "@sanity/client";

import {
  PLACEHOLDER_SANITY_PROJECT_ID,
  apiVersion,
  getSanityDataset,
  getSanityProjectId,
} from "@/sanity/env";

/**
 * Server-side Sanity client for published content (CDN, no draft perspective).
 * Call only after `NEXT_PUBLIC_SANITY_PROJECT_ID` is set to a real project.
 */
export function getSanityReadClient(): SanityClient {
  const projectId = getSanityProjectId();
  const dataset = getSanityDataset();

  if (!projectId || projectId === PLACEHOLDER_SANITY_PROJECT_ID) {
    throw new Error(
      "Sanity is not configured: set NEXT_PUBLIC_SANITY_PROJECT_ID in .env.local (create a project at https://www.sanity.io/manage).",
    );
  }

  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true,
    perspective: "published",
    token: process.env.SANITY_API_READ_TOKEN?.trim() || undefined,
  });
}
