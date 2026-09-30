# Travel Agency Digital Platform — High-Fidelity Static Demo

A high-fidelity, modern digital travel and trip-planning web platform designed to demonstrate the end-to-end customer journey from destination discovery to customized trip planning and quotation-oriented enquiry generation.

Built with clean, production-grade **HTML5, CSS3 (Design Tokens), Vanilla JavaScript**, and modular static **JSON datasets**.

---

## 🌟 Highlights & Features

- **Destination Discovery**: Comprehensive regional destination hubs (Kashmir, Kerala, Rajasthan, Sikkim) featuring highlights, best seasons, top experiences, and FAQs.
- **Curated Tour Packages**: Rich package detail pages with day-by-day itineraries, inclusions/exclusions, pricing indicators, and direct planner prefill hooks.
- **Car Rental & Fleet Directory**: Transparent vehicle listings (Sedan, Innova Crysta, Premium SUV, Tempo Traveller) with specifications, passenger/luggage capacities, and quick quote triggers.
- **Interactive 8-Step Trip Planner**:
  - Step 1: Destination selection
  - Step 2: Trip style & travel vibe
  - Step 3: Travel dates & duration
  - Step 4: Travelers breakdown (adults, children)
  - Step 5: Vehicle preference
  - Step 6: Accommodation tier (Standard, Deluxe, Luxury)
  - Step 7: Experiences & activities
  - Step 8: Contact details & notes
  - State persisted via `sessionStorage` with prefill support from any package or car page.
  - Generates an actionable **Trip Summary** with pre-formatted WhatsApp quotation handoff (`wa.me`).
- **Comprehensive Visual Styleguide**: Accessible design system with color tokens, typography scales, card patterns, badges, buttons, form controls, and micro-interactions at `/styleguide/`.
- **Editorial Travel Guides & Photo Gallery**: Practical advice, seasonal travel tips, and responsive masonry photo galleries.
- **Search Engine Optimized (SEO)**: Pre-configured Open Graph, Twitter Cards, semantic HTML5 hierarchy, and Schema.org JSON-LD microdata (`TouristDestination`, `TouristTrip`, `Product`, `FAQPage`).
- **Accessible & Responsive**: Fully responsive from 320px mobile screens to 4K displays; WCAG 2.1 AA compliant color contrast ratios and keyboard-navigable focus states.

---

## 🚀 Quick Start / Local Development

Because this project uses root-relative paths (`/css/`, `/js/`, `/data/`), it **must be served via a local HTTP server** rather than opened via `file://`.

### Option 1: Python 3 (Recommended)
From the project root directory:

```bash
# Start local server on port 8765
python -m http.server 8765 --bind 127.0.0.1
```
Open **[http://127.0.0.1:8765/](http://127.0.0.1:8765/)** in your browser.

### Option 2: Node.js / npx
```bash
npx serve .
```

### Option 3: VS Code / IDE Live Server
Right-click on `index.html` and choose **"Open with Live Server"**.

---

## 🧭 Key Demo Journeys to Test

1. **Home → Destinations → Kashmir → Plan Your Kashmir Trip**  
   Notice how the trip planner opens with *Kashmir* preselected.
2. **Home → Tours → Kashmir Family Tour → Plan This Trip**  
   Notice how the trip planner opens with destination, duration, and style pre-configured.
3. **Home → Car Rentals → Innova Crysta → Request Quote**  
   Notice how the trip planner opens with vehicle type pre-selected.
4. **Plan Your Trip → Complete 8 Steps → Trip Summary**  
   Review the generated trip breakdown and click *Send via WhatsApp* to inspect the encoded pre-filled inquiry.
5. **Explore Styleguide (`/styleguide/`)**  
   Review the tokens, button variants, badges, forms, and component designs.

---

## 📁 Repository Structure

```text
Travel Agency Demo/
├── about/                     # About Us page
├── assets/                    # Static assets
│   ├── icons/                 # SVG & vector iconography
│   └── images/                # Illustrative destination & tour photography
├── car-rental/                # Car rental hub & vehicle detail pages
│   └── vehicles/              # Sedan, Innova Crysta, SUV, Tempo Traveller
├── contact/                   # Contact & inquiry form page
├── css/
│   ├── base.css               # Reset, typography, layout foundation
│   ├── components.css         # Reusable buttons, cards, badges, nav, footer
│   ├── pages.css              # Page-specific styling rules
│   ├── tokens.css             # CSS custom properties (colors, spacing, shadows)
│   └── utilities.css          # Helper and utility classes
├── data/                      # Illustrative JSON datasets
│   ├── destinations.json      # Destinations database
│   ├── experiences.json       # Highlights and activities
│   ├── guides.json            # Travel guide articles
│   ├── packages.json          # Curated tour package itineraries
│   ├── testimonials.json      # Customer feedback quotes
│   └── vehicles.json          # Fleet specifications and pricing
├── destinations/              # Destinations directory & regional landing pages
│   ├── kashmir/
│   ├── kerala/
│   ├── rajasthan/
│   └── sikkim/
├── docs/                      # Architectural and product documentation
│   ├── implementation/        # 12 phased implementation epics
│   ├── DEMO-HANDOFF.md        # Client demo handoff checklist
│   ├── PRODUCT-CONCEPT-AND-DEMO.md
│   ├── PRODUCTION-ARCHITECTURE-VERSUS-DEMO-SCOPE.md
│   ├── SEO-GUIDELINES.md
│   └── VISUAL-STYLE-GUIDE.md
├── gallery/                   # Destination visual photo gallery
├── js/
│   ├── main.js                # Global navigation, mobile drawer, scroll animations
│   └── planner.js             # Multi-step trip planner state & validation engine
├── plan-your-trip/            # 8-step interactive trip planning engine
│   └── summary/               # Final itinerary & WhatsApp quote handoff
├── styleguide/                # Interactive UI component and design token showcase
├── tours/                     # Curated tour listings and detailed itineraries
├── travel-guides/             # Practical editorial travel guides
├── .gitignore                 # Standardized ignore rules for web projects
├── AGENTS.md                  # Multi-agent role boundaries and orchestration rules
├── index.html                 # Platform homepage
└── README.md                  # Project overview and documentation
```

---

## 🎯 Architecture vs. Demo Scope Boundary

This repository represents the **High-Fidelity Client Demo**:
- **Static Core**: Uses client-side JavaScript, `sessionStorage`, and static JSON data.
- **Enquiry-First Workflow**: Designed to showcase customer conversion into quotes and WhatsApp discussions without requiring real-time merchant gateways or database connections.
- **Future Production Roadmap**: The long-term architecture (CRM, inventory management, dynamic booking, payments, headless CMS) is documented under `docs/PRODUCTION-ARCHITECTURE-VERSUS-DEMO-SCOPE.md`.

---

## 📄 License & Notes

- All photography and media placeholders are illustrative for demo purposes (see `assets/images/README.md`).
- Prepared by **IMAGINEAIRY**.
