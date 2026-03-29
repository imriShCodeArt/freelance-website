import type { Metadata } from "next";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { notFound } from "next/navigation";
import Eyebrow from "@/components/layout/Eyebrow";
import PageContainer from "@/components/layout/PageContainer";
import RouterLink from "@/components/layout/RouterLink";
import Section from "@/components/layout/Section";
import { hasLocale, type Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/get-messages";
import { localeAlternates } from "@/lib/i18n/metadata-helpers";
import { withLocale } from "@/lib/i18n/paths";
import { siteConfig } from "@/lib/site-config";
import ContactForm from "./ContactForm";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!hasLocale(raw)) return {};
  const m = getMessages(raw as Locale);
  return {
    title: m.meta.contactTitle,
    description: m.meta.contactDescription,
    alternates: localeAlternates(raw as Locale, "/contact"),
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!hasLocale(raw)) notFound();
  const locale = raw as Locale;
  const messages = getMessages(locale);
  const c = messages.contact;
  const servicesHref = withLocale(locale, "/services");
  const workHref = withLocale(locale, "/work");

  return (
    <>
      <Section spacing="lg" sx={{ pt: { xs: 4, md: 6 } }}>
        <PageContainer>
          <Eyebrow>{c.eyebrow}</Eyebrow>
          <Typography variant="h2" component="h1" fontWeight={700} gutterBottom>
            {c.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" maxWidth="55ch" sx={{ mb: 3 }}>
            {c.introP1}
          </Typography>
          <Typography variant="body2" color="text.secondary" maxWidth="55ch" sx={{ mb: 4 }}>
            {messages.common.projectFloor} {c.introP2Before}{" "}
            <RouterLink href={servicesHref} fontWeight={600}>
              {c.introServices}
            </RouterLink>{" "}
            {c.introAnd}{" "}
            <RouterLink href={workHref} fontWeight={600}>
              {c.introWork}
            </RouterLink>
            {c.introP2After}
          </Typography>
          <ContactForm locale={locale} contact={c} />
          <Stack spacing={1} sx={{ mt: 5, maxWidth: 560 }}>
            <Typography variant="subtitle2" color="text.secondary">
              {c.preferEmail}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {c.reachAt}{" "}
              <Link href={`mailto:${siteConfig.publicContactEmail}`}>
                {siteConfig.publicContactEmail}
              </Link>
              .
            </Typography>
          </Stack>
        </PageContainer>
      </Section>
    </>
  );
}
