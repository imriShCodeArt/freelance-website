import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import type { PackagesCopy } from "./types";

export function PackageAddOnsBlock({
  addOns,
  addOnsTitle,
}: Pick<PackagesCopy, "addOns" | "addOnsTitle">) {
  return (
    <Stack spacing={2}>
      <Typography variant="h5" component="h3" fontWeight={650}>
        {addOnsTitle}
      </Typography>
      <Box
        component="ul"
        sx={{
          m: 0,
          p: 0,
          display: "grid",
          gap: 2,
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          listStyle: "none",
        }}
      >
        {addOns.map((addon) => (
          <Box
            key={addon.title}
            component="li"
            sx={{
              p: 2,
              borderRadius: 2,
              border: 1,
              borderColor: "divider",
              bgcolor: "action.hover",
            }}
          >
            <Typography variant="subtitle1" fontWeight={650}>
              {addon.title}
            </Typography>
            {addon.note ? (
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                {addon.note}
              </Typography>
            ) : null}
          </Box>
        ))}
      </Box>
    </Stack>
  );
}
