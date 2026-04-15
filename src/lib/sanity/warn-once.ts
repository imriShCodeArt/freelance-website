import "server-only";

const keys = new Set<string>();

/** Avoids repeating the same Sanity hygiene warning across parallel requests or RSC passes. */
export function warnSanityOnce(dedupeKey: string, message: string): void {
  if (keys.has(dedupeKey)) return;
  keys.add(dedupeKey);
  console.warn(message);
}
