import type { StructureBuilder, StructureResolver } from "sanity/structure";

import { apiVersion } from "./env";
import { LOCALES, SECTION_KEYS } from "./schemaTypes/constants";

/** Structure custom filters require an explicit API version (Sanity v5+). */
const structureApiVersion = apiVersion.startsWith("v") ? apiVersion : `v${apiVersion}`;

function siteCopyLocaleList(S: StructureBuilder, locale: "en" | "he") {
  return S.list()
    .title(locale === "en" ? "English sections" : "Hebrew sections")
    .items(
      SECTION_KEYS.map((sectionKey) =>
        S.listItem()
          .title(`${locale} / ${sectionKey}`)
          .id(`siteSectionCopy-${locale}-${sectionKey}`)
          .child(
            S.document()
              .schemaType("siteSectionCopy")
              .documentId(`siteSectionCopy.${locale}.${sectionKey}`)
              .title(`${locale} / ${sectionKey}`),
          ),
      ),
    );
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site settings")
        .id("siteSettingsSingleton")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .title("Site settings"),
        ),
      S.divider(),
      S.listItem()
        .title("Site copy (English)")
        .id("siteCopyEn")
        .child(siteCopyLocaleList(S, "en")),
      S.listItem()
        .title("Site copy (Hebrew)")
        .id("siteCopyHe")
        .child(siteCopyLocaleList(S, "he")),
      S.listItem()
        .title("Site copy (all)")
        .id("siteCopyAll")
        .child(
          S.list()
            .title("All section documents (canonical)")
            .items(
              LOCALES.flatMap((locale) =>
                SECTION_KEYS.map((sectionKey) =>
                  S.listItem()
                    .title(`${locale} / ${sectionKey}`)
                    .id(`siteSectionCopy-all-${locale}-${sectionKey}`)
                    .child(
                      S.document()
                        .schemaType("siteSectionCopy")
                        .documentId(`siteSectionCopy.${locale}.${sectionKey}`)
                        .title(`${locale} / ${sectionKey}`),
                    ),
                ),
              ),
            ),
        ),
      S.divider(),
      S.listItem()
        .title("Case studies")
        .id("caseStudies")
        .child(
          S.documentList()
            .title("Case studies")
            .apiVersion(structureApiVersion)
            .filter('_type == "caseStudy"')
            .defaultOrdering([{ field: "slug.current", direction: "asc" }]),
        ),
      S.listItem()
        .title("Homepage featured")
        .id("caseStudiesFeatured")
        .child(
          S.documentList()
            .title("Featured on home")
            .apiVersion(structureApiVersion)
            .filter('_type == "caseStudy" && featuredOnHome == true')
            .defaultOrdering([{ field: "homeFeatureOrder", direction: "asc" }]),
        ),
    ]);
