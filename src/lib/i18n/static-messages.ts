import { en, type Messages } from "@/messages/en";
import { he } from "@/messages/he";
import type { Locale } from "./config";

const byLocale: Record<Locale, Messages> = { en, he };

export type { Messages };

/** Bundled locale copy (also used as fallback when Sanity is off or fails). Safe for client components. */
export function getStaticMessages(locale: Locale): Messages {
  return byLocale[locale];
}
