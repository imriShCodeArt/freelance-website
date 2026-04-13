import { defineField, defineType } from "sanity";

import { LOCALES, SECTION_KEYS, type SectionKey } from "../constants";

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
    Rule.custom((doc) => {
      if (!doc || typeof doc !== "object") return true;
      const d = doc as {
        sectionKey?: string;
        content?: Record<string, unknown>;
      };
      const key = d.sectionKey;
      if (!key || !d.content) return true;
      const block = d.content[key];
      if (block == null) {
        return `Fill the "${key}" content block (only the block matching the section is shown in the form).`;
      }
      return true;
    }),
});
