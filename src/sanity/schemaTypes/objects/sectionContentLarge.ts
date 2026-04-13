import { defineField, defineType } from "sanity";

import {
  aboutBlockItemType,
  homeOrbContentType,
  titleBodyPairType,
} from "./reusable";

export const sectionContentHomeType = defineType({
  name: "sectionContent.home",
  title: "Home copy",
  type: "object",
  fields: [
    defineField({
      name: "heroEyebrow",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "heroTitle",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "heroSubtitle",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({ name: "ctaContact", type: "string", validation: (r) => r.required() }),
    defineField({ name: "ctaProjects", type: "string", validation: (r) => r.required() }),
    defineField({ name: "ctaResume", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "orb",
      type: homeOrbContentType.name,
      validation: (r) => r.required(),
    }),
    defineField({ name: "realUseEyebrow", type: "string", validation: (r) => r.required() }),
    defineField({ name: "realUseTitle", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "realUseP1",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "cardTypicalEngagements",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "strengthsCardBody",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({ name: "cardBestFit", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "cardBestFitBody",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "midParagraph",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({ name: "whyEyebrow", type: "string", validation: (r) => r.required() }),
    defineField({ name: "whyTitle", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "whyLead",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({ name: "workEyebrow", type: "string", validation: (r) => r.required() }),
    defineField({ name: "workTitle", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "workLead",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({ name: "workViewAll", type: "string", validation: (r) => r.required() }),
    defineField({ name: "fitEyebrow", type: "string", validation: (r) => r.required() }),
    defineField({ name: "fitTitle", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "fitHonestyEyebrow",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "notFitTitle", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "ctaBandTitle",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "ctaBandBody",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "ctaBandPrimary",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "ctaBandProjects",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "ctaBandLinkedIn",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "stack",
      type: "array",
      of: [{ type: "string" }],
      validation: (r) => r.min(1),
    }),
    defineField({
      name: "differentiators",
      type: "array",
      of: [{ type: titleBodyPairType.name }],
      validation: (r) => r.min(1),
    }),
    defineField({
      name: "fitBullets",
      type: "array",
      of: [{ type: "string" }],
      validation: (r) => r.min(1),
    }),
    defineField({
      name: "notFitBullets",
      type: "array",
      of: [{ type: "string" }],
      validation: (r) => r.min(1),
    }),
  ],
});

export const sectionContentExperienceType = defineType({
  name: "sectionContent.experience",
  title: "Experience page copy",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", type: "string", validation: (r) => r.required() }),
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "intro",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "introWorkBefore",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "introWorkLink",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "introWorkMiddle",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "introContactLink",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "introWorkAfter",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "areas",
      type: "array",
      of: [{ type: titleBodyPairType.name }],
      validation: (r) => r.min(1),
    }),
    defineField({ name: "fitTitle", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "fitBullets",
      type: "array",
      of: [{ type: "string" }],
      validation: (r) => r.min(1),
    }),
    defineField({ name: "notFitTitle", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "notFitBullets",
      type: "array",
      of: [{ type: "string" }],
      validation: (r) => r.min(1),
    }),
    defineField({ name: "cta", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "ctaLead",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
  ],
});

export const sectionContentWorkType = defineType({
  name: "sectionContent.work",
  title: "Work index copy",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", type: "string", validation: (r) => r.required() }),
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "intro",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "caseStudiesListHeading",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "cta", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "cardSummaryLabel",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "cardRoleLabel",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "cardStackLabel",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "cardHighlightsLabel",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "cardRecruiterLabel",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "aboutCtaTitle",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "aboutCtaBody",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "aboutCtaButton",
      type: "string",
      validation: (r) => r.required(),
    }),
  ],
});

export const sectionContentWorkDetailType = defineType({
  name: "sectionContent.workDetail",
  title: "Work detail copy",
  type: "object",
  fields: [
    defineField({ name: "back", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "eyebrowPrefix",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "overviewHeading",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "roleHeading",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "stackHeading",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "challengesHeading",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "architectureHeading",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "outcomesHeading",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "recruiterHeading",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "linksHeading",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "cta", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "githubLabel",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "liveLabel",
      type: "string",
      validation: (r) => r.required(),
    }),
  ],
});

export const sectionContentAboutType = defineType({
  name: "sectionContent.about",
  title: "About copy",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", type: "string", validation: (r) => r.required() }),
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "blocks",
      type: "array",
      of: [{ type: aboutBlockItemType.name }],
      validation: (r) => r.min(1),
    }),
    defineField({ name: "ctaWork", type: "string", validation: (r) => r.required() }),
    defineField({ name: "ctaContact", type: "string", validation: (r) => r.required() }),
    defineField({ name: "ctaResume", type: "string", validation: (r) => r.required() }),
  ],
});

export const sectionContentContactType = defineType({
  name: "sectionContent.contact",
  title: "Contact copy",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", type: "string", validation: (r) => r.required() }),
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "introP1",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "introP2Before",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "introExperience",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "introAnd", type: "string", validation: (r) => r.required() }),
    defineField({ name: "introWork", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "introP2After",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "directHeading",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "preferEmail",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "reachAt", type: "string", validation: (r) => r.required() }),
    defineField({ name: "formName", type: "string", validation: (r) => r.required() }),
    defineField({ name: "formEmail", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "formCompany",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "formTimeline",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "formTimelinePlaceholder",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "formMessage",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "sendButton",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "sending", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "emailPrefix",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "actionThanksSpam",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "fieldRequired",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "errorPleaseReview",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "errorRequired",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({ name: "errorEmail", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "errorNotConfigured",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "errorSendFailed",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "successMessage",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
  ],
});

export const sectionContentNotFoundType = defineType({
  name: "sectionContent.notFound",
  title: "Not found copy",
  type: "object",
  fields: [
    defineField({ name: "kicker", type: "string", validation: (r) => r.required() }),
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "body",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({ name: "home", type: "string", validation: (r) => r.required() }),
    defineField({ name: "contact", type: "string", validation: (r) => r.required() }),
  ],
});
