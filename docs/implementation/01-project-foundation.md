# Epic 01 — Project Foundation

## Objective

Establish the static-site project structure, file conventions, illustrative content model, and shared assets approach required before UI implementation begins.

## Scope

- Static HTML5 / CSS3 / Vanilla JavaScript project skeleton
- Folder and naming conventions aligned to the demo sitemap
- Illustrative content files (JSON or equivalent static data)
- Shared asset directories for images and icons
- Baseline `index.html` shell only (no page sections)
- No frameworks, build systems, or package managers unless later approved

## Pages / Components

- Root site shell only
- Shared include pattern strategy (documented; implementation may use duplicated header/footer markup or lightweight JS injection — simplest approach preferred)
- Illustrative data entities: destinations, packages, vehicles, experiences, guides, testimonials (placeholder)

## Implementation Tasks

| ID | Task |
| --- | --- |
| 01.01 | Create static site root folders: `/css`, `/js`, `/assets/images`, `/assets/icons`, `/data`, and page directories matching demo URLs |
| 01.02 | Define file naming and URL mapping for demo pages (`/`, `/destinations/`, `/destinations/[slug]/`, `/tours/`, `/tours/[slug]/`, `/car-rental/`, `/car-rental/vehicles/[slug]/`, `/plan-your-trip/`, trip summary, `/travel-guides/[slug]/`, `/gallery/`, `/about/`, `/contact/`) |
| 01.03 | Create illustrative content data files for: Kashmir, Rajasthan, Kerala, Sikkim; three packages; Sedan, Innova Crysta, SUV, Tempo Traveller; one travel guide article |
| 01.04 | Model entity relationships in static data (destination ↔ packages ↔ vehicles ↔ guide) |
| 01.05 | Document placeholder image usage rules (Unsplash/local placeholders; meaningful filenames; required alt text later) |
| 01.06 | Create minimal root `index.html` document shell with semantic landmarks (`header`, `main`, `footer`) and no marketing sections yet |
| 01.07 | Add shared JS entry (`/js/main.js`) for progressive enhancement hooks only (nav toggle, planner later) |
| 01.08 | Confirm zero framework/dependency setup; remove any accidental framework scaffolding if discovered |

## Dependencies

- Approved Product Concept & Demo Scope
- Approved SEO sitemap / page blueprint
- Approved Production Architecture vs Demo Scope
- Visual Style Guide (referenced for later design-system epic)

## Acceptance Criteria

- Project opens as static files with no build step required
- Folder structure mirrors demo sitemap URLs
- Illustrative data exists and documents relationships
- No Next.js/React/Vue/Angular/Tailwind/Bootstrap present
- No production backend, CMS, or auth scaffolding present

## Explicitly Out of Scope

- Full page layouts and visual design
- Trip planner logic
- Production CMS / database
- Package managers and SPA frameworks
- Admin screens
- Booking, payments, CRM, AI
