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
import { BuildSectionServiceCards } from "@/components/home/BuildSectionServiceCards";
import Eyebrow from "@/components/layout/Eyebrow";
import PageContainer from "@/components/layout/PageContainer";
import Section from "@/components/layout/Section";
import type { Messages } from "@/lib/i18n/get-messages";
import { withLocale } from "@/lib/i18n/paths";
import type { Locale } from "@/lib/i18n/config";

type HomeCopy = Messages["home"];
type CaseStudiesCopy = Messages["caseStudies"];
type ServicesCopy = Messages["services"];

type SectionProps = {
  home: HomeCopy;
  locale: Locale;
};

const ORB_PARTICLES = Array.from({ length: 28 }, (_, i) => {
  const size = 3.8 + (i % 5) * 0.9;
  const left = 14 + ((i * 31) % 380);
  const top = 148 + ((i * 19) % 240);
  const dx = -34 + ((i * 13) % 68);
  const duration = 13.6 + (i % 6) * 0.6;
  const delay = (i % 7) * 0.7;
  const colors = [
    "rgba(138,180,248,0.82)",
    "rgba(184,208,251,0.78)",
    "rgba(123,207,159,0.74)",
    "rgba(170,184,203,0.6)",
  ];
  return {
    size,
    left,
    top,
    dx,
    duration,
    delay,
    color: colors[i % colors.length],
  };
});

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

