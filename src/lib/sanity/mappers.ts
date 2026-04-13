import type {
  CaseStudy,
  CaseStudyLocaleCopy,
  CaseStudyMeta,
} from "@/content/case-studies";
import type { Messages } from "@/messages/en";
import { SECTION_KEYS, type SectionKey } from "@/sanity/schemaTypes/constants";

import type {
  ValidatedCaseStudyFull,
  ValidatedCaseStudyMeta,
  ValidatedSiteSectionCopyDoc,
} from "./validators";

function interpolateBuiltWith(template: string, name: string, year: number) {
  return template
    .replace(/\{\{year\}\}/g, String(year))
    .replace(/\{\{name\}\}/g, name);
}

function mapCommonBlock(raw: Record<string, unknown>): Messages["common"] {
  const rest = { ...raw };
  const template =
    typeof rest.builtWithTemplate === "string" ? rest.builtWithTemplate : "";
  delete rest.builtWithTemplate;
  return {
    ...(rest as Omit<Messages["common"], "builtWith">),
    builtWith(name: string, year: number) {
      return interpolateBuiltWith(template, name, year);
    },
  };
}

function setMessagesSection<K extends SectionKey>(
  messages: Messages,
  key: K,
  value: Messages[K],
) {
  (messages as Record<SectionKey, Messages[SectionKey]>)[key] = value;
}

function mapSectionPayload<K extends SectionKey>(
  sectionKey: K,
  raw: unknown,
): Messages[K] {
  if (sectionKey === "common") {
    if (!raw || typeof raw !== "object") {
      throw new Error(`siteSectionCopy.common: expected object content`);
    }
    return mapCommonBlock(raw as Record<string, unknown>) as Messages[K];
  }
  if (raw == null || typeof raw !== "object") {
    throw new Error(`siteSectionCopy.${sectionKey}: expected object content`);
  }
  return structuredClone(raw) as Messages[K];
}

/**
 * Assemble `Messages` from validated `siteSectionCopy` documents for one locale.
 */
export function mapSiteSectionDocumentsToMessages(
  docs: ValidatedSiteSectionCopyDoc[],
): Messages {
  if (docs.length !== SECTION_KEYS.length) {
    throw new Error(
      `Expected ${SECTION_KEYS.length} siteSectionCopy documents, got ${docs.length}`,
    );
  }

  const byKey = new Map<SectionKey, ValidatedSiteSectionCopyDoc>();
  for (const doc of docs) {
    if (byKey.has(doc.sectionKey)) {
      throw new Error(`Duplicate siteSectionCopy sectionKey: ${doc.sectionKey}`);
    }
    byKey.set(doc.sectionKey, doc);
  }

  const messages = {} as Messages;

  for (const key of SECTION_KEYS) {
    const doc = byKey.get(key);
    if (!doc) {
      throw new Error(`Missing siteSectionCopy for section "${key}"`);
    }
    const block = doc.content[key];
    setMessagesSection(messages, key, mapSectionPayload(key, block));
  }

  return messages;
}

function freezeLocaleCopy(copy: ValidatedCaseStudyFull["en"]): CaseStudyLocaleCopy {
  return {
    ...copy,
    highlights: [...copy.highlights],
  };
}

export function mapCaseStudyFullToCaseStudy(row: ValidatedCaseStudyFull): CaseStudy {
  return {
    slug: row.slug,
    kind: row.kind,
    stack: [...row.stack],
    githubUrl: row.githubUrl,
    liveUrl: row.liveUrl,
    en: freezeLocaleCopy(row.en),
    he: freezeLocaleCopy(row.he),
  };
}

export function mapCaseStudyMeta(row: ValidatedCaseStudyMeta): CaseStudyMeta {
  return {
    slug: row.slug,
    kind: row.kind,
    stack: [...row.stack],
    githubUrl: row.githubUrl,
    liveUrl: row.liveUrl,
  };
}
