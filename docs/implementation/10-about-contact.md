# Epic 10 — About & Contact

## Objective

Implement trust and conversion utility pages: About and Contact, using placeholder brand content that does not invent unverified business claims.

## Scope

- `/about/`
- `/contact/`
- Contact form (static / client-side only)
- WhatsApp, phone, email placeholders
- No map vendor requirement unless a simple embed is later approved

## Pages / Components

- About page
- Contact page
- Form controls
- Header / Footer
- Talk to Us / Plan Your Trip CTAs

## Implementation Tasks

| ID | Task |
| --- | --- |
| 10.01 | Implement About page with H1 About [Agency Placeholder Name] |
| 10.02 | Add sections as content allows: Our Story, Our Approach, Our Destinations, Our Services, Why Travel With Us, Plan Your Trip |
| 10.03 | Restrict copy to illustrative brand narrative; omit years-in-business, traveller counts, partnerships unless documented |
| 10.04 | Implement Contact page with H1 Contact [Agency Placeholder Name] |
| 10.05 | Present contact channels: address placeholder, phone, WhatsApp, email, business hours placeholders |
| 10.06 | Implement short contact form (name, contact, message) with client-side validation only |
| 10.07 | Link Contact and About into footer/secondary nav consistently |
| 10.08 | Validate semantic structure and accessible form labels |

## Dependencies

- Epics 01–03
- Placeholder brand naming decision (see Open Questions)

## Acceptance Criteria

- About builds trust without false operational claims
- Contact supports discovery and conversion
- Forms are labelled and keyboard-accessible
- No CRM submission backend required for demo

## Explicitly Out of Scope

- Live map integrations unless separately approved
- Ticket/helpdesk systems
- Newsletter automation
- Staff directory with invented biographies beyond simple placeholders
- Authentication-gated contact
