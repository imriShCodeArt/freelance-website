/**
 * Phase 3 — Idempotent migration: static `src/messages/*` + `src/content/case-studies.ts` → Sanity.
 *
 * Requires in `.env.local` (or env):
 * - `NEXT_PUBLIC_SANITY_PROJECT_ID` (real project, not placeholder)
 * - `NEXT_PUBLIC_SANITY_DATASET`
 * - `SANITY_API_WRITE_TOKEN` (Editor token with create/update on the dataset)
 *
 * Run: `yarn migrate:sanity`
 *
 * Document IDs: `siteSectionCopy.<locale>.<sectionKey>`, `caseStudy.<slug>`
 */

import { createClient } from "@sanity/client";
import { loadEnvConfig } from "@next/env";
import type { Messages } from "../src/messages/en";
import { en } from "../src/messages/en";
import { he } from "../src/messages/he";
import { caseStudies } from "../src/content/case-studies";
import {
  PLACEHOLDER_SANITY_PROJECT_ID,
  apiVersion,
  getSanityDataset,
  getSanityProjectId,
} from "../src/sanity/env";
import type { SectionKey } from "../src/sanity/schemaTypes/constants";
import { SECTION_KEYS } from "../src/sanity/schemaTypes/constants";

loadEnvConfig(process.cwd());

const BUILT_WITH_TEMPLATE_EN =
  "© {{year}} {{name}}. Built with Next.js and Material UI.";
const BUILT_WITH_TEMPLATE_HE =
  "© {{year}} {{name}}. נבנה עם Next.js ו-Material UI.";

/** Matches current homepage: `listCaseStudyMeta().slice(0, 2)`. */
const FEATURED_CASE_STUDY_COUNT = 2;

type LocaleCode = "en" | "he";

type UpsertDoc = { _id: string; _type: string } & Record<string, unknown>;

function assertConfig(): void {
  const projectId = getSanityProjectId();
  if (!projectId || projectId === PLACEHOLDER_SANITY_PROJECT_ID) {
    throw new Error(
      "Set NEXT_PUBLIC_SANITY_PROJECT_ID to your real Sanity project id (not the build placeholder).",
    );
  }
  if (!process.env.SANITY_API_WRITE_TOKEN?.trim()) {
    throw new Error(
      "Set SANITY_API_WRITE_TOKEN (Editor token from sanity.io/manage) for this script.",
    );
  }
}

function createWriteClient() {
  return createClient({
    projectId: getSanityProjectId(),
    dataset: getSanityDataset(),
    apiVersion,
    token: process.env.SANITY_API_WRITE_TOKEN!.trim(),
    useCdn: false,
  });
}

function sectionPayload(
  sectionKey: SectionKey,
  messages: Messages,
  locale: LocaleCode,
): Record<string, unknown> {
  if (sectionKey === "common") {
    const c = messages.common;
    const { builtWith, ...rest } = c;
    void builtWith;
    return {
      ...rest,
      builtWithTemplate:
        locale === "en" ? BUILT_WITH_TEMPLATE_EN : BUILT_WITH_TEMPLATE_HE,
    };
  }
  return structuredClone(messages[sectionKey]) as Record<string, unknown>;
}

function buildSiteSectionCopy(
  locale: LocaleCode,
  sectionKey: SectionKey,
  messages: Messages,
): UpsertDoc {
  const id = `siteSectionCopy.${locale}.${sectionKey}`;
  return {
    _id: id,
    _type: "siteSectionCopy" as const,
    locale,
    sectionKey,
    content: {
      [sectionKey]: sectionPayload(sectionKey, messages, locale),
    },
  };
}

function buildCaseStudy(
  study: (typeof caseStudies)[number],
  index: number,
): UpsertDoc {
  const slug = study.slug;
  const featuredOnHome = index < FEATURED_CASE_STUDY_COUNT;
  const doc: UpsertDoc = {
    _id: `caseStudy.${slug}`,
    _type: "caseStudy",
    slug: { _type: "slug", current: slug },
    kind: study.kind,
    stack: [...study.stack],
    en: structuredClone(study.en),
    he: structuredClone(study.he),
    featuredOnHome,
  };
  if (study.githubUrl) doc.githubUrl = study.githubUrl;
  if (study.liveUrl) doc.liveUrl = study.liveUrl;
  if (featuredOnHome) {
    doc.homeFeatureOrder = index;
  }
  return doc;
}

async function upsert(
  client: ReturnType<typeof createWriteClient>,
  doc: UpsertDoc,
  counts: { created: number; updated: number },
) {
  const id = doc._id;
  const previous = await client.getDocument(id);
  await client.createOrReplace(doc);
  if (previous) {
    counts.updated += 1;
    console.log(`[updated] ${id}`);
  } else {
    counts.created += 1;
    console.log(`[created] ${id}`);
  }
}

async function main() {
  assertConfig();
  const client = createWriteClient();
  const counts = { created: 0, updated: 0 };

  const localeMessages: Record<LocaleCode, Messages> = { en, he };

  for (const locale of ["en", "he"] as const) {
    const messages = localeMessages[locale];
    for (const sectionKey of SECTION_KEYS) {
      const doc = buildSiteSectionCopy(locale, sectionKey, messages);
      await upsert(client, doc, counts);
    }
  }

  for (let i = 0; i < caseStudies.length; i += 1) {
    const doc = buildCaseStudy(caseStudies[i]!, i);
    await upsert(client, doc, counts);
  }

  console.log(
    `\nDone. siteSectionCopy: ${SECTION_KEYS.length * 2} documents, caseStudy: ${caseStudies.length} documents.`,
  );
  console.log(`Summary: ${counts.created} created, ${counts.updated} updated.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
