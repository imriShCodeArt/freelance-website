import { defineField, defineType } from "sanity";

/**
 * Optional editorial defaults (Phase 2). Non-secret; keep deployment URLs and secrets in app env.
 */
export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({
      name: "defaultMetaTitle",
      type: "string",
      title: "Default meta title (optional override)",
    }),
    defineField({
      name: "defaultMetaDescription",
      type: "text",
      title: "Default meta description (optional override)",
      rows: 4,
    }),
    defineField({
      name: "socialGithubLabel",
      type: "string",
      title: "GitHub link label (optional)",
    }),
    defineField({
      name: "socialLinkedinLabel",
      type: "string",
      title: "LinkedIn link label (optional)",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site settings" };
    },
  },
});
