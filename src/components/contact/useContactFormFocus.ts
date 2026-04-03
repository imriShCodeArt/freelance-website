"use client";

import { useEffect, useRef } from "react";

import type { ContactState } from "./actions";

/**
 * Focus management after server validation — belongs in a hook so the form shell
 * stays a simple composition of presentational pieces.
 */
export function useContactFormFocus(state: ContactState) {
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

  return { nameRef, emailRef, messageRef, errorSummaryRef };
}
