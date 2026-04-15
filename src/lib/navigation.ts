import type { Messages } from "@/lib/i18n/static-messages";
import type { Locale } from "@/lib/i18n/config";
import { withLocale } from "@/lib/i18n/paths";

export const navPaths = ["/", "/experience", "/projects", "/about", "/contact"] as const;

export type NavPath = (typeof navPaths)[number];

export type NavItem = { label: string; href: string };

export function getMainNav(locale: Locale, nav: Messages["nav"]): NavItem[] {
  const labels: Record<NavPath, string> = {
    "/": nav.home,
    "/experience": nav.services,
    "/projects": nav.work,
    "/about": nav.about,
    "/contact": nav.contact,
  };
  return navPaths.map((path) => ({
    label: labels[path],
    href: withLocale(locale, path),
  }));
}
