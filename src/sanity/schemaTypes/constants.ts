/** Mirrors top-level keys of `Messages` / `src/messages/en.ts`. */
export const SECTION_KEYS = [
  "common",
  "nav",
  "header",
  "localeSwitcher",
  "footer",
  "caseStudyKind",
  "meta",
  "home",
  "experience",
  "work",
  "workDetail",
  "about",
  "contact",
  "notFound",
] as const;

export type SectionKey = (typeof SECTION_KEYS)[number];

export const LOCALES = ["en", "he"] as const;

export const CASE_STUDY_KINDS = [
  "client",
  "product",
  "plugin",
  "personal",
] as const;
