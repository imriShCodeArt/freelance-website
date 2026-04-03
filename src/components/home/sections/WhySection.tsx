import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import Eyebrow from "@/components/layout/Eyebrow";
import PageContainer from "@/components/layout/PageContainer";
import Section from "@/components/layout/Section";

import type { HomeCopy } from "./section-types";

export function WhySection({ home }: { home: HomeCopy }) {
  return (
    <Section spacing="lg" sx={{ bgcolor: "background.paper" }}>
      <PageContainer>
        <Eyebrow>{home.whyEyebrow}</Eyebrow>
        <Typography variant="h4" component="h2" fontWeight={700} gutterBottom>
          {home.whyTitle}
        </Typography>
        <Typography variant="body1" color="text.secondary" maxWidth="55ch" sx={{ mb: 4 }}>
          {home.whyLead}
        </Typography>
        <Grid container spacing={2}>
          {home.differentiators.map((item) => (
            <Grid key={item.title} size={{ xs: 12, sm: 6 }}>
              <Card variant="outlined" sx={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="subtitle1" component="h3" fontWeight={650} gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.body}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </PageContainer>
    </Section>
  );
}
