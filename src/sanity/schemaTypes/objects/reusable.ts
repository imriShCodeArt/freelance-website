import { defineField, defineType } from "sanity";

export const titleBodyPairType = defineType({
  name: "titleBodyPair",
  title: "Title & body",
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "body",
      type: "text",
      title: "Body",
      rows: 4,
      validation: (r) => r.required(),
    }),
  ],
});

export const aboutBlockItemType = defineType({
  name: "aboutBlockItem",
  title: "About block",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      type: "string",
      title: "Heading",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "body",
      type: "text",
      title: "Body",
      rows: 6,
      validation: (r) => r.required(),
    }),
  ],
});

export const homeOrbContentType = defineType({
  name: "homeOrbContent",
  title: "Home orb",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", type: "string", title: "Eyebrow" }),
    defineField({ name: "titleLine1", type: "string", title: "Title line 1" }),
    defineField({ name: "titleLine2", type: "string", title: "Title line 2" }),
    defineField({ name: "subtitle", type: "string", title: "Subtitle" }),
    defineField({
      name: "tags",
      type: "array",
      title: "Tags",
      of: [{ type: "string" }],
      validation: (r) => r.min(1),
    }),
  ],
});
