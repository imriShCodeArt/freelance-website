import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { CaseStudyMeta } from "@/content/case-studies";
import { caseStudies } from "@/content/case-studies";
import {
  BuildSection,
  CtaBandSection,
  FeaturedWorkSection,
  FitSection,
  HeroSection,
  MidParagraphSection,
  PackagesSection,
  ProcessSection,
  RealUseSection,
  WhySection,
} from "@/components/home/HomePageSections";
import { hasLocale, type Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/get-messages";
import { localeAlternates } from "@/lib/i18n/metadata-helpers";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!hasLocale(raw)) return {};
  const locale = raw;
  const m = getMessages(locale);
  return {
    title: { absolute: m.meta.defaultTitle },
    description: m.meta.defaultDescription,
    alternates: localeAlternates(locale, "/"),
  };
}

export default async function Home({ params }: Props) {
  const { locale: raw } = await params;
  if (!hasLocale(raw)) notFound();
  const locale = raw as Locale;
  const messages = getMessages(locale);
  const h = messages.home;
  const featured: CaseStudyMeta[] = caseStudies.slice(0, 2);

  return (
    <>
      <HeroSection home={h} locale={locale} />
      <RealUseSection home={h} messages={messages} />
      <MidParagraphSection home={h} />
      {/* <BuildSection home={h} locale={locale} services={messages.services} /> */}
      <ProcessSection home={h} stepPrefix={messages.common.stepPrefix} />
      <PackagesSection home={h} locale={locale} />
      <WhySection home={h} />
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
