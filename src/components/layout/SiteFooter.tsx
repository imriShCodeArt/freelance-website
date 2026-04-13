import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { CopyEmailLink } from "@/components/ui";
import type { Messages } from "@/lib/i18n/static-messages";
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
  const f = messages.footer;
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
          alignItems={{ xs: "flex-start", sm: "flex-start" }}
        >
          <Box>
            <Typography component="p" variant="subtitle1" fontWeight={700} gutterBottom>
              {siteConfig.shortName}
            </Typography>
            <Typography variant="body2" color="text.secondary" maxWidth={360}>
              {f.tagline}
            </Typography>
          </Box>
          <Stack spacing={2} alignItems={{ xs: "flex-start", sm: "flex-end" }}>
            <Stack
              direction="row"
              component="nav"
              aria-label={f.navAriaLabel}
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
            <Stack
              direction="row"
              component="nav"
              aria-label={f.connectAriaLabel}
              flexWrap="wrap"
              useFlexGap
              spacing={2}
              sx={{ columnGap: 2, rowGap: 1 }}
            >
              <Link
                href={siteConfig.publicGithubUrl}
                target="_blank"
                rel="noopener noreferrer"
                color="text.secondary"
                variant="body2"
                fontWeight={500}
                underline="hover"
              >
                {f.github}
              </Link>
              {siteConfig.publicLinkedInUrl ? (
                <Link
                  href={siteConfig.publicLinkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  color="text.secondary"
                  variant="body2"
                  fontWeight={500}
                  underline="hover"
                >
                  {f.linkedin}
                </Link>
              ) : null}
              <CopyEmailLink
                email={siteConfig.publicContactEmail}
                copiedToast={messages.common.emailCopiedToast}
                copyFailedToast={messages.common.emailCopyFailedToast}
                ariaLabel={messages.common.copyEmailAriaLabel}
                color="text.secondary"
                variant="body2"
                fontWeight={500}
                underline="hover"
              >
                {f.email}
              </CopyEmailLink>
              <Link
                href={siteConfig.resumePath}
                download
                color="text.secondary"
                variant="body2"
                fontWeight={500}
                underline="hover"
              >
                {f.resume}
              </Link>
            </Stack>
          </Stack>
        </Stack>
        <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 4 }}>
          {messages.common.builtWith(siteConfig.shortName, year)}
        </Typography>
      </PageContainer>
    </Box>
  );
}
