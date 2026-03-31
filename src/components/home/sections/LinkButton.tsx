import Button from "@mui/material/Button";
import Link from "next/link";
import type { ReactNode } from "react";

export function LinkButton({
  href,
  variant,
  children,
  fullWidthMobile,
}: {
  href: string;
  variant: "contained" | "outlined" | "text";
  children: ReactNode;
  fullWidthMobile?: boolean;
}) {
  return (
    <Link href={href} style={{ textDecoration: "none", display: "block" }}>
      <Button
        component="span"
        variant={variant}
        color="primary"
        size="large"
        sx={{ width: fullWidthMobile ? { xs: "100%", sm: "auto" } : undefined }}
      >
        {children}
      </Button>
    </Link>
  );
}
