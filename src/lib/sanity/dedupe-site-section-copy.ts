import { SECTION_KEYS, type SectionKey } from "@/sanity/schemaTypes/constants";

import type { ValidatedSiteSectionCopyDoc } from "./validators";

function canonicalSiteSectionCopyId(locale: "en" | "he", sectionKey: SectionKey): string {
  return `siteSectionCopy.${locale}.${sectionKey}`;
}

function pickPreferredDuplicate(
  group: ValidatedSiteSectionCopyDoc[],
  locale: "en" | "he",
  sectionKey: SectionKey,
): ValidatedSiteSectionCopyDoc {
  if (group.length === 1) {
    return group[0]!;
  }

  const wantPublished = canonicalSiteSectionCopyId(locale, sectionKey);
  const wantDraft = `drafts.${wantPublished}`;
  const preferred =
    group.find((d) => d._id === wantPublished) ??
    group.find((d) => d._id === wantDraft) ??
    group.reduce((best, cur) => {
      const bt = best._updatedAt ?? "";
      const ct = cur._updatedAt ?? "";
      return ct >= bt ? cur : best;
    });

  return preferred!;
}

/**
 * Editors sometimes create a second `siteSectionCopy` row with the same
 * `locale` + `sectionKey` (random `_id`). The app expects exactly one row per
 * section. Prefer the canonical id from migration (`siteSectionCopy.<locale>.<key>`),
 * otherwise keep the most recently updated document.
 */
export function dedupeSiteSectionCopyDocs(
  docs: readonly ValidatedSiteSectionCopyDoc[],
  locale: "en" | "he",
): ValidatedSiteSectionCopyDoc[] {
  const byKey = new Map<SectionKey, ValidatedSiteSectionCopyDoc[]>();
  for (const doc of docs) {
    if (doc.locale !== locale) continue;
    const list = byKey.get(doc.sectionKey) ?? [];
    list.push(doc);
    byKey.set(doc.sectionKey, list);
  }

  const out: ValidatedSiteSectionCopyDoc[] = [];
  for (const key of SECTION_KEYS) {
    const group = byKey.get(key);
    if (!group?.length) continue;
    out.push(pickPreferredDuplicate(group, locale, key));
  }
  return out;
}
