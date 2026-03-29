import { hasLocale, type Locale } from "./config";

/** Path without locale prefix, always starts with `/`. */
export function stripLocalePrefix(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] && hasLocale(parts[0])) {
    const rest = parts.slice(1).join("/");
    return rest ? `/${rest}` : "/";
  }
  return pathname.startsWith("/") ? pathname : `/${pathname}`;
}

export function swapLocaleInPathname(pathname: string, locale: Locale): string {
  const internal = stripLocalePrefix(pathname);
  const suffix = internal === "/" ? "" : internal;
  return `/${locale}${suffix}`;
}
