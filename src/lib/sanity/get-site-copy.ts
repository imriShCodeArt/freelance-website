import "server-only";

import { unstable_cache } from "next/cache";
import { cache } from "react";

import type { Locale } from "@/lib/i18n/config";
import { hasLocale } from "@/lib/i18n/config";
import type { Messages } from "@/messages/en";

import { getSanityReadClient } from "./client";
import { mapSiteSectionDocumentsToMessages } from "./mappers";
import { siteSectionCopyByLocaleQuery } from "./queries";
import { siteSectionCopyListSchema } from "./validators";

async function fetchAndAssembleSiteCopy(locale: Locale): Promise<Messages> {
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

  return mapSiteSectionDocumentsToMessages(parsed);
}

function createSiteCopyFetcher(locale: Locale) {
  return unstable_cache(
    async () => fetchAndAssembleSiteCopy(locale),
    ["sanity-site-copy", locale],
    { tags: ["site-copy", `site-copy:${locale}`] },
  );
}

const siteCopyEn = createSiteCopyFetcher("en");
const siteCopyHe = createSiteCopyFetcher("he");

/**
 * Fetches and validates all `siteSectionCopy` docs for a locale and assembles `Messages`.
 * Cached per request (`cache`) and across requests (`unstable_cache` + tags for Phase 6).
 */
export const getSiteCopyFromSanity = cache(async (locale: Locale): Promise<Messages> => {
  if (!hasLocale(locale)) {
    throw new Error(`Invalid locale: ${String(locale)}`);
  }
  return locale === "en" ? siteCopyEn() : siteCopyHe();
});
