"use client";

import * as React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { createAppTheme } from "@/theme/theme";
import type { Locale } from "@/lib/i18n/config";

export default function ThemeRegistry({
  children,
  direction,
  locale,
}: {
  children: React.ReactNode;
  direction: "ltr" | "rtl";
  locale: Locale;
}) {
  const theme = React.useMemo(
    () => createAppTheme({ direction, locale }),
    [direction, locale],
  );

  return (
    <AppRouterCacheProvider
      key={direction}
      options={{
        key: "mui",
        ...(direction === "rtl" ? { stylisPlugins: [rtlPlugin] } : {}),
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
