import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import type { CaseStudyMeta } from "@/content/case-studies";
import { getCaseStudyLocaleCopy } from "@/lib/content/case-studies-access";
import Eyebrow from "@/components/layout/Eyebrow";
import PageContainer from "@/components/layout/PageContainer";
import Section from "@/components/layout/Section";
import type { Messages } from "@/lib/i18n/static-messages";
import type { Locale } from "@/lib/i18n/config";
import { withLocale } from "@/lib/i18n/paths";

import { FeaturedCaseStudyCard } from "../featured-work/FeaturedCaseStudyCard";
import { LinkButton } from "@/components/ui/LinkButton";
import type { HomeCopy } from "./section-types";

export async function FeaturedWorkSection({
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
  const workHref = withLocale(locale, "/projects");
  const cards = await Promise.all(
    featured.map(async (study) => {
      const copy = await getCaseStudyLocaleCopy(study.slug, locale);
      return { study, copy };
    }),
  );
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
          {cards.map(({ study, copy }) => {
            if (!copy) return null;
            return (
              <Grid key={study.slug} size={{ xs: 12, md: 6 }}>
                <FeaturedCaseStudyCard
                  locale={locale}
                  study={study}
                  title={copy.title}
                  summary={copy.summary}
                  kindLabel={messages.caseStudyKind[study.kind]}
                />
              </Grid>
            );
          })}
        </Grid>
      </PageContainer>
    </Section>
  );
}
