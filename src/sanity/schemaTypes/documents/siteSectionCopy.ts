import { defineField, defineType } from "sanity";

import { apiVersion } from "../../env";
import { LOCALES, SECTION_KEYS, type SectionKey } from "../constants";

function pairedDocumentIds(id: string | undefined): string[] {
  if (!id) return [];
  if (id.startsWith("drafts.")) {
    return [id, id.slice("drafts.".length)];
  }
  return [id, `drafts.${id}`];
}

const sectionKeyOptions = SECTION_KEYS.map((k) => ({ title: k, value: k }));

const localeOptions = LOCALES.map((l) => ({ title: l, value: l }));

function contentFieldForSection(section: SectionKey) {
  return defineField({
    name: section,
    type: `sectionContent.${section}`,
    hidden: ({ document }) => document?.sectionKey !== section,
  });
}

export const siteSectionCopyType = defineType({
  name: "siteSectionCopy",
  title: "Site section copy",
  type: "document",
  description:
    "One document per locale + section. Prefer stable _id: siteSectionCopy.<locale>.<sectionKey> (set when creating or via migration).",
  fields: [
    defineField({
      name: "locale",
      type: "string",
      options: { list: localeOptions, layout: "radio" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "sectionKey",
      type: "string",
      title: "Section",
      options: { list: sectionKeyOptions },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "content",
      type: "object",
      title: "Content",
      fields: SECTION_KEYS.map((key) => contentFieldForSection(key)),
    }),
  ],
  preview: {
    select: { locale: "locale", sectionKey: "sectionKey" },
    prepare({ locale, sectionKey }) {
      return {
        title: `${locale ?? "?"} / ${sectionKey ?? "?"}`,
        subtitle: "Site copy section",
      };
    },
  },
  validation: (Rule) =>
    Rule.custom(async (doc, context) => {
      if (!doc || typeof doc !== "object") return true;
      const d = doc as {
        locale?: string;
        sectionKey?: string;
        content?: Record<string, unknown>;
      };

      const key = d.sectionKey;
      if (key && d.content) {
        const block = d.content[key];
        if (block == null) {
          return `Fill the "${key}" content block (only the block matching the section is shown in the form).`;
        }
      }

      if (!d.locale || !d.sectionKey) return true;

      /** Document-level `Rule.custom` receives the full document as `doc`; `context.document` is often unset. */
      const docId =
        typeof doc === "object" &&
        doc !== null &&
        "_id" in doc &&
        typeof (doc as { _id?: unknown })._id === "string"
          ? (doc as { _id: string })._id
          : typeof context.document?._id === "string"
            ? context.document._id
            : undefined;
      const cluster = pairedDocumentIds(docId);
      if (cluster.length === 0) {
        return true;
      }

      /** Canonical row from migration — always publishable; app dedupes strays at read time. */
      const canonicalPublished = `siteSectionCopy.${d.locale}.${d.sectionKey}`;
      const isCanonical =
        docId === canonicalPublished || docId === `drafts.${canonicalPublished}`;
      if (isCanonical) {
        return true;
      }

      const client = context.getClient({ apiVersion });
      const dupes = await client.fetch<number>(
        `count(*[_type == "siteSectionCopy" && locale == $locale && sectionKey == $sk && !(_id in $cluster)])`,
        { locale: d.locale, sk: d.sectionKey, cluster },
      );
      if (dupes > 0) {
        return `Another document already uses locale "${d.locale}" and section "${d.sectionKey}". Open siteSectionCopy.${d.locale}.${d.sectionKey} instead, merge content there, then delete this duplicate.`;
      }

      return true;
    }),
});
