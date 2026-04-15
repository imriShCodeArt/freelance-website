import type { Metadata } from "next";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { notFound } from "next/navigation";
import Eyebrow from "@/components/layout/Eyebrow";
import PageContainer from "@/components/layout/PageContainer";
import Section from "@/components/layout/Section";
import { hasLocale, type Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/get-messages";
import { localeAlternates } from "@/lib/i18n/metadata-helpers";
import { withLocale } from "@/lib/i18n/paths";
import { siteConfig } from "@/lib/site-config";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!hasLocale(raw)) return {};
  const m = await getMessages(raw as Locale);
  return {
    title: m.meta.aboutTitle,
    description: m.meta.aboutDescription,
    alternates: localeAlternates(raw as Locale, "/about"),
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!hasLocale(raw)) notFound();
  const locale = raw as Locale;
  const messages = await getMessages(locale);
  const a = messages.about;
  const workHref = withLocale(locale, "/projects");
  const contactHref = withLocale(locale, "/contact");

  return (
    <>
      <Section spacing="lg" sx={{ pt: { xs: 4, md: 6 } }}>
        <PageContainer variant="prose">
          <Eyebrow>{a.eyebrow}</Eyebrow>
          <Typography variant="h2" component="h1" fontWeight={700} gutterBottom>
            {a.title}
          </Typography>
          {a.blocks.map((block, index) => (
            <section key={block.heading}>
              <Typography
                variant="h5"
                component="h2"
                fontWeight={700}
                sx={{ mt: index === 0 ? 2 : 4, mb: 2 }}
              >
                {block.heading}
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                {block.body}
              </Typography>
            </section>
          ))}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mt: 4 }} flexWrap="wrap" useFlexGap>
            <Link href={workHref} style={{ textDecoration: "none" }}>
              <Button component="span" variant="outlined" size="large">
                {a.ctaWork}
              </Button>
            </Link>
            <Link href={contactHref} style={{ textDecoration: "none" }}>
              <Button component="span" variant="contained" size="large">
                {a.ctaContact}
              </Button>
            </Link>
            <Button
              component="a"
              href={siteConfig.resumePath}
              download
              variant="outlined"
              size="large"
            >
              {a.ctaResume}
            </Button>
          </Stack>
        </PageContainer>
      </Section>
    </>
  );
}
