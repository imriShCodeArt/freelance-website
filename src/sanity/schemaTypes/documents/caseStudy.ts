import { defineField, defineType } from "sanity";

import { CASE_STUDY_KINDS } from "../constants";
import { caseStudyLocaleType } from "../objects/caseStudyLocale";

const kindList = CASE_STUDY_KINDS.map((k) => ({ title: k, value: k }));

export const caseStudyType = defineType({
  name: "caseStudy",
  title: "Case study",
  type: "document",
  description:
    "Prefer stable _id: caseStudy.<slug> (e.g. caseStudy.sushi-bayit-vegan) for migrations and deep links.",
  fields: [
    defineField({
      name: "slug",
      type: "slug",
      options: { maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "kind",
      type: "string",
      options: { list: kindList, layout: "radio" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "stack",
      type: "array",
      of: [{ type: "string" }],
      validation: (r) => r.min(1),
    }),
    defineField({
      name: "githubUrl",
      type: "url",
    }),
    defineField({
      name: "liveUrl",
      type: "url",
    }),
    defineField({
      name: "featuredOnHome",
      type: "boolean",
      title: "Featured on homepage",
      initialValue: false,
      validation: (Rule) =>
        Rule.custom((featured, { parent }) => {
          const p = parent as { homeFeatureOrder?: number | null };
          if (
            featured &&
            (p.homeFeatureOrder === undefined || p.homeFeatureOrder === null)
          ) {
            return "Set homepage feature order when featured is enabled.";
          }
          return true;
        }),
    }),
    defineField({
      name: "homeFeatureOrder",
      type: "number",
      title: "Homepage feature order",
      description: "Lower numbers appear first. Required when featured on homepage.",
    }),
    defineField({
      name: "en",
      type: caseStudyLocaleType.name,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "he",
      type: caseStudyLocaleType.name,
      validation: (r) => r.required(),
    }),
  ],
  preview: {
    select: { title: "en.title", slug: "slug.current", kind: "kind" },
    prepare({ title, slug, kind }) {
      return {
        title: title || slug || "Case study",
        subtitle: [kind, slug].filter(Boolean).join(" · "),
      };
    },
  },
});
