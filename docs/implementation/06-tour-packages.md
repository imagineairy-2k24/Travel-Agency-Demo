# Epic 06 — Tour Packages

## Objective

Implement the commercial tour catalogue listing and package detail pages that convert visitors into Plan This Trip enquiries.

## Scope

- `/tours/` listing
- Tour package detail pages for illustrative packages (Kashmir Family Escape, Rajasthan Heritage Journey, Kerala Backwater Retreat)
- Day-by-day itinerary presentation
- Includes / excludes, pricing placeholder, CTAs
- Filters only if simple and non-index-explosive (static UI preferred)

## Pages / Components

- Tour listing
- Tour detail
- Tour card
- Itinerary day blocks
- Includes/excludes lists
- Breadcrumb

## Implementation Tasks

| ID | Task |
| --- | --- |
| 06.01 | Implement `/tours/` with H1 Tour Packages, intro, and package cards |
| 06.02 | Add optional simple category groupings (by destination / travel style) without generating filter query URLs |
| 06.03 | Implement package detail hero + trip overview (duration, destination, trip type, starting price placeholder) |
| 06.04 | Implement Tour Highlights section |
| 06.05 | Implement day-by-day itinerary (H2 Itinerary; H3 Day N) |
| 06.06 | Implement What's Included and What's Not Included |
| 06.07 | Implement accommodation / transportation / places covered sections where illustrative data supports them |
| 06.08 | Add Best Time and FAQ sections if content exists; otherwise omit rather than invent |
| 06.09 | Add Plan This Trip and Request a Quote CTAs (both may route into planner / contact with context) |
| 06.10 | Implement breadcrumbs and validate semantic hierarchy |

## Dependencies

- Epics 01–03
- Package data linked to destinations
- Design-system cards and buttons

## Acceptance Criteria

- Supports Journey 2 (Home → Tours → Detail → Plan This Trip)
- Package detail communicates enough to enquire without instant booking
- Pricing shown as illustrative starting price only
- SEO heading structure matches blueprint intent
- No OTA-style availability or instant book

## Explicitly Out of Scope

- Real-time inventory / seats
- Payment checkout
- Dynamic pricing engine
- Thousands of filter-generated URLs
- Multi-currency commerce
