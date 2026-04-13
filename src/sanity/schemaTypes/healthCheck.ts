import { defineField, defineType } from "sanity";

/**
 * Minimal document type so Studio loads before Phase 2 schemas exist.
 * Remove or replace when `siteSectionCopy` / `caseStudy` are implemented.
 */
export const healthCheckType = defineType({
  name: "bootstrap.healthCheck",
  title: "Bootstrap (Phase 1)",
  type: "document",
  fields: [
    defineField({
      name: "note",
      type: "string",
      title: "Note",
      description: "Temporary field for Phase 1. Safe to delete after real schemas ship.",
    }),
  ],
});
