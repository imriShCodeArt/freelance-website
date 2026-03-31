import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import Eyebrow from "@/components/layout/Eyebrow";
import PageContainer from "@/components/layout/PageContainer";
import Section from "@/components/layout/Section";

import type { HomeCopy } from "./section-types";

export function FitSection({ home }: { home: HomeCopy }) {
  return (
    <Section spacing="lg" sx={{ bgcolor: "background.paper", borderTop: 1, borderColor: "divider" }}>
      <PageContainer>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Eyebrow>{home.fitEyebrow}</Eyebrow>
            <Typography variant="h5" component="h2" fontWeight={700} gutterBottom>
              {home.fitTitle}
            </Typography>
            <Box component="ul" sx={{ m: 0, pl: 2.25, color: "text.secondary", "& li": { mb: 1 } }}>
              {home.fitBullets.map((line) => (
                <Typography key={line} component="li" variant="body1">
                  {line}
                </Typography>
              ))}
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Eyebrow>{home.fitHonestyEyebrow}</Eyebrow>
            <Typography variant="h5" component="h2" fontWeight={700} gutterBottom>
              {home.notFitTitle}
            </Typography>
            <Box component="ul" sx={{ m: 0, pl: 2.25, color: "text.secondary", "& li": { mb: 1 } }}>
              {home.notFitBullets.map((line) => (
                <Typography key={line} component="li" variant="body1">
                  {line}
                </Typography>
              ))}
            </Box>
          </Grid>
        </Grid>
      </PageContainer>
    </Section>
  );
}
