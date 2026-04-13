import { z } from "zod";

import type { SectionKey } from "@/sanity/schemaTypes/constants";
import { CASE_STUDY_KINDS, SECTION_KEYS } from "@/sanity/schemaTypes/constants";

/** Sanity often stores optional URLs as "" — normalize before `z.string().url()`. */
const optionalUrl = z.preprocess(
  (val) => (val === "" || val == null ? undefined : val),
  z.string().url().optional(),
);

const sectionKeySchema = z.enum(
  SECTION_KEYS as unknown as [SectionKey, ...SectionKey[]],
);

const caseStudyKindSchema = z.enum(
  CASE_STUDY_KINDS as unknown as [
    (typeof CASE_STUDY_KINDS)[number],
    ...(typeof CASE_STUDY_KINDS)[number][],
  ],
);

export const siteSectionCopyDocumentSchema = z
  .object({
    _id: z.string(),
    locale: z.enum(["en", "he"]),
    sectionKey: sectionKeySchema,
    content: z.record(z.string(), z.unknown()),
  })
  .strict();

export const siteSectionCopyListSchema = z.array(siteSectionCopyDocumentSchema);

const caseStudyLocalePayloadSchema = z.object({
  title: z.string(),
  summary: z.string(),
  role: z.string(),
  highlights: z.array(z.string()),
  recruiterAngle: z.string(),
  overview: z.string(),
  engineeringChallenges: z.string(),
  implementationNotes: z.string(),
  outcomes: z.string(),
});

export const caseStudyFullSchema = z.object({
  slug: z.string(),
  kind: caseStudyKindSchema,
  stack: z.array(z.string()),
  githubUrl: optionalUrl,
  liveUrl: optionalUrl,
  featuredOnHome: z.boolean().optional(),
  homeFeatureOrder: z.number().optional(),
  en: caseStudyLocalePayloadSchema,
  he: caseStudyLocalePayloadSchema,
});

export const caseStudyMetaSchema = z.object({
  slug: z.string(),
  kind: caseStudyKindSchema,
  stack: z.array(z.string()),
  githubUrl: optionalUrl,
  liveUrl: optionalUrl,
});

export const caseStudyMetaListSchema = z.array(caseStudyMetaSchema);

export const caseStudySlugsSchema = z.array(z.string());

export type ValidatedSiteSectionCopyDoc = z.infer<typeof siteSectionCopyDocumentSchema>;
export type ValidatedCaseStudyFull = z.infer<typeof caseStudyFullSchema>;
export type ValidatedCaseStudyMeta = z.infer<typeof caseStudyMetaSchema>;
