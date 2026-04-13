import "server-only";

import { getSiteCopyFromSanity } from "@/lib/sanity/get-site-copy";
import { isSanityContentEnabled } from "@/lib/sanity/use-sanity-content";

import type { Locale } from "./config";
import { getStaticMessages, type Messages } from "./static-messages";

export type { Messages };

export async function getMessages(locale: Locale): Promise<Messages> {
  if (!isSanityContentEnabled()) {
    return getStaticMessages(locale);
  }
  try {
    return await getSiteCopyFromSanity(locale);
  } catch (err) {
    console.error(
      "[sanity] getMessages: failed to load site copy, using static fallback",
      err,
    );
    return getStaticMessages(locale);
  }
}
