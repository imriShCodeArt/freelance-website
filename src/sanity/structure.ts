import type { StructureResolver } from "sanity/structure";

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
        .child(
          S.documentList()
            .title("English sections")
            .filter('_type == "siteSectionCopy" && locale == "en"')
            .defaultOrdering([{ field: "sectionKey", direction: "asc" }]),
        ),
      S.listItem()
        .title("Site copy (Hebrew)")
        .id("siteCopyHe")
        .child(
          S.documentList()
            .title("Hebrew sections")
            .filter('_type == "siteSectionCopy" && locale == "he"')
            .defaultOrdering([{ field: "sectionKey", direction: "asc" }]),
        ),
      S.listItem()
        .title("Site copy (all)")
        .id("siteCopyAll")
        .child(
          S.documentList()
            .title("All section documents")
            .filter('_type == "siteSectionCopy"')
            .defaultOrdering([
              { field: "locale", direction: "asc" },
              { field: "sectionKey", direction: "asc" },
            ]),
        ),
      S.divider(),
      S.listItem()
        .title("Case studies")
        .id("caseStudies")
        .child(
          S.documentList()
            .title("Case studies")
            .filter('_type == "caseStudy"')
            .defaultOrdering([{ field: "slug.current", direction: "asc" }]),
        ),
      S.listItem()
        .title("Homepage featured")
        .id("caseStudiesFeatured")
        .child(
          S.documentList()
            .title("Featured on home")
            .filter('_type == "caseStudy" && featuredOnHome == true')
            .defaultOrdering([{ field: "homeFeatureOrder", direction: "asc" }]),
        ),
    ]);
