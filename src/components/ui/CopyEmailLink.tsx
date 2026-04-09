"use client";

import Link from "@mui/material/Link";
import type { LinkProps } from "@mui/material/Link";
import type { ReactNode } from "react";
import { useCopyEmailClipboard } from "./useCopyEmailClipboard";

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
  const { copy, snackbarPortal } = useCopyEmailClipboard({
    email,
    copiedToast,
    copyFailedToast,
  });

  return (
    <>
      <Link
        component="button"
        type="button"
        onClick={() => void copy()}
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
      {snackbarPortal}
    </>
  );
}
