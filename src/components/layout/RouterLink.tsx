"use client";

import MuiLink, { type LinkProps as MuiLinkProps } from "@mui/material/Link";
import NextLink from "next/link";

export type RouterLinkProps = Omit<MuiLinkProps<typeof NextLink>, "component">;

/** MUI-styled anchor that uses Next.js navigation (use inside server pages via client boundary). */
export default function RouterLink({ href, ...rest }: RouterLinkProps) {
  return <MuiLink component={NextLink} href={href ?? ""} {...rest} />;
}
