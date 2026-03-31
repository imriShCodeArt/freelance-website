import type { Messages } from "@/lib/i18n/get-messages";

export type BuildSectionServiceBlock =
  | Messages["services"]["primary"][number]
  | Messages["services"]["supporting"][number];
