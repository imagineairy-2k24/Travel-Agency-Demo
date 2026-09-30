---
name: api-contract-validator
description: Validate alignment between illustrative static data (`data/` JSON) and consuming HTML/JS (field names, types, required/optional, nullability, relationships). Use when changing data files, JS loaders, trip-planner payloads, or fixing undefined/null UI issues from data drift. Focus only on affected entities; avoid scanning the entire codebase.
---

# Data Contract Validator

## Mission

Keep **illustrative data** and **page/JS consumers** synchronized for the entities touched by the task by validating:
- Field names, types, required/optional, nullability
- Entity relationships (destination ↔ packages ↔ vehicles ↔ guides, etc.)
- Consumer safety (no `undefined`/`null` surprises; UI state matches data)

## Tech stack (this project)

- **Site**: HTML5 + CSS3 + Vanilla JavaScript (static demo)
- **Data**: Illustrative JSON (or equivalent) under `data/`
- **No production Express/Mongo/Next API** unless explicitly approved later

## Hard constraints

- Do **not** assume data shapes. Derive from files and consumers you read.
- Do **not** ignore null/edge cases (missing images, empty arrays, optional fields).
- Do **not** scan the entire repo by default. Start from the **affected entity/file(s)** and expand only to direct references.
- If the contract cannot be determined, say exactly: **"I’m not sure based on the current codebase"** and list what’s missing.

## Workflow (narrow scope by default)

### 1) Identify the affected data contract(s)

Only validate data that is:
- Mentioned by the user, or
- Referenced in changed files / diff, or
- Directly loaded/used by the page or JS module being worked on

For each, capture:
- Data file path(s)
- Entity name(s) / keys
- JS loader or consumer call site(s)
- HTML templates/sections that bind fields

### 2) Derive data producer contract

From the static data files (and any documented relationships in epics/docs only if inspected):
- Required vs optional fields
- Types (string/number/boolean/array/object)
- Nested structures and array element shapes
- Nullability / placeholder conventions
- Relationship IDs/slugs between entities

### 3) Cross-check consumers (HTML/JS)

From fetch/XHR/`import`/inline usage + rendering logic:
- Field names match data exactly
- Required fields always present or guarded
- Empty list vs populated list handled
- Optional/nullable fields use safe defaults
- Missing assets/alt text handled without breaking layout

### 4) Produce a strict mismatch report

Classify issues as Critical / High / Medium / Low with evidence (file + symbol).

## Required output format

### Scope (validated contracts)
- **Entity / file**:
- **Producer location**:
- **Consumer location(s)**:

### Contract (data truth)
- Required / Optional / Nullable / Notes

### Mismatches (consumer vs data)
- Severity, what differs, evidence, fix side (data vs consumer vs both)

### Risk areas
- Concrete crash/empty-state vectors

## Triggers

Use when the user mentions data shape mismatch, undefined/null from JSON, trip-planner payload, entity relationships, or changing `data/` files consumed by UI/JS.
