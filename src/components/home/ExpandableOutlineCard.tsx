"use client";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { type MouseEvent, type ReactNode } from "react";

const ctaSelector = "[data-expandable-card-cta]";

export type ExpandableOutlineCardProps = {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  triggerId: string;
  panelId: string;
  /** Stagger index for the entrance animation delay. */
  staggerIndex: number;
  children: ReactNode;
};

/**
 * Outlined card with accent top bar, hover lift, and an animated expand/collapse region
 * (grid 0fr/1fr). Use `data-expandable-card-cta` on links/buttons that should not
 * trigger toggle when activated.
 */
export function ExpandableOutlineCard({
  title,
  isOpen,
  onToggle,
  triggerId,
  panelId,
  staggerIndex,
  children,
}: ExpandableOutlineCardProps) {
  const handleCardContentClick = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest(ctaSelector)) return;
    onToggle();
  };

  return (
    <Card
      variant="outlined"
      sx={{
        position: "relative",
        overflow: "hidden",
        opacity: 0,
        animation: "home-service-card-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        animationDelay: `${staggerIndex * 65}ms`,
        transition:
          "transform 260ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 260ms ease, border-color 260ms ease",
        "&::before": {
          content: '""',
          position: "absolute",
          insetInline: 0,
          top: 0,
          height: 4,
          background:
            "linear-gradient(90deg, rgba(123, 207, 159, 0.95) 0%, rgba(138, 180, 248, 1) 38%, rgba(184, 208, 251, 0.95) 72%, rgba(123, 207, 159, 0.85) 100%)",
          backgroundSize: "200% 100%",
          transition: "filter 260ms ease, background-position 400ms ease",
        },
        "&:hover": {
          transform: "translateY(-4px)",
          borderColor: "primary.light",
          boxShadow: 4,
          "&::before": {
            animation: "home-service-top-bar 3.5s ease-in-out infinite",
            filter: "brightness(1.12)",
          },
        },
        "&:focus-within": {
          borderColor: "primary.light",
          boxShadow: 4,
          transform: "translateY(-2px)",
          "&::before": {
            filter: "brightness(1.08)",
          },
        },
        "@media (prefers-reduced-motion: reduce)": {
          opacity: 1,
          animation: "none",
          transition: "box-shadow 180ms ease, border-color 180ms ease",
          "&:hover": {
            transform: "none",
            "&::before": { animation: "none" },
          },
          "&:focus-within": {
            transform: "none",
          },
        },
      }}
    >
      <CardContent onClick={handleCardContentClick} sx={{ cursor: "pointer" }}>
        <Box sx={{ display: "block" }}>
          {/*
           Native <details> hides non-summary content with display:none when closed,
           which prevents grid-template-rows height transitions from running.
          */}
          <Box
            component="button"
            type="button"
            id={triggerId}
            aria-expanded={isOpen}
            aria-controls={panelId}
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
            sx={{
              width: "100%",
              textAlign: "inherit",
              background: "none",
              border: "none",
              padding: 0,
              margin: 0,
              font: "inherit",
              color: isOpen ? "primary.light" : "text.primary",
              cursor: "pointer",
              userSelect: "none",
              fontSize: "1rem",
              fontWeight: 650,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1,
              transition: "color 220ms ease",
              "&:focus-visible": {
                outlineOffset: 2,
              },
            }}
          >
            <span>{title}</span>
            <Box
              component="span"
              aria-hidden
              sx={{
                color: "text.secondary",
                fontSize: "0.9rem",
                transition: "transform 260ms cubic-bezier(0.22, 1, 0.36, 1)",
                transform: isOpen ? "rotate(180deg)" : "none",
                "@media (prefers-reduced-motion: reduce)": {
                  transition: "none",
                },
              }}
            >
              ▼
            </Box>
          </Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateRows: isOpen ? "1fr" : "0fr",
              transition: "grid-template-rows 360ms cubic-bezier(0.22, 1, 0.36, 1)",
              overflow: "hidden",
              "@media (prefers-reduced-motion: reduce)": {
                transition: "none",
              },
            }}
          >
            <Box
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              {...(!isOpen ? { inert: true as const } : {})}
              sx={{
                minHeight: 0,
                overflow: "hidden",
                borderTop: 1,
                borderColor: "divider",
                opacity: isOpen ? 1 : 0,
                transition: "opacity 240ms ease",
                transitionDelay: isOpen ? "80ms" : "0ms",
                "@media (prefers-reduced-motion: reduce)": {
                  transition: "none",
                  transitionDelay: "0ms",
                },
              }}
            >
              <Box sx={{ pt: 1.25 }}>{children}</Box>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
