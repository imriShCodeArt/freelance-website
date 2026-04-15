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

/** `structuredClone` cannot copy `common.builtWith` (a function). */
function cloneMessagesFallback(source: Messages): Messages {
  const out = {} as Messages;
  for (const key of SECTION_KEYS) {
    if (key === "common") {
      const { builtWith, ...commonRest } = source.common;
      out.common = {
        ...structuredClone(commonRest),
        builtWith,
      };
    } else {
      setMessagesSection(out, key, structuredClone(source[key]));
    }
  }
  return out;
}

function coerceAboutAfterCms(
  fromCms: Messages["about"],
  bundle: Messages["about"] | undefined,
): Messages["about"] {
  const blocks = Array.isArray(fromCms.blocks)
    ? fromCms.blocks
    : (bundle?.blocks ?? []);
  return {
    ...(bundle ?? fromCms),
    ...fromCms,
    blocks,
  };
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
  if (sectionKey === "experience") {
    if (raw == null || typeof raw !== "object") {
      throw new Error(`siteSectionCopy.experience: expected object content`);
    }
    const o = { ...(raw as Record<string, unknown>) };
    const paras = o.introParagraphs;
    if (
      Array.isArray(paras) &&
      paras.length > 0 &&
      paras.every((p) => typeof p === "string")
    ) {
      delete o.intro;
      return structuredClone(o) as Messages[K];
    }
    const legacy = o.intro;
    if (typeof legacy === "string" && legacy.trim()) {
      delete o.intro;
      o.introParagraphs = [legacy.trim()];
      return structuredClone(o) as Messages[K];
    }
    throw new Error(
      "siteSectionCopy.experience: add introParagraphs (list of paragraphs) or a legacy intro string",
    );
  }
  if (raw == null || typeof raw !== "object") {
    throw new Error(`siteSectionCopy.${sectionKey}: expected object content`);
  }
  return structuredClone(raw) as Messages[K];
}

export type MapSiteSectionMessagesOptions = {
  /**
   * Bundled locale copy. When the CMS is missing some `siteSectionCopy` rows, those
   * sections are taken from here so the site still renders.
   */
  fallback?: Messages;
};

/**
 * Assemble `Messages` from validated `siteSectionCopy` documents for one locale.
 * With `fallback`, missing sections use bundled copy (silent).
 * Without `fallback`, every `SECTION_KEYS` entry must have exactly one document.
 */
export function mapSiteSectionDocumentsToMessages(
  docs: ValidatedSiteSectionCopyDoc[],
  options?: MapSiteSectionMessagesOptions,
): Messages {
  const byKey = new Map<SectionKey, ValidatedSiteSectionCopyDoc>();
  for (const doc of docs) {
    if (byKey.has(doc.sectionKey)) {
      throw new Error(`Duplicate siteSectionCopy sectionKey: ${doc.sectionKey}`);
    }
    byKey.set(doc.sectionKey, doc);
  }

  const fallback = options?.fallback;
  if (!fallback) {
    if (docs.length !== SECTION_KEYS.length) {
      throw new Error(
        `Expected ${SECTION_KEYS.length} siteSectionCopy documents, got ${docs.length}`,
      );
    }
  }

  const messages = fallback ? cloneMessagesFallback(fallback) : ({} as Messages);

  for (const key of SECTION_KEYS) {
    const doc = byKey.get(key);
    if (!doc) {
      if (fallback) {
        continue;
      }
      throw new Error(`Missing siteSectionCopy for section "${key}"`);
    }
    const block = doc.content[key];
    const mapped = mapSectionPayload(key, block);
    const final =
      key === "about"
        ? coerceAboutAfterCms(mapped as Messages["about"], fallback?.about)
        : mapped;
    setMessagesSection(messages, key, final);
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
