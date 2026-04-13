import "server-only";

import { unstable_cache } from "next/cache";
import { cache } from "react";

import type {
  CaseStudy,
  CaseStudyLocaleCopy,
  CaseStudyMeta,
} from "@/content/case-studies";
import type { Locale } from "@/lib/i18n/config";

import { getSanityReadClient } from "./client";
import { mapCaseStudyFullToCaseStudy, mapCaseStudyMeta } from "./mappers";
import {
  caseStudyBySlugQuery,
  caseStudyFeaturedMetaQuery,
  caseStudyListMetaQuery,
  caseStudySlugsQuery,
} from "./queries";
import {
  caseStudyFullSchema,
  caseStudyMetaListSchema,
  caseStudySlugsSchema,
} from "./validators";

const listMetaCached = unstable_cache(
  async (): Promise<CaseStudyMeta[]> => {
    const client = getSanityReadClient();
    const raw = await client.fetch<unknown>(caseStudyListMetaQuery);
    const parsed = caseStudyMetaListSchema.parse(raw);
    return parsed.map(mapCaseStudyMeta);
  },
  ["sanity-case-study-list-meta"],
  { tags: ["case-studies"] },
);

const featuredMetaCached = unstable_cache(
  async (): Promise<CaseStudyMeta[]> => {
    const client = getSanityReadClient();
    const raw = await client.fetch<unknown>(caseStudyFeaturedMetaQuery);
    const parsed = caseStudyMetaListSchema.parse(raw);
    return parsed.map(mapCaseStudyMeta);
  },
  ["sanity-case-study-featured-meta"],
  { tags: ["case-studies", "case-studies:featured"] },
);

const slugsCached = unstable_cache(
  async (): Promise<string[]> => {
    const client = getSanityReadClient();
    const raw = await client.fetch<unknown>(caseStudySlugsQuery);
    return caseStudySlugsSchema.parse(raw);
  },
  ["sanity-case-study-slugs"],
  { tags: ["case-studies"] },
);

/** All case studies (metadata) for list views and sitemap-style iteration. */
export const listCaseStudyMetaFromSanity = cache(
  async (): Promise<CaseStudyMeta[]> => listMetaCached(),
);

/** Homepage featured row, ordered by `homeFeatureOrder`. */
export const listFeaturedCaseStudyMetaFromSanity = cache(
  async (): Promise<CaseStudyMeta[]> => featuredMetaCached(),
);

/** Published slug strings for `generateStaticParams` / sitemap. */
export const listCaseStudySlugsFromSanity = cache(
  async (): Promise<string[]> => slugsCached(),
);

export const getCaseStudyMetaFromSanity = cache(
  async (slug: string): Promise<CaseStudyMeta | undefined> => {
    const all = await listMetaCached();
    return all.find((c) => c.slug === slug);
  },
);

/**
 * Full case study (both locales). `null` when slug is missing in Sanity.
 * Tag list includes `case-studies:featured` so featured toggles can invalidate cached rows.
 */
export const getCaseStudyFromSanity = cache(
  async (slug: string): Promise<CaseStudy | null> =>
    unstable_cache(
      async () => {
        const client = getSanityReadClient();
        const raw = await client.fetch<unknown>(caseStudyBySlugQuery, { slug });
        if (raw == null) return null;
        const parsed = caseStudyFullSchema.parse(raw);
        return mapCaseStudyFullToCaseStudy(parsed);
      },
      ["sanity-case-study", slug],
      {
        tags: [
          "case-studies",
          `case-study:${slug}`,
          "case-studies:featured",
        ],
      },
    )(),
);

export async function getCaseStudyLocaleCopyFromSanity(
  slug: string,
  locale: Locale,
): Promise<CaseStudyLocaleCopy | undefined> {
  const study = await getCaseStudyFromSanity(slug);
  return study ? study[locale] : undefined;
}
