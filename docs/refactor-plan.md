Here is the **straightforward refactor plan**.

Your repo is already structured well enough for a full repositioning. You do **not** need to preserve the current content architecture. You should preserve the **visual system**, then aggressively refactor the **information architecture, copy, data model, routes, and homepage flow**.

---

# Goal

Turn the site from:

* agency / service-selling website

into:

* personal portfolio / “hire me” website for recruiters and hiring managers

while keeping:

* the same theme
* the same UI language
* the same component style
* the same overall visual identity

---

# What must change

Right now the repo is still clearly agency-oriented:

* nav includes `Services`
* homepage includes `PackagesSection`
* home copy says “we / us”
* case studies are mostly conceptual
* services page sells engagement models
* CTAs are project-sales CTAs
* metadata is business-service oriented

That all needs to be rebuilt.

---

# Refactor order

Do this in this exact order.

---

## 1. Freeze the design system

Do **not** start by redesigning anything.

Leave these alone unless something blocks you:

* `src/theme/theme.ts`
* `src/app/globals.css`
* `src/lib/layout-tokens.ts`
* `src/components/layout/Section.tsx`
* `src/components/layout/PageContainer.tsx`
* `src/components/layout/SiteShell.tsx`

Why:

* your design foundation is already clean
* the problem is not visual quality
* the problem is positioning and structure

---

## 2. Rewrite the site strategy before touching components

Define the new website purpose in one sentence:

> This site exists to convince recruiters and hiring managers to interview me for frontend or full-stack roles.

Every section must now answer one of these:

* who are you?
* what do you build?
* what are you strong at?
* what proof do you have?
* what kind of role fits you?
* how can someone contact you?

If a section does not help answer those questions, remove it or repurpose it.

---

## 3. Replace the site architecture

Change the site from this:

* Home
* Services
* Work
* About
* Contact

to this:

* Home
* Projects
* About
* Experience
* Contact

You can keep the existing route file names temporarily, but the **site should behave like this**.

### Files to edit

* `src/lib/navigation.ts`
* `src/messages/en.ts`
* `src/messages/he.ts`

### What to do

Change nav labels:

* `services` → `Experience`
* `work` → `Projects`

You can keep `/experience` and `/work` routes at first to avoid breaking structure, then rename routes later.

---

## 4. Rewrite metadata first

Before touching visible UI, rewrite metadata so the site is no longer framed like a web agency.

### File

* `src/messages/en.ts`
* `src/messages/he.ts`

### Replace meta content

Current meta is business-service oriented. Replace it with personal positioning like:

* `defaultTitle`: `Imri Wainberg — Frontend / Full-Stack Developer`
* `defaultDescription`: concise summary of your stack, strengths, and focus
* `servicesTitle`: `Experience`
* `workTitle`: `Projects`
* `aboutTitle`: `About`
* `contactTitle`: `Contact`

Also rewrite:

* services description
* work description
* about description
* contact description

Everything should read like a personal portfolio, not a development studio.

---

## 5. Rewrite all global copy from agency voice to personal voice

This is the biggest copy task.

### Files

* `src/messages/en.ts`
* `src/messages/he.ts`

### What to change

Remove or rewrite all language like:

* we
* us
* custom web apps for your business
* discovery sprint
* packages
* start a project
* development team without hiring one

Replace with:

* I
* my experience
* projects
* engineering strengths
* frontend / full-stack development
* accessibility / performance / maintainability
* contact me
* view projects
* download resume

Do not partially patch this. Rewrite it fully.

---

## 6. Rebuild the homepage flow

Current homepage order in `src/app/[locale]/page.tsx` is wrong for a hire-me site.

Right now it renders:

* Hero
* RealUse
* MidParagraph
* Process
* Packages
* Why
* FeaturedWork
* Fit
* CtaBand

That is sales-site logic.

### Replace the homepage order with this

1. Hero
2. Strengths / what I bring
3. Featured projects
4. Experience / domains / capabilities
5. Why hire me
6. Team / role fit
7. Contact CTA

### File

* `src/app/[locale]/page.tsx`

### Do this

Remove from homepage:

* `PackagesSection`
* current agency-style `ProcessSection` unless you repurpose it

Recommended new order:

```tsx
<HeroSection />
<RealUseSection />
<FeaturedWorkSection />
<MidParagraphSection />
<WhySection />
<FitSection />
<CtaBandSection />
```

If `MidParagraphSection` still sounds like service sales, rewrite or remove it.

---

## 7. Kill the packages section completely

Do not keep “packages” on a hire-me website.

### Files

