"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { usePathname } from "next/navigation";
import PageContainer from "@/components/layout/PageContainer";
import Section from "@/components/layout/Section";
import { defaultLocale, hasLocale, type Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/get-messages";
import { withLocale } from "@/lib/i18n/paths";

const btnPrimary: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "12px 22px",
  borderRadius: 8,
  backgroundColor: "#8ab4f8",
  color: "#07111f",
  fontWeight: 600,
  textDecoration: "none",
  fontSize: "1rem",
};

const btnOutlined: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "12px 22px",
  borderRadius: 8,
  border: "1px solid #8ab4f8",
  color: "#b8d0fb",
  fontWeight: 600,
  textDecoration: "none",
  fontSize: "1rem",
};

function localeFromPathname(pathname: string | null): Locale {
  const seg = pathname?.split("/").filter(Boolean)[0];
  return seg && hasLocale(seg) ? seg : defaultLocale;
}

export default function NotFoundContent() {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const messages = getMessages(locale);
  const n = messages.notFound;

  return (
    <Section spacing="lg" sx={{ pt: { xs: 8, md: 10 }, pb: 10 }}>
      <PageContainer>
        <Typography variant="overline" color="secondary" fontWeight={700}>
          {n.kicker}
        </Typography>
        <Typography variant="h3" component="h1" fontWeight={700} gutterBottom>
          {n.title}
        </Typography>
        <Typography variant="body1" color="text.secondary" maxWidth="45ch" paragraph>
          {n.body}
        </Typography>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ pt: 1 }}>
          <Link href={withLocale(locale, "/")} style={btnPrimary}>
            {n.home}
          </Link>
          <Link href={withLocale(locale, "/contact")} style={btnOutlined}>
            {n.contact}
          </Link>
        </Stack>
      </PageContainer>
    </Section>
  );
}