// Kept for quick fallback/experimentation vs the orb hero background.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
          "radial-gradient(circle at 18% 18%, rgba(138, 180, 248, 0.24), transparent 30%), radial-gradient(circle at 78% 24%, rgba(123, 207, 159, 0.2), transparent 28%), radial-gradient(circle at 50% 70%, rgba(95, 141, 216, 0.14), transparent 36%), linear-gradient(180deg, #0d1117 0%, #141b25 100%)",
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
            "linear-gradient(60deg, rgba(170, 184, 203, 0.14) 1px, transparent 1px), linear-gradient(-60deg, rgba(170, 184, 203, 0.14) 1px, transparent 1px), linear-gradient(0deg, rgba(170, 184, 203, 0.09) 1px, transparent 1px)",
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
            "radial-gradient(circle at 30% 35%, rgba(138,180,248,0.3), transparent 24%), radial-gradient(circle at 66% 46%, rgba(123,207,159,0.26), transparent 25%), radial-gradient(circle at 56% 62%, rgba(184,208,251,0.18), transparent 20%)",
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
          fill: "rgba(33, 44, 61, 0.5)",
          stroke: "rgba(170, 184, 203, 0.3)",
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
          stroke: "rgba(123, 143, 171, 0.3)",
          strokeWidth: 2.4,
          strokeLinecap: "round",
          strokeLinejoin: "round",
        },
        "& .routes-front path": {
          fill: "none",
          stroke: "rgba(184, 208, 251, 0.7)",
          strokeWidth: 1.5,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeDasharray: "10 18",
          filter: "drop-shadow(0 0 5px rgba(184,208,251,0.45))",
          animation: "routeFlow 14s linear infinite",
        },
        "& .routes-front path:nth-of-type(2)": { animationDuration: "18s" },
        "& .routes-front path:nth-of-type(3)": { animationDuration: "16s" },
        "& .routes-front path:nth-of-type(4)": { animationDuration: "20s" },
        "& .nodes rect": {
          fill: "rgba(170, 184, 203, 0.65)",
          rx: 1.5,
          animation: "nodePulse 4.2s ease-in-out infinite",
        },
        "& .nodes rect:nth-of-type(2n)": { animationDelay: "0.8s" },
        "& .nodes rect:nth-of-type(3n)": { animationDelay: "1.6s" },
        "& .glow-points circle": {
          fill: "#b8d0fb",
          filter:
            "drop-shadow(0 0 8px rgba(184,208,251,0.95)) drop-shadow(0 0 18px rgba(184,208,251,0.65))",
          animation: "sparkle 3.8s ease-in-out infinite",
        },
        "& .glow-points circle:nth-of-type(2)": { animationDelay: "0.6s" },
        "& .glow-points circle:nth-of-type(3)": { animationDelay: "1.2s" },
        "& .glow-points circle:nth-of-type(4)": { animationDelay: "1.8s" },
        "& .glow-points circle:nth-of-type(5)": { animationDelay: "2.4s" },
        "& .traveler": {
          fill: "#b8d0fb",
          opacity: 0.96,
          filter:
            "drop-shadow(0 0 8px rgba(184,208,251,0.9)) drop-shadow(0 0 18px rgba(184,208,251,0.62))",
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

function HeroOrbBackground({
  embedded = false,
  orb,
}: {
  embedded?: boolean;
  orb: HomeCopy["orb"];
}) {
  return (
    <Box
      aria-hidden
      sx={{
        position: embedded ? "relative" : "absolute",
        inset: embedded ? "auto" : 0,
        width: embedded ? "100%" : undefined,
        height: embedded ? "100%" : undefined,
        minHeight: embedded ? { xs: 320, md: 480 } : undefined,
        zIndex: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: embedded ? "visible" : "hidden",
        background:
          "radial-gradient(circle at 58% 45%, rgba(138, 180, 248, 0.035), transparent 34%), radial-gradient(circle at 72% 34%, rgba(123, 207, 159, 0.028), transparent 26%), transparent",
        "@keyframes orbSpin": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "@keyframes orbSpinReverse": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(-360deg)" },
        },
        "@keyframes orbAmbientShift": {
          "0%, 100%": {
            boxShadow:
              "0 0 90px 20px rgba(138, 180, 248, 0.14), 0 0 180px 40px rgba(95, 141, 216, 0.06)",
          },
          "50%": {
            boxShadow:
              "0 0 90px 20px rgba(123, 207, 159, 0.12), 0 0 180px 40px rgba(138, 180, 248, 0.07)",
          },
        },
        "@keyframes orbBreathe": {
          "0%, 100%": { transform: "scale(1)", opacity: 0.92 },
          "50%": { transform: "scale(1.04)", opacity: 1 },
        },
        "@keyframes orbGlowShift": {
          "0%": {
            background:
              "radial-gradient(circle at 40% 40%, rgba(184, 208, 251, 0.28) 0%, rgba(138, 180, 248, 0.14) 36%, transparent 70%)",
          },
          "25%": {
            background:
              "radial-gradient(circle at 62% 32%, rgba(123, 207, 159, 0.24) 0%, rgba(138, 180, 248, 0.13) 40%, transparent 70%)",
          },
          "50%": {
            background:
              "radial-gradient(circle at 60% 64%, rgba(138, 180, 248, 0.24) 0%, rgba(95, 141, 216, 0.12) 42%, transparent 70%)",
          },
          "75%": {
            background:
              "radial-gradient(circle at 30% 60%, rgba(184, 208, 251, 0.22) 0%, rgba(123, 207, 159, 0.1) 40%, transparent 70%)",
          },
          "100%": {
            background:
              "radial-gradient(circle at 40% 40%, rgba(184, 208, 251, 0.28) 0%, rgba(138, 180, 248, 0.14) 36%, transparent 70%)",
          },
        },
        "@keyframes orbParticleDrift": {
          "0%": { transform: "translateY(0) translateX(0) scale(1)", opacity: 0 },
          "10%": { opacity: 1 },
          "85%": { opacity: 0.7 },
          "100%": {
            transform: "translateY(-170px) translateX(var(--dx)) scale(0.35)",
            opacity: 0,
          },
        },
        "@keyframes orbScanLine": {
          "0%": { top: "12%", opacity: 0 },
          "10%": { opacity: 1 },
          "90%": { opacity: 0.5 },
          "100%": { top: "88%", opacity: 0 },
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: { xs: 440, md: 540 },
          height: { xs: 440, md: 540 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: { xs: 360, md: 500 },
            height: { xs: 360, md: 500 },
            borderRadius: "50%",
            filter: "blur(8px)",
            animation: "orbAmbientShift 8s ease-in-out infinite",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            width: { xs: 300, md: 420 },
            height: { xs: 300, md: 420 },
            borderRadius: "50%",
            animation: "orbSpin 9s linear infinite",
            "&::before": {
              content: '""',
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              p: "2px",
              background:
                "conic-gradient(from 0deg, transparent 0%, rgba(184, 208, 251, 0.95) 12%, rgba(138, 180, 248, 0.95) 28%, rgba(123, 207, 159, 0.85) 43%, transparent 58%, rgba(138, 180, 248, 0.75) 76%, rgba(184, 208, 251, 0.95) 90%, transparent 100%)",
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
              filter:
                "drop-shadow(0 0 10px rgba(138, 180, 248, 0.35)) drop-shadow(0 0 20px rgba(123, 207, 159, 0.18))",
            },
          }}
        />
        <Box
          sx={{
            position: "absolute",
            width: { xs: 340, md: 470 },
            height: { xs: 340, md: 470 },
            borderRadius: "50%",
            animation: "orbSpinReverse 13s linear infinite",
            "&::before": {
              content: '""',
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              p: "1px",
              background:
                "conic-gradient(from 180deg, transparent 0%, rgba(123, 207, 159, 0.75) 18%, transparent 35%, rgba(184, 208, 251, 0.55) 58%, rgba(138, 180, 248, 0.7) 74%, transparent 100%)",
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            },
          }}
        />
        <Box
          sx={{
            position: "absolute",
            width: { xs: 250, md: 360 },
            height: { xs: 250, md: 360 },
            borderRadius: "50%",
            border: "1px solid rgba(184, 208, 251, 0.1)",
            background:
              "radial-gradient(ellipse at 35% 35%, rgba(184, 208, 251, 0.12) 0%, rgba(138, 180, 248, 0.1) 24%, rgba(95, 141, 216, 0.08) 48%, rgba(123, 207, 159, 0.05) 72%, transparent 100%)",
            animation: "orbBreathe 15s ease-in-out infinite",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            width: { xs: 210, md: 300 },
            height: { xs: 210, md: 300 },
            borderRadius: "50%",
            filter: "blur(2px)",
            animation: "orbGlowShift 6s ease-in-out infinite",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            width: { xs: 250, md: 360 },
            height: { xs: 250, md: 360 },
            borderRadius: "50%",
            overflow: "hidden",
          }}
        >
          {ORB_PARTICLES.map((p, i) => (
            <Box
              key={i}
              sx={{
                position: "absolute",
                borderRadius: "50%",
                width: `${p.size}px`,
                height: `${p.size}px`,
                left: `${p.left}px`,
                top: `${p.top}px`,
                background: p.color,
                boxShadow: `0 0 ${p.size * 3.5}px ${p.color}`,
                "--dx": `${p.dx}px`,
                animation: `orbParticleDrift ${p.duration}s linear infinite`,
                animationDelay: `-${p.delay}s`,
              }}
            />
          ))}
        </Box>
        <Box
          sx={{
            position: "absolute",
            width: { xs: 250, md: 360 },
            height: { xs: 250, md: 360 },
            borderRadius: "50%",
            overflow: "hidden",
            "&::after": {
              content: '""',
              position: "absolute",
              left: 0,
              right: 0,
              height: "2px",
              background:
                "linear-gradient(90deg, transparent, rgba(184, 208, 251, 0.45), rgba(138, 180, 248, 0.45), rgba(123, 207, 159, 0.35), transparent)",
              boxShadow: "0 0 12px rgba(138, 180, 248, 0.25)",
              animation: "orbScanLine 3.2s ease-in-out infinite",
            },
          }}
        />
        <Box
          sx={{
            position: "absolute",
            zIndex: 6,
            width: { xs: 220, md: 300 },
            textAlign: "center",
            px: 2,
            pointerEvents: "none",
          }}
        >
          <Typography
            component="p"
            sx={{
              fontSize: { xs: "0.62rem", md: "0.75rem" },
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(184, 208, 251, 0.78)",
              fontWeight: 700,
              mb: 1.25,
            }}
          >
            {orb.eyebrow}
          </Typography>
          <Typography
            component="p"
            sx={{
              fontSize: { xs: "2rem", md: "3rem" },
              lineHeight: 1.03,
              letterSpacing: "-0.02em",
              fontWeight: 800,
              color: "#e6edf6",
              mb: 0.5,
            }}
          >
            {orb.titleLine1}
          </Typography>
          <Typography
            component="p"
            sx={{
              fontSize: { xs: "2rem", md: "2.5rem" },
              lineHeight: 1.03,
              letterSpacing: "-0.02em",
              fontWeight: 800,
              mb: 0.5,
              background:
                "linear-gradient(90deg, rgba(138,180,248,1) 0%, rgba(123,207,159,0.95) 60%, rgba(184,208,251,1) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {orb.titleLine2}
          </Typography>
          <Typography
            component="p"
            sx={{
              fontSize: { xs: "0.85rem", md: "1rem" },
              lineHeight: 1.5,
              color: "rgba(170, 184, 203, 0.86)",
            }}
          >
            {orb.subtitle}
          </Typography>
        </Box>
        <Box
          sx={{
            position: "absolute",
            zIndex: 6,
            right: { xs: -6, md: -18 },
            top: { xs: 118, md: 106 },
            display: { xs: "none", md: "grid" },
            gap: 1.25,
            pointerEvents: "none",
          }}
        >
          {orb.tags.map((tag, index) => {
            const waterAnim = index % 2 === 0 ? "orb-tag-water" : "orb-tag-water-alt";
            const durationS = 5.2 + index * 0.55;
            return (
              <Box
                key={tag}
                sx={{
                  py: 0.9,
                  px: 1.5,
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: index === 0 ? "rgba(139, 92, 246, 0.5)" : "rgba(56, 189, 248, 0.45)",
                  background:
                    index === 0 ? "rgba(30, 18, 51, 0.55)" : "rgba(10, 26, 41, 0.55)",
                  color: index === 0 ? "rgba(196, 181, 253, 0.95)" : "rgba(103, 232, 249, 0.95)",
                  fontSize: "1.15rem",
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  whiteSpace: "nowrap",
                  boxShadow:
                    index === 0
                      ? "0 0 18px rgba(139, 92, 246, 0.25)"
                      : "0 0 18px rgba(56, 189, 248, 0.22)",
                  animation: `${waterAnim} ${durationS}s ease-in-out infinite`,
                  animationDelay: `${index * 0.62}s`,
                  "@media (prefers-reduced-motion: reduce)": {
                    animation: "none",
                  },
                }}
              >
                {tag}
              </Box>
            );
          })}
        </Box>
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
              <Typography variant="h2" component="h1" fontWeight={700}>
                {home.heroTitle}
              </Typography>
              <Typography variant="h6" component="p" color="text.primary" fontWeight={400}>
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
          </Grid>
          <Grid size={{ xs: 12, md: 6 }} sx={{ display: "flex", justifyContent: { md: "flex-end" } }}>
            <HeroOrbBackground embedded orb={home.orb} />
          </Grid>
        </Grid>
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

export function BuildSection({
  home,
  locale,
  services,
}: SectionProps & { services: ServicesCopy }) {
  const servicesHref = withLocale(locale, "/services");
  const serviceDetails = [...services.primary, ...services.supporting];
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
        <BuildSectionServiceCards
          scenarios={home.scenarios}
          serviceDetails={serviceDetails}
          buildLead={home.buildLead}
          buildCta={home.buildCta}
          servicesHref={servicesHref}
        />
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
