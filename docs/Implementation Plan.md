# Implementation plan (from characterization)

This plan translates [Freelance App Characterization](./Freelance%20App%20Characterization.md) into build phases for this repo (Next.js App Router, TypeScript, Material UI). Use the characterization doc for exact copy tone and messaging; this file tracks **what to build** and **in what order**.

**What this plan optimizes for:** positioning anchored in the build, sensible sequencing, and **implementation that matches on-page promises** (performance, accessibility, SEO)—plus conversion flow and ICP clarity so copy and case studies stay coherent.

---

## Goals and constraints

| Item | From characterization |
|------|------------------------|
| **Primary goal** | Lead generation from SMBs needing custom web apps and ongoing support |
| **Voice** | Straightforward, calm, competent, low-ego; “I build / I help / I work with” |
| **Visual** | Whitespace, restrained palette, sharp type, subtle motion, clean grids, trusted specialist |
| **Technical** | Performance, accessibility, SEO-aware foundations (align implementation with the promises on the page) |

### Target scenarios (ICP clarity at implementation level)

The audience string “SMBs needing custom web apps” is still broad for **copy and case studies**. Lock a small set of **concrete scenarios** and reuse them across Home, Services, Work, and examples so the site feels specific, not generic.

Use consistently (headlines, cards, case study tags, “for example” lines):

1. **Internal dashboards / admin panels** — operational visibility and control  
2. **Client portals** — secure access for customers or partners  
3. **Booking / workflow systems** — scheduling, pipelines, approvals  
4. **Business automation tools** — reducing manual work across teams  
5. **SaaS MVPs for small teams** — focused first versions of product ideas  

**Rule:** When you write a section, tie it to at least one of these where it helps. Services and Work should echo the same vocabulary so nothing feels disconnected.

---

## Phase 0 — Foundations (design system and shell)

**Purpose:** Establish global layout, navigation, and tokens so every page feels consistent with “calm, polished, lightly technical”—and **not** like default MUI spacing.

### Layout width and rhythm (explicit)

Define tokens in theme and/or shared layout constants and use them in the section wrapper:

| Token | Intent |
|-------|--------|
| **Max content width** | ~1100–1200px for main marketing columns (hero, section innards) |
| **Readable text width** | ~60–75ch for long-form blocks (about, case study body) |
| **Section vertical rhythm** | Consistent steps (e.g. 48 / 64 / 96px or theme multiples) between major sections |

Document these in code (comments or theme) so new pages inherit the same cadence.

### Rest of Phase 0

1. **Typography and theme** — Tune MUI theme (`src/theme/theme.ts`) for hierarchy, line length, and spacing that match “sharp typography” and readability. Consider whether Geist / Geist Mono stay the brand pair or swap to a pairing that better matches “premium without cold” (only if you want a stronger editorial feel).
2. **Color and elevation** — Restrained palette: neutrals + one or two accents; avoid loud gradients or playful illustration defaults unless intentional.
3. **Site shell** — Shared header with primary nav (Home, Services, Work, About, Contact) and footer (contact link, optional social). Sticky or static per preference; keep motion subtle.
4. **Reusable primitives** — Section wrapper enforcing the rhythm above; optional eyebrow/label style for “lightly technical” cues; primary/secondary CTAs that match copy (“Get in touch”, “View work”, etc.).

**Acceptance:** Any new route dropped into the shell looks on-brand without one-off spacing hacks.

---

## Phase 1 — Information architecture and routes

Map the characterization **Website Structure** to App Router routes:

| Route | Purpose |
|-------|---------|
| `/` | Home: positioning, proof, services summary, process teaser, CTA |
| `/services` | Primary + supporting services; problems solved; simple-language labels (portals, dashboards, etc.) |
| `/work` | Case studies / selected projects (placeholders OK at first) |
| `/about` | Who you are, how you work, and why clients can trust you |
| `/contact` | Inquiry form + clear next step + expectation setting |

**Optional later (document as backlog):** `/process`, `/faq`, blog or insights section.

