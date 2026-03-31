import Typography from "@mui/material/Typography";

import PageContainer from "@/components/layout/PageContainer";
import Section from "@/components/layout/Section";

import type { HomeCopy } from "./section-types";

export function MidParagraphSection({ home }: { home: HomeCopy }) {
  return (
    <Section spacing="md">
      <PageContainer>
        <Typography variant="body1" maxWidth="65ch" fontSize="1.125rem">
          {home.midParagraph}
        </Typography>
      </PageContainer>
    </Section>
  );
}
