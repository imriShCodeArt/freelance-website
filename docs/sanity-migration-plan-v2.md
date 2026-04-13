# Sanity.io migration plan

## Goal

Move marketing copy and portfolio case studies out of static TypeScript modules and into Sanity so non-developers can edit content safely, while keeping the Next.js app stable, typed, cache-friendly, and easy to roll back.

This migration should:

- make Sanity the source of truth for editable marketing content
- preserve the app-facing `Messages` and case study contracts during migration
- support English and Hebrew content cleanly
- avoid a risky big-bang cutover
- support on-demand revalidation after publish
- leave room for preview mode later without blocking MVP

---

## Current state

### UI copy

- `src/messages/en.ts` and `src/messages/he.ts` export nested message objects
- `src/lib/i18n/get-messages.ts` selects locale synchronously
- many server components depend on the current `Messages` shape directly or indirectly

### Case studies

- `src/content/case-studies.ts` stores metadata and localized content together
- helpers such as `listCaseStudyMeta`, `getCaseStudyMeta`, and `getCaseStudyLocaleCopy` read from static data
- featured case studies on the homepage are chosen implicitly by array order

### Dynamic copy

- `common.builtWith` is currently implemented as a TypeScript function
- this is not directly editable by non-developers

### Operational state

- there is no Sanity integration yet
- the locale layout is already async, which makes async CMS fetches a natural fit

---

## Target architecture

### Content ownership

Sanity becomes the source of truth for:

- marketing copy in `en` and `he`
- portfolio case studies
- homepage featured-project selection and ordering

The app remains the source of truth for:

- configuration values such as site URLs, email addresses, and environment-specific settings
- runtime-only formatting helpers where editor control is unnecessary
- business logic and UI behavior

### App contract strategy

The app should keep using stable internal types during migration.

Sanity data should be mapped into existing app-facing shapes through adapters rather than exposing raw CMS documents across the codebase.

This means:

- Sanity is an implementation detail of the data layer
- components continue receiving stable `Messages` and case study objects
- future CMS changes are isolated to schemas, queries, and mappers

### Rendering and caching

The app should fetch published content on the server using cached Sanity queries.

Recommended approach:

- shared Sanity client under `src/lib/sanity/`
- query helpers under `src/lib/sanity/queries.ts`
- mapping and validation under `src/lib/sanity/mappers.ts`
- request deduplication via React `cache()`
- persistent caching with Next.js cache tags where useful
- webhook-triggered revalidation after publish

---

## Recommended content model

The main change from the earlier draft is to avoid one massive `siteCopy` singleton that mirrors the full `Messages` tree 1:1.

That would work technically, but it would create a large, deeply nested Studio editing experience that becomes harder to manage over time.

Instead, split content into smaller documents with clear editorial responsibility.

### Option chosen

Use multiple singleton-like documents per locale and one document per case study.

### Document types

#### 1. `siteSettings`

One global singleton document for non-sensitive editorial settings only.

Use it only for truly editorial, non-secret values such as:

- optional social links if editors need to control them
- optional default SEO text if you want it editable

Do **not** move environment secrets, deployment URLs, or operational settings here.

This document is optional for MVP and can be skipped if current config is already sufficient.

#### 2. `siteSectionCopy`

One document per section per locale.

Recommended fields:

- `locale`: `en | he`
- `sectionKey`: enum-like string such as:
  - `common`
  - `nav`
  - `header`
  - `home`
  - `experience`
  - `work`
  - `workDetail`
  - `about`
  - `contact`
  - `notFound`
  - `meta`
  - `caseStudyKind`
  - `footer`
  - `localeSwitcher`
- `content`: object matching that section’s app-facing shape

This keeps Studio forms smaller and lets you query either all sections for one locale or only the pieces needed later.

#### 3. `caseStudy`

One document per project.

Recommended fields:

- `_id`: stable ID such as `caseStudy.<slug>`
- `slug`
- `kind`
- `stack`: string array
- `githubUrl`
- `liveUrl`
- `featuredOnHome`: boolean
- `homeFeatureOrder`: number
- localized content fields grouped by locale, for example:
  - `en.title`
  - `en.summary`
  - `en.role`
  - `en.highlights[]`
  - `en.body` or richer structured fields as needed
  - `he.title`
  - `he.summary`
  - `he.role`
  - `he.highlights[]`
  - `he.body`