* `src/components/home/sections/PackagesSection.tsx`
* `src/components/home/packages/*`
* package-related message objects in `src/messages/en.ts` and `src/messages/he.ts`

### What to do

You have two options:

### Better option

Delete the homepage usage immediately and stop thinking in packages.

### Optional reuse

If you want to salvage the UI, repurpose the package cards into three capability cards:

* Frontend Engineering
* Full-Stack Development
* Accessibility & Performance

But do **not** keep delivery pricing / ranges / phases / discovery sprint framing.

---

## 8. Rebuild the hero section

The hero must immediately say:

* who you are
* what role you fit
* what you’re good at
* what action the visitor should take

### Files

* `src/components/home/sections/HeroSection.tsx`
* `src/components/home/hero/HeroOrbBackground.tsx`
* hero-related copy in `src/messages/en.ts` and `src/messages/he.ts`

### What to change

Replace:

* business-growth framing
* custom web app agency framing
* “get in touch” as project-sales CTA
* “view services”

With:

* `Frontend / Full-Stack Developer`
* clear role statement
* short technical value prop
* CTA buttons like:

  * `View Projects`
  * `Contact Me`
  * `Download Resume`

### Orb content

Keep the orb visually.
Change its tags/text to things like:

* React
* Next.js
* TypeScript
* Accessibility
* Performance
* WooCommerce
* Full-Stack

---

## 9. Repurpose the RealUse section into strengths

Right now `RealUseSection` is still framed around business software.

### File

* `src/components/home/sections/RealUseSection.tsx`

### New purpose

Turn it into:

* core strengths
* what I build
* where I add value quickly

Possible content:

* production-ready frontend systems
* full-stack product development
* accessibility and UX quality
* performance and maintainability
* WooCommerce / WordPress engineering
* debugging and improving live systems

Keep the same section layout, but completely rewrite the content model.

---

## 10. Repurpose or remove the process section

The current “Define / Build / Grow” flow is agency process language.

### File

* `src/components/home/sections/ProcessSection.tsx`

You have two choices:

### Remove it

Best if you want a cleaner recruiter site.

### Repurpose it

Turn it into “How I work”:

* Understand the product and constraints
* Build cleanly and pragmatically
* Improve based on real usage

If you keep it, make it about your working style, not your service pipeline.

---

## 11. Move featured work much higher

Recruiters want proof early.

### File

* `src/app/[locale]/page.tsx`
* `src/components/home/sections/FeaturedWorkSection.tsx`

Put featured work right after the first strengths section.

Do not hide it after packages and process.

---

## 12. Replace fake/generic case studies with real projects

This is mandatory.

Current `src/content/case-studies.ts` contains:

* operations-dashboard
* client-portal-booking
* workflow-approvals

These feel conceptual and weak for a hire-me site.

### File

* `src/content/case-studies.ts`

### Replace them with real projects

Use actual work, such as:

* `beecomm-integration`
* `woo-b2b-bulk-ordering`
* `woocommerce-product-composer`

Or any other real projects you want recruiters to see.

### Expand the data model

Current data model is too thin:

```ts
type CaseStudyMeta = {
  slug: string;
  tags: string[];
  kind: CaseStudyKind;
};
```

Replace it with a richer shape like:

```ts
type CaseStudyMeta = {
  slug: string;
  title: string;
  summary: string;
  role: string;
  stack: string[];
  kind: "client" | "product" | "plugin" | "personal";
  highlights: string[];
  githubUrl?: string;
  liveUrl?: string;
  recruiterAngle: string;
};
```

Stop depending on localized title/problem/outcome fields for the entire case study identity. Put the core project data in the content model.

---

## 13. Rebuild the work page into a recruiter-first projects page

### File

* `src/app/[locale]/work/page.tsx`

Current work page cards show:

* problem
* outcome
* concept/client/self-initiated

That is not enough.

### Rebuild each project card to show

* title
* what it is
* your role
* stack
* 2–4 highlights
* GitHub / live link if available
* why this project matters

Recruiters want to quickly understand:

* what you built
* how technical it was
* how relevant it is to the role

---

## 14. Rebuild the project detail page

### File

* `src/app/[locale]/work/[slug]/page.tsx`

If this page currently mirrors the conceptual case-study format, rebuild it around:

* overview
* my role
* stack
* engineering challenges
* architecture / implementation decisions
* outcomes / what it demonstrates
* links

The point is not to sound like a polished agency case study.
The point is to show engineering maturity.

---

## 15. Rebuild the services page into an experience page

### File

* `src/app/[locale]/experience/page.tsx`

This page is currently one of the most agency-like parts of the repo. Refactor it hard.

### Rename its purpose

