# Accessibility implementation plan

This project targets **WCAG 2.2 Level AA** for user-facing UI. Use this document as the checklist for new work and releases—not as a substitute for user testing with assistive technology.

## Page structure (snapshot)

Each locale route exposes a single primary **`h1`**: home (hero), about, contact, services (`/experience`), work index, work detail, and not-found content use `Typography` with `component="h1"`.

## Principles

1. **Keyboard first** — Every flow must be operable without a mouse (Tab order, Escape where expected, no keyboard traps).
2. **Visible focus** — `:focus-visible` rings must meet contrast and never be removed without an equivalent indicator ([`globals.css`](../src/app/globals.css), MUI theme overrides in [`theme.ts`](../src/theme/theme.ts)).
3. **Semantics** — Correct landmarks (`header`, `main`, `footer`, `nav` with labels), one **`h1`** per page, no skipped heading levels where avoidable.
4. **Labels** — Form controls have associated labels; icon-only controls have `aria-label`; current nav item uses `aria-current="page"` where applicable.
5. **Feedback** — Errors use `role="alert"` / `aria-live` appropriately; success states are focusable or announced ([contact form](../src/components/contact/)).
6. **Motion** — Respect `prefers-reduced-motion` and `prefers-reduced-transparency` for decorative and ambient effects.

## PR / release checklist (minimum)

- [ ] **Keyboard:** Tab through header (desktop + open mobile menu), primary nav, locale switcher, footer links, and the contact form (submit path).
- [ ] **Focus:** Confirm `:focus-visible` is visible on buttons, links, text fields, and **card-as-link** patterns (home featured work, projects grid).
- [ ] **Headings:** Page has a single logical `h1`; section headings step down without gaps (`h2` → `h3`, etc.).
- [ ] **Lint:** `npm run lint` passes (includes `eslint-plugin-jsx-a11y` via `npm run lint` / `npm run lint:a11y`).
- [ ] **Optional:** Run your browser’s accessibility tree inspector or axe DevTools on `/en`, `/en/contact`, and `/en/work` after meaningful UI changes.

## Manual spot checks (periodic)

- **Screen reader:** macOS VoiceOver or Windows NVDA — read order on home hero, open mobile drawer, submit contact validation errors and success.
- **Zoom:** 200% zoom — no clipped critical controls or overlapping text.
- **Locale:** Switch EN/HE — `lang`/`dir` on `<html>` updates ([`DocumentHtmlLocale`](../src/components/i18n/DocumentHtmlLocale.tsx)).

## Contact form

- **Honeypot** ([`ContactHoneypot`](../src/components/contact/ContactHoneypot.tsx)): `tabIndex={-1}`, `aria-hidden`, off-screen — not in tab order or the accessibility tree.
- **Success:** After submit, focus moves to the success [`Alert`](../src/components/contact/ContactFormAlerts.tsx) (`tabIndex={-1}`, `role="status"`, `aria-live="polite"`).

## References

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [AGENTS.md](../AGENTS.md) — project rules for components and a11y expectations
