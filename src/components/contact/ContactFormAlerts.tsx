"use client";

import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import { useEffect, useRef, type RefObject } from "react";
import { CopyEmailLink } from "@/components/ui";
import type { Messages } from "@/messages/en";
import { siteConfig } from "@/lib/site-config";

import type { ContactState } from "./actions";

const ERROR_SUMMARY_ID = "contact-form-error-summary";

export function ContactFormSuccessAlert({ message }: { message: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);
  return (
    <Alert
      ref={ref}
      tabIndex={-1}
      severity="success"
      role="status"
      aria-live="polite"
      sx={{ maxWidth: 560 }}
    >
      {message}
    </Alert>
  );
}

type ErrorSummaryProps = {
  contact: Messages["contact"];
  emailCopy: {
    copiedToast: string;
    copyFailedToast: string;
    ariaLabel: string;
  };
  state: Pick<ContactState, "error" | "notConfigured" | "fieldErrors">;
  errorSummaryRef: RefObject<HTMLDivElement | null>;
  hasFieldErrors: boolean;
};

export function ContactFormErrorSummary({
  contact,
  emailCopy,
  state,
  errorSummaryRef,
  hasFieldErrors,
}: ErrorSummaryProps) {
  return (
    <Alert
      ref={errorSummaryRef}
      severity={state.notConfigured ? "info" : "error"}
      role="alert"
      aria-live="assertive"
      tabIndex={-1}
      id={ERROR_SUMMARY_ID}
    >
      {hasFieldErrors ? contact.errorPleaseReview : state.error}
      {state.notConfigured ? (
        <Typography variant="body2" sx={{ mt: 1 }}>
          {contact.emailPrefix}{" "}
          <CopyEmailLink
            email={siteConfig.publicContactEmail}
            copiedToast={emailCopy.copiedToast}
            copyFailedToast={emailCopy.copyFailedToast}
            ariaLabel={emailCopy.ariaLabel}
            variant="body2"
          >
            {siteConfig.publicContactEmail}
          </CopyEmailLink>
        </Typography>
      ) : null}
    </Alert>
  );
}
