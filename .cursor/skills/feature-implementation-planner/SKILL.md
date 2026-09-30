---
name: feature-implementation-planner
description: Plan feature implementation for the Travel Agency static demo (HTML/CSS/JS + illustrative data) in a structured, deterministic way. Produces a step-by-step plan, impacted files, and data flow without writing code. Use when implementing new features or modifying behavior.
---

# Feature Implementation Planner

## Goal

Produce a **clear, minimal, and deterministic implementation plan** covering pages, styles, progressive JS, and illustrative data — without writing code.

---

## Core Behavior (Planning Only)

- Do **not** start coding, editing files, or running commands.
- Do **not** include code snippets, pseudo-code, or implementation logic.
- Do **not** assume missing requirements, data structures, or behavior.
- If any requirement is unclear or missing, ask clarification questions or state:
  - "I’m not sure based on the current requirements"
- Prefer the **smallest change** that satisfies requirements.
- Reuse existing markup, CSS, JS, and data patterns wherever possible.
- Do not introduce frameworks or production backends unless clearly justified and approved.

---

## Codebase Alignment (Mandatory)

Before planning:

- Identify whether similar functionality already exists
- Reuse:
  - Existing page shells, CSS tokens/components, shared chrome
  - Existing `data/` shapes and JS helpers
- Follow existing patterns and naming conventions
- Do not propose new structures without verifying existing ones

---

## Scope Control

Balance depth vs necessity:

- **Small features**: minimal, focused plan
- **Medium features**: structured multi-step plan
- **Large features**: full cross-surface breakdown (pages + CSS + JS + data)

Avoid unnecessary abstraction or over-planning. Keep work inside **demo scope**.

---

## Execution Discipline

- Follow all steps in order
- Do not skip steps
- Do not merge sections
- Maintain strict separation between planning and implementation

---

## Workflow

### 1) Understand and restate requirements

Clearly restate:

- **Goal**
- **User-visible behavior**
- **In-scope vs out-of-scope** (especially vs production architecture)
- **Inputs/outputs**
- **Constraints** (responsive, a11y, SEO, no-framework)

If anything is missing → stop and ask clarification questions.

### 2) Identify required changes (by area)

Break down changes into:

- **Pages (HTML)**:
  - Routes/URLs, landmarks, content sections, forms
- **Styles (CSS)**:
  - Tokens, layout, components, responsive rules
- **Progressive JS**:
  - Nav, planner, data loading, form enhancement
- **Illustrative data** (if applicable):
  - Entities, relationships, placeholders
- **SEO / a11y** (if applicable):
  - Titles, headings, alt, links, landmarks

### 3) Define implementation units

List explicitly:

- **Files to modify**
- **Files to create**
- **Functions/helpers to implement or update**
- **Data changes** (if any)

### 4) Sequence execution steps

Order logically:

1. Data / content contracts (if needed)
2. Shared CSS / chrome (if needed)
3. Page markup
4. Progressive JS
5. SEO/a11y pass
6. Manual QA checklist

---

## Required Output Template (Strict)

```markdown
### Requirements restatement
- Goal:
- User-visible behavior:
- Edge cases:
- Non-functional constraints:
- Assumptions: (only if confirmed)

### Clarification questions (if needed)
- <only essential questions>

### Impacted areas
- Pages (HTML):
- Styles (CSS):
- Progressive JS:
- Illustrative data:
- SEO / a11y:

### Impacted files
- Modify:
  - `path/to/file.ext` — why
- Create:
  - `path/to/file.ext` — why

### Functions / helpers to implement
- `name` — responsibility

### Data changes (if any)
- Entities / fields / relationships:

### Step-by-step implementation plan
1. ...
2. ...
3. ...

### Data / interaction flow overview
- End-to-end flow description

### Risks / unknowns
- <unclear areas or dependencies>

### Confidence
- High / Medium / Low
```
