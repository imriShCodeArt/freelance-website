import type { Metadata } from "next";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
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
  const m = await getMessages(locale);
  return {
    title: m.meta.servicesTitle,
    description: m.meta.servicesDescription,
    alternates: localeAlternates(locale, "/services"),
  };
}

export default async function ServicesPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!hasLocale(raw)) notFound();
  const locale = raw as Locale;
  const messages = await getMessages(locale);
  const x = messages.experience;
  const workHref = withLocale(locale, "/work");
  const contactHref = withLocale(locale, "/contact");

  return (
    <>
      <Section spacing="lg" sx={{ pt: { xs: 4, md: 6 } }}>
        <PageContainer>
          <Eyebrow>{x.eyebrow}</Eyebrow>
          <Typography variant="h2" component="h1" fontWeight={700} gutterBottom>
            {x.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" maxWidth="65ch" sx={{ mb: 2 }}>
            {x.intro}
          </Typography>
          <Typography variant="body2" color="text.secondary" maxWidth="65ch">
            {x.introWorkBefore}{" "}
            <RouterLink href={workHref} fontWeight={600}>
              {x.introWorkLink}
            </RouterLink>{" "}
            {x.introWorkMiddle}{" "}
            <RouterLink href={contactHref} fontWeight={600}>
              {x.introContactLink}
            </RouterLink>
            {x.introWorkAfter}
          </Typography>
        </PageContainer>
      </Section>

      <Section spacing="md" sx={{ bgcolor: "background.paper" }}>
        <PageContainer>
          <Grid container spacing={3}>
            {x.areas.map((area) => (
              <Grid key={area.title} size={{ xs: 12, md: 6 }}>
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
                    <Typography variant="h5" component="h2" fontWeight={700} gutterBottom>
                      {area.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {area.body}
                    </Typography>
                  </CardContent>
                </Card>
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
                {x.fitTitle}
              </Typography>
              <Box component="ul" sx={{ m: 0, pl: 2.25, color: "text.secondary", "& li": { mb: 1 } }}>
                {x.fitBullets.map((line) => (
                  <Typography key={line} component="li" variant="body1">
                    {line}
                  </Typography>
                ))}
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h5" component="h2" fontWeight={700} gutterBottom>
                {x.notFitTitle}
              </Typography>
              <Box component="ul" sx={{ m: 0, pl: 2.25, color: "text.secondary", "& li": { mb: 1 } }}>
                {x.notFitBullets.map((line) => (
                  <Typography key={line} component="li" variant="body1">
                    {line}
                  </Typography>
                ))}
              </Box>
            </Grid>
          </Grid>
          <Stack spacing={2} maxWidth="50ch" sx={{ mt: 4 }}>
            <Typography variant="body1" color="text.secondary">
              {x.ctaLead}
            </Typography>
            <Link href={contactHref} style={{ textDecoration: "none" }}>
              <Button component="span" variant="contained" size="large">
                {x.cta}
              </Button>
            </Link>
          </Stack>
        </PageContainer>
      </Section>
    </>
  );
}
