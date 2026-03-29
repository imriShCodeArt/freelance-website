import type { Metadata } from "next";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import Eyebrow from "@/components/layout/Eyebrow";
import PageContainer from "@/components/layout/PageContainer";
import Section from "@/components/layout/Section";
import { caseStudies } from "@/content/case-studies";
import { hasLocale, type Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/get-messages";
import { localeAlternates } from "@/lib/i18n/metadata-helpers";
import { withLocale } from "@/lib/i18n/paths";

const visuallyHidden = {
  position: "absolute",
  width: "1px",
  height: "1px",
  padding: 0,
  margin: "-1px",
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  borderWidth: 0,
} as const;

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!hasLocale(raw)) return {};
  const locale = raw;
  const m = getMessages(locale);
  return {
    title: m.meta.workTitle,
    description: m.meta.workDescription,
    alternates: localeAlternates(locale, "/work"),
  };
}

export default async function WorkPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!hasLocale(raw)) notFound();
  const locale = raw as Locale;
  const messages = getMessages(locale);
  const w = messages.work;
  const contactHref = withLocale(locale, "/contact");

  return (
    <>
      <Section spacing="lg" sx={{ pt: { xs: 4, md: 6 } }}>
        <PageContainer>
          <Eyebrow>{w.eyebrow}</Eyebrow>
          <Typography variant="h2" component="h1" fontWeight={700} gutterBottom>
            {w.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" maxWidth="60ch" sx={{ mb: 3 }}>
            {w.intro}
          </Typography>
          <NextLink href={contactHref} style={{ textDecoration: "none" }}>
            <Button component="span" variant="outlined">
              {w.cta}
            </Button>
          </NextLink>
        </PageContainer>
      </Section>

      <Section spacing="lg" sx={{ pb: { xs: 8, md: 10 } }}>
        <PageContainer>
          <Typography component="h2" sx={visuallyHidden}>
            {w.caseStudiesListHeading}
          </Typography>
          <Grid container spacing={3}>
            {caseStudies.map((study) => {
              const copy =
                messages.caseStudies[study.slug as keyof typeof messages.caseStudies];
              return (
                <Grid key={study.slug} size={{ xs: 12, md: 6 }}>
                  <NextLink
                    href={withLocale(locale, `/work/${study.slug}`)}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      display: "block",
                      height: "100%",
                    }}
                  >
                    <Card
                      variant="outlined"
                      sx={{
                        height: "100%",
                        transition: "box-shadow 0.2s ease, border-color 0.2s ease",
                        "&:hover": {
                          borderColor: "primary.light",
                          boxShadow: 2,
                        },
                      }}
                    >
                      <CardContent>
                        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 1.5 }}>
                          <Chip
                            label={messages.caseStudyKind[study.kind]}
                            size="small"
                            variant="outlined"
                          />
                          {study.tags.map((t) => (
                            <Chip key={t} label={t} size="small" />
                          ))}
                        </Stack>
                        <Typography variant="h5" component="h3" fontWeight={700} gutterBottom>
                          {copy.title}
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                          {w.cardProblemLabel}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                          {copy.problem}
                        </Typography>
                        <Typography variant="subtitle2" color="secondary" fontWeight={700}>
                          {w.cardOutcomeLabel}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {copy.outcome}
                        </Typography>
                      </CardContent>
                    </Card>
                  </NextLink>
                </Grid>
              );
            })}
          </Grid>
        </PageContainer>
      </Section>
    </>
  );
}
