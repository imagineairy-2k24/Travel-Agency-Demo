# Travel Agency Digital Platform

## Design System & Visual Style Guide

**Document:** Artifact 05
**Version:** Draft 0.1
**Purpose:** Implementation specification for Cursor
**Applies to:** Current high-fidelity demo
**Relationship to previous artifacts:** This document defines visual and interaction rules only. It does not modify product scope, information architecture, SEO architecture, or demo scope.

---

# 1. Purpose

This document defines the visual language, design tokens, component styling, interaction behaviour, responsive rules, and implementation principles for the Travel Agency Digital Platform demo.

The objective is to create a travel experience that feels:

* Premium
* Immersive
* Editorial
* Trustworthy
* Modern
* Warm
* Commercially clear
* Easy to navigate
* Conversion-oriented

The interface should communicate **travel inspiration and confidence without becoming visually complicated**.

The design should take inspiration from the immersive storytelling quality of the existing WildLens project, while adapting the visual language to a broader travel business covering destinations, tours, car rentals, experiences, trip planning, and enquiries.

---

# 2. Design Philosophy

## 2.1 Core principle

> **Immersive storytelling + practical travel planning + clear conversion.**

The website should not feel like:

* a generic travel template
* an OTA marketplace
* a SaaS dashboard
* a luxury fashion website
* a photography portfolio
* a tourism department website

It should feel like a **modern travel company that understands the destination and helps the traveller plan the journey**.

---

# 3. Visual Character

The visual language should combine four characteristics.

### 3.1 Editorial

Large imagery, strong typography, generous whitespace, deliberate composition and restrained UI.

### 3.2 Immersive

Photography should play an important role in communicating destinations and experiences.

### 3.3 Human

The interface should feel approachable rather than corporate or transactional.

### 3.4 Commercially clear

Important actions such as:

* Explore
* Plan Your Trip
* View Package
* Request Quote
* Enquire Now

must always be visually obvious.

---

# 4. Colour System

The palette should be inspired by natural travel environments rather than conventional tourism colours.

Use a warm off-white foundation, deep natural darks, a restrained earthy green as the primary brand colour, and a warm terracotta/golden accent.

The palette must remain restrained.

## 4.1 Core colour tokens

```css
:root {
  /* Brand */
  --color-primary-900: #173B35;
  --color-primary-800: #1F4A42;
  --color-primary-700: #28584E;
  --color-primary-600: #32695E;
  --color-primary-500: #3F786B;

  /* Accent */
  --color-accent-700: #A85F3D;
  --color-accent-600: #B86D49;
  --color-accent-500: #C77A52;
  --color-accent-100: #F3E3D9;

  /* Neutrals */
  --color-neutral-950: #171817;
  --color-neutral-900: #202220;
  --color-neutral-800: #343634;
  --color-neutral-700: #50524F;
  --color-neutral-600: #6B6D69;
  --color-neutral-500: #858781;
  --color-neutral-400: #A5A69F;
  --color-neutral-300: #C9CAC3;
  --color-neutral-200: #E2E2DC;
  --color-neutral-100: #F1F1EB;
  --color-neutral-50: #F8F7F2;

  /* Surfaces */
  --color-surface-page: #F8F7F2;
  --color-surface-primary: #FFFFFF;
  --color-surface-soft: #F1F1EB;
  --color-surface-dark: #173B35;
  --color-surface-dark-deep: #102B27;

  /* Text */
  --color-text-primary: #202220;
  --color-text-secondary: #50524F;
  --color-text-muted: #6B6D69;
  --color-text-inverse: #FFFFFF;

  /* Borders */
  --color-border-default: #E2E2DC;
  --color-border-strong: #C9CAC3;

  /* Semantic */
  --color-success: #3F7051;
  --color-warning: #A97932;
  --color-error: #A8493F;
}
```

---

# 5. Colour Usage Rules

### Primary green

Use for:

* primary buttons
* active navigation states
* important links
* selected filters
* planner progress
* key UI accents

Do not flood entire pages with primary green.

### Terracotta accent

Use sparingly for:

* secondary CTAs
* small visual accents
* highlighted labels
* editorial details
* selected decorative elements

It must remain an accent, not a second primary brand colour.

