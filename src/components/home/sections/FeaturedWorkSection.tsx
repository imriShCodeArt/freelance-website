import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import type { CaseStudyKind, CaseStudyMeta } from "@/content/case-studies";
import Eyebrow from "@/components/layout/Eyebrow";
import PageContainer from "@/components/layout/PageContainer";
import Section from "@/components/layout/Section";
import type { Messages } from "@/lib/i18n/get-messages";
import type { Locale } from "@/lib/i18n/config";
import { withLocale } from "@/lib/i18n/paths";

import { FeaturedCaseStudyCard } from "./FeaturedCaseStudyCard";
import { LinkButton } from "./LinkButton";
import type { CaseStudiesCopy, HomeCopy } from "./section-types";

export function FeaturedWorkSection({
  home,
  locale,
  messages,
  featured,
}: {
  home: HomeCopy;
  locale: Locale;
  messages: Messages;
  featured: CaseStudyMeta[];
}) {
  const workHref = withLocale(locale, "/work");
  return (
    <Section spacing="lg">
      <PageContainer>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "flex-end" }}
          spacing={2}
          sx={{ mb: 4 }}
        >
          <Box>
            <Eyebrow>{home.workEyebrow}</Eyebrow>
            <Typography variant="h4" component="h2" fontWeight={700}>
              {home.workTitle}
            </Typography>
            <Typography variant="body1" color="text.secondary" maxWidth={480}>
              {home.workLead}
            </Typography>
          </Box>
          <LinkButton href={workHref} variant="outlined">
            {home.workViewAll}
          </LinkButton>
        </Stack>
        <Grid container spacing={2}>
          {featured.map((study) => {
            const copy = messages.caseStudies[study.slug as keyof CaseStudiesCopy];
            return (
              <Grid key={study.slug} size={{ xs: 12, md: 6 }}>
                <FeaturedCaseStudyCard
                  locale={locale}
                  study={study}
                  copy={copy}
                  kindLabel={messages.caseStudyKind[study.kind as CaseStudyKind]}
                />
              </Grid>
            );
          })}
        </Grid>
      </PageContainer>
    </Section>
  );
}
