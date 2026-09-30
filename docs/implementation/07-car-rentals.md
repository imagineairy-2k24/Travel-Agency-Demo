# Epic 07 — Car Rentals

## Objective

Implement the car rental listing and vehicle detail pages that present vehicles as a dedicated service and convert to Request a Quote.

## Scope

- `/car-rental/` listing
- Vehicle detail pages under `/car-rental/vehicles/[vehicle]/`
- Illustrative fleet: Sedan, Innova Crysta, SUV, Tempo Traveller
- Practical, trustworthy presentation (not marketplace clutter)
- Quote CTA (form or planner/contact handoff — simplest path)

## Pages / Components

- Car rental listing
- Vehicle detail
- Vehicle card
- Spec list / ideal-for list
- Breadcrumb
- Request Quote CTA / short enquiry form pattern

## Implementation Tasks

| ID | Task |
| --- | --- |
| 07.01 | Implement `/car-rental/` with H1 Car Rental Services, intro, and Choose Your Vehicle cards |
| 07.02 | Add supporting sections as content allows: Chauffeur-Driven Travel, Airport Transfers, Outstation Travel (illustrative copy only) |
| 07.03 | Add Request a Car Rental Quote CTA section |
| 07.04 | Implement vehicle detail: hero, overview, features, passenger & luggage capacity, Ideal For |
| 07.05 | Add rental information and FAQ sections where illustrative content exists |
| 07.06 | Add Available Destinations links using demo destination relationships |
| 07.07 | Implement Request a Quote CTA (short static form or deep-link into planner/contact with vehicle context) |
| 07.08 | Implement breadcrumbs: Home > Car Rental > [Vehicle] |
| 07.09 | Validate practical tone, semantic hierarchy, and alt text for vehicle imagery |

## Dependencies

- Epics 01–03
- Vehicle illustrative data
- Global UI quote/contact patterns

## Acceptance Criteria

- Supports Journey 3 (Home → Car Rentals → Vehicle Detail → Request Quote)
- Vehicle cards show name, category, capacity, rental context, CTA
- No “available today / only 2 left” scarcity claims
- Location-specific rental pages (`/car-rental/[location]/`) not required unless later approved

## Explicitly Out of Scope

- Real-time vehicle availability
- Driver allocation
- Fleet management admin
- Payment for rentals
- GPS tracking
- Vendor marketplace
