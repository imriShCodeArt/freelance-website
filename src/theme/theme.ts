import { createTheme } from "@mui/material/styles";
import type { Locale } from "@/lib/i18n/config";

const base = {
  cssVariables: true,
  palette: {
    mode: "light" as const,
    primary: {
      main: "#1c2e45",
      light: "#2d4a6f",
      dark: "#121f30",
      contrastText: "#fafbfc",
    },
    secondary: {
      main: "#3d5a4a",
      light: "#527a63",
      dark: "#2c4034",
    },
    background: {
      default: "#f6f7f9",
      paper: "#ffffff",
    },
    text: {
      primary: "#14181f",
      secondary: "#4a5568",
    },
    divider: "rgba(20, 24, 31, 0.08)",
  },
  shape: {
    borderRadius: 10,
  },
  typography: {
    h1: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
      lineHeight: 1.15,
    },
    h2: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
      lineHeight: 1.2,
    },
    h3: {
      fontWeight: 650,
      letterSpacing: "-0.015em",
      lineHeight: 1.25,
    },
    h4: {
      fontWeight: 650,
      letterSpacing: "-0.01em",
    },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    body1: {
      lineHeight: 1.65,
    },
    body2: {
      lineHeight: 1.6,
    },
    button: {
      textTransform: "none" as const,
      fontWeight: 600,
      letterSpacing: "0.01em",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          paddingInline: 20,
        },
        sizeLarge: {
          paddingBlock: 12,
          fontSize: "1rem",
        },
      },
    },
    MuiLink: {
      defaultProps: {
        underline: "hover" as const,
      },
    },
  },
};

export function createAppTheme(options: {
  direction: "ltr" | "rtl";
  locale: Locale;
}) {
  const fontStack =
    options.locale === "he"
      ? "var(--font-noto-sans), system-ui, sans-serif"
      : "var(--font-geist-sans), system-ui, sans-serif";

  return createTheme({
    ...base,
    direction: options.direction,
    typography: {
      ...base.typography,
      fontFamily: fontStack,
    },
  });
}

/** Default theme (English LTR); prefer `createAppTheme` in the app shell. */
const theme = createAppTheme({ direction: "ltr", locale: "en" });
export default theme;
