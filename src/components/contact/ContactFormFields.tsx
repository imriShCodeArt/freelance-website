"use client";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import type { RefObject } from "react";
import type { Messages } from "@/messages/en";

import type { ContactFieldErrors } from "./actions";

type Props = {
  contact: Messages["contact"];
  fieldErrors?: ContactFieldErrors;
  nameRef: RefObject<HTMLInputElement | null>;
  emailRef: RefObject<HTMLInputElement | null>;
  messageRef: RefObject<HTMLInputElement | null>;
  isPending: boolean;
};

export function ContactFormFields({
  contact,
  fieldErrors: fe,
  nameRef,
  emailRef,
  messageRef,
  isPending,
}: Props) {
  return (
    <Stack spacing={2.5}>
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
      <Button type="submit" variant="contained" size="large" disabled={isPending}>
        {isPending ? contact.sending : contact.sendButton}
      </Button>
    </Stack>
  );
}
