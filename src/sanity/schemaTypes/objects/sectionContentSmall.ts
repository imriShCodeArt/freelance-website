import { defineField, defineType } from "sanity";

/** Maps to `Messages['common']`; `builtWith` is a template string in the CMS. */
export const sectionContentCommonType = defineType({
  name: "sectionContent.common",
  title: "Common copy",
  type: "object",
  fields: [
    defineField({
      name: "builtWithTemplate",
      type: "text",
      title: "Built-with footer template",
      description:
        "Use placeholders {{year}} and {{name}}. Example: © {{year}} {{name}}. Built with Next.js and Material UI.",
      rows: 2,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "skipToMain",
      type: "string",
      title: "Skip to main",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "typicalStackLead",
      type: "string",
      title: "Typical stack lead",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "typicalStackTrail",
      type: "text",
      title: "Typical stack trail",
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "stepPrefix",
      type: "string",
      title: "Step prefix",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "emailCopiedToast",
      type: "string",
      title: "Email copied toast",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "emailCopyFailedToast",
      type: "string",
      title: "Email copy failed toast",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "copyEmailAriaLabel",
      type: "string",
      title: "Copy email aria label",
      validation: (r) => r.required(),
    }),
  ],
});

export const sectionContentNavType = defineType({
  name: "sectionContent.nav",
  title: "Nav copy",
  type: "object",
  fields: ["home", "services", "work", "about", "contact"].map((key) =>
    defineField({
      name: key,
      type: "string",
      title: key,
      validation: (r) => r.required(),
    }),
  ),
});

export const sectionContentHeaderType = defineType({
  name: "sectionContent.header",
  title: "Header copy",
  type: "object",
  fields: [
    "getInTouch",
    "openMenu",
    "closeMenu",
    "primaryNavAriaLabel",
  ].map((key) =>
    defineField({
      name: key,
      type: "string",
      title: key,
      validation: (r) => r.required(),
    }),
  ),
});

export const sectionContentLocaleSwitcherType = defineType({
  name: "sectionContent.localeSwitcher",
  title: "Locale switcher",
  type: "object",
  fields: ["ariaLabel", "english", "hebrew"].map((key) =>
    defineField({
      name: key,
      type: "string",
      title: key,
      validation: (r) => r.required(),
    }),
  ),
});

export const sectionContentFooterType = defineType({
  name: "sectionContent.footer",
  title: "Footer copy",
  type: "object",
  fields: [
    defineField({
      name: "tagline",
      type: "text",
      title: "Tagline",
      rows: 3,
      validation: (r) => r.required(),
    }),
    ...["navAriaLabel", "connectAriaLabel", "github", "linkedin", "email", "resume"].map(
      (key) =>
        defineField({
          name: key,
          type: "string",
          title: key,
          validation: (r) => r.required(),
        }),
    ),
  ],
});

export const sectionContentCaseStudyKindType = defineType({
  name: "sectionContent.caseStudyKind",
  title: "Case study kind labels",
  type: "object",
  fields: ["client", "product", "plugin", "personal"].map((key) =>
    defineField({
      name: key,
      type: "string",
      title: key,
      validation: (r) => r.required(),
    }),
  ),
});

export const sectionContentMetaType = defineType({
  name: "sectionContent.meta",
  title: "Meta / SEO copy",
  type: "object",
  fields: [
    defineField({
      name: "defaultTitle",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "defaultDescription",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "servicesTitle",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "servicesDescription",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "workTitle",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "workDescription",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "aboutTitle",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "aboutDescription",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "contactTitle",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "contactDescription",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
  ],
});
