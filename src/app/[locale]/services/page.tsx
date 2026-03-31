import type { Metadata } from "next";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { notFound } from "next/navigation";
import Eyebrow from "@/components/layout/Eyebrow";
import PageContainer from "@/components/layout/PageContainer";
import RouterLink from "@/components/layout/RouterLink";
import Section from "@/components/layout/Section";
import { hasLocale, type Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/get-messages";
import { localeAlternates } from "@/lib/i18n/metadata-helpers";
import { withLocale } from "@/lib/i18n/paths";
type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!hasLocale(raw)) return {};
  const locale = raw;
  const m = getMessages(locale);
  return {
    title: m.meta.servicesTitle,
    description: m.meta.servicesDescription,
    alternates: localeAlternates(locale, "/services"),
  };
}

type ServiceBlockCopy = {
  title: string;
  what: string;
  when: string;
  get: string;
  examples: readonly string[];
};

function ServiceCard({
  block,
  labels,
}: {
  block: ServiceBlockCopy;
  labels: ReturnType<typeof getMessages>["services"];
}) {
  return (
    <Card
      variant="outlined"
      sx={{
        height: "100%",
        position: "relative",
        overflow: "hidden",
        transition:
          "transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease",
        "&::before": {
          content: '""',
          position: "absolute",
          insetInline: 0,
          top: 0,
          height: 4,
          background:
            "linear-gradient(90deg, rgba(123, 207, 159, 0.95) 0%, rgba(138, 180, 248, 1) 55%, rgba(184, 208, 251, 0.95) 100%)",
        },
        "&:hover": {
          transform: "translateY(-4px) rotate(-0.2deg)",
          borderColor: "primary.light",
          boxShadow: 6,
        },
        "&:focus-within": {
          borderColor: "primary.light",
          boxShadow: 6,
        },
      }}
    >
      <CardContent>
        <Typography variant="h5" component="h3" fontWeight={700} gutterBottom>
          {block.title}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {block.what}
        </Typography>
        <Typography variant="subtitle2" color="secondary" fontWeight={700} gutterBottom>
          {labels.cardWhen}
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          {block.when}
        </Typography>
        <Typography variant="subtitle2" color="secondary" fontWeight={700} gutterBottom>
          {labels.cardWhatYouGet}
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          {block.get}
        </Typography>
        <Box
          component="details"
          sx={{
            mt: 1,
            border: 1,
            borderColor: "divider",
            borderRadius: 1.5,
            px: 1.5,
            py: 1,
            bgcolor: "background.default",
            "&[open]": {
              borderColor: "primary.light",
            },
          }}
        >
          <Box
            component="summary"
            sx={{
              cursor: "pointer",
              userSelect: "none",
              fontSize: "0.875rem",
              fontWeight: 700,
              color: "secondary.main",
              "&::marker": { color: "primary.main" },
            }}
          >
            {labels.cardExamples}
          </Box>
          <Box component="ul" sx={{ m: 0, mt: 1.25, pl: 2.25, color: "text.secondary" }}>
            {block.examples.map((ex) => (
              <Typography key={ex} component="li" variant="body2" sx={{ mb: 0.5 }}>
                {ex}
              </Typography>
            ))}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default async function ServicesPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!hasLocale(raw)) notFound();
  const locale = raw as Locale;
  const messages = getMessages(locale);
  const s = messages.services;
  const workHref = withLocale(locale, "/work");
  const contactHref = withLocale(locale, "/contact");

  return (
    <>
      <Section spacing="lg" sx={{ pt: { xs: 4, md: 6 } }}>
        <PageContainer>
          <Eyebrow>{s.eyebrow}</Eyebrow>
          <Typography variant="h2" component="h1" fontWeight={700} gutterBottom>
            {s.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" maxWidth="65ch" sx={{ mb: 2 }}>
            {s.introP1}
          </Typography>
          <Typography variant="body2" color="text.secondary" maxWidth="65ch">
            {s.introBeforeWork}{" "}
            <RouterLink href={workHref} fontWeight={600}>
              {s.introWorkLink}
            </RouterLink>{" "}
            {s.introMiddle}{" "}
            <RouterLink href={contactHref} fontWeight={600}>
              {s.introContactLink}
            </RouterLink>
            {s.introAfter}
          </Typography>
        </PageContainer>
      </Section>

      <Section spacing="md">
        <PageContainer>
          <Typography variant="overline" color="secondary" fontWeight={700} letterSpacing="0.1em">
            {s.primaryLabel}
          </Typography>
          <Typography variant="h4" component="h2" fontWeight={700} sx={{ mb: 3 }}>
            {s.primaryHeading}
          </Typography>
          <Grid container spacing={3}>
            {s.primary.map((block) => (
              <Grid key={block.title} size={{ xs: 12, md: 6 }}>
                <ServiceCard block={block} labels={s} />
              </Grid>
            ))}
          </Grid>
        </PageContainer>
      </Section>

      <Section spacing="md" sx={{ bgcolor: "background.paper" }}>
        <PageContainer>
          <Typography variant="overline" color="secondary" fontWeight={700} letterSpacing="0.1em">
            {s.supportingLabel}
          </Typography>
          <Typography variant="h4" component="h2" fontWeight={700} sx={{ mb: 3 }}>
            {s.supportingHeading}
          </Typography>
          <Grid container spacing={3}>
            {s.supporting.map((block) => (
              <Grid key={block.title} size={{ xs: 12, md: 6 }}>
                <ServiceCard block={block} labels={s} />
              </Grid>
            ))}
          </Grid>
        </PageContainer>
      </Section>

      <Section spacing="lg">
        <PageContainer>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h5" component="h2" fontWeight={700} gutterBottom>
                {s.fitTitle}
              </Typography>
              <Box component="ul" sx={{ m: 0, pl: 2.25, color: "text.secondary", "& li": { mb: 1 } }}>
                {s.fitBullets.map((line) => (
                  <Typography key={line} component="li" variant="body1">
                    {line}
                  </Typography>
                ))}
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h5" component="h2" fontWeight={700} gutterBottom>
                {s.notFitTitle}
              </Typography>
              <Box component="ul" sx={{ m: 0, pl: 2.25, color: "text.secondary", "& li": { mb: 1 } }}>
                {s.notFitBullets.map((line) => (
                  <Typography key={line} component="li" variant="body1">
                    {line}
                  </Typography>
                ))}
              </Box>
            </Grid>
          </Grid>
          <Divider sx={{ my: 4 }} />
          <Stack spacing={2} maxWidth="50ch">
            <Typography variant="h6" component="h2" fontWeight={700}>
              {s.investmentTitle}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {messages.common.projectFloor} {s.investmentAfterQuote}
            </Typography>
            <Link href={contactHref} style={{ textDecoration: "none" }}>
              <Button component="span" variant="contained" size="large">
                {s.investmentCta}
              </Button>
            </Link>
          </Stack>
        </PageContainer>
      </Section>
    </>
  );
}
