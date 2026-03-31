import { caseStudies } from "@/content/case-studies";
import type { Locale } from "@/lib/i18n/config";
import type { Messages } from "@/lib/i18n/get-messages";
import type { CaseStudyMeta } from "@/content/case-studies";
import {
  BuildSection,
  CtaBandSection,
  FeaturedWorkSection,
  FitSection,
  HeroSection,
  MidParagraphSection,
  ProcessSection,
  RealUseSection,
  WhySection,
} from "./HomePageSections";

export default function HomePage({
  locale,
  messages,
}: {
  locale: Locale;
  messages: Messages;
}) {
  const h = messages.home;
  const featured: CaseStudyMeta[] = caseStudies.slice(0, 2);

  return (
    <>
      <HeroSection home={h} locale={locale} />
      <RealUseSection home={h} messages={messages} />
      <MidParagraphSection home={h} />
      <BuildSection home={h} locale={locale} services={messages.services} />
      <WhySection home={h} />
      <ProcessSection home={h} stepPrefix={messages.common.stepPrefix} />
      <FeaturedWorkSection
        home={h}
        locale={locale}
        messages={messages}
        featured={featured}
      />
      <FitSection home={h} />
      <CtaBandSection home={h} locale={locale} />
    </>
  );
}
