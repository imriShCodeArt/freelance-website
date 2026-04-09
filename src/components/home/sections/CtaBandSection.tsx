import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import PageContainer from "@/components/layout/PageContainer";
import Section from "@/components/layout/Section";
import { siteConfig } from "@/lib/site-config";
import { withLocale } from "@/lib/i18n/paths";

import { LinkButton } from "@/components/ui/LinkButton";
import type { SectionProps } from "./section-types";
import { WhySectionStarsBackground } from "../decor/WhySectionStarsBackground";

export function CtaBandSection({ home, locale }: SectionProps) {
  const contactHref = withLocale(locale, "/contact");
  const workHref = withLocale(locale, "/work");

  return (
    <Section spacing="lg" sx={{ position: "relative", overflow: "hidden" }}>
      <WhySectionStarsBackground />
      <PageContainer sx={{ position: "relative", zIndex: 1 }}>
        <Stack
          spacing={2}
          alignItems={{ xs: "stretch", sm: "flex-start" }}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 2,
            border: 1,
            borderColor: "divider",
            bgcolor: "background.paper",
          }}
        >
          <Typography variant="h4" component="h2" fontWeight={700}>
            {home.ctaBandTitle}
          </Typography>
          <Typography variant="body1" color="text.secondary" maxWidth="50ch">
            {home.ctaBandBody}
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            useFlexGap
            flexWrap="wrap"
            sx={{ alignSelf: { xs: "stretch", sm: "flex-start" }, pt: 0.5 }}
          >
            <Box sx={{ alignSelf: { xs: "stretch", sm: "flex-start" } }}>
              <LinkButton href={contactHref} variant="contained" fullWidthMobile>
                {home.ctaBandPrimary}
              </LinkButton>
            </Box>
            <Box sx={{ alignSelf: { xs: "stretch", sm: "flex-start" } }}>
              <LinkButton href={workHref} variant="outlined" fullWidthMobile>
                {home.ctaBandProjects}
              </LinkButton>
            </Box>
            {siteConfig.publicLinkedInUrl ? (
              <Button
                component="a"
                href={siteConfig.publicLinkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                color="primary"
                size="large"
                sx={{ width: { xs: "100%", sm: "auto" } }}
              >
                {home.ctaBandLinkedIn}
              </Button>
            ) : null}
          </Stack>
        </Stack>
      </PageContainer>
    </Section>
  );
}
