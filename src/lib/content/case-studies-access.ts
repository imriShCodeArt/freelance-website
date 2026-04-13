import "server-only";

import {
  caseStudies as staticCaseStudies,
  getCaseStudyLocaleCopy as getStaticCaseStudyLocaleCopy,
  getCaseStudyMeta as getStaticCaseStudyMeta,
  listCaseStudyMeta as listStaticCaseStudyMeta,
  type CaseStudy,
  type CaseStudyLocaleCopy,
  type CaseStudyMeta,
} from "@/content/case-studies";
import type { Locale } from "@/lib/i18n/config";
import {
  getCaseStudyFromSanity,
  getCaseStudyLocaleCopyFromSanity,
  getCaseStudyMetaFromSanity,
  listCaseStudyMetaFromSanity,
  listCaseStudySlugsFromSanity,
  listFeaturedCaseStudyMetaFromSanity,
} from "@/lib/sanity/get-case-studies";
import { isSanityContentEnabled } from "@/lib/sanity/use-sanity-content";

function staticSlugs(): string[] {
  return staticCaseStudies.map((c) => c.slug);
}

function staticFeaturedSlice(): CaseStudyMeta[] {
  return listStaticCaseStudyMeta().slice(0, 2);
}

/** Ordered metadata for `/work` and similar listings. */
export async function listCaseStudyMeta(): Promise<CaseStudyMeta[]> {
  if (!isSanityContentEnabled()) {
    return listStaticCaseStudyMeta();
  }
  try {
    const rows = await listCaseStudyMetaFromSanity();
    if (rows.length === 0) {
      console.warn(
        "[sanity] listCaseStudyMeta: Sanity returned no case studies, using static fallback",
      );
      return listStaticCaseStudyMeta();
    }
    return rows;
  } catch (err) {
    console.error(
      "[sanity] listCaseStudyMeta: failed, using static fallback",
      err,
    );
    return listStaticCaseStudyMeta();
  }
}

/** Homepage featured row (`featuredOnHome` + `homeFeatureOrder` in Sanity). */
export async function listFeaturedCaseStudyMeta(): Promise<CaseStudyMeta[]> {
  if (!isSanityContentEnabled()) {
    return staticFeaturedSlice();
  }
  try {
    const rows = await listFeaturedCaseStudyMetaFromSanity();
    if (rows.length === 0) {
      console.warn(
        "[sanity] listFeaturedCaseStudyMeta: empty featured set, using static slice",
      );
      return staticFeaturedSlice();
    }
    return rows;
  } catch (err) {
    console.error(
      "[sanity] listFeaturedCaseStudyMeta: failed, using static slice",
      err,
    );
    return staticFeaturedSlice();
  }
}

/** Slugs for `generateStaticParams` and sitemap. */
export async function listCaseStudySlugs(): Promise<string[]> {
  if (!isSanityContentEnabled()) {
    return staticSlugs();
  }
  try {
    const slugs = await listCaseStudySlugsFromSanity();
    if (slugs.length === 0) {
      console.warn(
        "[sanity] listCaseStudySlugs: Sanity returned no slugs, using static fallback",
      );
      return staticSlugs();
    }
    return slugs;
  } catch (err) {
    console.error(
      "[sanity] listCaseStudySlugs: failed, using static fallback",
      err,
    );
    return staticSlugs();
  }
}

export async function getCaseStudyMeta(slug: string): Promise<CaseStudyMeta | undefined> {
  if (!isSanityContentEnabled()) {
    return getStaticCaseStudyMeta(slug);
  }
  try {
    const row = await getCaseStudyMetaFromSanity(slug);
    if (row) return row;
    return getStaticCaseStudyMeta(slug);
  } catch (err) {
    console.error(
      `[sanity] getCaseStudyMeta(${slug}): failed, using static fallback`,
      err,
    );
    return getStaticCaseStudyMeta(slug);
  }
}

export async function getCaseStudyLocaleCopy(
  slug: string,
  locale: Locale,
): Promise<CaseStudyLocaleCopy | undefined> {
  if (!isSanityContentEnabled()) {
    return getStaticCaseStudyLocaleCopy(slug, locale);
  }
  try {
    const copy = await getCaseStudyLocaleCopyFromSanity(slug, locale);
    if (copy) return copy;
    return getStaticCaseStudyLocaleCopy(slug, locale);
  } catch (err) {
    console.error(
      `[sanity] getCaseStudyLocaleCopy(${slug}, ${locale}): failed, using static fallback`,
      err,
    );
    return getStaticCaseStudyLocaleCopy(slug, locale);
  }
}

/** Full document (both locales); `null` only when absent in Sanity and static. */
export async function getCaseStudy(slug: string): Promise<CaseStudy | null> {
  if (!isSanityContentEnabled()) {
    return staticCaseStudies.find((c) => c.slug === slug) ?? null;
  }
  try {
    const row = await getCaseStudyFromSanity(slug);
    if (row) return row;
    return staticCaseStudies.find((c) => c.slug === slug) ?? null;
  } catch (err) {
    console.error(
      `[sanity] getCaseStudy(${slug}): failed, using static fallback`,
      err,
    );
    return staticCaseStudies.find((c) => c.slug === slug) ?? null;
  }
}
