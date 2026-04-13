import { type SchemaTypeDefinition } from "sanity";

import { caseStudyType } from "./documents/caseStudy";
import { siteSectionCopyType } from "./documents/siteSectionCopy";
import { siteSettingsType } from "./documents/siteSettings";
import { caseStudyLocaleType } from "./objects/caseStudyLocale";
import {
  aboutBlockItemType,
  homeOrbContentType,
  titleBodyPairType,
} from "./objects/reusable";
import {
  sectionContentAboutType,
  sectionContentContactType,
  sectionContentExperienceType,
  sectionContentHomeType,
  sectionContentNotFoundType,
  sectionContentWorkDetailType,
  sectionContentWorkType,
} from "./objects/sectionContentLarge";
import {
  sectionContentCaseStudyKindType,
  sectionContentCommonType,
  sectionContentFooterType,
  sectionContentHeaderType,
  sectionContentLocaleSwitcherType,
  sectionContentMetaType,
  sectionContentNavType,
} from "./objects/sectionContentSmall";

/**
 * Register object types before documents that reference them.
 */
export const schemaTypes: SchemaTypeDefinition[] = [
  titleBodyPairType,
  aboutBlockItemType,
  homeOrbContentType,
  sectionContentCommonType,
  sectionContentNavType,
  sectionContentHeaderType,
  sectionContentLocaleSwitcherType,
  sectionContentFooterType,
  sectionContentCaseStudyKindType,
  sectionContentMetaType,
  sectionContentHomeType,
  sectionContentExperienceType,
  sectionContentWorkType,
  sectionContentWorkDetailType,
  sectionContentAboutType,
  sectionContentContactType,
  sectionContentNotFoundType,
  caseStudyLocaleType,
  siteSectionCopyType,
  caseStudyType,
  siteSettingsType,
];
