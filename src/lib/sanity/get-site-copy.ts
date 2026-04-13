import "server-only";

import { unstable_cache } from "next/cache";
import { cache } from "react";

import type { Locale } from "@/lib/i18n/config";
import { hasLocale } from "@/lib/i18n/config";
import type { Messages } from "@/messages/en";

import { getSanityReadClient } from "./client";
import { mapSiteSectionDocumentsToMessages } from "./mappers";
import { siteSectionCopyByLocaleQuery } from "./queries";
import type { ValidatedSiteSectionCopyDoc } from "./validators";
import { siteSectionCopyListSchema } from "./validators";

/**
 * Fetch + Zod only. Kept JSON-serializable so `unstable_cache` does not strip `builtWith`
 * (a function added later in `mapSiteSectionDocumentsToMessages`).
 */
async function fetchValidatedSiteCopyDocs(
  locale: Locale,
): Promise<ValidatedSiteSectionCopyDoc[]> {
  const client = getSanityReadClient();
  const raw = await client.fetch<unknown>(siteSectionCopyByLocaleQuery, {
    locale,
  });
  const parsed = siteSectionCopyListSchema.parse(raw);

  for (const doc of parsed) {
    const block = doc.content[doc.sectionKey];
    if (block == null) {
      throw new Error(
        `siteSectionCopy ${doc._id} is missing content.${doc.sectionKey}`,
      );
    }
  }

  return parsed;
}

function createSiteCopyDocsFetcher(locale: Locale) {
  return unstable_cache(
    async () => fetchValidatedSiteCopyDocs(locale),
    ["sanity-site-copy-docs", locale],
    { tags: ["site-copy", `site-copy:${locale}`] },
  );
}

const siteCopyDocsEn = createSiteCopyDocsFetcher("en");
const siteCopyDocsHe = createSiteCopyDocsFetcher("he");

/**
 * Fetches and validates all `siteSectionCopy` docs for a locale and assembles `Messages`.
 * Cached per request (`cache`) and across requests (`unstable_cache` + tags for Phase 6).
 * Mapping runs after the cache so `common.builtWith` stays a function (not JSON-serializable).
 */
export const getSiteCopyFromSanity = cache(async (locale: Locale): Promise<Messages> => {
  if (!hasLocale(locale)) {
    throw new Error(`Invalid locale: ${String(locale)}`);
  }
  const docs = await (locale === "en" ? siteCopyDocsEn() : siteCopyDocsHe());
  return mapSiteSectionDocumentsToMessages(docs);
});