This keeps one project per slug and avoids duplicate locale documents.

---

## Decision on dynamic strings

### `common.builtWith`

Do not store this as a runtime function in Sanity.

Recommended approach:

- store a string template, for example `Built with {{year}} by {{name}}`
- interpolate it inside the app using current runtime values

This gives editors control over wording without forcing the app to trust arbitrary logic from the CMS.

If editor control is not needed, keep this string entirely in code and omit it from Sanity.

For this migration, the recommended choice is:

- keep it editable via a template field
- interpolate in the adapter layer

---

## Schema design rules

To reduce drift and future maintenance problems, follow these rules:

1. The app contract is primary.
   - Sanity schemas should be designed to map cleanly into app types.

2. Use stable IDs for singleton-like documents.
   - Example: `siteSectionCopy.en.home`

3. Enforce locale and section uniqueness.
   - there should be only one `siteSectionCopy` document for each `(locale, sectionKey)` pair

4. Keep short labels as plain strings.
   - do not use Portable Text for simple labels, buttons, or metadata

5. Use richer content only where necessary.
   - if case-study long-form content needs formatting later, use structured rich text there only

6. Keep Studio editing focused.
   - use fieldsets, groups, ordering, descriptions, and validation rules

7. Add validation where business rules exist.
   - `homeFeatureOrder` required when `featuredOnHome == true`
   - slug uniqueness
   - locale required
   - required titles and summaries for published content

---

## Migration strategy

This should not be a one-step replacement.

Use a staged rollout with fallback support until the Sanity path is verified.

### Phase 1. Foundation

Create the Sanity project and connect the app.

Tasks:

- create a Sanity project and dataset, likely `production`
- choose Studio deployment mode:
  - embedded Studio in the Next.js repo is recommended
  - separate Studio is acceptable if operationally simpler
- install dependencies:
  - `sanity`
  - `next-sanity`
  - `@sanity/client`
  - `@sanity/image-url` only if images are needed
  - `zod` if not already used
- add environment variables:
  - `NEXT_PUBLIC_SANITY_PROJECT_ID`
  - `NEXT_PUBLIC_SANITY_DATASET`
  - `SANITY_API_VERSION`
  - `SANITY_API_READ_TOKEN` only if needed
  - `SANITY_API_WRITE_TOKEN` for seed scripts only
  - `SANITY_REVALIDATE_SECRET`

Deliverable:

- working Studio
- working read client in the Next.js app

### Phase 2. Schema implementation

Build schemas before touching the runtime data flow.

Tasks:

- implement `siteSectionCopy` schema
- implement `caseStudy` schema
- optionally implement `siteSettings`
- configure validation and helpful Studio previews
- configure ordering and filtering views for editors

Deliverable:

- publishable documents with editor-friendly forms

### Phase 3. Seed and migration tooling

Create a one-time migration script that reads current static sources and writes them into Sanity.

Input sources:

- `src/messages/en.ts`
- `src/messages/he.ts`
- `src/content/case-studies.ts`

Requirements:

- idempotent behavior
- stable document IDs
- safe re-run support
- clear logging of created vs updated documents
- explicit transform for dynamic template strings such as `builtWith`

Recommended output IDs:

- `siteSectionCopy.en.common`
- `siteSectionCopy.he.common`
- `siteSectionCopy.en.home`
- `siteSectionCopy.he.home`
- `caseStudy.<slug>`

Deliverable:

- all existing content present in Sanity
- rerunnable migration script checked into the repo

### Phase 4. Data layer implementation

Build the Sanity integration behind adapters before changing app call sites.

Recommended files:

- `src/lib/sanity/client.ts`
- `src/lib/sanity/queries.ts`
- `src/lib/sanity/mappers.ts`
- `src/lib/sanity/validators.ts`
- `src/lib/sanity/get-site-copy.ts`
- `src/lib/sanity/get-case-studies.ts`

Responsibilities:

#### `client.ts`

- configured Sanity client
- separate read and write clients if needed

#### `queries.ts`

GROQ queries for:

- all section-copy documents for a locale
- featured case studies ordered by `homeFeatureOrder`
- all case-study metadata for lists and sitemap generation
- one case study by slug

