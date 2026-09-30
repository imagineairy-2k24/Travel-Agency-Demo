# Epic 02 — Design System

## Objective

Implement the reusable visual foundation defined by the Visual Style Guide: colour tokens, typography, spacing, layout primitives, core controls, and interaction states — without building product pages.

## Scope

- CSS custom properties for colour, type, space, radius, shadow, container
- Base typography styles (DM Serif Display + Manrope, or documented alternatives)
- Core UI primitives: button variants, badge/label, form controls, section heading
- Card base styles used later by destination/tour/vehicle/guide cards
- Focus, hover, active, disabled states
- Responsive breakpoint tokens
- A small static component showcase page for review/approval

## Pages / Components

- `/css/tokens.css` — design tokens
- `/css/base.css` — resets, typography, containers
- `/css/components.css` — buttons, badges, forms, cards, breadcrumbs
- `/css/utilities.css` — spacing helpers if needed (keep minimal)
- Showcase page (e.g. `/styleguide/` or `/components.html`) — review only, not a product page

### Components to define

- Button (primary, secondary, ghost/text)
- Badge / metadata label
- Input, select, textarea, checkbox/radio chip
- Card base
- Section heading
- Breadcrumb
- Selection card (planner-ready)

## Implementation Tasks

| ID | Task |
| --- | --- |
| 02.01 | Encode colour tokens from Visual Style Guide (`primary`, `accent`, `neutral`, `surface`, `text`, `border`, semantic) |
| 02.02 | Encode typography tokens and load display + body fonts |
| 02.03 | Encode spacing, radius, shadow, and container tokens |
| 02.04 | Implement base body/surface styles and readable measure for body copy |
| 02.05 | Implement Button primary / secondary / ghost with hover, active, focus, disabled |
| 02.06 | Implement Badge, form controls, and selection-card selected state (not colour-only) |
| 02.07 | Implement Card base, Section heading, Breadcrumb styles |
| 02.08 | Define breakpoints: mobile `<768`, tablet `768–1199`, desktop `≥1200` |
| 02.09 | Add subtle transition defaults (`150–250ms`) and `prefers-reduced-motion` respect |
| 02.10 | Build component showcase page listing primitives with labels for design review |
| 02.11 | Verify contrast on primary buttons, body text, and dark-section inverse text |

## Dependencies

- Epic 01 — Project Foundation
- Visual Style Guide (Artifact 05)

## Acceptance Criteria

- Tokens match documented values (or documented approved alternatives)
- Showcase demonstrates buttons, forms, cards, badges, headings, breadcrumbs
- No page marketing sections beyond the showcase
- Visual direction remains premium / immersive / editorial / commercially clear
- No wildlife/safari WildLens brand identity copied

## Explicitly Out of Scope

- Homepage and product page layouts
- Trip planner flow
- Complex JS component framework
- Tailwind / Bootstrap / UI libraries
- Brand logo finalization (client TBD — use placeholder wordmark only)
