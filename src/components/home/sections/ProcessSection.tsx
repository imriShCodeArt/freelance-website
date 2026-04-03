import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import Eyebrow from "@/components/layout/Eyebrow";
import PageContainer from "@/components/layout/PageContainer";
import Section from "@/components/layout/Section";

import type { HomeCopy } from "./section-types";

export function ProcessSection({
  home,
  stepPrefix,
}: {
  home: HomeCopy;
  stepPrefix: string;
}) {
  return (
    <Section spacing="lg" sx={{ bgcolor: "background.paper" }}>
      <PageContainer>
        <Eyebrow>{home.processEyebrow}</Eyebrow>
        <Typography variant="h4" component="h2" fontWeight={700} gutterBottom>
          {home.processTitle}
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          maxWidth="56ch"
          sx={{ mb: 2 }}
        >
          {home.processSubtitle}
        </Typography>
        <Grid container spacing={3} sx={{ mt: 1 }}>
          {home.processSteps.map((step) => (
            <Grid key={step.step} size={{ xs: 12, md: 4 }}>
              <Stack spacing={1}>
                <Typography variant="overline" color="secondary" fontWeight={700} letterSpacing="0.08em">
                  {stepPrefix} {step.step}
                </Typography>
                <Typography variant="h6" component="h3" fontWeight={650}>
                  {step.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {step.body}
                </Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </PageContainer>
    </Section>
  );
}
