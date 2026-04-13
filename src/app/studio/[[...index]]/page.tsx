"use client";

import { NextStudio } from "next-sanity/studio";

import config from "../../../../sanity.config";

/**
 * Embedded Sanity Studio. Requires `NEXT_PUBLIC_SANITY_PROJECT_ID` and dataset in `.env.local`.
 */
export default function StudioPage() {
  return <NextStudio config={config} />;
}
