# Component composition and purity plan

This document is a **working plan** for aligning the codebase with two React principles:

1. **Small, single-purpose, composable components** — build primitives (button, field, card shell, empty state), then compose them into sections and pages with clear data flow.
2. **Pure components** — the same props and state should yield the same UI; no hidden mutations, no non-determinism during render, no effects disguised as layout. Impure work lives in event handlers, Server Actions, or dedicated hooks / client leaf components.

It complements [`AGENTS.md`](../AGENTS.md) and the accessibility plan. It does **not** require a big-bang rewrite; progress is incremental and gated by shipping value.

---

## 1. Current snapshot (strengths and gaps)

### Strengths already aligned

- **Layout primitives**: `Eyebrow`, `PageContainer`, `Section`, `RouterLink` are narrow and reusable; cross-route controls like `LinkButton` live under `src/components/ui/`.
- **Home packages**: Split into `src/components/home/packages/*` with `PackagesSection` as composition-only wiring is directionally correct.
- **Controlled patterns**: `ExpandableOutlineCard` is a good example of **props in, callbacks out** (`isOpen`, `onToggle`) with click logic in a handler, not during render.
- **Effects at boundaries**: `DocumentHtmlLocale` and `WhySectionStarsBackground` isolate DOM / imperative work in `useEffect`, which is acceptable for **client-only leaf** components (see §4).

### Gaps to address over time

- **Section monoliths**: Some sections bundle marketing layout, data mapping, and chrome in one file (e.g. hero, services accordion, featured work). Harder to test and reuse.
- **MUI + copy inline**: Repeated `Typography` + `sx` clusters could become small named components (`SectionIntro`, `SectionHeading`) without changing visuals.
- **Forms**: `src/components/contact/ContactForm` uses `useActionState` with `ContactFormFields`, `ContactFormAlerts`, and `useContactFormFocus` (composition + thin orchestration).
- **Large client visuals**: `HeroOrbBackground` and similar files mix layout, animation CSS, and markup. Prefer **presentational subcomponents** + one hook or one effect module if animation state grows.

This plan is intentionally lightweight but enforceable: composition and purity are **constraints**, not a tooling mandate.

---

## 2. Target architecture (folders and responsibilities)

Adopt a **layered mental model** (names can evolve; consistency matters more than the exact folder tree).

| Layer | Purpose | Examples |
|--------|---------|----------|
| **UI primitives** | One job, no business copy from `messages/*` | Styled button wrapper, text field with label pattern, icon slot |
| **Composed UI** | Repeated patterns built from primitives | `CardShell`, `BulletList`, `MetaRow` (label + value row) |
| **Feature / domain** | Knows about **one** page or flow | `ContactForm`, `PackageOfferCard`, `LocaleSwitcher` |
| **Sections** | **Composition + data shaping** for a page region — layout and wiring props from `messages` / content into feature components | `PackagesSection`, `ProcessSection` |
| **Screens / routes** | `page.tsx` — minimal; delegate to sections | `[locale]/page.tsx` |

**Sections are not a dumping ground.** If a section grows **business rules, heavy orchestration, or branching logic**, move that into:

- a **feature** component under the relevant domain, and/or
- a **custom hook** (`useServiceAccordionState`, etc.) co-located or under `hooks/`.

Sections should read as: *assemble children, pass narrow props, maybe map one list* — not *reimplement product rules*.

**Suggested direction** (incremental):

- `src/components/ui/` — app-wide primitives and small compositions (start only when a pattern appears **3+ times**).
- Keep `src/components/layout/` for chrome.
- Keep `src/components/home/` for marketing-specific pieces; move **generic** bits to `ui/` when reused outside home.

**Project-local rules and inventory:** [`src/components/README.md`](../src/components/README.md) — where new code goes, import style, and migration from legacy paths.

**Folder depth:** Shallow trees are nice, but **flat is not always simple**. Prefer a shallow structure **unless an extra layer clearly improves readability** (e.g. `packages/` for one feature). Avoid five nested folders for a single card — not because “deep = bad,” but because navigation cost should match payoff.

