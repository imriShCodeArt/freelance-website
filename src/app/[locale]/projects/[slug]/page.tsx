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
import {
  getCaseStudyLocaleCopy,
  getCaseStudyMeta,
  listCaseStudySlugs,
} from "@/lib/content/case-studies-access";
import { hasLocale, locales, type Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/get-messages";
import { localeAlternates } from "@/lib/i18n/metadata-helpers";
import { withLocale } from "@/lib/i18n/paths";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const slugs = await listCaseStudySlugs();
  return locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  if (!hasLocale(raw)) return {};
  const locale = raw as Locale;
  const copy = await getCaseStudyLocaleCopy(slug, locale);
  if (!copy) return {};
  return {
    title: copy.title,
    description: copy.summary,
    alternates: localeAlternates(locale, `/projects/${slug}`),
  };
}

function ProseBlock({ heading, body }: { heading: string; body: string }) {
  return (
    <Box component="section" sx={{ mb: 3 }}>
      <Typography variant="h6" component="h2" fontWeight={700} gutterBottom>
        {heading}
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph sx={{ mb: 0 }}>
        {body}
      </Typography>
    </Box>
  );
}

export default async function CaseStudyPage({ params }: Props) {
  const { locale: raw, slug } = await params;
  if (!hasLocale(raw)) notFound();
  const locale = raw as Locale;
  const meta = await getCaseStudyMeta(slug);
  if (!meta) notFound();

  const copy = await getCaseStudyLocaleCopy(slug, locale);
  if (!copy) notFound();

  const messages = await getMessages(locale);
  const d = messages.workDetail;
  const workHref = withLocale(locale, "/projects");
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
            {meta.stack.map((t) => (
              <Chip key={t} label={t} size="small" />
            ))}
          </Stack>
          <ProseBlock heading={d.overviewHeading} body={copy.overview} />
          <ProseBlock heading={d.roleHeading} body={copy.role} />
          <Typography variant="h6" component="h2" fontWeight={700} gutterBottom>
            {d.stackHeading}
          </Typography>
          <Stack direction="row" gap={1} flexWrap="wrap" useFlexGap sx={{ mb: 3 }}>
            {meta.stack.map((t) => (
              <Chip key={`row-${t}`} label={t} size="small" variant="outlined" />
            ))}
          </Stack>
          <ProseBlock heading={d.challengesHeading} body={copy.engineeringChallenges} />
          <ProseBlock heading={d.architectureHeading} body={copy.implementationNotes} />
          <ProseBlock heading={d.outcomesHeading} body={copy.outcomes} />
          <ProseBlock heading={d.recruiterHeading} body={copy.recruiterAngle} />
          <Box component="section" sx={{ mb: 3 }}>
            <Typography variant="h6" component="h2" fontWeight={700} gutterBottom>
              {d.linksHeading}
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} useFlexGap flexWrap="wrap">
              {meta.githubUrl ? (
                <Button
                  component="a"
                  href={meta.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outlined"
                  size="medium"
                >
                  {d.githubLabel}
                </Button>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  {d.githubLabel}: —
                </Typography>
              )}
              {meta.liveUrl ? (
                <Button
                  component="a"
                  href={meta.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outlined"
                  size="medium"
                >
                  {d.liveLabel}
                </Button>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  {d.liveLabel}: —
                </Typography>
              )}
            </Stack>
          </Box>
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
