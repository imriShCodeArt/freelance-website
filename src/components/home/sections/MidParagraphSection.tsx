import Typography from "@mui/material/Typography";

import PageContainer from "@/components/layout/PageContainer";
import Section from "@/components/layout/Section";

import { StarsBgElm } from "../decor/StarsBgElm";
import type { HomeCopy } from "./section-types";

export function MidParagraphSection({ home }: { home: HomeCopy }) {
  return (
    <Section spacing="md" sx={{ position: "relative", overflow: "hidden" }}>
      <StarsBgElm />
      <PageContainer sx={{ position: "relative", zIndex: 1 }}>
        <Typography variant="body1" maxWidth="65ch" fontSize="1.125rem">
          {home.midParagraph}
        </Typography>
      </PageContainer>
    </Section>
  );
}
