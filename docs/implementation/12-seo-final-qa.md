# Epic 12 — SEO Foundation & Final Demo QA

## Objective

Apply production-aware SEO foundations appropriate to a static demo, validate information architecture, internal linking, and demo-journey completeness — without implementing a production SEO platform.

## Scope

- Meaningful URLs matching approved demo sitemap
- Unique title / meta description per indexable demo page
- Canonical self-references where practical
- Open Graph basics (optional but recommended)
- Breadcrumbs on detail pages
- Internal linking QA across destination ↔ tours ↔ vehicles ↔ guide ↔ planner
- Robots/indexation guidance for planner state and confirmation (non-indexable where applicable)
- Final QA of Journeys 1–4 and optional quotation screen
- Explicit regression check against out-of-scope list

## Pages / Components

- All public demo pages
- Metadata in each HTML head
- Breadcrumbs
- Internal link modules

## Implementation Tasks

| ID | Task |
| --- | --- |
| 12.01 | Confirm URL map matches demo sitemap (no accidental production-only routes) |
| 12.02 | Add unique `<title>` and meta description to each indexable page |
| 12.03 | Ensure one H1 and logical H2/H3 hierarchy on each page |
| 12.04 | Verify descriptive anchor text (avoid generic “click here / learn more” as primary links) |
| 12.05 | Verify breadcrumbs on destination, tour, vehicle, and article detail pages |
| 12.06 | Mark planner intermediate states and enquiry confirmation as non-indexable where applicable (`noindex` on confirmation) |
| 12.07 | Walk Journey 1–4 end-to-end and record defects |
| 12.08 | If quotation page exists, verify it is conceptual, non-indexable, and not connected to a quote engine |
| 12.09 | Confirm illustrative data disclaimer approach where needed (content tone; not fake certifications) |
| 12.10 | Final out-of-scope audit: no payments, auth, CRM backend, AI, inventory, WhatsApp API, admin-unless-approved |
| 12.11 | Produce a short demo handoff checklist for client presentation readiness |

## Dependencies

- Epics 01–11 complete enough for presentation
- Approved demo page inventory

## Acceptance Criteria

- Demo demonstrates production-ready IA/semantics without production SEO tooling
- Four primary journeys work convincingly
- No silent scope expansion present in the build
- Client-facing demo is presentation-ready

## Explicitly Out of Scope

- Keyword research program
- Full schema.org coverage beyond architecture-aware basics
- Search Console / analytics production setup (optional later)
- CMS, SSR platform migration
- Production sitemap of all future guide categories
- Admin CRM implementation