### Off-white

The main page background should generally be:

```text
#F8F7F2
```

This creates a warmer editorial appearance than pure white.

### White

Use white for:

* cards
* forms
* navigation surfaces where appropriate
* high-contrast content blocks

### Dark green

Use for:

* dark editorial sections
* footer
* high-impact CTA sections
* selected hero overlays

---

# 6. Colour Anti-Patterns

Do not:

* use bright blue as the primary brand colour
* use excessive gradients
* use neon colours
* use multiple competing accent colours
* colour every section differently
* use saturated backgrounds behind large amounts of text
* use gradients simply because they are visually fashionable

Gradients may be used only when they serve a clear purpose, particularly for image readability overlays.

---

# 7. Typography

Typography should combine an elegant editorial display face with a highly readable sans-serif body face.

## 7.1 Font roles

### Display font

Use a sophisticated serif for:

* hero headlines
* major editorial headings
* destination storytelling
* large statement text

Suggested family:

**DM Serif Display**

Alternative if unavailable:

**Cormorant Garamond**

### Interface/body font

Use a clean sans-serif for:

* navigation
* body text
* buttons
* forms
* metadata
* package information
* vehicle information

Suggested family:

**Manrope**

Alternative:

**Inter**

---

# 8. Typography Tokens

```css
:root {
  --font-display: "DM Serif Display", serif;
  --font-body: "Manrope", sans-serif;

  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-md: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.375rem;
  --text-2xl: 1.75rem;
  --text-3xl: 2.25rem;
  --text-4xl: 3rem;
  --text-5xl: 4rem;
  --text-6xl: 5.25rem;
}
```

These values are starting tokens, not rigid requirements. Responsive scaling should be applied where appropriate.

---

# 9. Typography Hierarchy

## H1

Use only one primary H1 per page.

Desktop:

* Display font
* Approximately 56–84px depending on context
* Weight: regular
* Tight line height

Mobile:

* Approximately 40–52px

Hero H1 should feel editorial rather than like a conventional marketing headline.

---

## H2

Used for major page sections.

Desktop:

* Approximately 40–56px
* Display font

Mobile:

* Approximately 32–40px

---

## H3

Used for cards, subsections and supporting hierarchy.

* Approximately 24–32px
* Display or strong body font depending on context

---

## Body

* 16–18px
* Line height: approximately 1.6
* Maximum reading width should generally remain around 65–75 characters.

---

# 10. Typography Rules

Do not:

* use all-caps for large paragraphs
* use excessive font weights
* use more than two primary font families
* make every heading oversized
* sacrifice semantic heading hierarchy for visual appearance

Visual styling and semantic HTML are separate concerns.

For example, an H2 may visually resemble a large editorial heading while remaining correctly implemented as `<h2>`.

---

# 11. Spacing System

Use a consistent spacing scale.

```css
:root {
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;
  --space-32: 8rem;
}
```

---

# 12. Section Spacing

Desktop:

* Standard section: 80–120px vertical spacing
* Major editorial section: 120–160px
* Compact utility section: 48–72px

Mobile:

* Standard section: 56–80px
* Major editorial section: 80–100px

Avoid excessive empty space merely to create a luxury appearance.

Whitespace must support hierarchy and readability.

---

# 13. Layout Container

Use a central responsive container.

```css
--container-max: 1440px;
--container-padding-desktop: 48px;
--container-padding-tablet: 32px;
--container-padding-mobile: 20px;
```

The visual system should support both:

* wide immersive photography
* constrained readable content

Not every section should use the same width.

---

# 14. Grid

Use a flexible 12-column desktop grid where useful.

Typical structures:

```text
12 columns
8 + 4
7 + 5
6 + 6
4 + 4 + 4
3 + 3 + 3 + 3
```

Cards should not be forced into identical widths when editorial composition would benefit from variation.

However, commercial catalogue sections such as packages and vehicles should remain structured and easy to scan.

---

# 15. Border Radius

The interface should use restrained rounding.

```css
:root {
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-pill: 999px;
}
```

Guidelines:

* Buttons: `radius-md` or `radius-pill`
* Cards: `radius-lg`
* Images: `radius-lg`
* Input fields: `radius-md`
* Tags: `radius-pill`

