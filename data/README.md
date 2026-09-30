# Illustrative static data (`data/`)

Demo-only JSON for the Travel Agency Digital Platform static site. **Not** a production CMS, API, or inventory source.

## Files

| File | Entity | Count (seed) |
| --- | --- | --- |
| `destinations.json` | Destinations | 4 — Kashmir, Rajasthan, Kerala, Sikkim |
| `packages.json` | Tour packages | 3 |
| `vehicles.json` | Vehicles | 4 — Sedan, Innova Crysta, SUV, Tempo Traveller |
| `guides.json` | Travel guide articles | 1 |
| `experiences.json` | Experiences (placeholders) | 4 |
| `testimonials.json` | Testimonials (placeholders) | 3 |

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
dest-kashmir
  packages: pkg-kashmir-family (kashmir-family-tour)
  vehicles: sedan, innova-crysta, suv
  guides:   guide-best-time-kashmir (best-time-to-visit-kashmir)
  experiences: dal-lake-shikara, gulmarg-meadows

dest-rajasthan
  packages: pkg-rajasthan-heritage
  vehicles: sedan, innova-crysta, suv, tempo-traveller
  experiences: jaipur-forts

dest-kerala
  packages: pkg-kerala-backwaters
  vehicles: sedan, innova-crysta, suv
  experiences: alleppey-backwaters

dest-sikkim
  packages: (none yet)
  vehicles: suv, innova-crysta
```

## Field extensions (Epics 05–09 support)

### `destinations.json` (editorial detail)

| Field | Type | Notes |
| --- | --- | --- |
| `overview` | string | Longer destination narrative |
| `whyVisit` | string[] | Bullet reasons |
| `placesToVisit` | `string[]` **or** `{name, note}[]` | Kashmir uses objects; others may use strings |
| `bestTime` | string | Illustrative seasonal copy |
| `recommendedDuration` | string | e.g. `5–7 days…` |
| `popularExperiences` | string[] | Often mirrors experience `title` values |

### `packages.json` (tour detail)

| Field | Type | Notes |
| --- | --- | --- |
| `highlights` | string[] | Tour highlights |
| `itinerary` | `{day, title, description}[]` | Day-by-day outline |
| `includes` / `excludes` | string[] | What’s in / out |
| `accommodation` | string (optional) | Illustrative lodging note |
| `transportation` | string (optional) | Illustrative transfer note |
| `placesCovered` | string[] (optional) | Named stops |

Package titles (epic-aligned): Kashmir Family Escape, Rajasthan Heritage Journey, Kerala Backwater Retreat. **Slugs unchanged.**

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
