import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import type { HomeCopy } from "@/components/home/sections/section-types";

export const ORB_PARTICLES = Array.from({ length: 14 }, (_, i) => {
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

export function HeroOrbBackground({
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
        "@media (prefers-reduced-motion: reduce)": {
          "& .orb-anim": { animation: "none !important" },
          "& .orb-scan::after": { animation: "none !important" },
        },
        "@keyframes orbSpin": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "@keyframes orbSpinReverse": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(-360deg)" },
        },
        "@keyframes orbBreathe": {
          "0%, 100%": { transform: "scale(1)", opacity: 0.92 },
          "50%": { transform: "scale(1.04)", opacity: 1 },
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
            boxShadow:
              "0 0 90px 20px rgba(130, 194, 230, 0.12), 0 0 180px 40px rgba(100, 155, 210, 0.055)",
          }}
        />
        <Box
          className="orb-anim"
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
          className="orb-anim"
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
          className="orb-anim"
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
            background:
              "radial-gradient(circle at 58% 52%, rgba(138, 180, 248, 0.22) 0%, rgba(95, 141, 216, 0.11) 42%, transparent 70%)",
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
              className="orb-anim"
              sx={{
                position: "absolute",
                borderRadius: "50%",
                width: `${p.size}px`,
                height: `${p.size}px`,
                left: `${p.left}px`,
                top: `${p.top}px`,
                background: p.color,
                boxShadow: `0 0 ${p.size * 2.6}px ${p.color}`,
                "--dx": `${p.dx}px`,
                animation: `orbParticleDrift ${p.duration}s linear infinite`,
                animationDelay: `-${p.delay}s`,
              }}
            />
          ))}
        </Box>
        <Box
          className="orb-scan"
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
            /* Logical edge: outer side of the orb follows reading direction (RTL → screen right). */
            insetInlineEnd: { xs: -6, md: -18 },
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
                className="orb-anim"
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
