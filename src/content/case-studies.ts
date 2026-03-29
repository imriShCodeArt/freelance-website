export type CaseStudyKind = "client" | "concept" | "self-initiated";

export type CaseStudyMeta = {
  slug: string;
  tags: string[];
  kind: CaseStudyKind;
};

export const caseStudies: CaseStudyMeta[] = [
  {
    slug: "operations-dashboard",
    tags: ["Next.js", "TypeScript", "PostgreSQL"],
    kind: "concept",
  },
  {
    slug: "client-portal-booking",
    tags: ["React", "Node", "Auth"],
    kind: "concept",
  },
  {
    slug: "workflow-approvals",
    tags: ["TypeScript", "API design"],
    kind: "self-initiated",
  },
];

export function getCaseStudyMeta(slug: string): CaseStudyMeta | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
