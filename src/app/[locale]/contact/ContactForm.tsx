"use client";

import { useActionState } from "react";
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

  if (state.submitted && state.message) {
    return (
      <Alert severity="success" sx={{ maxWidth: 560 }}>
        {state.message}
      </Alert>
    );
  }

  return (
    <Box component="form" action={formAction} noValidate>
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
        {state.error && (
          <Alert severity={state.notConfigured ? "info" : "error"}>
            {state.error}
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
        />
        <TextField
          name="email"
          label={contact.formEmail}
          type="email"
          required
          fullWidth
          autoComplete="email"
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
