import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "next/link";

import type { BuildSectionServiceBlock } from "./buildSectionServiceTypes";
import { EXPANDABLE_CARD_CTA_DATA_ATTR } from "./expandableCardConstants";

export function ServiceCardExpandedBody({
  detail,
  buildLead,
  buildCta,
  servicesHref,
  label,
}: {
  detail: BuildSectionServiceBlock | undefined;
  buildLead: string;
  buildCta: string;
  servicesHref: string;
  label: string;
}) {
  return (
    <>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1.25 }}>
        {detail?.what ?? buildLead}
      </Typography>
      {detail?.get ? (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.25 }}>
          {detail.get}
        </Typography>
      ) : null}
      {detail?.examples?.length ? (
        <Box component="ul" sx={{ mt: 0, mb: 1.25, pl: 2.25, color: "text.secondary" }}>
          {detail.examples.slice(0, 3).map((ex) => (
            <Typography key={ex} component="li" variant="body2" sx={{ mb: 0.5 }}>
              {ex}
            </Typography>
          ))}
        </Box>
      ) : null}
      <Link
        href={servicesHref}
        {...{ [EXPANDABLE_CARD_CTA_DATA_ATTR]: "" }}
        style={{ textDecoration: "none", display: "inline-flex" }}
        aria-label={`${label} - ${buildCta}`}
      >
        <Button component="span" variant="text" size="small" color="primary" sx={{ px: 0 }}>
          {buildCta} →
        </Button>
      </Link>
    </>
  );
}
