import { defineField, defineType } from "sanity";

/** Localized narrative + labels for one case study (`CaseStudyLocaleCopy`). */
export const caseStudyLocaleType = defineType({
  name: "caseStudyLocale",
  title: "Case study (locale)",
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "summary",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "role",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "highlights",
      type: "array",
      title: "Highlights",
      of: [{ type: "string" }],
      validation: (r) => r.min(1),
    }),
    defineField({
      name: "recruiterAngle",
      type: "text",
      title: "Recruiter angle",
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "overview",
      type: "text",
      rows: 6,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "engineeringChallenges",
      type: "text",
      title: "Engineering challenges",
      rows: 6,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "implementationNotes",
      type: "text",
      title: "Implementation notes",
      rows: 6,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "outcomes",
      type: "text",
      rows: 6,
      validation: (r) => r.required(),
    }),
  ],
});
