import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import Eyebrow from "@/components/layout/Eyebrow";
import PageContainer from "@/components/layout/PageContainer";
import Section from "@/components/layout/Section";
import type { Messages } from "@/lib/i18n/get-messages";

import type { HomeCopy } from "./section-types";

export function RealUseSection({
  home,
  messages,
}: {
  home: HomeCopy;
  messages: Messages;
}) {
  return (
    <Section spacing="md" sx={{ bgcolor: "background.paper", borderBlock: 1, borderColor: "divider" }}>
      <PageContainer>
        <Grid container spacing={4} alignItems="center">
          <Grid size={{ xs: 12, md: 7 }}>
            <Eyebrow>{home.realUseEyebrow}</Eyebrow>
            <Typography variant="h4" component="h2" gutterBottom fontWeight={700}>
              {home.realUseTitle}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              {home.realUseP1}
            </Typography>
            <Typography variant="body2" color="text.secondary" component="div">
              {messages.common.typicalStackLead}{" "}
              <Stack
                direction="row"
                component="div"
                flexWrap="wrap"
                useFlexGap
                gap={0.75}
                sx={{ display: "inline-flex", verticalAlign: "middle", maxWidth: "100%", my: 0.5 }}
              >
                {home.stack.map((tech) => (
                  <Chip
                    key={tech}
                    label={tech}
                    color="primary"
                    size="small"
                    variant="outlined"
                    sx={{
                      fontFamily: "var(--font-geist-mono), monospace",
                      fontSize: "0.8125rem",
                      height: 26,
                      fontWeight: 700,
                      px: ".25em",
                    }}
                  />
                ))}
              </Stack>
              <br />
              {messages.common.typicalStackTrail}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}>
            <Card variant="outlined" sx={{ bgcolor: "background.default" }}>
              <CardContent>
                <Typography component="p" variant="subtitle2" color="text.secondary" gutterBottom>
                  {home.cardTypicalEngagements}
                </Typography>
                <Typography variant="body2" paragraph>
                  {home.strengthsCardBody}
                </Typography>
                <Typography component="p" variant="subtitle2" color="text.secondary" gutterBottom>
                  {home.cardBestFit}
                </Typography>
                <Typography variant="body2">{home.cardBestFitBody}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </PageContainer>
    </Section>
  );
}
