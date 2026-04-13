/**
 * When `USE_SANITY_CONTENT=true`, server loaders try Sanity first and fall back to static
 * content on errors or (for lists) empty CMS results. When unset/false, only static data is used.
 */
export function isSanityContentEnabled(): boolean {
  return process.env.USE_SANITY_CONTENT === "true";
}
