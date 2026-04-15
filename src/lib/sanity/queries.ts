/**
 * GROQ queries for published Sanity content (read path).
 */

export const siteSectionCopyByLocaleQuery = `
  *[_type == "siteSectionCopy" && locale == $locale]{
    _id,
    _updatedAt,
    locale,
    sectionKey,
    content
  }
`;

/** Full case study for detail pages and cross-locale payloads. */
export const caseStudyBySlugQuery = `
  *[_type == "caseStudy" && slug.current == $slug][0]{
    "slug": slug.current,
    kind,
    stack,
    githubUrl,
    liveUrl,
    featuredOnHome,
    homeFeatureOrder,
    en,
    he
  }
`;

/** Metadata only for /work list, cards, sitemap, static params. */
export const caseStudyListMetaQuery = `
  *[_type == "caseStudy"] | order(slug.current asc) {
    "slug": slug.current,
    kind,
    stack,
    githubUrl,
    liveUrl
  }
`;

export const caseStudyFeaturedMetaQuery = `
  *[_type == "caseStudy" && featuredOnHome == true] | order(homeFeatureOrder asc) {
    "slug": slug.current,
    kind,
    stack,
    githubUrl,
    liveUrl
  }
`;

export const caseStudySlugsQuery = `
  *[_type == "caseStudy"].slug.current
`;
