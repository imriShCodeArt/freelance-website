import type { Locale } from "./config";

/** Internal path without locale prefix, e.g. `/`, `/services`, `/work/slug` */
export function withLocale(locale: Locale, pathname: string): string {
  const p = pathname === "/" ? "" : pathname;
  return `/${locale}${p}`;
}
