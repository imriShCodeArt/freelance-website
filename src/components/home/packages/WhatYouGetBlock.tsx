import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import type { PackageEntry, PackagesCopy } from "./types";

export function WhatYouGetBlock({
  offer,
  labels,
}: {
  offer: PackageEntry;
  labels: PackagesCopy;
}) {
  return (
    <Box sx={{ minWidth: 0 }}>
      <Typography
        variant="overline"
        component="p"
        color="secondary"
        fontWeight={700}
        letterSpacing="0.08em"
        sx={{ mb: 1 }}
      >
        {labels.whatYouGetLabel}
      </Typography>
      <Box component="ul" sx={{ m: 0, pl: 2.25 }}>
        {offer.items.map((item) => (
          <Typography
            key={item}
            component="li"
            variant="body2"
            color="text.secondary"
            sx={{ mb: 0.5 }}
          >
            {item}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}
