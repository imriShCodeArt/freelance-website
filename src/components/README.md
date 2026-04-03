# Components directory standard

This folder follows the layered model in [`docs/component-composition-and-purity-plan.md`](../../docs/component-composition-and-purity-plan.md). **New work must fit one of the layers below.** Refactors move existing files toward this layout over time—no big-bang move required.

---

## Layers (single source of truth)

| Directory | Layer | What belongs here | Browser / `"use client"` |
|-----------|--------|-------------------|---------------------------|
| **`ui/`** | **Primitives & tiny compositions** | One job, reused across routes; **no** page-specific `messages` blobs—pass strings/props in. Examples: `LinkButton`, future `FormField`, `AppButton`. | Only if the primitive needs hooks or DOM APIs. |
| **`layout/`** | **Application chrome** | Header, footer, shell, section wrappers, `Eyebrow`, `PageContainer`, `Section`, `RouterLink`, nav. | As needed per file. |
| **`home/`** | **Marketing / home feature** | Page sections under `sections/`, `packages/`, and feature subfolders (`hero/`, `service-cards/`, `featured-work/`, `decor/`)—not reused on a second product surface. | As needed; isolate effects in leaf components (e.g. `decor/`). |
| **`contact/`** | **Contact route feature** | Form UI, hooks, honeypot, and **`actions.ts`** (`"use server"`) for this flow. Route `page.tsx` only composes layout + `@/components/contact`. | Client leaves + one server module. |
| **`i18n/`** | **Locale infrastructure** | `DocumentHtmlLocale` and similar cross-cutting i18n UI. | Usually client when touching `document`. |
| **Root (`ThemeRegistry.tsx`)** | **App providers** | Theme and global registry only. | Typically client. |

**Route `page.tsx` files** stay thin: load data / messages, then render `layout` primitives plus a **feature folder** under `src/components/` (`home/`, `contact/`, …). Avoid growing `app/**` with form fragments; keep the same pattern as the homepage.

---

## Naming & imports

- **Filename:** `PascalCase` for components (`LinkButton.tsx`).
- **Import alias:** prefer `@/components/<layer>/<Name>` (e.g. `@/components/ui/LinkButton`) or `@/components/layout/Section`.
- **Barrels:** `ui/index.ts` and feature `index.ts` files may re-export; **do not** create deep barrel chains that hide tree structure.

---

## Where things used to live (migration)

| Legacy | Standard |
|--------|----------|
| ~~`shared/LinkButton`~~ | **`ui/LinkButton`** — use `@/components/ui` or `@/components/ui/LinkButton`. |
| Loose files at `home/*` (orb, stars, service cards, featured card) | **`home/hero/`**, **`home/decor/`**, **`home/service-cards/`**, **`home/featured-work/`** — import from `@/components/home/…` or the `sections` barrel. |
| Contact UI under `app/[locale]/contact/*` | **`components/contact/`** — `import ContactForm from "@/components/contact"`. Server action: `components/contact/actions.ts`. |

---

## Checklist for new components

1. **Layer** — Does this belong in `ui`, `layout`, `home`, or `app/...`?
2. **Purity** — Is render deterministic? Side effects only in handlers, Server Actions, or `useEffect` in documented client leaves?
3. **State** — Owned at the closest parent; server data from RSC/actions (see plan §3.3).
4. **Accessibility** — Labels, focus, heading order per `docs/Accessibility implementation plan.md`.

---

## Inventory (current)

```
components/
├── README.md           ← this file
├── ThemeRegistry.tsx
├── home/
│   ├── HomePageSections.tsx
│   ├── decor/          # ambient backgrounds (client effects)
│   ├── featured-work/  # case study cards
│   ├── hero/           # hero orb / visual
│   ├── packages/       # pricing composition
│   ├── sections/       # *Section.tsx + section-types
│   └── service-cards/  # build section accordion + expandable card
├── contact/            # contact form + server action
├── layout/             # shell & generic page layout primitives
├── ui/                 # cross-route primitives (grow here first)
└── i18n/
```

Questions and exceptions: note them in the PR and update this README if the standard changes.
