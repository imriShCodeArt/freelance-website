import type { Metadata } from "next";
import { locales, type Locale } from "./config";
import { getSiteUrl } from "@/lib/site-config";
import { withLocale } from "./paths";

/**
 * href pathname without locale, e.g. `/projects/slug` or `/`.
 * Produces canonical and `alternates.languages`.
 */
export function localeAlternates(
  locale: Locale,
  pathnameWithoutLocale: string,
): NonNullable<Metadata["alternates"]> {
  const base = getSiteUrl();
  const path = pathnameWithoutLocale === "/" ? "" : pathnameWithoutLocale;
  const languages: Record<string, string> = {};
  for (const loc of locales) {
    languages[loc] = `${base}${withLocale(loc, path === "" ? "/" : path)}`;
  }
  return {
    canonical: `${base}${withLocale(locale, path === "" ? "/" : path)}`,
    languages,
  };
}
