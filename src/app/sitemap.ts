import type { MetadataRoute } from "next";
import { listCaseStudySlugs } from "@/lib/content/case-studies-access";
import { locales } from "@/lib/i18n/config";
import { getSiteUrl } from "@/lib/site-config";
import { withLocale } from "@/lib/i18n/paths";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const lastModified = new Date();

  const paths = ["", "/experience", "/projects", "/about", "/contact"];

  const staticRoutes = locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${base}${withLocale(locale, path === "" ? "/" : path)}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
  );

  const slugs = await listCaseStudySlugs();
  const workRoutes = locales.flatMap((locale) =>
    slugs.map((slug) => ({
      url: `${base}${withLocale(locale, `/projects/${slug}`)}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  );

  return [...staticRoutes, ...workRoutes];
}