---

## 3. Composition playbook

### 3.1 Rules of thumb

- **One visual or behavioral responsibility** per component — but do not split into micro-files by default (see §3.4).
- **Data flows down; events flow up.** Sections pass **serializable props** (strings, ids, lists) to children. Avoid prop drilling more than 2–3 levels without a deliberate fix — then introduce a **small** context or lift state to a common parent (see §3.5); avoid global stores until proven necessary.
- **Pages stay thin.** `page.tsx` should: validate locale, load messages/content, render `<SiteShell>` + section list. No large inline JSX trees.
- **Compose before abstracting.** Prefer repeated structure or size thresholds before inventing shared abstractions (see §3.4).

### 3.2 When to split a component (avoid over-fragmentation)

**Split only when at least one of these is true:**

1. **Reuse** — the same UI or behavior is needed in another route or feature.
2. **Size** — the file is roughly **~200+ lines** of real UI/logic and reviewers struggle to navigate it.
3. **Independent complexity** — a subtree has its own state, test surface, or rules (e.g. accordion panel, form field group).

**Do not split** just because a name contains “and”: a coherent `HeroSection` with well-scoped internal structure is often better than `HeroTitle` + `HeroSubtitle` + `HeroCTAGroup` + `HeroLayout` scattered across files with no reuse.

Directionally, names like `HeroWithVideoAndOrb` still signal **multiple concerns** — address that by **internal structure or hooks**, not always by more files.

### 3.3 State ownership

Explicit rules reduce prop-drilling churn and premature context:

| Kind of state | Where it should live |
|---------------|----------------------|
| **UI state** (open/closed, selected tab, local hover) | **Closest common parent** that needs it; lift only when siblings must stay in sync |
| **Cross-section / page-wide UI** | Avoid unless necessary; prefer URL or server state; if truly shared, a **narrow** context with a typed provider |
| **Server / submission state** | **Server Components** for read-mostly data; **Server Actions** + `useActionState` / forms for mutations |
| **Derived data** | Compute during render from props + server data; do not mirror into `useState` without a reason |
| **Global client state** | Only when proven (e.g. auth session consumer) — not the default |

If drilling exceeds ~2–3 levels, **compose** (pass render props or small child components) or **colocate** state in a feature wrapper before reaching for global stores.

### 3.4 Naming

- Primitives: noun (`FormField`, `OutlinedCard`).
- Sections: `*Section` (`FitSection`).
- Containers that only wire data: optional `*Container` or keep in `page.tsx`.

### 3.5 Near-term candidates (optional backlog)

| Area | Idea |
|------|------|
| Contact | `ContactTextField`, `ContactFormStatus`, parent `ContactForm` |
| Services / home cards | Extract `ServiceCardHeader` / `ExpandablePanel` if accordion grows |
| Case studies | `CaseStudyMetaRow`, `CaseStudyQuote` for repeated typography blocks |

---

## 4. Purity playbook

### 4.1 What “pure” means here

For a given **props + state** snapshot, render output should be **deterministic**:

- No `Math.random()`, `Date.now()`, or reading mutable module-level variables during render.
- No writing to refs, `window`, `document`, or `localStorage` during render.
- No **async** work kicked off directly in render body.
- Avoid **derived state** duplicated incorrectly; prefer computing from props (`useMemo` only when profiling shows benefit).

### 4.2 Where impurity is allowed (React-aligned)

| Mechanism | Use for |
|-----------|---------|
| **Event handlers** | `onClick`, form submit, toggles |
| **Server Actions / route handlers** | Mutations, email, DB |
| **`useEffect` / `useLayoutEffect`** | Subscriptions, DOM measurement, focusing after submit, syncing `document.documentElement`, imperative animations setup |
| **Custom hooks** | Reusable effect bundles (`useScopedStars`, `useFocusFirstError`) — keep hooks **named** after behavior |

Document **why** a client component exists in a one-line comment when it is not obvious (e.g. “client: imperative star field”).

### 4.3 Anti-patterns to flag in review

