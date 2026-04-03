import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import type { PackageEntry, PackagesCopy } from "./types";

/** Discovery / MVP / Production: “What you get” + timeline on one row, list full width below. */
export function SequentialPhaseBody({
  offer,
  labels,
}: {
  offer: PackageEntry;
  labels: PackagesCopy;
}) {
  return (
    <Box sx={{ minWidth: 0 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="flex-end"
        spacing={2}
        sx={{
          flexWrap: "wrap",
          columnGap: 2,
          rowGap: 0.5,
        }}
      >
        <Typography
          variant="overline"
          component="p"
          color="secondary"
          fontWeight={700}
          letterSpacing="0.08em"
          sx={{ m: 0, flex: "1 1 auto" }}
        >
          {labels.whatYouGetLabel}
        </Typography>
        {offer.timeline ? (
          <Typography
            variant="body2"
            component="p"
            sx={{
              m: 0,
              flex: "0 1 auto",
              textAlign: { xs: "start", sm: "end" },
            }}
          >
            <Box component="span" fontWeight={600}>
              {labels.timelineLabel}:{" "}
            </Box>
            {offer.timeline}
          </Typography>
        ) : null}
      </Stack>
      <Box component="ul" sx={{ m: 0, pl: 2.25, mt: 1 }}>
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