Treat `/experience` as `/experience` for now.

### New structure

Use that page to explain your capabilities across areas like:

* Frontend engineering
* Full-stack development
* WordPress / WooCommerce work
* Accessibility and performance
* Production maintenance and debugging
* Working across different business domains

### Remove

* package sequencing
* discovery sprint logic
* pricing/timeline language
* “what you get” service-sales structure

### Replace with

* where you’ve worked
* what systems you’ve built
* what kinds of problems you solve
* what roles you fit best

---

## 16. Rewrite the about page from scratch

### File

* `src/app/[locale]/about/page.tsx`

Current about page is likely too generic.

### New about page structure

1. Intro
2. Non-traditional background
3. Self-taught path
4. Freelance and maintenance experience
5. Types of businesses and products you’ve worked with
6. Technical strengths
7. How you work
8. What roles you’re looking for
9. CTA to contact / resume / LinkedIn / GitHub

This page should explain your story clearly and turn your background into an asset.

---

## 17. Rewrite the why section into “Why hire me”

### File

* `src/components/home/sections/WhySection.tsx`

The current differentiators are usable, but the framing is wrong.

### Replace titles like

* Reliable delivery
* Long-term support
* SEO-aware foundations

with more recruiter-relevant categories like:

* Strong frontend craftsmanship
* Accessibility-aware implementation
* Maintainable code and architecture
* Product-minded problem solving
* Real-world debugging and support experience
* Fast ramp-up on production systems

Keep the UI. Replace the meaning.

---

## 18. Rewrite the fit section into role/team fit

### File

* `src/components/home/sections/FitSection.tsx`

Current purpose:

* who we work best with
* when we’re not the right fit

New purpose:

* teams I help most
* roles where I add value fastest
* environments where I’m strongest
* where I’m less relevant

This section is useful if rewritten properly.

Example themes:

* product teams building real interfaces
* frontend-heavy roles with full-stack overlap
* teams that value usability and maintainability
* less relevant for pure design roles or niche non-web specializations

---

## 19. Rewrite the CTA band

### File

* `src/components/home/sections/CtaBandSection.tsx`

Current CTA is agency-like:

* have an idea?
* start a project

Replace it with recruiter CTA:

* interested in working together?
* want to discuss a role?
* view resume / contact me / connect on LinkedIn

This is one of the highest-impact copy changes.

---

## 20. Update the site header CTA

### File

* `src/components/layout/SiteHeader.tsx`

Current CTA likely says:

* Get in touch

That is acceptable, but not ideal.

Better options:

* Contact Me
* Let’s Talk
* Resume
* Hire Me

Use one primary action that supports the recruiter journey.

---

## 21. Rewrite the footer into a personal footer

### File

* `src/components/layout/SiteFooter.tsx`

Current footer tagline is service-business positioning.

Rewrite it into a personal one-liner about you, such as:

* frontend / full-stack developer focused on reliable, accessible, maintainable web products
* something similar, but personal

Also make sure the footer includes:

* GitHub
* LinkedIn
* email
* possibly resume

---

## 22. Add resume support

You need a resume link on a hire-me site.

### What to do

Add a resume file under `public/`, for example:

* `public/imri-wainberg-resume.pdf`

Then add links to it from:

* hero
* about page
* footer
* maybe contact page

This is not optional for a recruiter-facing site.

---

## 23. Centralize your public profile links

### File

* `src/lib/site-config.ts`

Put in:

* email
* LinkedIn URL
* GitHub URL
* resume URL
* maybe location / role focus if you want

Then consume that data from:

* header
* footer
* contact page
* hero
* about

Do not hardcode those links all over the repo.

---

## 24. Rebuild the contact page as a hiring-contact page

### File

* `src/app/[locale]/contact/page.tsx`

Keep the form if it works.
But rewrite the content around it.

Make the page clearly useful for:

* recruiters
* hiring managers
* collaborators

Also add direct contact methods:

* email
* LinkedIn
* GitHub
* resume

A form alone is not enough.

---

## 25. Clean up the messages object structure

Your `src/messages/en.ts` has too much agency-specific structure baked in:

* packages
* process
* service blocks
* engagement framing

Refactor the message model so it matches the new site.

### Suggested high-level message structure

* `meta`
* `nav`
* `header`
* `footer`
* `home`

  * hero
  * strengths
  * featuredProjects
  * whyHireMe
  * fit
  * cta
* `projects`
* `about`
* `experience`
* `contact`

Do not keep dragging the old mental model forward.

---

## 26. Rename or delete dead component concepts

You have names like:

