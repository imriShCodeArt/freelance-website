"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useState, type MouseEvent } from "react";
import type { Messages } from "@/lib/i18n/get-messages";

type ServiceBlock = Messages["services"]["primary"][number];

export function BuildSectionServiceCards({
  scenarios,
  serviceDetails,
  buildLead,
  buildCta,
  servicesHref,
}: {
  scenarios: string[];
  serviceDetails: ServiceBlock[];
  buildLead: string;
  buildCta: string;
  servicesHref: string;
}) {
  const [openLabel, setOpenLabel] = useState<string | null>(null);

  return (
    <Grid container spacing={1.5}>
      {scenarios.map((label, index) => {
        const detail = serviceDetails.find((item) => item.title === label);
        const isOpen = openLabel === label;
        const panelId = `home-service-panel-${index}`;
        const triggerId = `home-service-trigger-${index}`;

        const toggleItem = () => {
          setOpenLabel((cur) => (cur === label ? null : label));
        };

        const handleCardContentClick = (e: MouseEvent<HTMLDivElement>) => {
          if ((e.target as HTMLElement).closest("[data-service-card-cta]")) return;
          toggleItem();
        };

        return (
          <Grid key={label} size={{ xs: 12 }}>
            <Card
              variant="outlined"
              sx={{
                position: "relative",
                overflow: "hidden",
                opacity: 0,
                animation:
                  "home-service-card-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards",
                animationDelay: `${index * 65}ms`,
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
              <CardContent
                onClick={handleCardContentClick}
                sx={{ cursor: "pointer" }}
              >
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
                    <span>{label}</span>
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
                      transition:
                        "grid-template-rows 360ms cubic-bezier(0.22, 1, 0.36, 1)",
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
                      <Box sx={{ pt: 1.25 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.25 }}>
                          {detail?.what ?? buildLead}
                        </Typography>
                        {detail?.get ? (
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1.25 }}>
                            {detail.get}
                          </Typography>
                        ) : null}
                        {detail?.examples?.length ? (
                          <Box
                            component="ul"
                            sx={{ mt: 0, mb: 1.25, pl: 2.25, color: "text.secondary" }}
                          >
                            {detail.examples.slice(0, 3).map((ex) => (
                              <Typography key={ex} component="li" variant="body2" sx={{ mb: 0.5 }}>
                                {ex}
                              </Typography>
                            ))}
                          </Box>
                        ) : null}
                        <Link
                          href={servicesHref}
                          data-service-card-cta
                          onClick={(e) => e.stopPropagation()}
                          style={{ textDecoration: "none", display: "inline-flex" }}
                          aria-label={`${label} - ${buildCta}`}
                        >
                          <Button
                            component="span"
                            variant="text"
                            size="small"
                            color="primary"
                            sx={{ px: 0 }}
                          >
                            {buildCta} →
                          </Button>
                        </Link>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}
