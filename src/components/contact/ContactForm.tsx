"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { useActionState } from "react";
import type { Locale } from "@/lib/i18n/config";
import type { Messages } from "@/messages/en";

import { submitContact, type ContactState } from "./actions";
import {
  ContactFormErrorSummary,
  ContactFormSuccessAlert,
} from "./ContactFormAlerts";
import { ContactFormFields } from "./ContactFormFields";
import { ContactHoneypot } from "./ContactHoneypot";
import { useContactFormFocus } from "./useContactFormFocus";

const initialState: ContactState = {};

type Props = {
  locale: Locale;
  contact: Messages["contact"];
  emailCopy: {
    copiedToast: string;
    copyFailedToast: string;
    ariaLabel: string;
  };
};

export default function ContactForm({ locale, contact, emailCopy }: Props) {
  const [state, formAction, isPending] = useActionState(
    submitContact,
    initialState,
  );
  const { nameRef, emailRef, messageRef, errorSummaryRef } =
    useContactFormFocus(state);

  if (state.submitted && state.message) {
    return <ContactFormSuccessAlert message={state.message} />;
  }

  const fe = state.fieldErrors;
  const hasFieldErrors = Boolean(fe && (fe.name ?? fe.email ?? fe.message));
  const showSummaryAlert = hasFieldErrors || Boolean(state.error);

  return (
    <Box
      component="form"
      action={formAction}
      noValidate
      aria-busy={isPending}
    >
      <input type="hidden" name="locale" value={locale} />
      <ContactHoneypot />
      <Stack spacing={2.5} maxWidth={560}>
        {showSummaryAlert ? (
          <ContactFormErrorSummary
            contact={contact}
            emailCopy={emailCopy}
            state={state}
            errorSummaryRef={errorSummaryRef}
            hasFieldErrors={hasFieldErrors}
          />
        ) : null}
        <ContactFormFields
          contact={contact}
          fieldErrors={fe}
          nameRef={nameRef}
          emailRef={emailRef}
          messageRef={messageRef}
          isPending={isPending}
        />
      </Stack>
    </Box>
  );
}
