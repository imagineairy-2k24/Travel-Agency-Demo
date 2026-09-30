# Placeholder images

Illustrative media for the static demo. Prefer local files under this folder; Unsplash (or similar free stock) is acceptable for placeholders until client photography is supplied.

## Local vehicle placeholders (Epic 01 contract)

These files ship with the demo and map 1:1 to `data/vehicles.json` `imagePlaceholder` values:

| Filename | Vehicle slug |
| --- | --- |
| `vehicle-sedan.jpg` | `sedan` |
| `vehicle-innova-crysta.jpg` | `innova-crysta` |
| `vehicle-suv.jpg` | `suv` |
| `vehicle-tempo-traveller.jpg` | `tempo-traveller` |

Reference them as `/assets/images/<filename>` in HTML. Replace binaries later without changing filenames or JSON.

Supporting editorial placeholders (homepage refinement):

- `principles-travel.jpg`
- `story-traveller-featured.jpg`

## Naming

Use descriptive, kebab-case filenames that encode subject and role. Seed JSON `imagePlaceholder` values follow this pattern:

- `destination-kashmir-hero.jpg`
- `package-rajasthan-heritage-tour.jpg`
- `vehicle-innova-crysta.jpg`
- `guide-best-time-to-visit-kashmir.jpg`

Avoid generic names (`image1.jpg`, `photo.png`). Keep filenames in sync with `data/*.json` when adding media.

## Alt text

Content images must have meaningful `alt` text describing the subject (destination, vehicle, experience). Decorative images use empty `alt=""`.

Alt copy is authored with page markup in later epics — filenames alone are not a substitute.
