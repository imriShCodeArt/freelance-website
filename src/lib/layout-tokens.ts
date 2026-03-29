/**
 * Marketing layout rhythm — use in Section / page containers so spacing stays consistent.
 * Max content ~1140px; prose ~72ch; section gaps align to 48 / 64 / 96px scale.
 */
export const layoutTokens = {
  /** Primary column max width (px) — between 1100–1200 */
  contentMaxPx: 1140,
  /** Comfortable reading measure for long copy */
  proseMaxCh: "72ch",
  /** Vertical padding between major sections (theme spacing units ≈ 8px) */
  section: {
    sm: 6, // 48px
    md: 8, // 64px
    lg: 12, // 96px
  },
} as const;