Do not make every component pill-shaped.

---

# 16. Shadows

Use shadows sparingly.

```css
--shadow-sm: 0 2px 8px rgba(0,0,0,0.05);
--shadow-md: 0 8px 24px rgba(0,0,0,0.08);
--shadow-lg: 0 16px 40px rgba(0,0,0,0.10);
```

Cards should generally rely on:

* surface contrast
* spacing
* borders
* photography

rather than heavy shadows.

---

# 17. Navigation

The navigation should feel premium and minimal.

Recommended structure:

```text
Logo

Destinations
Tours
Car Rentals
Experiences
Travel Guide

Plan Your Trip

[Menu / Contact]
```

The primary CTA should be visually distinct.

### Desktop

* Transparent navigation over suitable hero imagery where appropriate.
* Solid background after scroll if implemented.
* Strong contrast against imagery.

### Mobile

Use:

* logo
* menu trigger
* optional compact CTA

The mobile navigation should not become an oversized application drawer.

---

# 18. Hero System

Hero sections should establish the destination/travel mood immediately.

Preferred composition:

```text
Large photographic background

Small contextual label

Large editorial H1

Supporting description

[Primary CTA] [Secondary CTA]

Optional contextual information
```

Example structure:

```text
TRAVEL YOUR WAY

Discover India beyond the obvious.

Curated journeys, comfortable travel and
local experiences designed around you.

[Plan Your Trip] [Explore Destinations]
```

Use dark image overlays only where required for text readability.

Avoid excessive decorative overlays.

---

# 19. Image Direction

Photography is one of the primary storytelling tools.

Images should communicate:

* place
* atmosphere
* people
* movement
* culture
* landscape
* experience

Prefer authentic travel imagery over generic stock-photo compositions.

---

# 20. Image Treatment

### Hero images

Use:

* full-bleed photography
* cinematic cropping
* subtle overlay when required

### Cards

Use consistent aspect ratios within a given collection.

Suggested:

```text
Destination cards: 4:3 or 3:4
Tour cards: 4:3
Vehicle cards: 4:3
Editorial cards: 3:2
Hero: 16:9 or immersive viewport-based
```

Avoid inconsistent random image dimensions.

---

# 21. Image Overlay

Use overlays primarily for:

* text readability
* editorial labels
* contextual metadata

Preferred treatment:

```text
transparent → dark
```

from the lower or relevant text area.

Do not apply heavy dark overlays to every image.

---

# 22. Buttons

Three primary button types.

## Primary

```text
Background: Primary 900
Text: White
Radius: 10px
```

Examples:

* Plan Your Trip
* Enquire Now
* Request Quote

## Secondary

```text
Background: transparent
Border: Primary 900
Text: Primary 900
```

Examples:

* Explore Destinations
* View Package

## Ghost / Text

Used for low-priority actions.

```text
No background
No heavy border
Text + directional icon
```

Example:

```text
Explore Rajasthan →
```

---

# 23. Button Behaviour

Buttons should have:

### Default

Normal surface.

### Hover

Small visual elevation or background transition.

### Active

Slightly reduced elevation.

### Focus

Clearly visible keyboard focus ring.

### Disabled

Reduced contrast without becoming unreadable.

Animation duration:

```text
150–250ms
```

Avoid exaggerated button animations.

---

# 24. Cards

Cards should be visually calm.

Recommended structure:

```text
Image

Category / metadata

Title

Short description

Optional price/context

CTA
```

Example:

```text
RAJASTHAN

Royal Rajasthan Escape

7 Days · 6 Nights

Explore the forts, colours and desert landscapes
of Rajasthan.

From ₹XX,XXX

View Journey →
```

Do not turn every card into a heavily bordered rectangular UI block.

---

# 25. Destination Cards

Destination cards should prioritize imagery.

Preferred:

```text
Large image
Destination name
Short contextual descriptor
Arrow / Explore action
```

The image should remain the dominant element.

---

# 26. Tour Package Cards

Tour cards should communicate enough information for a customer to decide whether to explore further.

Include where relevant:

* destination
* duration
* package title
* travel style
* starting price
* CTA

Do not overcrowd cards with every itinerary detail.

---

# 27. Vehicle Cards

