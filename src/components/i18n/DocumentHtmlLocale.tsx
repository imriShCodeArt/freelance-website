"use client";

import { useLayoutEffect } from "react";
import type { Locale } from "@/lib/i18n/config";

/**
 * Keeps `<html lang dir>` in sync with the `[locale]` segment. Inline `<script>`
 * in a Server Component triggers a React client-render warning and is not reliable
 * across hydration; `useLayoutEffect` runs before paint after hydration and on
 * locale switches via client navigation.
 */
export default function DocumentHtmlLocale({ locale }: { locale: Locale }) {
  const dir = locale === "he" ? "rtl" : "ltr";

  useLayoutEffect(() => {
    const el = document.documentElement;
    el.setAttribute("lang", locale);
    el.setAttribute("dir", dir);
  }, [locale, dir]);

  return null;
}
