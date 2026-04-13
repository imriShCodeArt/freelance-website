import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { listFeaturedCaseStudyMeta } from "@/lib/content/case-studies-access";
import {
  CtaBandSection,
  FeaturedWorkSection,
  FitSection,
  HeroSection,
  MidParagraphSection,
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
  const m = await getMessages(locale);
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
  const messages = await getMessages(locale);
  const h = messages.home;
  const featured = await listFeaturedCaseStudyMeta();

  return (
    <>
      <HeroSection home={h} locale={locale} />
      <RealUseSection home={h} messages={messages} />
      <FeaturedWorkSection
        home={h}
        locale={locale}
        messages={messages}
        featured={featured}
      />
      <MidParagraphSection home={h} />
      <WhySection home={h} />
      <FitSection home={h} />
      <CtaBandSection home={h} locale={locale} />
    </>
  );
}
