# Demo handoff checklist — Travel Agency static demo

Presentation-ready checklist for the **Travel Agency Digital Platform — High-Fidelity Static Demo**.

## Serve locally

From the project root (absolute `/css/` `/js/` `/data/` paths require a static server, not `file://`):

```bash
python -m http.server 8765 --bind 127.0.0.1
```

Open `http://127.0.0.1:8765/`.

## Brand

- Customer-facing wordmark: **Travel Agency** (placeholder; client name TBD)
- IMAGINEAIRY appears on `/styleguide/` only (`noindex`) as preparer tooling — not the public brand

## Journeys to walk in the room

1. **Home → Destinations → Kashmir → Plan Your Kashmir Trip**
2. **Home → Tours → package detail → Plan This Trip** (planner prefills package/destination)
3. **Home → Car Rentals → vehicle → Request Quote** (planner prefills vehicle)
4. **Plan Your Trip** (8 steps) → **Trip summary** (`noindex`; sessionStorage only; WhatsApp `wa.me` placeholder)

## What this demo is

- Static HTML/CSS/Vanilla JS + illustrative `data/*.json`
- Editorial + commercial enquiry UX visualization
- Pricing labels are illustrative (`From ₹XX,XXX (illustrative)`)

## What this demo is not

- No live booking, payments, inventory, CRM, auth, or AI
- No WhatsApp Business API (static `wa.me` link only)
- No production CMS or email delivery from forms

## Content / media notes

- Images may use Unsplash placeholders until client photography ships (`assets/images/README.md`)
- Testimonials and trust copy are illustrative — no fabricated metrics/partnerships
- Experiences primary nav targets homepage `#experiences` (no separate Experiences catalogue)

## Optional optional

- Static quotation page was **not** included (optional in Epic 08)
