# Epic 08 — Trip Planner & Enquiry

## Objective

Implement the multi-step Plan Your Trip flow and trip summary / enquiry confirmation — the demo’s primary interactive conversion journey — plus an optional static quotation visualization.

## Scope

- `/plan-your-trip/` multi-step planner
- Steps (approved): Destination → Dates → Travellers → Trip type → Services → Preferences → Budget → Contact → Submit
- Trip summary / enquiry confirmation page
- Client-side state only (no backend persistence)
- Optional static `/quotation/[reference]/` representative screen
- Prefill support from homepage quick planner and “Plan This Trip” package links where simple

## Pages / Components

- Plan Your Trip page
- Planner progress indicator
- Planner step panels / selection cards
- Trip summary / enquiry confirmation
- Optional static quotation page
- Form controls, buttons, selection cards

## Implementation Tasks

| ID | Task |
| --- | --- |
| 08.01 | Implement planner shell with progress indicator and Back / Next controls |
| 08.02 | Step 1 — Destination selection cards |
| 08.03 | Step 2 — Travel dates / duration + flexible dates option |
| 08.04 | Step 3 — Travellers (adults, children, total) |
| 08.05 | Step 4 — Trip type / experience selection |
| 08.06 | Step 5 — Services required (car, hotel, transfers, sightseeing, activities, guide, complete package) |
| 08.07 | Step 6 — Preferences (hotel/vehicle category, pace, must-visit, special requirements) |
| 08.08 | Step 7 — Budget range selection (illustrative ranges) |
| 08.09 | Step 8 — Contact details (name, WhatsApp/mobile, email, message) |
| 08.10 | Submit → trip summary / enquiry confirmation with captured fields and Talk to Us (WhatsApp) CTA |
| 08.11 | Ensure planner does not create indexable combinatorial URLs |
| 08.12 | Optional: static quotation page showing itinerary, services, price, Accept / Request Changes / Contact actions |
| 08.13 | Wire Plan This Trip / Request Quote entry points to prefill planner where practical |

## Dependencies

- Epics 01–03
- Destination / experience illustrative options
- Design-system form and selection-card patterns

## Acceptance Criteria

- Supports Journey 4 end-to-end without a server
- Feels guided (conversation-like), not a single long form
- Confirmation shows structured requirements
- Quotation (if included) is demonstrative only
- No payment, booking confirmation, CRM write, or WhatsApp API automation

## Explicitly Out of Scope

- Production enquiry backend / email delivery
- Quotation generation engine
- Customer authentication
- AI itinerary generation
- Saved user accounts / draft sync
- Admin lead inbox (optional admin is a separate future decision)
