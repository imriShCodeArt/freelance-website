import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { LinkButton } from "@/components/ui/LinkButton";

import { SequentialPhaseBody } from "./SequentialPhaseBody";
import { TierColumn } from "./TierColumn";
import type { PackageEntry, PackagesCopy } from "./types";
import { WhatYouGetBlock } from "./WhatYouGetBlock";

export function PackageOfferCard({
  offer,
  labels,
  contactHref,
  phaseStep,
}: {
  offer: PackageEntry;
  labels: PackagesCopy;
  contactHref: string;
  phaseStep?: number;
}) {
  const stepLabel =
    phaseStep !== undefined ? labels.pathStepProgress(phaseStep) : undefined;
  const hasTiers = Boolean(offer.tiers);

  return (
    <Box
      component="article"
      sx={{
        height: "100%",
        p: { xs: 2.5, md: 3 },
        borderRadius: 2,
        border: 1,
        borderColor: "divider",
        bgcolor: "background.paper",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {stepLabel ? (
        <Box
          sx={{
            alignSelf: "flex-start",
            px: 1.25,
            py: 0.5,
            borderRadius: 1,
            bgcolor: "primary.main",
            color: "primary.contrastText",
          }}
        >
          <Typography
            variant="caption"
            fontWeight={700}
            component="p"
            sx={{ m: 0 }}
          >
            {stepLabel}
          </Typography>
        </Box>
      ) : null}

      <Stack spacing={0.5}>
        <Typography variant="h6" component="h3" fontWeight={650}>
          {offer.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {offer.subtitle}
        </Typography>
      </Stack>

      {hasTiers ? (
        <Grid
          container
          spacing={2}
          sx={{ flex: 1, alignContent: "flex-start" }}
        >
          <Grid size={{ xs: 12, md: 6 }}>
            <WhatYouGetBlock offer={offer} labels={labels} />
          </Grid>
          <Grid
            size={{ xs: 12, md: 6 }}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: { xs: "stretch", md: "flex-end" },
            }}
          >
            <TierColumn offer={offer} />
          </Grid>
        </Grid>
      ) : (
        <SequentialPhaseBody offer={offer} labels={labels} />
      )}

      <Box sx={{ mt: "auto", pt: 1 }}>
        <LinkButton href={contactHref} variant="outlined" fullWidthMobile>
          {offer.cta}
        </LinkButton>
      </Box>
    </Box>
  );
}