**Acceptance:** All main nav targets resolve; 404 page matches brand.

---

## Phase 2 — Home page (priority content)

**Conversion note:** Visitors quickly ask, *Can I trust this person?* Move **proof or credibility** up—right after the hero—even if it is lightweight at first (e.g. “Built for real business use”, stack you work with, years/projects framing, or confident copy). Small signals beat burying proof at the bottom.

### Section order (recommended)

1. **Hero** — Characterization headline/subheadline; primary CTA to contact; secondary to services or work.  
2. **Proof / credibility (early)** — Tech credibility, outcomes framing, logos, or a tight trust line—whatever you can show honestly on day one.  
3. **Intro (short)** — One paragraph from the characterization homepage draft (internal tools, portals, dashboards, dependable partner)—can sit directly under hero if you prefer a single narrative flow before proof.  
4. **Services snapshot** — Cards or list linking to `/services`; mirror messaging pillars (business outcomes, not jargon); tie examples to **target scenarios**.  
5. **Why work with me** — Differentiators: reliable delivery, codebase quality, performance, accessibility, SEO-aware dev, long-term support (scannable).  
6. **Process (short)** — Brief steps; link to full process page if/when it exists.  
7. **Work preview** — Featured case studies or teaser linking to `/work`.  
8. **Final CTA** — Contact invitation; calm, specific language.

### Fit and qualification (positioning)

Add at least one of on Home and/or Services:

- **Who I work best with** — e.g. custom solutions, long-term quality, ongoing support (align with characterization).  
- **When I’m not the right fit** — e.g. pure marketing sites only, unrealistic timelines, or scope you do not take—stated kindly and clearly.

This sharpens positioning and filters misfit leads without sounding arrogant.

### Pricing / qualification (strategic, not optional)

You do not need a rate card, but **do** set expectations so inquiries are better qualified:

- **Option A (recommended):** A rough floor, e.g. “Projects typically start from …” (honest range or minimum engagement).  
- **Option B:** “Best fit for businesses that …” bullets (custom work, care about maintainability, want ongoing support).

Place on Services, Contact, or a compact strip on Home—wherever it reads naturally.

**Acceptance:** Copy passes a “non-technical owner” read-aloud; no buzzword bingo.

---

## Phase 3 — Services page

Commercially critical: avoid a laundry list. **Each service block** follows the same scaffold:

| Block | Purpose |
|-------|---------|
| **What it is** | Plain name + one clear sentence |
| **When you need it** | Trigger situations the reader recognizes |
| **What you get** | Deliverables and working relationship (still non-jargon) |
| **Example use cases** | Pull from **target scenarios** (dashboards, portals, workflows, etc.) |

**Example pattern (Custom web app development):**

- *When you need it:* software tailored to workflow, customers, or operations.  
- *What you get:* design and build focused on performance and maintainability.  
- *Examples:* dashboards, portals, internal tools, client-facing platforms.

Cover **primary** services (custom web apps; ongoing development and support) and **supporting** (performance, accessibility, technical SEO). Keep the **plain-language list** prominent (portals, dashboards, management systems, internal tools, booking/workflows, client-facing platforms).

Include **fit** and/or **pricing-qualification** content here if not already on Home (see Phase 2).

**CTA:** Single clear path to contact.

**Acceptance:** Each service answers “what pain does this remove?” in one glance; every block uses the four-part pattern.

---

## Phase 4 — Work / case studies

Clients hire **outcomes**, not stacks.

### Mandatory questions per case study

Every entry (listing blurb and detail page) must answer:

1. **What was the business problem?**  
2. **What changed after the solution?**  

If you lack metrics yet: describe realistic outcomes, qualitative improvements, or “before vs after” clarity—never a feature list alone.

### Build

1. **Listing** — Grid or simple filters; each card: title, one-line outcome, optional tech tags.  
2. **Detail template** — Problem → approach → outcome; honest labeling for self-initiated or concept work (per characterization).  
3. **Content strategy** — Start with 1–3 entries so the page does not feel empty.

