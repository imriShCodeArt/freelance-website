import Box from "@mui/material/Box";
import type { Locale } from "@/lib/i18n/config";
import type { Messages } from "@/lib/i18n/static-messages";
import { getMainNav } from "@/lib/navigation";
import { siteConfig } from "@/lib/site-config";
import SiteFooter from "./SiteFooter";
import SiteHeader from "./SiteHeader";
import SiteMainStarsBackdrop from "./SiteMainStarsBackdrop";

export default function SiteShell({
  locale,
  messages,
  children,
}: {
  locale: Locale;
  messages: Messages;
  children: React.ReactNode;
}) {
  const nav = getMainNav(locale, messages.nav);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.default",
      }}
    >
      <SiteHeader
        locale={locale}
        brandName={siteConfig.shortName}
        nav={nav}
        header={messages.header}
        localeSwitcher={messages.localeSwitcher}
      />
      <Box
        id="main-content"
        component="main"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <SiteMainStarsBackdrop />
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {children}
        </Box>
      </Box>
      <SiteFooter nav={nav} messages={messages} />
    </Box>
  );
}