Vehicle cards should feel practical and trustworthy.

Include:

* vehicle image
* vehicle name
* seating capacity
* luggage capacity where available
* vehicle type
* relevant rental context
* request quote CTA

Avoid inventing exact specifications if client data is unavailable.

Demo data may be clearly illustrative.

---

# 28. Forms

Forms should be simple and approachable.

Use:

* clear labels
* adequate input height
* logical grouping
* visible focus states
* helpful validation
* minimal required fields

Do not create long forms when the same information can be collected progressively.

---

# 29. Trip Planner

The planner is one of the most important interactive components of the demo.

It should feel like a guided conversation rather than an administrative form.

Recommended visual structure:

```text
Step 1
Destination

Step 2
Dates / Duration

Step 3
Travellers

Step 4
Travel Style / Budget

Step 5
Preferences

Step 6
Trip Summary
```

Include:

* visible progress
* one clear question per step where practical
* selectable cards/chips
* back/next controls
* clear summary

The planner should visually communicate progress and confidence.

---

# 30. Planner Interaction

Use selection cards for major choices.

Example:

```text
○ Family
○ Couple
○ Friends
○ Solo
○ Corporate
```

Selected state:

* primary border
* subtle background tint
* clear check/selection indicator

Do not rely solely on colour to communicate selection.

---

# 31. Trip Summary

The summary should feel like the beginning of a real travel conversation.

Structure:

```text
YOUR TRIP

Destination
Dates
Travellers
Travel style
Preferences

Suggested journey direction

[Send Enquiry]
```

The demo does not need to actually create a production booking.

---

# 32. Editorial Sections

Editorial sections should break up catalogue content.

Examples:

```text
A JOURNEY WORTH TAKING

Every journey begins with a place.
The rest is shaped around you.
```

Use:

* large typography
* strong imagery
* asymmetric layouts where appropriate
* restrained copy

Avoid excessive decorative elements.

---

# 33. Why Travel With Us

This section should communicate trust.

Use 3–5 concise principles such as:

```text
Local Knowledge
Thoughtful Planning
Flexible Journeys
Reliable Travel
Personal Support
```

Use icons sparingly.

Do not create a generic SaaS-style icon grid.

---

# 34. Traveller Stories

Testimonials should feel authentic.

Preferred presentation:

* traveller name
* location/context where appropriate
* concise testimonial
* optional trip reference
* optional image

Avoid fake-looking five-star review widgets.

If demo content is fictional, it should be treated as placeholder content and replaced before production.

---

# 35. Travel Guide

The Travel Guide should visually resemble an editorial publication.

Use:

* large feature article
* category labels
* article cards
* strong photography
* readable typography

Article pages should prioritize reading experience.

Do not make blog content look like product cards.

---

# 36. Gallery

Gallery should be visually immersive.

Possible layout:

* masonry-inspired composition
* controlled grid
* large featured image
* category/filter controls if needed

The gallery should support brand storytelling rather than simply acting as an image dump.

---

# 37. Dark Sections

Dark sections can be used to create rhythm.

Preferred background:

```text
#173B35
```

Use for:

* major CTA
* selected editorial section
* footer
* high-impact storytelling

Text:

```text
White / warm white
```

Do not use dark backgrounds for every major section.

---

# 38. Footer

Footer should be structured rather than oversized.

Suggested structure:

```text
Brand statement

Explore
Destinations
Tours
Car Rentals
Experiences

Plan
Plan Your Trip
Travel Guide
Contact

Company
About
Gallery

Contact information

Social links

Copyright / legal
```

---

# 39. Responsive Design

The design must be responsive from the beginning.

## Desktop

Primary design target:

```text
≥ 1200px
```

## Tablet

```text
768px – 1199px
```

## Mobile

```text
< 768px
```

---

# 40. Mobile Rules

Do not simply shrink the desktop layout.

On mobile:

* reduce typography scale
* reduce section spacing
* stack columns
* preserve image impact
* simplify navigation
* maintain CTA visibility
* make form controls comfortable to use
* avoid horizontal overflow

Hero content should remain immediately understandable.

---

# 41. Mobile CTA Strategy

Important conversion actions should remain easy to access.

Primary actions:

```text
Plan Your Trip
Enquire Now
Request Quote
```

