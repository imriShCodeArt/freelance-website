<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

## Components

Place feature UI per [`src/components/README.md`](src/components/README.md): `ui/`, `layout/`, `home/`, `contact/`, and future `components/<feature>/` — not ad hoc folders under `src/app/`. Follow [`docs/component-composition-and-purity-plan.md`](docs/component-composition-and-purity-plan.md) for composition and render purity.

## Accessibility

Target **WCAG 2.2 AA** for UI changes. Follow `docs/Accessibility implementation plan.md`. New interactive components need keyboard support, visible `:focus-visible`, correct heading level when using `Typography component`, and labeled controls (including `aria-current` on nav when indicating the active page).