#### `validators.ts`

- Zod schemas for Sanity query payloads before mapping

#### `mappers.ts`

- map validated query results into app-facing `Messages` and case-study types
- interpolate template fields such as `builtWith`

#### `get-site-copy.ts`

- fetch all section-copy documents for a locale
- validate and assemble a single `Messages` object
- cache results

#### `get-case-studies.ts`

- fetch and map case-study data for list/detail use cases
- cache results

Deliverable:

- complete Sanity-backed data layer with no component changes yet

### Phase 5. Controlled app wiring

Switch runtime reads gradually.

#### Step 5A. Add fallback-aware getters

Before replacing all call sites, update getters so the app can fall back to static content if Sanity content is missing or invalid.

Recommended behavior for MVP rollout:

- first try Sanity
- if validation fails or required content is missing, log the issue server-side and fall back to static data
- optionally guard this with a feature flag such as `USE_SANITY_CONTENT=true`

This is the safest part of the plan and should exist before full cutover.

#### Step 5B. Replace message access

Update `getMessages(locale)` to become async and CMS-backed through the adapter layer.

Then update call sites including:

- locale layout
n- pages under `src/app/[locale]/`
- metadata generation helpers
- sitemap-related helpers if they depend on content
- server actions only if they truly need localized content at execution time

#### Step 5C. Replace case-study access

Replace current helpers with Sanity-backed equivalents:

- list case studies
- featured case studies
- case study by slug
- localized case-study content lookup

Deliverable:

- app renders from Sanity in enabled environments
- static fallback still available during verification window

### Phase 6. Revalidation and publishing flow

Once runtime reads are stable, connect publish events to cache invalidation.

Tasks:

- add a secure revalidation route handler
- verify request secret or signature
- revalidate tags based on content type and locale where possible

Recommended tags:

- `site-copy`
- `site-copy:en`
- `site-copy:he`
- `case-studies`
- `case-study:<slug>`
- `case-studies:featured`

This is better than only broad tags because it keeps cache invalidation narrower and more predictable.

Webhook behavior examples:

- publishing `siteSectionCopy.en.home` revalidates `site-copy` and `site-copy:en`
- publishing `caseStudy.my-project` revalidates `case-studies`, `case-study:my-project`, and `case-studies:featured` if applicable

Deliverable:

- publish in Studio updates the site without redeploy

### Phase 7. Verification period

Do not remove static data immediately after first success.

Run a short verification phase where:

- Sanity-backed rendering is enabled
- fallbacks remain in place
- editors perform real content edits
- homepage featured ordering is tested
- Hebrew content is checked carefully for formatting and direction-sensitive UI
- sitemap and metadata generation are verified
- missing-content logs are reviewed

Exit criteria:

- no fallback hits for expected published content
- no validation failures in production-like usage
- publish-to-site refresh works reliably

### Phase 8. Cleanup

Only after the verification period:

- remove static message modules
- remove static case-study module
- remove temporary fallback logic if no longer needed
- keep migration scripts unless there is a reason to archive them elsewhere
- update internal docs such as AGENTS or site notes

Deliverable:

- clean CMS-backed content system with reduced duplication

---

## Fallback and failure handling

This is a critical addition to the earlier draft.

The migration should be resilient to partial CMS issues.

### Recommended fallback policy

For site copy:

- if all required section documents for a locale exist and validate, use Sanity
- otherwise fall back to the existing static locale messages during rollout

For case studies:

- if a requested case study document is missing or invalid, return `notFound()` or fall back only if the static data still exists during rollout

### Logging

Log these conditions clearly on the server:

- missing section document
- invalid schema payload
- duplicate locale/section documents
- missing localized case-study fields
- invalid featured ordering

This makes rollout problems visible without breaking the site for users.

---

## Query and cache design

### Site copy query

Fetch all `siteSectionCopy` documents for one locale in a single query and assemble them into the `Messages` object in app code.

Reason:

- fewer round trips
- sections remain editor-friendly in Studio
- app still receives one stable locale object

### Case-study queries

Implement dedicated queries for:

- featured case studies for homepage
- case-study metadata lists for `/work`
- individual case study detail by slug
- slugs for static params and sitemap

### Cache policy

