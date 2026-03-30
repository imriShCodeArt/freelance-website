import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import type { CaseStudyKind, CaseStudyMeta } from "@/content/case-studies";
import Eyebrow from "@/components/layout/Eyebrow";
import PageContainer from "@/components/layout/PageContainer";
import Section from "@/components/layout/Section";
import type { Messages } from "@/lib/i18n/get-messages";
import { withLocale } from "@/lib/i18n/paths";
import type { Locale } from "@/lib/i18n/config";

type HomeCopy = Messages["home"];
type CaseStudiesCopy = Messages["caseStudies"];

type SectionProps = {
  home: HomeCopy;
  locale: Locale;
};

function LinkButton({
  href,
  variant,
  children,
  fullWidthMobile,
}: {
  href: string;
  variant: "contained" | "outlined" | "text";
  children: React.ReactNode;
  fullWidthMobile?: boolean;
}) {
  return (
    <Link href={href} style={{ textDecoration: "none", display: "block" }}>
      <Button
        component="span"
        variant={variant}
        color="primary"
        size="large"
        sx={{ width: fullWidthMobile ? { xs: "100%", sm: "auto" } : undefined }}
      >
        {children}
      </Button>
    </Link>
  );
}

export function HeroSection({ home, locale }: SectionProps) {
  const contactHref = withLocale(locale, "/contact");
  const servicesHref = withLocale(locale, "/services");

  return (
    <Section
      spacing="lg"
      sx={{
        position: "relative",
        overflow: "hidden",
        pt: { xs: 6, md: 10 },
        pb: { xs: 6, md: 10 },
        minHeight: { md: 440 },
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          backgroundColor: "background.default",
        }}
      >
        <Box
          component="video"
          autoPlay
          muted
          loop
          playsInline
          poster="/abstract-system-grid-webapp-hero-background.png"
          sx={{
            position: "absolute",
            inset: 0,
            width: "130%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "70% center",
            display: "block",
            "@media (prefers-reduced-motion: reduce)": {
              display: "none",
            },
          }}
        >
          <source src="/abstract-system-grid-webapp-hero-background.mp4" type="video/mp4" />
        </Box>
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url(/abstract-system-grid-webapp-hero-background.png)",
            backgroundSize: "cover",
            backgroundPosition: "70% center",
            backgroundRepeat: "no-repeat",
            display: "none",
            "@media (prefers-reduced-motion: reduce)": {
              display: "block",
            },
          }}
        />
      </Box>
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background:
            "linear-gradient(105deg, rgba(196,197,149,0.18) 0%, rgba(196,197,199,0.12) 38%, rgba(196,197,199,0.15) 62%, rgba(196,197,199,0.2) 100%)",
        }}
      />
      <PageContainer sx={{ position: "relative", zIndex: 2 }}>
        <Stack spacing={3} maxWidth={{ md: "min(48rem, 100%)" }}>
          <Eyebrow>{home.heroEyebrow}</Eyebrow>
          <Typography variant="h2" component="h1" fontWeight={700}>
            {home.heroTitle}
          </Typography>
          <Typography variant="h6" component="p" color="#000" fontWeight={400}>
            {home.heroSubtitle}
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ pt: 1 }}>
            <LinkButton href={contactHref} variant="contained" fullWidthMobile>
              {home.ctaContact}
            </LinkButton>
            <LinkButton href={servicesHref} variant="outlined" fullWidthMobile>
              {home.ctaServices}
            </LinkButton>
          </Stack>
        </Stack>
      </PageContainer>
    </Section>
  );
}

