import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import Eyebrow from "@/components/layout/Eyebrow";
import PageContainer from "@/components/layout/PageContainer";
import Section from "@/components/layout/Section";
import { LinkButton } from "@/components/ui/LinkButton";
import { siteConfig } from "@/lib/site-config";
import { withLocale } from "@/lib/i18n/paths";

import { HeroOrbBackground } from "../hero/HeroOrbBackground";
import type { SectionProps } from "./section-types";

export function HeroSection({ home, locale }: SectionProps) {
  const contactHref = withLocale(locale, "/contact");
  const workHref = withLocale(locale, "/work");

  const ctaStack = (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={2}
      sx={{ pt: { xs: 0, md: 1 } }}
      useFlexGap
      flexWrap="wrap"
    >
      <LinkButton href={contactHref} variant="contained" fullWidthMobile>
        {home.ctaContact}
      </LinkButton>
      <LinkButton href={workHref} variant="outlined" fullWidthMobile>
        {home.ctaProjects}
      </LinkButton>
      <Button
        component="a"
        href={siteConfig.resumePath}
        download
        variant="outlined"
        color="primary"
        size="large"
        sx={{ width: { xs: "100%", sm: "auto" } }}
      >
        {home.ctaResume}
      </Button>
    </Stack>
  );

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
          zIndex: 1,
          background:
            "radial-gradient(ellipse at 76% 42%, rgba(138,180,248,0.08) 0%, rgba(138,180,248,0.03) 28%, transparent 60%), radial-gradient(ellipse at 68% 58%, rgba(123,207,159,0.06) 0%, transparent 42%), linear-gradient(180deg, rgba(13,17,23,0.6) 0%, rgba(13,17,23,0.24) 40%, rgba(13,17,23,0.58) 100%)",
        }}
      />
      <PageContainer sx={{ position: "relative", zIndex: 2 }}>
        <Grid container spacing={{ xs: 4, md: 2 }} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={3}>
              <Eyebrow
                sx={{
                  textTransform: "none",
                  display: "inline-block",
                  maxWidth: "100%",
                  color: "transparent",
                  backgroundImage:
                    "linear-gradient(105deg, #4ea877 0%, #7bcf9f 30%, #e6edf6 50%, #7bcf9f 70%, #4ea877 100%)",
                  backgroundSize: "240% 100%",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: "hero-eyebrow-shine 4s linear infinite",
                  "@media (prefers-reduced-motion: reduce)": {
                    animation: "none",
                    backgroundImage: "none",
                    backgroundSize: "auto",
                    WebkitBackgroundClip: "unset",
                    backgroundClip: "unset",
                    WebkitTextFillColor: "unset",
                    color: "secondary.main",
                  },
                }}
              >
                {home.heroEyebrow}
              </Eyebrow>
              <Typography variant="h2" component="h1" fontWeight={700} sx={{ fontSize: { xs: "2.5rem", md: "3.5rem" } }}>
                {home.heroTitle}
              </Typography>
              <Typography variant="h6" component="p" color="text.primary" fontWeight={400}>
                {home.heroSubtitle}
              </Typography>
              <Box sx={{ display: { xs: "none", md: "block" } }}>{ctaStack}</Box>
            </Stack>
          </Grid>
          <Grid
            size={{ xs: 12, md: 6 }}
            sx={{
              display: "flex",
              justifyContent: { xs: "center", md: "flex-end" },
            }}
          >
            <HeroOrbBackground embedded orb={home.orb} />
          </Grid>
          <Grid size={{ xs: 12 }} sx={{ display: { xs: "block", md: "none" } }}>
            {ctaStack}
          </Grid>
        </Grid>
      </PageContainer>
    </Section>
  );
}
