import { en, type Messages } from "@/messages/en";
import { he } from "@/messages/he";
import type { Locale } from "./config";

const byLocale: Record<Locale, Messages> = { en, he };

export type { Messages };

export function getMessages(locale: Locale): Messages {
  return byLocale[locale];
}
