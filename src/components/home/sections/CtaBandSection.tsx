import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import PageContainer from "@/components/layout/PageContainer";
import Section from "@/components/layout/Section";
import { withLocale } from "@/lib/i18n/paths";

import { LinkButton } from "./LinkButton";
import type { SectionProps } from "./section-types";
import { WhySectionStarsBackground } from "./WhySectionStarsBackground";

export function CtaBandSection({ home, locale }: SectionProps) {
  const contactHref = withLocale(locale, "/contact");
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
          <Box sx={{ alignSelf: { xs: "stretch", sm: "flex-start" } }}>
            <LinkButton href={contactHref} variant="contained" fullWidthMobile>
              {home.ctaBandButton}
            </LinkButton>
          </Box>
        </Stack>
      </PageContainer>
    </Section>
  );
}