may use:

* full-width buttons
* stacked buttons
* sticky CTA where appropriate

Do not create multiple competing sticky elements.

---

# 42. Motion

Motion should be subtle and purposeful.

Recommended:

```text
150–250ms
```

for UI transitions.

Use larger transitions only for:

* page-level hero entrances
* image reveals
* major editorial transitions

Avoid:

* excessive parallax
* continuous floating animations
* unnecessary text animations
* distracting scroll effects
* animation on every card

The website should feel sophisticated, not animated for its own sake.

---

# 43. Accessibility

The demo should establish production-quality accessibility habits.

Requirements:

* sufficient colour contrast
* visible keyboard focus
* semantic HTML
* meaningful alt text
* buttons must be buttons
* links must be links
* form fields must have labels
* selection states must not rely solely on colour
* logical heading hierarchy
* accessible mobile navigation

---

# 44. Semantic HTML

Visual styling must never override semantic structure.

Use:

```html
<header>
<nav>
<main>
<section>
<article>
<aside>
<footer>
```

Use:

```html
<h1>
<h2>
<h3>
```

according to document hierarchy.

Do not choose heading tags merely because their default size looks appropriate.

CSS controls appearance.

---

# 45. SEO Design Relationship

The visual design must support the SEO-first sitemap and page blueprint.

Important page content should remain present in the rendered HTML.

Do not hide essential destination/package information behind interaction that prevents meaningful content from being accessible.

The visual system must support:

```text
H1
Introductory content
H2 sections
Supporting H3 sections
Internal links
CTA
```

without compromising the visual experience.

---

# 46. Internal Linking Presentation

Internal links should feel natural.

Examples:

```text
Explore destinations →
View all journeys →
Discover Kerala →
Read the travel guide →
Plan your trip →
```

Avoid excessive generic links such as:

```text
Click here
Learn more
Read more
```

where a descriptive phrase can be used instead.

---

# 47. Design System Implementation

Cursor should convert these tokens into reusable design primitives.

Suggested structure:

```text
src/
  components/
    ui/
      Button
      Badge
      Card
      Input
      Select
      Tabs
      Breadcrumb
      Modal

    travel/
      DestinationCard
      TourCard
      VehicleCard
      ExperienceCard
      GuideCard
      PlannerStep
      TripSummary

  styles/
    tokens
    typography
    utilities
```

The exact project structure may differ according to the existing codebase.

Do not restructure the entire application merely to match this example.

---

# 48. Component Consistency

Once a component is established, reuse it.

For example:

```text
DestinationCard
TourCard
VehicleCard
GuideCard
Button
Badge
SectionHeading
```

should not be independently restyled on every page unless there is a documented visual reason.

The system should feel like one product.

---

# 49. Data and Content Rules

Because this is a demo:

* illustrative destinations may be used
* illustrative tour packages may be used
* illustrative vehicles may be used
* illustrative pricing may be used

However:

**Illustrative content must never be represented as confirmed client inventory.**

Avoid creating fake operational claims such as:

* “Available today”
* “Only 2 cars left”
* “Guaranteed booking”
* “Official partner”
* “1000+ travellers”

unless supplied by the client.

---

# 50. Demo Fidelity

The demo should demonstrate:

* visual quality
* navigation
* destination discovery
* package discovery
* vehicle discovery
* trip planning
* enquiry flow
* content structure
* future platform potential

It does not need to implement:

* real payment
* real booking
* real inventory
* production CRM
* driver allocation
* accounting
* vendor management
* AI
* production authentication
* real-time pricing

These remain outside the current demo scope.

---

# 51. Design Anti-Patterns

Cursor must avoid the following.

### Do not build a generic travel template.

### Do not make every section a card grid.

### Do not use excessive rounded containers.

### Do not use excessive gradients.

### Do not use bright tourism-style colours.

### Do not use huge text everywhere.

### Do not overload the homepage.

### Do not turn the planner into a conventional long form.

### Do not make every section visually identical.

### Do not use animations simply to make the demo appear sophisticated.

### Do not introduce features that are outside the locked demo scope.

### Do not sacrifice semantic HTML for visual styling.

### Do not invent business claims.

---

# 52. Visual Priority Hierarchy

