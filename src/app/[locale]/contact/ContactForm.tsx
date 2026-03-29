"use client";

import { useActionState, useEffect, useRef } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import type { Locale } from "@/lib/i18n/config";
import type { Messages } from "@/messages/en";
import { siteConfig } from "@/lib/site-config";
import { submitContact, type ContactState } from "./actions";

const initialState: ContactState = {};

type Props = {
  locale: Locale;
  contact: Messages["contact"];
};

export default function ContactForm({ locale, contact }: Props) {
  const [state, formAction, isPending] = useActionState(
    submitContact,
    initialState,
  );

  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const messageRef = useRef<HTMLInputElement | null>(null);
  const errorSummaryRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fe = state.fieldErrors;
    if (fe?.name) {
      nameRef.current?.focus();
      return;
    }
    if (fe?.email) {
      emailRef.current?.focus();
      return;
    }
    if (fe?.message) {
      messageRef.current?.focus();
      return;
    }
    if (state.error && errorSummaryRef.current) {
      errorSummaryRef.current.focus();
    }
  }, [state.fieldErrors, state.error]);

  if (state.submitted && state.message) {
    return (
      <Alert
        severity="success"
        role="status"
        aria-live="polite"
        sx={{ maxWidth: 560 }}
      >
        {state.message}
      </Alert>
    );
  }

  const fe = state.fieldErrors;
  const hasFieldErrors = Boolean(
    fe && (fe.name ?? fe.email ?? fe.message),
  );
  const showSummaryAlert = hasFieldErrors || Boolean(state.error);

  return (
    <Box
      component="form"
      action={formAction}
      noValidate
      aria-busy={isPending}
    >
      <input type="hidden" name="locale" value={locale} />
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        style={{
          position: "absolute",
          left: "-9999px",
          width: 1,
          height: 1,
          opacity: 0,
          pointerEvents: "none",
        }}
      />
      <Stack spacing={2.5} maxWidth={560}>
        {showSummaryAlert && (
          <Alert
            ref={errorSummaryRef}
            severity={state.notConfigured ? "info" : "error"}
            role="alert"
            aria-live="assertive"
            tabIndex={-1}
            id="contact-form-error-summary"
          >
            {hasFieldErrors
              ? contact.errorPleaseReview
              : state.error}
            {state.notConfigured && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                {contact.emailPrefix}{" "}
                <Link href={`mailto:${siteConfig.publicContactEmail}`}>
                  {siteConfig.publicContactEmail}
                </Link>
              </Typography>
            )}
          </Alert>
        )}
        <TextField
          name="name"
          label={contact.formName}
          required
          fullWidth
          autoComplete="name"
          inputRef={nameRef}
          error={Boolean(fe?.name)}
          helperText={fe?.name}
        />
        <TextField
          name="email"
          label={contact.formEmail}
          type="email"
          required
          fullWidth
          autoComplete="email"
          inputRef={emailRef}
          error={Boolean(fe?.email)}
          helperText={fe?.email}
        />
        <TextField
          name="company"
          label={contact.formCompany}
          fullWidth
          autoComplete="organization"
        />
        <TextField
          name="timeline"
          label={contact.formTimeline}
          fullWidth
          placeholder={contact.formTimelinePlaceholder}
        />
        <TextField
          name="message"
          label={contact.formMessage}
          required
          fullWidth
          multiline
          minRows={5}
          inputRef={messageRef}
          error={Boolean(fe?.message)}
          helperText={fe?.message}
        />
        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={isPending}
        >
          {isPending ? contact.sending : contact.sendButton}
        </Button>
      </Stack>
    </Box>
  );
}
