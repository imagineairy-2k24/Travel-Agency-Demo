# Illustrative static data (`data/`)

Demo-only JSON for the Travel Agency Digital Platform static site. **Not** a production CMS, API, or inventory source.

## Files

| File | Entity | Count (seed) |
| --- | --- | --- |
| `destinations.json` | Destinations | 8 — 4 domestic (Kashmir, Rajasthan, Kerala, Sikkim) + 4 international (Bali, Thailand, Dubai, Singapore) |
| `packages.json` | Tour packages | 7 — 3 domestic + 4 international |
| `vehicles.json` | Vehicles | 4 — Sedan, Innova Crysta, SUV, Tempo Traveller |
| `guides.json` | Travel guide articles | 1 |
| `experiences.json` | Experiences (placeholders) | 4 |
| `testimonials.json` | Testimonials (placeholders) | 3 |
| `admin-customers.json` | Admin demo customers | 5 named demo guests |
| `admin-enquiries.json` | Admin demo enquiries | 8 — all lifecycle statuses |
| `admin-trips.json` | Admin demo trips + itineraries | 5 |
| `admin-quotations.json` | Admin demo quotations | 6 |
| `admin-bookings.json` | Admin demo bookings | 4 |
| `admin-reviews.json` | Admin demo reviews | 4 |

Admin seed files are **illustrative / demo-only** for the Stage-1 Admin Demo. Runtime overlays and planner-submitted enquiries live in `localStorage` via `js/admin-store.js` (`taAdmin:*` keys). They are not a CRM, CMS, or live booking source.

## URL / slug alignment

Slugs match demo URL folders (trailing slash implied by site structure):

- Destinations → `/destinations/{slug}/` (e.g. `kashmir`)
- Packages → `/tours/{slug}/` (e.g. `kashmir-family-tour`)
- Vehicles → `/car-rental/vehicles/{slug}/` (e.g. `innova-crysta`)
- Guides → `/travel-guides/{slug}/` (e.g. `best-time-to-visit-kashmir`)

## Relationship pattern (canonical)

**Destination is the hub.** Child entities also store reverse references for easy listing/detail lookups.

1. **Destination → children (arrays of stable IDs)**  
   - `packageIds[]`, `vehicleIds[]`, `guideIds[]`, `experienceIds[]`
2. **Package / guide / experience → destination**  
   - Both `destinationId` and `destinationSlug` on each child record
3. **Vehicles**  
   - Fleet-global (no `destinationId` on the vehicle)  
   - Linked **only** via `destination.vehicleIds[]` (recommended / available vehicles for that destination)
4. **Testimonials**  
   - Standalone placeholders (`tripContext` is free text; no hard FK yet)

Keep ID and slug pairs in sync when editing (e.g. package `destinationId` must match a destination `id`, and `destinationSlug` must match that destination’s `slug`). Destination arrays and child FKs should stay bidirectional for packages, guides, and experiences.

### Seed graph (summary)

```text
dest-kashmir (domestic / India)
  packages: pkg-kashmir-family (kashmir-family-tour)
  vehicles: sedan, innova-crysta, suv
  guides:   guide-best-time-kashmir (best-time-to-visit-kashmir)
  experiences: dal-lake-shikara, gulmarg-meadows

dest-rajasthan (domestic / India)
  packages: pkg-rajasthan-heritage
  vehicles: sedan, innova-crysta, suv, tempo-traveller
  experiences: jaipur-forts

dest-kerala (domestic / India)
  packages: pkg-kerala-backwaters
  vehicles: sedan, innova-crysta, suv
  experiences: alleppey-backwaters

dest-sikkim (domestic / India)
  packages: (none yet)
  vehicles: suv, innova-crysta

dest-bali (international / Indonesia)
  packages: pkg-bali-escape (bali-escape)
  vehicles / guides / experiences: (none)

dest-thailand (international / Thailand)
  packages: pkg-thailand-highlights (thailand-highlights)
  vehicles / guides / experiences: (none)

dest-dubai (international / UAE)
  packages: pkg-dubai-discovery (dubai-discovery)
  vehicles / guides / experiences: (none)

dest-singapore (international / Singapore)
  packages: pkg-singapore-explorer (singapore-explorer)
  vehicles / guides / experiences: (none)
```

## Field extensions (Epics 05–09 support)

### `destinations.json` (editorial detail)

| Field | Type | Notes |
| --- | --- | --- |
| `travelScope` | `"domestic"` \| `"international"` | India vs overseas demo destinations |
| `country` | string | e.g. `India`, `Indonesia`, `Thailand`, `UAE`, `Singapore` |
| `overview` | string | Longer destination narrative |
| `whyVisit` | string[] | Bullet reasons |
| `placesToVisit` | `string[]` **or** `{name, note}[]` | Kashmir / international often use objects; others may use strings |
| `bestTime` | string | Illustrative seasonal copy |
| `recommendedDuration` | string | e.g. `5–7 days…` |
| `popularExperiences` | string[] | Often mirrors experience `title` values |

International destinations keep `vehicleIds` / `guideIds` / `experienceIds` empty in seed (no international car rental or experience pages yet).

### `packages.json` (tour detail)

| Field | Type | Notes |
| --- | --- | --- |
| `travelScope` | `"domestic"` \| `"international"` | Mirrors linked destination scope |
| `highlights` | string[] | Tour highlights |
| `itinerary` | `{day, title, description}[]` | Day-by-day outline |
| `includes` / `excludes` | string[] | What’s in / out |
| `accommodation` | string (optional) | Illustrative lodging note |
| `transportation` | string (optional) | Illustrative transfer note |
| `placesCovered` | string[] (optional) | Named stops |

Package titles (epic-aligned domestic): Kashmir Family Escape, Rajasthan Heritage Journey, Kerala Backwater Retreat. International: Bali Escape, Thailand Highlights, Dubai Discovery, Singapore Explorer. **Domestic slugs unchanged.**

### `vehicles.json`

| Field | Type | Notes |
| --- | --- | --- |
| `features` | string[] | Spec / amenity bullets |
| `idealFor` | string[] | Traveller / use-case list |
| `rentalNotes` | string (optional) | Extra rental context |

### `guides.json`

| Field | Type | Notes |
| --- | --- | --- |
| `sections` | `{heading, body}[]` | Article body blocks |
| `faqs` | `{q, a}[]` (optional) | FAQ pairs |

## Pricing labels

`startingPriceLabel` values are **illustrative demo strings** (e.g. `From ₹XX,XXX (illustrative)`). They are not live quotes or factual fare claims.

## Placeholder images

See `assets/images/README.md`. JSON fields use `imagePlaceholder` filenames only — binaries are not shipped from this epic’s data work.

## Trip planner state (client-only)

Planner logic lives in `/js/planner.js` (not in JSON). Client state key: `taDemoPlanner` in `sessionStorage`. Prefill query params (planner page): `destination`, `package`, `vehicle`, `tripType`, `adults`, `children`, `startDate`, `endDate`, `flexibleDates`.

On successful submit, planner also appends an enquiry into `localStorage` key `taAdmin:enquiries` (`appended[]`), shape-aligned with `admin-enquiries.json`, so the Admin Demo can list it after reload. Admin merge/API: `js/admin-store.js` → `window.TAAdminStore`.
