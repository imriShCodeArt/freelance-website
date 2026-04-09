import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";

import type { CaseStudyMeta } from "@/content/case-studies";
import type { Locale } from "@/lib/i18n/config";
import { withLocale } from "@/lib/i18n/paths";

export function FeaturedCaseStudyCard({
  locale,
  study,
  title,
  summary,
  kindLabel,
}: {
  locale: Locale;
  study: CaseStudyMeta;
  title: string;
  summary: string;
  kindLabel: string;
}) {
  return (
    <Link
      href={withLocale(locale, `/work/${study.slug}`)}
      style={{ textDecoration: "none", color: "inherit", display: "block", height: "100%" }}
    >
      <Card
        variant="outlined"
        sx={{
          height: "100%",
          transition: "box-shadow 0.2s ease, border-color 0.2s ease",
          "&:hover": {
            borderColor: "primary.light",
            boxShadow: 2,
          },
        }}
      >
        <CardContent>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 1 }}>
            <Chip label={kindLabel} size="small" variant="outlined" />
            {study.stack.slice(0, 3).map((tag) => (
              <Chip key={tag} label={tag} size="small" />
            ))}
          </Stack>
          <Typography variant="h6" component="h3" fontWeight={650} gutterBottom>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {summary}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}
