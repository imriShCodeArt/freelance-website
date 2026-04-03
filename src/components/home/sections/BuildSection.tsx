import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import Eyebrow from "@/components/layout/Eyebrow";
import PageContainer from "@/components/layout/PageContainer";
import Section from "@/components/layout/Section";
import { withLocale } from "@/lib/i18n/paths";

import { BuildSectionServiceCards } from "./";
import type { SectionProps, ServicesCopy } from "./section-types";

export function BuildSection({
  home,
  locale,
  services,
}: SectionProps & { services: ServicesCopy }) {
  const servicesHref = withLocale(locale, "/services");
  const serviceDetails = [...services.primary, ...services.supporting];
  return (
    <Section spacing="lg" sx={{ bgcolor: "background.paper" }}>
      <PageContainer>
        <Stack spacing={1} sx={{ mb: 4 }}>
          <Eyebrow>{home.buildEyebrow}</Eyebrow>
          <Typography variant="h4" component="h2" fontWeight={700}>
            {home.buildTitle}
          </Typography>
          <Typography variant="body1" color="text.secondary" maxWidth="50ch">
            {home.buildLead}
          </Typography>
        </Stack>
        <BuildSectionServiceCards
          scenarios={home.scenarios}
          serviceDetails={serviceDetails}
          buildLead={home.buildLead}
          buildCta={home.buildCta}
          servicesHref={servicesHref}
        />
      </PageContainer>
    </Section>
  );
}
