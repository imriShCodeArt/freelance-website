"use client";

import Box from "@mui/material/Box";
import { usePathname } from "next/navigation";
import { StarsBgElm } from "@/components/home/decor/StarsBgElm";
import { hasLocale } from "@/lib/i18n/config";

/** True for `/en`, `/he`, etc. — home already uses section-scoped stars. */
function isLocaleHomePath(pathname: string): boolean {
  const parts = pathname.split("/").filter(Boolean);
  return parts.length === 1 && hasLocale(parts[0]);
}

/** Full-bleed stars behind routed pages (not the locale home). */
export default function SiteMainStarsBackdrop() {
  const pathname = usePathname();
  if (isLocaleHomePath(pathname)) return null;

  return (
    <Box
      aria-hidden
      sx={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <StarsBgElm />
    </Box>
  );
}
