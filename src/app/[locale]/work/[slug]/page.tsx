import type { Metadata } from "next";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { notFound } from "next/navigation";
import Eyebrow from "@/components/layout/Eyebrow";
import PageContainer from "@/components/layout/PageContainer";
import Section from "@/components/layout/Section";
import { caseStudies, getCaseStudyMeta } from "@/content/case-studies";
import { hasLocale, locales, type Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/get-messages";
import { localeAlternates } from "@/lib/i18n/metadata-helpers";
import { withLocale } from "@/lib/i18n/paths";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    caseStudies.map((c) => ({ locale, slug: c.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  if (!hasLocale(raw)) return {};
  const localeMap = getMessages(raw as Locale).caseStudies;
  const copy = localeMap[slug as keyof typeof localeMap];
  if (!copy) return {};
  return {
    title: copy.title,
    description: copy.outcome,
    alternates: localeAlternates(raw as Locale, `/work/${slug}`),
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { locale: raw, slug } = await params;
  if (!hasLocale(raw)) notFound();
  const locale = raw as Locale;
  const meta = getCaseStudyMeta(slug);
  if (!meta) notFound();

  const messages = getMessages(locale);
  const copy =
    messages.caseStudies[slug as keyof typeof messages.caseStudies];
  if (!copy) notFound();

  const d = messages.workDetail;
  const workHref = withLocale(locale, "/work");
  const contactHref = withLocale(locale, "/contact");

  return (
    <>
      <Section spacing="lg" sx={{ pt: { xs: 4, md: 6 } }}>
        <PageContainer variant="prose">
          <Link href={workHref} style={{ textDecoration: "none" }}>
            <Button component="span" variant="text" sx={{ mb: 2, px: 0 }}>
              {locale === "he" ? "→" : "←"} {d.back}
            </Button>
          </Link>
          <Eyebrow>
            {d.eyebrowPrefix} {messages.caseStudyKind[meta.kind]}
          </Eyebrow>
          <Typography variant="h2" component="h1" fontWeight={700} gutterBottom>
            {copy.title}
          </Typography>
          <Stack direction="row" gap={1} flexWrap="wrap" useFlexGap sx={{ mb: 3 }}>
            {meta.tags.map((t) => (
              <Chip key={t} label={t} size="small" />
            ))}
          </Stack>
          <Typography variant="h6" component="h2" fontWeight={700} gutterBottom>
            {d.problemHeading}
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            {copy.problem}
          </Typography>
          <Typography variant="h6" component="h2" fontWeight={700} gutterBottom>
            {d.afterHeading}
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            {copy.after}
          </Typography>
          <Typography variant="h6" component="h2" fontWeight={700} gutterBottom>
            {d.approachHeading}
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            {copy.approach}
          </Typography>
          <Box sx={{ pt: 2 }}>
            <Link href={contactHref} style={{ textDecoration: "none" }}>
              <Button component="span" variant="contained" size="large">
                {d.cta}
              </Button>
            </Link>
          </Box>
        </PageContainer>
      </Section>
    </>
  );
}
