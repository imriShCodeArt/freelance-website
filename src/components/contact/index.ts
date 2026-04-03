/**
 * Contact route feature: form UI, focus hook, and server action.
 * Same layering pattern as `src/components/home/`.
 */
export { default } from "./ContactForm";
export { submitContact } from "./actions";
export type { ContactFieldErrors, ContactState } from "./actions";
