import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ThemeRegistry from "@/components/ThemeRegistry";
import DocumentHtmlLocale from "@/components/i18n/DocumentHtmlLocale";
import SiteShell from "@/components/layout/SiteShell";
import { hasLocale, type Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/get-messages";
import { getSiteUrl, siteConfig } from "@/lib/site-config";

type Props = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>;

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "he" }];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!hasLocale(raw)) return {};
  const locale = raw as Locale;
  const m = getMessages(locale);

  return {
    metadataBase: new URL(getSiteUrl()),
    title: {
      default: m.meta.defaultTitle,
      template: `%s | ${siteConfig.shortName}`,
    },
    description: m.meta.defaultDescription,
    openGraph: {
      type: "website",
      locale: locale === "he" ? "he_IL" : "en_US",
      siteName: siteConfig.shortName,
      title: m.meta.defaultTitle,
      description: m.meta.defaultDescription,
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale: raw } = await params;
  if (!hasLocale(raw)) notFound();
  const locale = raw as Locale;
  const messages = getMessages(locale);
  const dir = locale === "he" ? "rtl" : "ltr";

  return (
    <>
      <DocumentHtmlLocale locale={locale} />
      <ThemeRegistry direction={dir} locale={locale}>
        <a href="#main-content" className="skip-link">
          {messages.common.skipToMain}
        </a>
        <SiteShell locale={locale} messages={messages}>
          {children}
        </SiteShell>
      </ThemeRegistry>
    </>
  );
}
