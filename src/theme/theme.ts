import { createTheme } from "@mui/material/styles";
import type { Locale } from "@/lib/i18n/config";

const base = {
  cssVariables: true,
  palette: {
    mode: "dark" as const,
    primary: {
      main: "#8ab4f8",
      light: "#b8d0fb",
      dark: "#5f8dd8",
      contrastText: "#07111f",
    },
    secondary: {
      main: "#7bcf9f",
      light: "#a1dfb9",
      dark: "#4ea877",
    },
    background: {
      default: "#0d1117",
      paper: "#141b25",
    },
    text: {
      primary: "#e6edf6",
      secondary: "#aab8cb",
    },
    divider: "rgba(170, 184, 203, 0.22)",
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
        contained: {
          backgroundImage: "linear-gradient(135deg, #5f8dd8 0%, #8ab4f8 75%, #b8d0fb 100%)",
          boxShadow: "0 6px 18px rgba(95, 141, 216, 0.32)",
          "&:hover": {
            backgroundImage: "linear-gradient(135deg, #557fc5 0%, #7ea9f4 55%, #acc7fa 100%)",
            boxShadow: "0 10px 24px rgba(95, 141, 216, 0.4)",
          },
          "&:active": {
            backgroundImage: "linear-gradient(135deg, #4a73b3 0%, #7099e4 52%, #9ebbf4 100%)",
          },
          "&.Mui-disabled": {
            backgroundImage: "none",
          },
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
