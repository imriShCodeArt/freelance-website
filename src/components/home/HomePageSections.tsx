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

function HeroGeometricBackground() {
  return (
    <Box
      aria-hidden
      sx={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        isolation: "isolate",
        background:
          "radial-gradient(circle at 18% 18%, rgba(255, 255, 255, 0.95), transparent 28%), radial-gradient(circle at 78% 24%, rgba(223, 228, 233, 0.55), transparent 26%), radial-gradient(circle at 50% 70%, rgba(213, 220, 228, 0.22), transparent 34%), linear-gradient(180deg, #f7f7f4 0%, #eef1f4 100%)",
        "@keyframes triDrift": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(62px)" },
        },
        "@keyframes routeFlow": {
          from: { strokeDashoffset: 0 },
          to: { strokeDashoffset: -280 },
        },
        "@keyframes sparkle": {
          "0%, 100%": { opacity: 0.45, transform: "scale(1)" },
          "50%": { opacity: 1, transform: "scale(1.24)" },
        },
        "@keyframes nodePulse": {
          "0%, 100%": { opacity: 0.5 },
          "50%": { opacity: 1 },
        },
        "@keyframes panelFloat": {
          "0%, 100%": { transform: "translateY(0px)", opacity: 0.64 },
          "50%": { transform: "translateY(-8px)", opacity: 0.92 },
        },
        "& .tri-grid": {
          position: "absolute",
          inset: 0,
          zIndex: 0,
          opacity: 0.7,
          backgroundImage:
            "linear-gradient(60deg, rgba(120, 130, 145, 0.12) 1px, transparent 1px), linear-gradient(-60deg, rgba(120, 130, 145, 0.12) 1px, transparent 1px), linear-gradient(0deg, rgba(120, 130, 145, 0.08) 1px, transparent 1px)",
          backgroundSize: "72px 62px, 72px 62px, 72px 62px",
          backgroundPosition: "0 0, 0 0, 0 31px",
          maskImage: "radial-gradient(circle at center, black 52%, transparent 100%)",
          animation: "triDrift 28s linear infinite",
        },
        "& .ambient-glow": {
          position: "absolute",
          inset: "-10%",
          zIndex: 0,
          background:
            "radial-gradient(circle at 30% 35%, rgba(255,255,255,0.52), transparent 22%), radial-gradient(circle at 66% 46%, rgba(210,218,230,0.45), transparent 24%), radial-gradient(circle at 56% 62%, rgba(255,255,255,0.28), transparent 18%)",
          filter: "blur(30px)",
          opacity: 0.9,
          pointerEvents: "none",
        },
        "& .pattern": {
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
        },
        "& .pattern svg": {
          width: "100%",
          height: "100%",
          display: "block",
        },
        "& .blocks rect": {
          fill: "rgba(194, 202, 212, 0.18)",
          stroke: "rgba(255, 255, 255, 0.34)",
          strokeWidth: 1,
          animation: "panelFloat 14s ease-in-out infinite",
        },
        "& .blocks rect:nth-of-type(2n)": {
          animationDuration: "18s",
          animationDelay: "-4s",
        },
        "& .blocks rect:nth-of-type(3n)": {
          animationDuration: "22s",
          animationDelay: "-8s",
        },
        "& .routes-back path": {
          fill: "none",
          stroke: "rgba(106, 118, 134, 0.22)",
          strokeWidth: 2.4,
          strokeLinecap: "round",
          strokeLinejoin: "round",
        },
        "& .routes-front path": {
          fill: "none",
          stroke: "rgba(255, 255, 255, 0.84)",
          strokeWidth: 1.5,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeDasharray: "10 18",
          filter: "drop-shadow(0 0 5px rgba(255,255,255,0.55))",
          animation: "routeFlow 14s linear infinite",
        },
        "& .routes-front path:nth-of-type(2)": { animationDuration: "18s" },
        "& .routes-front path:nth-of-type(3)": { animationDuration: "16s" },
        "& .routes-front path:nth-of-type(4)": { animationDuration: "20s" },
        "& .nodes rect": {
          fill: "rgba(120, 132, 150, 0.72)",
          rx: 1.5,
          animation: "nodePulse 4.2s ease-in-out infinite",
        },
        "& .nodes rect:nth-of-type(2n)": { animationDelay: "0.8s" },
        "& .nodes rect:nth-of-type(3n)": { animationDelay: "1.6s" },
        "& .glow-points circle": {
          fill: "#ffffff",
          filter:
            "drop-shadow(0 0 8px rgba(255,255,255,1)) drop-shadow(0 0 18px rgba(255,255,255,0.75))",
          animation: "sparkle 3.8s ease-in-out infinite",
        },
        "& .glow-points circle:nth-of-type(2)": { animationDelay: "0.6s" },
        "& .glow-points circle:nth-of-type(3)": { animationDelay: "1.2s" },
        "& .glow-points circle:nth-of-type(4)": { animationDelay: "1.8s" },
        "& .glow-points circle:nth-of-type(5)": { animationDelay: "2.4s" },
        "& .traveler": {
          fill: "#ffffff",
          opacity: 0.96,
          filter:
            "drop-shadow(0 0 8px rgba(255,255,255,1)) drop-shadow(0 0 18px rgba(255,255,255,0.72))",
        },
        "@media (max-width: 900px)": {
          "& .tri-grid": { opacity: 0.5 },
        },
        "@media (prefers-reduced-motion: reduce)": {
          "& .tri-grid, & .blocks rect, & .routes-front path, & .nodes rect, & .glow-points circle":
            {
              animation: "none !important",
            },
          "& .traveler": { display: "none" },
        },
      }}
    >
      <Box className="tri-grid" />
      <Box className="ambient-glow" />
      <Box className="pattern">
        <svg viewBox="0 0 1400 900" preserveAspectRatio="xMidYMid slice">
          <defs>
            <path id="route-a" d="M110 610 L260 610 Q305 610 332 584 L456 512 Q492 490 534 490 H654 Q706 490 740 460 L876 342 Q910 314 958 314 H1160" />
            <path id="route-b" d="M180 286 H308 Q360 286 392 318 L530 454 Q566 490 620 490 H760 Q806 490 840 462 L988 340 Q1024 310 1078 310 H1260" />
            <path id="route-c" d="M220 710 H404 Q450 710 482 682 L586 592 Q620 564 668 564 H822 Q876 564 910 532 L1020 430 Q1054 398 1104 398 H1240" />
            <path id="route-d" d="M430 196 L542 260 Q586 286 636 286 H764 Q820 286 856 320 L968 424 Q1008 460 1060 460 H1216" />
          </defs>
          <g className="blocks">
            <rect x="84" y="208" width="180" height="180" />
            <rect x="180" y="312" width="220" height="220" />
            <rect x="356" y="236" width="180" height="180" />
            <rect x="500" y="326" width="240" height="240" />
            <rect x="690" y="214" width="190" height="190" />
            <rect x="822" y="296" width="230" height="230" />
            <rect x="1042" y="190" width="190" height="190" />
          </g>
          <g className="routes-back">
            <path d="M110 610 L260 610 Q305 610 332 584 L456 512 Q492 490 534 490 H654 Q706 490 740 460 L876 342 Q910 314 958 314 H1160" />
            <path d="M180 286 H308 Q360 286 392 318 L530 454 Q566 490 620 490 H760 Q806 490 840 462 L988 340 Q1024 310 1078 310 H1260" />
            <path d="M220 710 H404 Q450 710 482 682 L586 592 Q620 564 668 564 H822 Q876 564 910 532 L1020 430 Q1054 398 1104 398 H1240" />
            <path d="M430 196 L542 260 Q586 286 636 286 H764 Q820 286 856 320 L968 424 Q1008 460 1060 460 H1216" />
          </g>
          <g className="routes-front">
            <path d="M110 610 L260 610 Q305 610 332 584 L456 512 Q492 490 534 490 H654 Q706 490 740 460 L876 342 Q910 314 958 314 H1160" />
            <path d="M180 286 H308 Q360 286 392 318 L530 454 Q566 490 620 490 H760 Q806 490 840 462 L988 340 Q1024 310 1078 310 H1260" />
            <path d="M220 710 H404 Q450 710 482 682 L586 592 Q620 564 668 564 H822 Q876 564 910 532 L1020 430 Q1054 398 1104 398 H1240" />
            <path d="M430 196 L542 260 Q586 286 636 286 H764 Q820 286 856 320 L968 424 Q1008 460 1060 460 H1216" />
          </g>
          <g className="nodes">
            <rect x="254" y="604" width="12" height="12" />
            <rect x="528" y="484" width="12" height="12" />
            <rect x="734" y="454" width="12" height="12" />
            <rect x="952" y="308" width="12" height="12" />
            <rect x="614" y="484" width="12" height="12" />
            <rect x="834" y="456" width="12" height="12" />
            <rect x="662" y="558" width="12" height="12" />
            <rect x="904" y="526" width="12" height="12" />
            <rect x="630" y="280" width="12" height="12" />
            <rect x="850" y="314" width="12" height="12" />
          </g>
          <g className="glow-points">
            <circle cx="332" cy="584" r="5.5" />
            <circle cx="740" cy="460" r="5.5" />
            <circle cx="988" cy="340" r="5.5" />
            <circle cx="482" cy="682" r="5.5" />
            <circle cx="856" cy="320" r="5.5" />
          </g>
          <g>
            <circle className="traveler" r="4.5">
              <animateMotion dur="10s" repeatCount="indefinite">
                <mpath href="#route-a" />
              </animateMotion>
            </circle>
            <circle className="traveler" r="4.5">
              <animateMotion dur="12s" repeatCount="indefinite">
                <mpath href="#route-b" />
              </animateMotion>
            </circle>
            <circle className="traveler" r="4.5">
              <animateMotion dur="9s" repeatCount="indefinite">
                <mpath href="#route-c" />
              </animateMotion>
            </circle>
            <circle className="traveler" r="4.5">
              <animateMotion dur="11s" repeatCount="indefinite">
                <mpath href="#route-d" />
              </animateMotion>
            </circle>
          </g>
        </svg>
      </Box>
    </Box>
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
      <HeroGeometricBackground />
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
                    color="info"
                    size="small"
                    variant="outlined"
                    sx={{
                      fontFamily: "var(--font-geist-mono), monospace",
                      fontSize: "0.8125rem",
                      height: 26,
                      fontWeight: 700,
                      px: ".25em",
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
