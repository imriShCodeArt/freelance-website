import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import type { CaseStudyMeta } from "@/content/case-studies";
import { getCaseStudyLocaleCopy } from "@/content/case-studies";
import Eyebrow from "@/components/layout/Eyebrow";
import PageContainer from "@/components/layout/PageContainer";
import Section from "@/components/layout/Section";
import type { Messages } from "@/lib/i18n/get-messages";
import type { Locale } from "@/lib/i18n/config";
import { withLocale } from "@/lib/i18n/paths";

import { StarsBgElm } from "../decor/StarsBgElm";
import { FeaturedCaseStudyCard } from "../featured-work/FeaturedCaseStudyCard";
import { LinkButton } from "@/components/ui/LinkButton";
import type { HomeCopy } from "./section-types";

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
    <Section spacing="lg" sx={{ position: "relative", overflow: "hidden" }}>
      <StarsBgElm />
      <PageContainer sx={{ position: "relative", zIndex: 1 }}>
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
            const copy = getCaseStudyLocaleCopy(study.slug, locale);
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
