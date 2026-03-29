# Accessibility implementation plan

This document outlines how to raise the freelance marketing site to a **high-quality, production-grade** accessibility standard. The baseline target is **WCAG 2.2 Level AA** across English and Hebrew; selected enhancements can pursue **AAA** where low cost and high impact.

The stack is **Next.js (App Router)**, **Material UI**, bilingual **en / he** with **RTL**, and media-heavy hero content. Plan items reference real areas of the repo where relevant.

---

## Goals

| Goal | Measure |
|------|---------|
| Compliant interactive patterns | No critical/serious issues in axe-core; Lighthouse accessibility ≥ 95 on key templates |
| Keyboard & AT support | Full navigation, forms, and locale switching without a mouse; sensible focus order in LTR and RTL |
| Cognitive & motion | Respect `prefers-reduced-motion`; optional `prefers-reduced-transparency` for glass-style UI |
| i18n & semantics | Correct `lang` / `dir` (already driven by route via `DocumentHtmlLocale`); screen-reader-friendly language switching |

---

## What is already in good shape

These are strengths to **preserve** when refactoring:

- **Skip link** to `#main-content` (`[locale]/layout.tsx`, `.skip-link` in `globals.css`).
- **Main landmark** via `<Box component="main" id="main-content">` in `SiteShell.tsx`.
- **Document language and direction** updated from the locale segment (`DocumentHtmlLocale.tsx`), avoiding incorrect static `lang`/`dir` for Hebrew.
- **Global focus visibility** (`:focus-visible` in `globals.css`); smooth scrolling disabled under `prefers-reduced-motion`.
- **Hero video**: `muted` / `playsInline` / `poster`; static image fallback when `prefers-reduced-motion` (`HomePage.tsx`).
- **Locale switcher**: `aria-label` on the group and per-language toggles (`LocaleSwitcher.tsx`).
- **Contact honeypot** field hidden from assistive tech with `aria-hidden` and off-screen positioning (`ContactForm.tsx`).
- **Form fields** use labels, `autoComplete`, and `type="email"` where appropriate.

---

## Gaps and priorities

### P0 — Do first (blocking issues for AA)

1. **Form error association (contact)**  
   Server validation errors today surface as a single `Alert`. For AA, tie errors to inputs with `aria-invalid`, `aria-describedby`, and programmatically focus the first invalid field (or the summary region) after submit. Use a single error summary with a list and `id` anchors when multiple fields fail.

2. **Current page in navigation**  
   Desktop nav uses `Button` + `NextLink` without `aria-current="page"` for the active route. Mirror the pattern used in the drawer (`selected` on `ListItemButton`) with an explicit **`aria-current="page"`** on the active desktop link for clearer screen reader context.

3. **Semantic landmarks**  
   Prefer explicit **`<header>`** and **`<footer>`** (or `component="header"` / `footer"` on wrappers) around `SiteHeader` / `SiteFooter` content so users can jump by landmark. Ensure **one** `main` per page (already satisfied).

4. **Heading hierarchy audit**  
   Each page should have **one** logical `h1` and descending `h2`–`h6` without skips. Audit `HomePage`, `/about`, `/services`, `/work`, case study detail, and `/contact`; fix order where marketing copy or MUI `variant`s create the wrong outline.

### P1 — High impact polish

5. **Decorative vs informative media**  
   Hero video layer is `aria-hidden` on the wrapper (verify end-to-end): background media must not be announced as video unless it conveys unique information. Any future **inline** images need accurate **`alt`** (empty `alt=""` only if purely decorative).

6. **Live regions for async UI**  
   Contact: on success, consider **`role="status"`** / `aria-live="polite"` on the success `Alert` so screen readers announce completion without moving focus away unless you deliberately focus the message. During submit, ensure the pending state is clear (`aria-busy` on the form is optional but helpful).

7. **Touch targets (mobile)**  
   WCAG 2.5.5 (AAA) suggests **44×44 CSS px** minimum; AA mobile best practice: audit `IconButton`, `ToggleButton`, and dense links in header/footer; increase hit areas with padding or `minHeight` / `minWidth` where needed.

8. **Contrast**  
   Run a pass on **secondary text** (`text.secondary`), outlined buttons, and chips on `paper` / gradient hero areas. Adjust palette tokens in `theme.ts` if any pairing falls below **4.5:1** (normal text) or **3:1** (large text / UI components).

9. **Drawer focus management**  
   MUI `Drawer` generally traps focus; verify with keyboard: **Esc** closes, focus returns to the menu button, and focus is **not** lost inside the drawer when opening/closing.