- Random values in render for IDs (use `useId()` or stable keys from data).
- `useEffect` that only mirrors props into state without user intent (prefer deriving during render).
- Large IIFEs or `.map(() => { ...side effect... })` inside JSX.

### 4.4 Testing and verification

- **Critical flows** — keep a short **manual checklist** per release or PR when touching forms/nav: contact submit success/failure, locale switch, primary nav (aligns with DoD §7).
- **Visual / leaf components** — **Storybook** (or equivalent) when marketing UI stabilizes; render with fixed props; snapshots optional for regression signal.
- **Forms** — **minimal interaction tests** (e.g. Playwright) are valuable once the form schema stabilizes; not mandatory on day one.
- **Purity sanity check** — change one prop in React DevTools; subtree should update predictably without one-off globals firing during render.

---

## 5. Performance and rendering

Composition and purity pair with **how much client JS** you ship:

- **Default to Server Components** where possible; add `"use client"` only for interactivity, browser APIs, or hooks that require the client.
- **Avoid unnecessary client boundaries** — each `"use client"` file pulls its dependency tree client-side; keep leaves small and documented.
- **Memoization** (`memo`, `useMemo`, `useCallback`) — use **after profiling** or for stable references passed to optimized children, not by default.
- **Props shape** — prefer **narrow, stable props** over huge object literals recreated every render when they flow into memoized children; lift constants outside the component when cheap.
- **Lists** — stable `key` from data; avoid inline arrow factories in hot lists only if profiling shows cost (don’t optimize blindly).

---

## 6. Phased roadmap

### Phase A — Document and enforce in review (now)

- Use this doc as the **checklist** for PRs that touch `src/components/**`.
- Add to PR template (optional): “Composition: single responsibility? State ownership clear? Purity: no render side effects?”

### Phase B — High-traffic, high-churn areas (next)

1. **Contact form** — split into field + status + orchestrator; keep `useActionState` in the orchestrator only.
2. **Hero** — separate static layout from `HeroOrbBackground` / video concerns; keep props explicit (`title`, `subtitle`, `ctas`).
3. **Services accordion** — ensure `ExpandableOutlineCard` remains dumb; state lives in parent (`home/service-cards/ServiceCardsAccordion`).

### Phase C — Shared `ui/` kit (when repetition is proven)

- Introduce `ui/TextField`, `ui/SectionTitle`, etc., only after **three** call sites or clear design-system need.
- Co-locate stories or visual tests if the team adopts Storybook.

### Phase D — Audit pass

- Run through `src/components` list (see glob in repo) and tag files: **primitive / feature / section / client-effect-leaf**.
- Target **one** “monolith” per sprint for decomposition.

---

## 7. Definition of done (for refactors)

A refactor satisfies this plan when:

1. **Single purpose** — the component name matches one job; parents compose, children do not know about unrelated routes. Splitting followed §3.2, not micro-file churn.
2. **Props are explicit** — no “grab bag” objects without TypeScript types; prefer narrow types from `Messages` slices or content types.
3. **State ownership is obvious** — UI state has a clear parent; server data flows from RSC/actions as appropriate (§3.3).
4. **Render is pure** — impure logic is in handlers, Server Actions, or a clearly scoped `useEffect` / hook in a **client** file.
5. **Accessibility preserved** — heading order, labels, keyboard behavior unchanged or improved (see `docs/Accessibility implementation plan.md`).
6. **No behaviour regression** — same pages render; critical paths (contact submit, locale switch) manually verified.

---

## 8. References

- React — [Thinking in React](https://react.dev/learn/thinking-in-react)
- React — [Keeping Components Pure](https://react.dev/learn/keeping-components-pure)
- React — [Extracting State Logic into a Reducer](https://react.dev/learn/extracting-state-logic-into-a-reducer) (for complex form/UI state later)

---

## Document maintenance

**Owner:** whoever touches component architecture in a given sprint.  
**Review:** Update this file when conventions change (e.g. new `ui/` folder, Storybook adoption, or a major layout redesign).
