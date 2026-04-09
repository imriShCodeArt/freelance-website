"use client";

import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useCallback, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function useCopyEmailClipboard({
  email,
  copiedToast,
  copyFailedToast,
}: {
  email: string;
  copiedToast: string;
  copyFailedToast: string;
}) {
  const [open, setOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [severity, setSeverity] = useState<"success" | "error">("success");
  const isClient = useIsClient();

  const handleClose = useCallback(
    (_: unknown, reason?: string) => {
      if (reason === "clickaway") return;
      setOpen(false);
    },
    [],
  );

  const copy = useCallback(async () => {
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

  const snackbarPortal = isClient
    ? createPortal(
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
        </Snackbar>,
        document.body,
      )
    : null;

  return { copy, snackbarPortal };
}
