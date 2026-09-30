---
name: codebase-analyzer
description: Analyze an existing codebase end-to-end before making any changes. Use automatically before editing code or proposing patches: identify relevant files, read only the necessary sections (full files only when required), map data flow/dependencies/API interactions, summarize current behavior, and point to exact modification locations. If information is insufficient, state "I’m not sure based on the current codebase".
---

# Codebase Analyzer

## Goal

Ensure the agent fully understands the existing code before making any changes.

## Hard constraints

- Do **not** write or modify any code before analysis is complete.
- STOP: Do **not** propose fixes, patches, or code changes until **all** Required output sections are completed.
- Do **not** include any code snippets, pseudo-code, or implementation suggestions in the analysis sections.
- Do **not** suggest architectural improvements, refactors, or optimizations during analysis.
- Focus strictly on understanding the current implementation.
- Do **not** invent missing logic, files, or behaviors.
- If information is insufficient, say exactly:
  - "I’m not sure based on the current codebase"

## Execution discipline

- Complete the Required output sections strictly in order.
- Do not skip sections.
- Do not merge sections.

## Scope control

Balance depth vs necessity.

- **Simple tasks** (single file, obvious bug, localized change): do minimal focused analysis on the smallest set of relevant symbols/regions and their direct callers/callees.
- **Complex tasks** (multi-module, unclear flow, cross-cutting concerns): expand to full analysis across boundaries (entry points, layers, types/schemas, integration points).
- Escalate scope only when evidence in the code requires it (imports/references/config wiring), not by assumption.

## Optimization rules

- Do **not** re-read files/regions already analyzed unless new context requires it (new reference, conflicting evidence, or missing linkage).
- Reuse previously gathered understanding and cite where it came from (files + key symbols/regions).
- Every conclusion about system behavior, data flow, or dependencies must be traceable to a cited source (file + function/class/region). If you cannot cite it, treat it as unknown.

## Workflow

### 1) Identify relevant files (optimize: be narrow)

Pick the smallest set of files needed to answer the task. Prefer:

- Entry points and page URLs (where the behavior starts)
- The HTML/CSS/JS modules that implement the requested behavior
- Illustrative `data/` shapes for inputs/outputs
- Data loading / progressive-enhancement boundaries
- Manual QA notes or checks that cover the behavior (if they exist)

Avoid scanning unrelated modules. Expand scope only when the initial set references additional required code.

### 2) Read only what is necessary (prefer targeted)

- Prefer reading the smallest relevant **sections**: specific functions/classes/methods/config blocks, plus the minimal surrounding context needed to understand control/data flow.
- Read full files only when required to correctly understand wiring, lifecycle, side effects, or flow (or when behavior is too distributed to infer from sections safely).
- Track cross-references (imports, function calls, endpoints, DI wiring) that require additional code, then read the minimal sections that resolve them; escalate to full-file reads only if still ambiguous.

### 3) Analyze the current system (no edits yet)

For the gathered files, analyze and document:

- **Data flow**: where inputs originate, how they transform, where outputs go
- **Function/class dependencies**: call graph highlights, key abstractions, shared utilities
- **Data interactions**: static JSON/`data/` files, fetch/load paths, field usage, empty/missing handling
- **Existing logic patterns**: naming, shared chrome, CSS tokens, progressive JS, conventions

### 4) Only after analysis is complete: propose modifications

Do not draft patches until the analysis output (below) is complete.

## Required output (before any code changes)

Provide the following sections in the response:

### Summary of how the current system works

- Concise bullets as needed describing the current behavior end-to-end.

### Relevant files (analyzed)

List each file and the specific sections analyzed (functions/classes/regions) and why they matter. Use exact paths.

### What needs modification (exact locations)

List the precise files and the specific functions/classes/blocks that should change to satisfy the task.

### Gaps / uncertainty

If required information cannot be located in the codebase, include:

- "I’m not sure based on the current codebase"
- What is missing (e.g., no implementation found, dynamic behavior not visible, config unknown)
- What evidence you did inspect (which files/symbols)
