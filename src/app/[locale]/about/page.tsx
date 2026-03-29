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

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!hasLocale(raw)) return {};
  const m = getMessages(raw as Locale);
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
  const a = getMessages(locale).about;
  const workHref = withLocale(locale, "/work");
  const contactHref = withLocale(locale, "/contact");

  return (
    <>
      <Section spacing="lg" sx={{ pt: { xs: 4, md: 6 } }}>
        <PageContainer variant="prose">
          <Eyebrow>{a.eyebrow}</Eyebrow>
          <Typography variant="h2" component="h1" fontWeight={700} gutterBottom>
            {a.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            {a.p1}
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            {a.p2}
          </Typography>
          <Typography variant="h5" component="h2" fontWeight={700} sx={{ mt: 4, mb: 2 }}>
            {a.styleTitle}
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            {a.styleP1}
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            {a.styleP2}
          </Typography>
          <Typography variant="h5" component="h2" fontWeight={700} sx={{ mt: 4, mb: 2 }}>
            {a.expectTitle}
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            {a.expectP1}
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mt: 4 }}>
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
          </Stack>
        </PageContainer>
      </Section>
    </>
  );
}
