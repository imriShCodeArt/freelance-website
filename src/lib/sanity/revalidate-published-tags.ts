import "server-only";

import { revalidateTag } from "next/cache";

import { hasLocale } from "@/lib/i18n/config";

/** Next.js 16 expects a profile; avoids deprecated single-arg `revalidateTag`. */
const REVALIDATE_PROFILE = "max" as const;

/** Matches tags on `get-site-copy.ts` / `get-case-studies.ts` unstable_cache entries. */
export function revalidateSiteCopyTags(locale?: string | null): string[] {
  const tags: string[] = ["site-copy"];
  revalidateTag("site-copy", REVALIDATE_PROFILE);
  if (locale && hasLocale(locale)) {
    const t = `site-copy:${locale}`;
    tags.push(t);
    revalidateTag(t, REVALIDATE_PROFILE);
  } else {
    for (const loc of ["en", "he"] as const) {
      const t = `site-copy:${loc}`;
      tags.push(t);
      revalidateTag(t, REVALIDATE_PROFILE);
    }
  }
  return tags;
}

export function revalidateCaseStudyTags(slug?: string | null): string[] {
  const tags = ["case-studies", "case-studies:featured"];
  revalidateTag("case-studies", REVALIDATE_PROFILE);
  revalidateTag("case-studies:featured", REVALIDATE_PROFILE);
  if (slug) {
    const t = `case-study:${slug}`;
    tags.push(t);
    revalidateTag(t, REVALIDATE_PROFILE);
  }
  return tags;
}

export type SanityWebhookDocument = {
  _type?: string;
  _id?: string;
  locale?: string | null;
  slug?: string | { current?: string | null } | null;
};

export function extractCaseStudySlug(doc: SanityWebhookDocument): string | undefined {
  const s = doc.slug;
  if (typeof s === "string" && s.trim()) return s.trim();
  if (s && typeof s === "object" && typeof s.current === "string" && s.current.trim()) {
    return s.current.trim();
  }
  const id = doc._id;
  if (id?.startsWith("caseStudy.")) {
    return id.slice("caseStudy.".length);
  }
  return undefined;
}

/**
 * Maps a published Sanity document to Next cache tags (and runs revalidation).
 * Returns the list of tag strings that were purged.
 */
export function revalidateForSanityDocument(doc: SanityWebhookDocument): {
  tags: string[];
  handled: boolean;
} {
  const type = doc._type;
  if (!type) {
    return { tags: [], handled: false };
  }

  if (type === "siteSectionCopy") {
    const tags = revalidateSiteCopyTags(doc.locale ?? undefined);
    return { tags, handled: true };
  }

  if (type === "caseStudy") {
    const slug = extractCaseStudySlug(doc);
    const tags = revalidateCaseStudyTags(slug);
    return { tags, handled: true };
  }

  if (type === "siteSettings") {
    const tags = [
      ...revalidateSiteCopyTags(),
      ...revalidateCaseStudyTags(),
    ];
    return { tags, handled: true };
  }

  return { tags: [], handled: false };
}