10. **Motion beyond the hero**  
    Inventory CSS transitions (e.g. skip-link). Ensure nothing essential relies on animation; honor `prefers-reduced-motion` for non-critical motion (optional theme-level `transition: none` override).

### P2 — Depth and maintenance

11. **Automated testing in CI**  
    Add **Playwright + axe-core** (or `@axe-core/react` in a subset of stories) against `/en` and `/he` home, contact, and one inner page. Fail CI on serious violations.

12. **Manual screen reader passes**  
    **Windows**: NVDA + Chrome. **macOS**: VoiceOver + Safari. Verify RTL reading order on `/he` (locale switcher is LTR-by-design; confirm announcement order still makes sense).

13. **Structured content**  
    Where you list steps or scenarios, use **ordered/unordered lists** or definition lists instead of paragraph-only layout when semantics matter.

14. **Reduced transparency**  
    Header uses `backdrop-filter`. For users who enable **“Reduce transparency”** (macOS) / related settings, consider a solid background fallback via `prefers-reduced-transparency` if contrast or readability suffers.

15. **Documentation for contributors**  
    Short **CONTRIBUTING** or **AGENTS** note: every new interactive component must ship with keyboard support, focus style, and copy reviewed for heading/label/alt usage.

---

## Phased implementation

### Phase 1 — Forms and navigation (1–2 days)

- Implement accessible error summary + per-field descriptors on **ContactForm**; focus management on error/success.
- Add **`aria-current="page"`** to active desktop nav links; confirm drawer parity.
- Wrap chrome in **`header` / `footer`** landmarks.

### Phase 2 — Content and visual (2–3 days)

- Heading pass on all routes; fix component levels (`Typography component="h1"` etc.).
- Contrast fixes in **`theme.ts`** and any one-off `sx` colors.
- Touch target tweaks for header controls and chips/links on small viewports.

### Phase 3 — Media, motion, and resilience (1–2 days)

- Re-verify hero/media **`aria-hidden`** and poster/reduced-motion behavior.
- Optional: theme fragment for **`prefers-reduced-motion`** (disable non-essential transitions).
- Optional: **`prefers-reduced-transparency`** fallback for the app bar.

### Phase 4 — Automation and process (ongoing)

- Add axe checks in **Playwright** for `en` + `he` critical paths.
- Run **Lighthouse** and manual NVDA/VoiceOver before major releases.

---

## Testing checklist (before marking “done”)

- [ ] Tab through header, drawer, locale control, all nav links, footer, and contact form without traps.
- [ ] Verify visible focus on every focusable control (including RTL).
- [ ] Submit contact with invalid data: errors announced/associated; fix and resubmit successfully.
- [ ] Zoom to **200%**: no horizontal scroll on primary content; no clipped interactive controls.
- [ ] Run axe (browser extension or CI) on `/en`, `/he`, and `/en/contact`.

---

## References

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/) — official criteria.
- [WAI-ARIA APG](https://www.w3.org/WAI/ARIA/apg/) — patterns for disclosure, dialogs, landmarks.
- [MUI accessibility](https://mui.com/material-ui/getting-started/accessibility/) — defaults and known component behaviors.

---

## Summary

Ship **P0** (forms, current page, landmarks, headings) first; layer **P1** (live regions, contrast, targets, media semantics); add **P2** automation and OS-specific checks so accessibility does not regress. This matches a **high-quality** bar: standards-aligned, bilingual, keyboard-first, and test-backed.

---

## Implementation status (in-repo)

The following were implemented in code:

- **P0:** Contact form field-level validation state (`fieldErrors`), error summary with `role="alert"` / `aria-live`, focus to first invalid field or summary; desktop + drawer nav `aria-current="page"`; **`<header>`** on `AppBar`; heading order fixes (services cards **h3**, work listing **h2** sr-only + card **h3**, home cards **h3** under section **h2**).
- **P1:** Success `Alert` uses **`role="status"`** / **`aria-live="polite"`**; form **`aria-busy`** while submitting; footer nav **`aria-label`** from i18n; **44×44px** minimum targets on menu `IconButton`s, drawer close, and locale `ToggleButton`s; **skip-link** transition disabled under **`prefers-reduced-motion`**; app bar solid background when **`prefers-reduced-transparency`**.

**Not done (still P2 / manual):** Playwright + axe in CI, routine Lighthouse/NVDA/VoiceOver passes, and a full contrast audit with token tweaks if measurements fall short.