export function RealUseSection({
  home,
  messages,
}: {
  home: HomeCopy;
  messages: Messages;
}) {
  return (
    <Section spacing="md" sx={{ bgcolor: "background.paper", borderBlock: 1, borderColor: "divider" }}>
      <PageContainer>
        <Grid container spacing={4} alignItems="center">
          <Grid size={{ xs: 12, md: 7 }}>
            <Eyebrow>{home.realUseEyebrow}</Eyebrow>
            <Typography variant="h4" component="h2" gutterBottom fontWeight={700}>
              {home.realUseTitle}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              {home.realUseP1}
            </Typography>
            <Typography variant="body2" color="text.secondary" component="div">
              {messages.common.typicalStackLead}{" "}
              <Stack
                direction="row"
                component="div"
                flexWrap="wrap"
                useFlexGap
                gap={0.75}
                sx={{ display: "inline-flex", verticalAlign: "middle", maxWidth: "100%", my: 0.5 }}
              >
                {home.stack.map((tech) => (
                  <Chip
                    key={tech}
                    label={tech}
                    size="small"
                    variant="outlined"
                    sx={{
                      fontFamily: "var(--font-geist-mono), monospace",
                      fontSize: "0.8125rem",
                      height: 26,
                    }}
                  />
                ))}
              </Stack>
              <br />
              {messages.common.typicalStackTrail}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}>
            <Card variant="outlined" sx={{ bgcolor: "background.default" }}>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  {home.cardTypicalEngagements}
                </Typography>
                <Typography variant="body2" paragraph>
                  {messages.common.projectFloor}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  {home.cardBestFit}
                </Typography>
                <Typography variant="body2">{home.cardBestFitBody}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </PageContainer>
    </Section>
  );
}

export function MidParagraphSection({ home }: { home: HomeCopy }) {
  return (
    <Section spacing="md">
      <PageContainer>
        <Typography variant="body1" maxWidth="65ch" fontSize="1.125rem">
          {home.midParagraph}
        </Typography>
      </PageContainer>
    </Section>
  );
}

