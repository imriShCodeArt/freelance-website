"use client";

import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { useCopyEmailClipboard } from "./useCopyEmailClipboard";

function CopyIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"
      />
    </svg>
  );
}

type Props = {
  email: string;
  copiedToast: string;
  copyFailedToast: string;
  ariaLabel: string;
  /** Optional id of visible intro copy (e.g. “You can write to”) linked via `aria-describedby`. */
  ariaDescribedBy?: string;
};

export function CopyEmailField({
  email,
  copiedToast,
  copyFailedToast,
  ariaLabel,
  ariaDescribedBy,
}: Props) {
  const { copy, snackbarPortal } = useCopyEmailClipboard({
    email,
    copiedToast,
    copyFailedToast,
  });

  return (
    <>
      <TextField
        defaultValue={email}
        size="small"
        sx={{
          width: "fit-content",
          maxWidth: "100%",
          alignSelf: "flex-start",
          "& .MuiInputBase-root": { width: "fit-content" },
        }}
        slotProps={{
          htmlInput: {
            readOnly: true,
            /** Coarse width hint so the input collapses with the address text. */
            size: Math.max(email.length, 8),
            "aria-label": email,
            ...(ariaDescribedBy ? { "aria-describedby": ariaDescribedBy } : {}),
          },
          input: {
            readOnly: true,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  type="button"
                  edge="end"
                  onClick={() => void copy()}
                  aria-label={ariaLabel}
                  size="small"
                >
                  <CopyIcon />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
      {snackbarPortal}
    </>
  );
}
