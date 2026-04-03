import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import type { PackageEntry } from "./types";

export function TierColumn({ offer }: { offer: PackageEntry }) {
  if (!offer.tiers) return null;

  return (
    <Stack
      spacing={1.5}
      component="ul"
      sx={{
        listStyle: "none",
        p: 0,
        m: 0,
        alignItems: { xs: "stretch", sm: "flex-end" },
        textAlign: { xs: "start", sm: "end" },
        width: { xs: "100%", sm: "fit-content" },
        maxWidth: "100%",
      }}
    >
      {offer.tiers.map((tier) => (
        <Box
          key={tier.name}
          component="li"
          sx={{
            pb: 1.5,
            borderBottom: 1,
            borderColor: "divider",
            width: { xs: "100%", sm: "auto" },
            "&:last-of-type": { borderBottom: 0, pb: 0 },
          }}
        >
          <Typography variant="subtitle2" fontWeight={650}>
            {tier.name} — {tier.price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {tier.detail}
          </Typography>
        </Box>
      ))}
    </Stack>
  );
}