* `PackagesSection`
* `BuildSection`
* `ServiceCardExpandedBody`
* package-specific component folders

Once the new direction is working, clean these up.

### Do this after the main refactor

Either:

* delete them
* or rename them to reflect their new purpose

Do not leave the codebase semantically stuck in “agency mode”.

---

## 27. Refactor the content model away from “case studies as translation blobs”

Right now a lot of case study identity lives inside `src/messages/en.ts`.

That is not ideal for a portfolio.

### Better split

Keep:

* real project data in `src/content/case-studies.ts`
* translated labels/UI strings in messages

That means project content itself becomes structured data, not mostly message-file prose.

This will make your portfolio much easier to maintain.

---

## 28. Make the homepage shorter and stronger

Your new homepage should not feel like a brochure.

Cut anything that feels like:

* package explanation
* service education
* process selling
* business discovery sales

Keep:

* identity
* proof
* strengths
* fit
* contact

This will make the site feel much more senior and much more recruiter-friendly.

---

## 29. Build around proof, not promises

When rewriting copy, bias toward:

* what you have built
* what you know
* what you improve
* how you work
* what kind of teams benefit from you

Avoid fluffy statements like:

* driving business growth
* digital future
* tailored solutions
* end-to-end excellence

A hire-me site needs credibility, not agency language.

---

## 30. Final pass: consistency audit

After the refactor, do one pass and check every page for old agency residue.

Look for and remove:

* services
* packages
* discovery sprint
* start a project
* we / us
* business-growth framing
* clients as buyers instead of employers
* conceptual fake work replacing real proof

If any of that remains, the repositioning will feel incomplete.

---

# Recommended final route intention

Even if you keep the current route file names for now, this is what the site should effectively become:

* `/` → Home
* `/work` → Projects
* `/experience` → Experience
* `/about` → About
* `/contact` → Contact

Later, if you want a cleaner repo, rename:

* `/work` → `/projects`
* `/experience` → `/experience`

But that is phase two.

---

# The minimum viable refactor

If you want the shortest path to a much better hire-me site, do these first:

1. Rewrite `src/messages/en.ts`
2. Change nav labels in `src/lib/navigation.ts`
3. Remove `PackagesSection` from homepage
4. Move `FeaturedWorkSection` near the top
5. Replace conceptual case studies in `src/content/case-studies.ts`
6. Rewrite `/experience` into `/experience`
7. Rewrite `/about`
8. Add resume / GitHub / LinkedIn / email
9. Rewrite all CTAs
10. Update metadata

That alone will transform the site.

---

# The aggressive version I would personally do

If I were refactoring this repo, I would do this:

* keep the theme
* keep the component styling
* keep the orb
* keep section primitives
* rewrite all copy
* remove packages entirely
* remove service-selling logic
* replace case-study model
* rebuild homepage order
* repurpose `/experience` into `/experience`
* repurpose `/work` into `/projects`
* make real projects the center of the site
* add resume and public links everywhere they matter

That is the correct direction for this repo.

---

# 31. Verification (post-refactor)

Run these checks after substantive changes so the site stays merge-ready and aligned with the hire-me positioning.

## Automated

* `npm run build` — must complete with no TypeScript or Next.js errors.
* `npm run lint` — fix new issues in touched files; keep the baseline clean when possible.

## Routing and i18n

* Open `/en` and `/he` (or your default locale): home sections render in the intended order (hero → strengths → featured projects → bridge → why → fit → CTA).
* Every main nav item resolves: Home, Experience (`/experience`), Projects (`/work`), About, Contact.
* Each project slug under `/work/[slug]` returns 200 for both locales (static params match `src/content/case-studies.ts`).

## Content and links

* Résumé: `GET /imri-wainberg-resume.pdf` returns the PDF; hero, about, footer, and contact “direct links” include it where expected.
* GitHub and LinkedIn: links use `siteConfig` / env (`NEXT_PUBLIC_GITHUB_URL`, `NEXT_PUBLIC_LINKEDIN_URL`); update placeholders before production.
* No remaining agency-only UI: no packages section, no discovery-sprint pricing copy on marketing pages.

## Accessibility (WCAG 2.2 AA target)

* Keyboard: tab through header nav, mobile drawer, footer links, and primary CTAs; focus order is logical and `:focus-visible` is visible.
* Headings: one `h1` per page; section headings do not skip levels without reason.
* Form: contact field labels, error summary, and success state still make sense with a screen reader.

## Optional manual polish

* Quick read of EN + HE for accidental wrong-language or leftover “we/us” phrasing.
* Lighthouse spot-check on home and one project detail (performance / accessibility / SEO) when you change layout or assets heavily.
