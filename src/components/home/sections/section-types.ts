import type { Messages } from "@/lib/i18n/get-messages";
import type { Locale } from "@/lib/i18n/config";

export type HomeCopy = Messages["home"];
export type CaseStudiesCopy = Messages["caseStudies"];
export type ServicesCopy = Messages["services"];

export type SectionProps = {
  home: HomeCopy;
  locale: Locale;
};
