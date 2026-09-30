# Epic 03 — Global UI

## Objective

Implement shared chrome used across the demo: site header/navigation, footer, mobile menu, persistent Plan Your Trip CTA, and reusable breadcrumb markup pattern.

## Scope

- Desktop and mobile navigation matching demo IA
- Primary CTA: Plan Your Trip
- Footer structure from Visual Style Guide
- Breadcrumb pattern for detail pages
- Optional sticky mobile CTA pattern (single CTA only)
- WhatsApp prominence as a contact affordance (link/placeholder number — no API)

## Pages / Components

- Site Header / Nav
- Mobile menu
- Footer
- Breadcrumb
- Shared CTA button instances
- Placeholder brand wordmark

### Primary navigation (approved)

Destinations · Tours · Car Rentals · Experiences · Travel Guides · Plan Your Trip

### Secondary

About · Gallery · Contact

## Implementation Tasks

| ID | Task |
| --- | --- |
| 03.01 | Implement header markup with logo placeholder, primary nav, and primary CTA |
| 03.02 | Implement transparent-over-hero / solid-on-scroll behaviour if needed (keep simple) |
| 03.03 | Implement mobile menu (logo + menu trigger + optional compact CTA; not oversized app drawer) |
| 03.04 | Implement footer: brand statement, Explore, Plan, Company, contact, copyright |
| 03.05 | Implement breadcrumb markup/CSS pattern for destination, tour, and vehicle detail pages |
| 03.06 | Wire all nav destinations to demo page paths (pages may be stubs until later epics) |
| 03.07 | Add WhatsApp link affordance in footer/contact patterns (static `wa.me` placeholder; no automation) |
| 03.08 | Ensure keyboard access for mobile menu open/close and visible focus states |

## Dependencies

- Epic 01 — Project Foundation
- Epic 02 — Design System

## Acceptance Criteria

- Navigation matches approved demo hierarchy
- Plan Your Trip is visually primary
- Footer is structured, not oversized
- Mobile nav preserves information hierarchy
- Breadcrumb pattern ready for detail pages
- No production auth, CRM, or chat widgets

## Explicitly Out of Scope

- Full page body content
- Experiences listing page (nav item may link to homepage section or placeholder — resolve in Open Questions)
- Live WhatsApp Business API
- Multi-language switcher
- User account menus