**Acceptance:** At least one case study reads like a story with a clear problem and a clear “what changed,” not a tech dump.

---

## Phase 5 — About page

1. **Narrative** — Positioning statement and brand personality (approachable, credible, dependable).  
2. **Working style** — Communication, reliability, what engagement looks like.  
3. **Trust** — Optional photo, location/time zone, response expectations—only what you are comfortable publishing.

**Acceptance:** A business owner finishes the page knowing *who* they would be emailing.

---

## Phase 6 — Contact and lead capture

1. **Form fields** — Name, email, company, message; optional budget/timeline if useful for qualification.  
2. **Expectation setting (under or beside the form)** — Reduces friction; e.g. typical response time (“I usually respond within …”), what happens next (“We start with a short intro call”), **no commitment required** if true.  
3. **Submission path** — Choose one: API route + email (e.g. Resend, SendGrid), serverless form backend (e.g. Formspree), or CRM embed. Document env vars in README (no secrets in repo).  
4. **Success and failure states** — Clear confirmation copy; accessible errors.  
5. **Spam/abuse** — Honeypot or turnstile if traffic warrants it.

Cross-link **pricing / qualification** copy if it lives primarily on Services or Home.

**Acceptance:** Successful submit shows a human confirmation; failures are explained without stack traces.

---

## Phase 7 — SEO, accessibility, and performance (site-wide)

Align the **built site** with the **promises** in the characterization.

1. **Metadata** — Per-route `metadata` (title, description, Open Graph). Homepage reflects positioning and primary keywords naturally.  
2. **Semantics** — Logical heading order, landmarks, skip link if header is heavy.  
3. **Images** — `next/image`, meaningful `alt`, appropriate priority for LCP.  
4. **Core Web Vitals** — Font loading, layout stability, avoid large client JS for static marketing sections where possible.  
5. **Sitemap and robots** — `sitemap.xml` and `robots.txt` when domains are final.  
6. **Internal linking strategy** — Purposeful paths: Home → Services, Work, Contact; Services → Work (relevant examples); Work → Contact; About → Contact. Supports SEO and keeps visitors moving toward inquiry.

**Acceptance:** Lighthouse (or equivalent) checks on key templates; manual keyboard pass on nav + forms.

---

## Phase 8 — Trust signals (iterative)

Add as content becomes available:

- Case studies and outcomes (ties to `/work`)  
- Testimonials  
- Technology stack section (homepage or footer)  
- Short process deep-dive (optional page)  

**Acceptance:** Each trust element has a purpose (reduce risk, clarify fit), not filler.

---

## Content and QA checklist

Before calling a page “done,” verify against the characterization:

- [ ] Uses “I build / I help / I work with” patterns; avoids hype and vague startup-speak  
- [ ] SMB audience and “no in-house team” fit is obvious  
- [ ] **Target scenarios** appear where they clarify (not everywhere, but consistently)  
- [ ] Differentiators appear as concrete behaviors, not empty claims  
- [ ] Visual density is low; typography and spacing feel calm  
- [ ] CTAs are obvious but not aggressive  
- [ ] **Fit** and **qualification** expectations are visible where leads decide to contact  

---

## Suggested build order (summary)

Ship a **usable lead path** as early as possible.

1. Phase 0 — Shell + theme (including layout width and rhythm)  
2. Phase 1 — Routes + empty page scaffolds  
3. Phase 2 — Home (with early proof, fit, and qualification content planned even if minimal)  
4. **Phase 6 — Contact immediately after Home** (form + expectations + wire to backend when ready)  
5. Phase 3 — Services  
6. Phase 4 — Work  
7. Phase 5 — About  
8. Phase 7 — SEO / a11y / perf + internal linking pass  
9. Phase 8 — Enrich trust content over time  

---

## Reference

- **Source document:** [Freelance App Characterization](./Freelance%20App%20Characterization.md)  
- **Current stack snapshot:** Next.js App Router, MUI, `ThemeRegistry`, placeholder content in `src/app/page.tsx`
