/** Request header set by `proxy` so the root layout can render `<html lang dir>`. */
export const LOCALE_HEADER = "x-next-locale";

export const locales = ["en", "he"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function hasLocale(s: string): s is Locale {
  return locales.includes(s as Locale);
}
