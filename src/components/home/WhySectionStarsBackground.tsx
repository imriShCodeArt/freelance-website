"use client";

import Box from "@mui/material/Box";
import { useEffect, useRef } from "react";

export function WhySectionStarsBackground() {
  const smallLayerRef = useRef<HTMLDivElement | null>(null);
  const midLayerRef = useRef<HTMLDivElement | null>(null);
  const shineLayerRef = useRef<HTMLDivElement | null>(null);
  const cometLayerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const smallLayer = smallLayerRef.current;
    const midLayer = midLayerRef.current;
    const shineLayer = shineLayerRef.current;
    const cometLayer = cometLayerRef.current;

    if (!smallLayer || !midLayer || !shineLayer || !cometLayer) return;

    const timers: number[] = [];
    let disposed = false;

    const scheduleTimeout = (cb: () => void, ms: number) => {
      const id = window.setTimeout(cb, ms);
      timers.push(id);
      return id;
    };

    const createStar = (
      layer: HTMLDivElement,
      options: {
        variant?: "" | "soft" | "blue" | "green";
        size?: number;
        left?: number;
        top?: number;
        duration?: number;
      } = {},
    ) => {
      const star = document.createElement("div");
      star.className = `why-stars-star ${options.variant || ""}`.trim();

      const size = options.size ?? Math.random() * 2 + 1;
      const left = options.left ?? Math.random() * 100;
      const top = options.top ?? Math.random() * 100;
      const duration = options.duration ?? Math.random() * 4 + 3;

      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.left = `${left}%`;
      star.style.top = `${top}%`;
      star.style.animationDuration = `${duration}s`;
      star.style.animationDelay = "0s";

      layer.appendChild(star);
    };

    const createShiningStar = (
      layer: HTMLDivElement,
      left: number,
      top: number,
      scale = 1,
      duration = 4.5,
    ) => {
      const star = document.createElement("div");
      star.className = "why-stars-shining-star";
      star.style.left = `${left}%`;
      star.style.top = `${top}%`;
      star.style.animationDuration = `${duration}s`;
      star.style.animationDelay = `${-Math.random() * duration}s`;
      star.style.transform = `translate(-50%, -50%) scale(${scale})`;
      star.innerHTML = `
        <div class="ray-h"></div>
        <div class="ray-v"></div>
        <div class="ray-d1"></div>
        <div class="ray-d2"></div>
        <div class="core"></div>
      `;
      layer.appendChild(star);
    };

    const spawnComet = () => {
      if (disposed) return;
      const comet = document.createElement("div");
      comet.className = "why-stars-comet";

      const fromLeft = Math.random() > 0.5;
      const startX = fromLeft ? -15 - Math.random() * 10 : 75 + Math.random() * 25;
      const startY = Math.random() * 38;

      const angle = fromLeft ? 18 + Math.random() * 16 : 150 + Math.random() * 16;
      const travelX = fromLeft ? 260 + Math.random() * 360 : -(260 + Math.random() * 360);
      const travelY = 90 + Math.random() * 180;
      const duration = 2.8 + Math.random() * 2.2;
      const length = 120 + Math.random() * 140;
      const thickness = 1.2 + Math.random() * 1.8;

      comet.style.left = `${startX}%`;
      comet.style.top = `${startY}%`;
      comet.style.setProperty("--angle", `${angle}deg`);
      comet.style.setProperty("--travel-x", `${travelX}px`);
      comet.style.setProperty("--travel-y", `${travelY}px`);
      comet.style.setProperty("--duration", `${duration}s`);
      comet.style.setProperty("--length", `${length}px`);
      comet.style.setProperty("--thickness", `${thickness}px`);

      cometLayer.appendChild(comet);
      scheduleTimeout(() => comet.remove(), duration * 1000 + 300);
    };

    const scheduleNextComet = () => {
      if (disposed) return;
      const delay = 5000 + Math.random() * 9000;
      scheduleTimeout(() => {
        spawnComet();
        if (Math.random() > 0.7) {
          scheduleTimeout(spawnComet, 600 + Math.random() * 1200);
        }
        scheduleNextComet();
      }, delay);
    };

    for (let i = 0; i < 90; i += 1) {
      createStar(smallLayer, {
        size: Math.random() * 1.8 + 0.8,
        duration: Math.random() * 5 + 3,
        variant: Math.random() > 0.8 ? "soft" : "",
      });
    }

    for (let i = 0; i < 36; i += 1) {
      const variants: Array<"" | "soft" | "blue" | "green"> = ["blue", "green", "soft", ""];
      createStar(midLayer, {
        size: Math.random() * 2.6 + 1.4,
        duration: Math.random() * 4 + 4,
        variant: variants[Math.floor(Math.random() * variants.length)],
      });
    }

    const shinePositions: Array<[number, number, number, number]> = [
      [18, 24, 1.1, 5.2],
      [34, 62, 0.9, 4.4],
      [52, 28, 1.35, 5.8],
      [68, 48, 1.05, 4.8],
      [82, 20, 0.85, 4.1],
      [76, 74, 1.2, 5.4],
    ];

    shinePositions.forEach(([left, top, scale, duration]) => {
      createShiningStar(shineLayer, left, top, scale, duration);
    });

    scheduleNextComet();

    return () => {
      disposed = true;
      timers.forEach((id) => window.clearTimeout(id));
      smallLayer.innerHTML = "";
      midLayer.innerHTML = "";
      shineLayer.innerHTML = "";
      cometLayer.innerHTML = "";
    };
  }, []);

  return (
    <Box
      aria-hidden
      sx={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        background:
          "radial-gradient(circle at 20% 20%, rgba(138, 180, 248, 0.08), transparent 18%), radial-gradient(circle at 80% 30%, rgba(123, 207, 159, 0.05), transparent 20%), radial-gradient(circle at 50% 75%, rgba(184, 208, 251, 0.05), transparent 28%), linear-gradient(180deg, rgba(13, 17, 23, 0.15), rgba(13, 17, 23, 0.25))",
        "& .why-stars-mist": {
          position: "absolute",
          inset: "-10%",
          background:
            "radial-gradient(circle at 30% 35%, rgba(138, 180, 248, 0.06), transparent 22%), radial-gradient(circle at 65% 40%, rgba(184, 208, 251, 0.04), transparent 18%), radial-gradient(circle at 55% 70%, rgba(123, 207, 159, 0.04), transparent 22%)",
          filter: "blur(30px)",
          opacity: 0.9,
          animation: "why-stars-mist-drift 18s ease-in-out infinite alternate",
        },
        "& .why-stars-star-layer, & .why-stars-comet-layer": {
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
        },
        "& .why-stars-star": {
          position: "absolute",
          borderRadius: "50%",
          background: "rgba(230, 237, 246, 0.9)",
          boxShadow:
            "0 0 6px rgba(230, 237, 246, 0.45), 0 0 12px rgba(184, 208, 251, 0.25)",
          opacity: 0.75,
          animation: "why-stars-twinkle linear infinite",
          willChange: "transform, opacity, filter",
        },
        "& .why-stars-star.soft": {
          background: "rgba(170, 184, 203, 0.75)",
          boxShadow: "0 0 4px rgba(170, 184, 203, 0.22), 0 0 8px rgba(138, 180, 248, 0.12)",
        },
        "& .why-stars-star.blue": {
          background: "rgba(184, 208, 251, 0.92)",
          boxShadow: "0 0 8px rgba(184, 208, 251, 0.45), 0 0 16px rgba(138, 180, 248, 0.24)",
        },
        "& .why-stars-star.green": {
          background: "rgba(161, 223, 185, 0.9)",
          boxShadow: "0 0 8px rgba(161, 223, 185, 0.36), 0 0 14px rgba(123, 207, 159, 0.18)",
        },
        "& .why-stars-shining-star": {
          position: "absolute",
          width: "18px",
          height: "18px",
          transform: "translate(-50%, -50%)",
          animation: "why-stars-pulse 4s ease-in-out infinite",
        },
        "& .why-stars-shining-star .core": {
          position: "absolute",
          left: "50%",
          top: "50%",
          width: "6px",
          height: "6px",
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background: "rgba(230, 237, 246, 0.98)",
          boxShadow: "0 0 10px rgba(230, 237, 246, 0.8), 0 0 22px rgba(184, 208, 251, 0.36)",
        },
        "& .why-stars-shining-star .ray-h, & .why-stars-shining-star .ray-v, & .why-stars-shining-star .ray-d1, & .why-stars-shining-star .ray-d2":
          {
            position: "absolute",
            left: "50%",
            top: "50%",
            transformOrigin: "center",
            borderRadius: "999px",
            opacity: 0.9,
            filter: "blur(0.2px)",
          },
        "& .why-stars-shining-star .ray-h": {
          width: "26px",
          height: "1.5px",
          transform: "translate(-50%, -50%)",
          background:
            "linear-gradient(90deg, transparent, rgba(184, 208, 251, 0.15), rgba(230, 237, 246, 0.95), rgba(184, 208, 251, 0.15), transparent)",
        },
        "& .why-stars-shining-star .ray-v": {
          width: "1.5px",
          height: "26px",
          transform: "translate(-50%, -50%)",
          background:
            "linear-gradient(180deg, transparent, rgba(184, 208, 251, 0.15), rgba(230, 237, 246, 0.95), rgba(184, 208, 251, 0.15), transparent)",
        },
        "& .why-stars-shining-star .ray-d1, & .why-stars-shining-star .ray-d2": {
          width: "20px",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, rgba(161, 223, 185, 0.12), rgba(184, 208, 251, 0.7), rgba(161, 223, 185, 0.12), transparent)",
        },
        "& .why-stars-shining-star .ray-d1": {
          transform: "translate(-50%, -50%) rotate(45deg)",
        },
        "& .why-stars-shining-star .ray-d2": {
          transform: "translate(-50%, -50%) rotate(-45deg)",
        },
        "& .why-stars-comet": {
          position: "absolute",
          width: "var(--length, 180px)",
          height: "var(--thickness, 2px)",
          transform: "rotate(var(--angle, -25deg))",
          transformOrigin: "left center",
          opacity: 0,
          willChange: "transform, opacity",
          animation: "why-stars-comet-fly var(--duration, 5s) ease-out forwards",
          filter: "drop-shadow(0 0 8px rgba(184, 208, 251, 0.28))",
        },
        "& .why-stars-comet::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          borderRadius: "999px",
          background:
            "linear-gradient(to left, rgba(230, 237, 246, 0.98) 0%, rgba(184, 208, 251, 0.78) 10%, rgba(138, 180, 248, 0.38) 28%, rgba(123, 207, 159, 0.12) 52%, transparent 100%)",
          boxShadow: "0 0 10px rgba(184, 208, 251, 0.34), 0 0 20px rgba(138, 180, 248, 0.18)",
        },
        "& .why-stars-comet::after": {
          content: '""',
          position: "absolute",
          left: "calc(100% + 2px)",
          top: "50%",
          width: "8px",
          height: "8px",
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background: "rgba(230, 237, 246, 0.98)",
          boxShadow: "0 0 10px rgba(230, 237, 246, 0.9), 0 0 20px rgba(184, 208, 251, 0.35)",
        },
        "& .why-stars-vignette": {
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at center, transparent 50%, rgba(13, 17, 23, 0.16) 78%, rgba(13, 17, 23, 0.34) 100%)",
        },
        "@keyframes why-stars-twinkle": {
          "0%, 100%": { opacity: 0.18, transform: "scale(0.8)" },
          "25%": { opacity: 0.65, transform: "scale(1)" },
          "50%": { opacity: 1, transform: "scale(1.18)" },
          "75%": { opacity: 0.5, transform: "scale(0.95)" },
        },
        "@keyframes why-stars-pulse": {
          "0%, 100%": { opacity: 0.5, transform: "translate(-50%, -50%) scale(0.9)" },
          "50%": { opacity: 1, transform: "translate(-50%, -50%) scale(1.22)" },
        },
        "@keyframes why-stars-mist-drift": {
          "0%": { transform: "translate3d(-1.5%, -1%, 0) scale(1)" },
          "100%": { transform: "translate3d(-1.5%, 1%, 0) scale(1.05)" },
        },
        "@keyframes why-stars-comet-fly": {
          "0%": {
            opacity: 0,
            transform: "translate3d(0, 0, 0) rotate(var(--angle, -25deg)) scaleX(0.8)",
          },
          "8%": { opacity: 1 },
          "70%": { opacity: 0.95 },
          "100%": {
            opacity: 0,
            transform:
              "translate3d(var(--travel-x, 420px), var(--travel-y, 180px), 0) rotate(var(--angle, -25deg)) scaleX(1)",
          },
        },
        "@media (prefers-reduced-motion: reduce)": {
          "& .why-stars-mist, & .why-stars-star, & .why-stars-shining-star, & .why-stars-comet": {
            animation: "none !important",
          },
        },
      }}
    >
      <Box className="why-stars-mist" />
      <Box className="why-stars-star-layer" ref={smallLayerRef} />
      <Box className="why-stars-star-layer" ref={midLayerRef} />
      <Box className="why-stars-star-layer" ref={shineLayerRef} />
      <Box className="why-stars-comet-layer" ref={cometLayerRef} />
      <Box className="why-stars-vignette" />
    </Box>
  );
}