Use:

- React `cache()` for per-request dedupe
- Next cache tags for cross-request reuse and revalidation

Avoid overfetching entire case-study content when only metadata is needed.

---

## SEO and route integration

The app wiring step should explicitly include every content-dependent path, not only visual pages.

Check and update:

- `generateMetadata`
- localized metadata generation
- sitemap generation
- `generateStaticParams` for case-study routes
- homepage featured-project queries
- 404 or not-found copy

This prevents subtle mismatches where visible content is CMS-backed but metadata still comes from static files.

---

## Studio implementation notes

### Recommended setup

Use embedded Studio in the same repo unless there is a clear operational reason not to.

Benefits:

- same version control flow
- easier schema maintenance
- lower setup overhead

### Editor experience

Make the Studio comfortable for non-developers:

- group fields logically
- add descriptions for template fields and placeholders
- use document lists filtered by locale and section
- show concise previews such as `en / home`
- hide implementation-only fields where appropriate

### Access control

Protect Studio appropriately in production.

---

## Type safety strategy

Recommended stack:

- Sanity schema typing or generated query types where useful
- Zod at the boundary for runtime validation
- internal app types remain the stable contract

This layered approach is safer than trusting raw CMS payloads throughout the app.

---

## Testing plan

### Unit-level checks

- mapper tests for `siteSectionCopy` assembly into `Messages`
- mapper tests for case-study localization
- template interpolation tests for `builtWith`
- validation tests for invalid or incomplete Sanity payloads

### Integration checks

- render homepage in both locales
- render work list and work detail pages
- verify featured order control
- verify sitemap and metadata output
- verify publish triggers revalidation

### Manual QA

- Hebrew copy accuracy and direction-sensitive UI review
- editor workflow review in Studio
- publish a content change and confirm site refresh
- remove a required field in draft or published content and verify expected failure or fallback behavior

---

## Risks and mitigations

| Risk | Mitigation |
|---|---|
| Large, hard-to-edit CMS documents | split content into per-section documents instead of a single giant locale singleton |
| Schema drift from app contracts | validate with Zod and keep adapters as the boundary |
| Missing or malformed CMS content breaks production | use staged rollout with static fallback during verification |
| Over-broad revalidation causes unnecessary cache churn | use granular tags by locale and case-study slug |
| Hidden SEO mismatches after migration | explicitly update metadata, sitemap, and static params flows |
| Editors misuse template placeholders | document expected placeholders in Studio field descriptions and test interpolation |
| Featured homepage items become inconsistent | validate `homeFeatureOrder` when featured is enabled and use deterministic query ordering |

---

## Final task list

### 1. Sanity foundation

- create project and dataset
- install dependencies
- add env vars
- choose Studio deployment mode

### 2. Schema work

- add `siteSectionCopy`
- add `caseStudy`
- optionally add `siteSettings`
- add validations and previews

### 3. Migration tooling

- write idempotent seed script
- import `en.ts`, `he.ts`, and `case-studies.ts`
- verify documents in Studio

### 4. Data layer

- add client
- add GROQ queries
- add validators
- add mappers
- add cached getters

### 5. Safe app wiring

- introduce Sanity-first getters with static fallback
- switch layouts, pages, metadata, sitemap, and case-study helpers
- verify both locales

### 6. Revalidation

- add secure route handler
- configure Sanity webhook
- test publish-to-site refresh

### 7. Verification window

- run CMS-backed site with fallback still enabled
- validate editor workflows and publish behavior
- monitor logs for fallback or validation failures

### 8. Cleanup

- remove static content modules
- remove temporary fallback logic when safe
- update internal documentation

---

## Recommended MVP boundaries

Include in MVP:

- published content only
- Studio editing
- migration script
- server-side cached fetches
- webhook revalidation
- safe fallback-based rollout

Defer to phase 2:

- preview / draft mode
- image pipelines if not needed yet
- moving more site settings into CMS
- richer rich-text modeling unless case studies truly need it

---

## Recommended outcome

At the end of this migration:

- non-developers can edit site copy and case studies without touching `.ts` files
- the app remains strongly typed and stable
- homepage featured content is editor-controlled
- content updates no longer require code changes or redeploys
- the migration is reversible during rollout and safer than a hard cutover
