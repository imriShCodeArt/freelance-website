import Box from "@mui/material/Box";

/** Kept for quick fallback/experimentation vs the orb hero background. */
export function HeroGeometricBackground() {
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