export function BuildSection({ home, locale }: SectionProps) {
  const servicesHref = withLocale(locale, "/services");
  return (
    <Section spacing="lg" sx={{ bgcolor: "background.paper" }}>
      <PageContainer>
        <Stack spacing={1} sx={{ mb: 4 }}>
          <Eyebrow>{home.buildEyebrow}</Eyebrow>
          <Typography variant="h4" component="h2" fontWeight={700}>
            {home.buildTitle}
          </Typography>
          <Typography variant="body1" color="text.secondary" maxWidth="50ch">
            {home.buildLead}
          </Typography>
        </Stack>
        <Grid container spacing={2}>
          {home.scenarios.map((label) => (
            <Grid key={label} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card variant="outlined" sx={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="subtitle1" component="h3" fontWeight={650}>
                    {label}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ mt: 4 }}>
          <LinkButton href={servicesHref} variant="contained">
            {home.buildCta}
          </LinkButton>
        </Box>
      </PageContainer>
    </Section>
  );
}

export function WhySection({ home }: { home: HomeCopy }) {
  return (
    <Section spacing="lg">
      <PageContainer>
        <Eyebrow>{home.whyEyebrow}</Eyebrow>
        <Typography variant="h4" component="h2" fontWeight={700} gutterBottom>
          {home.whyTitle}
        </Typography>
        <Typography variant="body1" color="text.secondary" maxWidth="55ch" sx={{ mb: 4 }}>
          {home.whyLead}
        </Typography>
        <Grid container spacing={2}>
          {home.differentiators.map((item) => (
            <Grid key={item.title} size={{ xs: 12, sm: 6 }}>
              <Card variant="outlined" sx={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="subtitle1" component="h3" fontWeight={650} gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.body}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </PageContainer>
    </Section>
  );
}

export function ProcessSection({
  home,
  stepPrefix,
}: {
  home: HomeCopy;
  stepPrefix: string;
}) {
  return (
    <Section spacing="lg" sx={{ bgcolor: "background.paper" }}>
      <PageContainer>
        <Eyebrow>{home.processEyebrow}</Eyebrow>
        <Typography variant="h4" component="h2" fontWeight={700} gutterBottom>
          {home.processTitle}
        </Typography>
        <Grid container spacing={3} sx={{ mt: 1 }}>
          {home.processSteps.map((step) => (
            <Grid key={step.step} size={{ xs: 12, md: 4 }}>
              <Stack spacing={1}>
                <Typography variant="overline" color="secondary" fontWeight={700} letterSpacing="0.08em">
                  {stepPrefix} {step.step}
                </Typography>
                <Typography variant="h6" component="h3" fontWeight={650}>
                  {step.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {step.body}
                </Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </PageContainer>
    </Section>
  );
}

function FeaturedCaseStudyCard({
  locale,
  study,
  copy,
  kindLabel,
}: {
  locale: Locale;
  study: CaseStudyMeta;
  copy: CaseStudiesCopy[keyof CaseStudiesCopy];
  kindLabel: string;
}) {
  return (
    <Link
      href={withLocale(locale, `/work/${study.slug}`)}
      style={{ textDecoration: "none", color: "inherit", display: "block", height: "100%" }}
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
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 1 }}>
            <Chip label={kindLabel} size="small" variant="outlined" />
            {study.tags.slice(0, 2).map((tag) => (
              <Chip key={tag} label={tag} size="small" />
            ))}
          </Stack>
          <Typography variant="h6" component="h3" fontWeight={650} gutterBottom>
            {copy.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {copy.outcome}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}

export function FeaturedWorkSection({
  home,
  locale,
  messages,
  featured,
}: {
  home: HomeCopy;
  locale: Locale;
  messages: Messages;
  featured: CaseStudyMeta[];
}) {
  const workHref = withLocale(locale, "/work");
  return (
    <Section spacing="lg">
      <PageContainer>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "flex-end" }}
          spacing={2}
          sx={{ mb: 4 }}
        >
          <Box>
            <Eyebrow>{home.workEyebrow}</Eyebrow>
            <Typography variant="h4" component="h2" fontWeight={700}>
              {home.workTitle}
            </Typography>
            <Typography variant="body1" color="text.secondary" maxWidth={480}>
              {home.workLead}
            </Typography>
          </Box>
          <LinkButton href={workHref} variant="outlined">
            {home.workViewAll}
          </LinkButton>
        </Stack>
        <Grid container spacing={2}>
          {featured.map((study) => {
            const copy = messages.caseStudies[study.slug as keyof CaseStudiesCopy];
            return (
              <Grid key={study.slug} size={{ xs: 12, md: 6 }}>
                <FeaturedCaseStudyCard
                  locale={locale}
                  study={study}
                  copy={copy}
                  kindLabel={messages.caseStudyKind[study.kind as CaseStudyKind]}
                />
              </Grid>
            );
          })}
        </Grid>
      </PageContainer>
    </Section>
  );
}

export function FitSection({ home }: { home: HomeCopy }) {
  return (
    <Section spacing="lg" sx={{ bgcolor: "background.paper", borderTop: 1, borderColor: "divider" }}>
      <PageContainer>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Eyebrow>{home.fitEyebrow}</Eyebrow>
            <Typography variant="h5" component="h2" fontWeight={700} gutterBottom>
              {home.fitTitle}
            </Typography>
            <Box component="ul" sx={{ m: 0, pl: 2.25, color: "text.secondary", "& li": { mb: 1 } }}>
              {home.fitBullets.map((line) => (
                <Typography key={line} component="li" variant="body1">
                  {line}
                </Typography>
              ))}
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Eyebrow>{home.fitHonestyEyebrow}</Eyebrow>
            <Typography variant="h5" component="h2" fontWeight={700} gutterBottom>
              {home.notFitTitle}
            </Typography>
            <Box component="ul" sx={{ m: 0, pl: 2.25, color: "text.secondary", "& li": { mb: 1 } }}>
              {home.notFitBullets.map((line) => (
                <Typography key={line} component="li" variant="body1">
                  {line}
                </Typography>
              ))}
            </Box>
          </Grid>
        </Grid>
      </PageContainer>
    </Section>
  );
}

export function CtaBandSection({ home, locale }: SectionProps) {
  const contactHref = withLocale(locale, "/contact");
  return (
    <Section spacing="lg">
      <PageContainer>
        <Stack
          spacing={2}
          alignItems={{ xs: "stretch", sm: "flex-start" }}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 2,
            border: 1,
            borderColor: "divider",
            bgcolor: "background.paper",
          }}
        >
          <Typography variant="h4" component="h2" fontWeight={700}>
            {home.ctaBandTitle}
          </Typography>
          <Typography variant="body1" color="text.secondary" maxWidth="50ch">
            {home.ctaBandBody}
          </Typography>
          <Box sx={{ alignSelf: { xs: "stretch", sm: "flex-start" } }}>
            <LinkButton href={contactHref} variant="contained" fullWidthMobile>
              {home.ctaBandButton}
            </LinkButton>
          </Box>
        </Stack>
      </PageContainer>
    </Section>
  );
}
