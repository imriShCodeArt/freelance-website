import type { Messages } from "@/lib/i18n/get-messages";
import type { Locale } from "@/lib/i18n/config";

export type HomeCopy = Messages["home"];
export type ExperienceCopy = Messages["experience"];

export type SectionProps = {
  home: HomeCopy;
  locale: Locale;
};