When deciding where visual emphasis should go, use this order:

```text
1. Destination / Travel Story
2. Primary Customer Action
3. Relevant Travel Product
4. Supporting Information
5. Secondary Navigation
6. Decorative Elements
```

Content should always outrank decoration.

---

# 53. Homepage Visual Rhythm

The homepage should generally move through the following visual rhythm:

```text
IMMERSION
↓
DISCOVERY
↓
INSPIRATION
↓
PRODUCT
↓
TRUST
↓
PLANNING
↓
CONVERSION
```

This corresponds to:

```text
Hero
Featured Destinations
Popular Journeys
Car Rentals
Experiences
Why Travel With Us
Traveller Stories
Travel Guide / Inspiration
Plan Your Trip CTA
Footer
```

The exact section order remains governed by the approved homepage/wireframe specification.

---

# 54. Page-Level Design Principle

Every page should answer three questions quickly:

### Where am I?

Clear page title, breadcrumbs or contextual navigation.

### What can I do here?

The page's primary purpose must be visually obvious.

### What should I do next?

There must be a clear next action.

For example:

**Destination Detail**

```text
Where am I?
→ Rajasthan

What can I do?
→ Explore the destination and available journeys

What next?
→ Plan Your Trip
```

---

# 55. Design Decision Priority

When implementation decisions conflict, use this priority:

```text
1. Locked product scope
2. SEO / information architecture
3. Usability
4. Accessibility
5. Visual hierarchy
6. Brand expression
7. Decorative enhancement
```

A decorative idea must never override product scope, usability, semantic structure, or accessibility.

---

# 56. Source-of-Truth Rule

Cursor must treat the following documents as authoritative:

### Artifact 01

**Travel Agency Digital Platform — Product Concept & Demo Scope**

Defines:

* product vision
* customer journey
* product concepts
* demo objective
* demo boundaries

### Artifact 02

**Travel Agency Digital Platform — SEO-First Sitemap + Page Blueprint**

Defines:

* sitemap
* page purposes
* URL structure
* semantic hierarchy
* SEO architecture
* internal linking
* metadata and structured-data direction

### Artifact 03

**Production Architecture vs Demo Scope — Travel Agency Digital Platform**

Defines:

* production architecture
* current demo scope
* demo journeys
* what is explicitly out of scope

### Artifact 05

**Design System & Visual Style Guide**

Defines:

* colours
* typography
* spacing
* components
* visual hierarchy
* responsive behaviour
* interaction principles

No visual implementation decision should silently modify the product or technical scope established by the previous documents.

---

# 57. Handling Ambiguity

If the documents do not specify something:

1. Prefer the simplest implementation.
2. Preserve the existing design language.
3. Avoid introducing new product functionality.
4. Avoid unnecessary dependencies.
5. Avoid creating new pages.
6. Avoid creating new workflows.
7. Prefer reusable components.
8. Flag genuinely important unresolved decisions rather than inventing business requirements.

---

# 58. Implementation Principle for Cursor

The implementation should feel like:

> **One coherent travel brand, not a collection of individually designed pages.**

The same:

* typography
* spacing
* buttons
* cards
* image treatment
* navigation
* CTA language
* interaction patterns

should appear consistently throughout the demo.

At the same time, different page types should have different visual rhythms.

A destination page should feel editorial.

A package page should feel informative and commercial.

A vehicle page should feel practical.

The planner should feel guided.

A travel article should feel editorial.

This distinction is intentional.

---

# 59. Final Design Direction

The final visual experience should communicate:

> **“I can discover somewhere beautiful here, understand what the journey could look like, and easily ask this travel company to help me plan it.”**

That is the central design objective.

The demo should be visually impressive enough to sell the vision of the future platform while remaining simple enough to demonstrate clearly.

---

# 60. Scope Lock

This document is a **visual implementation specification**.

It does not authorize:

* new features
* new workflows
* additional product modules
* production booking systems
* backend development
* payment systems
* authentication
* AI features
* CRM
* operational systems

Any such requirement must be treated as a separate scope decision.

**Current objective:**

> Build a high-fidelity visual and interactive demonstration of the approved travel platform concept using this design system and the previously approved product, SEO, and demo-scope documents.
