import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { Messages } from "@/lib/i18n/get-messages";
import { siteConfig } from "@/lib/site-config";
import type { NavItem } from "@/lib/navigation";
import PageContainer from "./PageContainer";
import RouterLink from "./RouterLink";

export default function SiteFooter({
  nav,
  messages,
}: {
  nav: NavItem[];
  messages: Messages;
}) {
  const year = new Date().getFullYear();
  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        py: 6,
        borderTop: 1,
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <PageContainer>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={3}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
        >
          <Box>
            <Typography variant="subtitle1" fontWeight={700} gutterBottom>
              {siteConfig.shortName}
            </Typography>
            <Typography variant="body2" color="text.secondary" maxWidth={360}>
              {messages.footer.tagline}
            </Typography>
          </Box>
          <Stack
            direction="row"
            component="nav"
            aria-label={messages.footer.navAriaLabel}
            flexWrap="wrap"
            useFlexGap
            spacing={2}
            sx={{ columnGap: 2, rowGap: 1 }}
          >
            {nav.map((item) => (
              <RouterLink
                key={item.href}
                href={item.href}
                color="text.secondary"
                variant="body2"
                fontWeight={500}
              >
                {item.label}
              </RouterLink>
            ))}
          </Stack>
        </Stack>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: "block", mt: 4 }}
        >
          {messages.common.builtWith(siteConfig.shortName, year)}
        </Typography>
      </PageContainer>
    </Box>
  );
}
