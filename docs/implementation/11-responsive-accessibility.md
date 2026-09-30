# Epic 11 — Responsive & Accessibility

## Objective

Ensure the completed demo pages meet responsive and accessibility standards described in the Visual Style Guide and SEO semantic rules, across the four primary journeys.

## Scope

- Responsive behaviour for mobile (`<768`), tablet (`768–1199`), desktop (`≥1200`)
- Keyboard navigation, focus visibility, semantic landmarks
- Contrast checks on key surfaces
- Mobile CTA strategy (no competing sticky elements)
- Reduced-motion respect
- Cross-page consistency pass after page epics

## Pages / Components

- All demo pages built in Epics 04–10
- Header / mobile menu
- Planner controls
- Forms and cards

## Implementation Tasks

| ID | Task |
| --- | --- |
| 11.01 | Audit all pages at mobile, tablet, and desktop widths for overflow, stacking, and CTA visibility |
| 11.02 | Verify hero readability and CTA usability on small screens |
| 11.03 | Verify planner steps are usable on mobile (comfortable controls, clear progress) |
| 11.04 | Keyboard-test navigation, menus, forms, planner selection cards, and primary CTAs |
| 11.05 | Confirm visible focus rings on interactive elements |
| 11.06 | Confirm selection states are not colour-only |
| 11.07 | Check colour contrast for body text, primary buttons, and dark-section inverse text |
| 11.08 | Verify heading order and landmark usage on each page type |
| 11.09 | Verify image alt text presence on content images |
| 11.10 | Confirm `prefers-reduced-motion` disables non-essential animation |
| 11.11 | Resolve responsive/a11y defects found in the four primary journeys |

## Dependencies

- Epics 04–10 substantially complete
- Design-system focus and motion foundations (Epic 02)

## Acceptance Criteria

- Primary journeys usable on mobile and desktop without horizontal overflow
- Keyboard users can complete Plan Your Trip
- Semantic structure remains intact after visual polish
- No multiple competing sticky CTAs

## Explicitly Out of Scope

- Full WCAG certification audit as a formal deliverable (habits yes; certification no unless approved)
- Screen-reader tooling subscriptions
- i18n / RTL localization
- Performance engineering beyond basic static best practices
