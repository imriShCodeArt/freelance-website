"use client";

import Alert from "@mui/material/Alert";
import Link from "@mui/material/Link";
import Snackbar from "@mui/material/Snackbar";
import type { LinkProps } from "@mui/material/Link";
import { useCallback, useState, type ReactNode } from "react";

type CopyEmailLinkProps = {
  email: string;
  copiedToast: string;
  copyFailedToast: string;
  ariaLabel: string;
  children: ReactNode;
} & Pick<LinkProps, "color" | "variant" | "fontWeight" | "underline" | "sx">;

export function CopyEmailLink({
  email,
  copiedToast,
  copyFailedToast,
  ariaLabel,
  children,
  color = "primary",
  variant = "body1",
  fontWeight,
  underline = "hover",
  sx,
}: CopyEmailLinkProps) {
  const [open, setOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [severity, setSeverity] = useState<"success" | "error">("success");

  const handleClose = useCallback(
    (_: unknown, reason?: string) => {
      if (reason === "clickaway") return;
      setOpen(false);
    },
    [],
  );

  const handleClick = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(email);
      setSeverity("success");
      setToastMessage(copiedToast);
      setOpen(true);
    } catch {
      setSeverity("error");
      setToastMessage(copyFailedToast);
      setOpen(true);
    }
  }, [email, copiedToast, copyFailedToast]);

  return (
    <>
      <Link
        component="button"
        type="button"
        onClick={handleClick}
        aria-label={ariaLabel}
        color={color}
        variant={variant}
        fontWeight={fontWeight}
        underline={underline}
        sx={{
          cursor: "pointer",
          verticalAlign: "inherit",
          textAlign: "inherit",
          ...sx,
        }}
      >
        {children}
      </Link>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          role="status"
          aria-live="polite"
          sx={{ width: "100%" }}
        >
          {toastMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
