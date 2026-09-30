---
name: systematic-debugging
description: Identify the root cause of a bug with minimal trial-and-error by reconstructing expected behavior, tracing the relevant execution path, pinpointing the exact failure point, and proposing a minimal justified fix. Use when debugging errors, incorrect behavior, failed tests, or unexpected outputs.
---

# Systematic Debugging

## Goal

Identify the **root cause** (not symptoms) and propose the **minimal fix** by tracing the real execution path.

---

## Operating Rules (Non-Negotiable)

- **No blind fixes**: do not change code without locating the failure point in the traced flow.
- **No guessing**: do not infer behavior without direct evidence from code, logs, or trace.
- If the root cause cannot be proven, say exactly:
  - "I’m not sure based on the current codebase"
- **Fix after proof only**: do NOT propose any fix until the root cause and failure point are clearly identified and justified.
- **Minimal surface area**: change **one** area by default; expand only if trace proves multiple independent issues.
- **Stay on-path**: focus only on the relevant execution path; avoid unrelated modules.
- **Don’t re-read**: avoid reopening files/sections already analyzed unless new evidence requires it.

---

## Execution Discipline

- Follow steps strictly in order: **Reconstruct → Trace → Identify failure → Root cause → Fix**
- Do not skip steps
- Do not merge reasoning with solution prematurely

---

## Evidence & Traceability Rules

- Every conclusion must reference a **specific file + function/class/region**
- If a claim cannot be traced to code, treat it as **unverified**
- Prefer factual statements over assumptions
- Avoid evaluative or speculative language

---

## Inputs to Collect (Fast)

Capture only what’s needed:

- **Observed behavior**: error, incorrect output, logs, UI issue
- **Expected behavior**
- **Repro steps**
- **Scope selectors**: route, component, API, payload, user role

If inputs are incomplete, proceed using code and logs—do not block unnecessarily.

---

## Evidence Log (Internal Tracking)

Maintain internally:

- **Entry point**
- **Execution path**
- **Failure point**
- **Root cause**
- **Fix**

Do not expose this unless useful for explanation.

---

## Workflow

### 1) Reconstruct the Issue

- Define expected invariant
- Define observed divergence
- Identify the most likely execution path (avoid branching unless required)

---

### 2) Trace the Execution Flow

Adapt based on entry point:

**Typical flow (if applicable):**
Frontend → API → Controller → Service → Model → Database

**Alternative flows:**
- Backend-only logic
- Scheduled jobs / queues
- Webhooks / external integrations

Trace only what exists.

---

### 3) Identify the Failure Point

Find the first deterministic break:

- Exception
- Wrong branch
- Null/undefined
- Validation/auth failure
- DB issue

Record:
- File
- Function/class
- Line or region

---

### 4) Determine Root Cause

Define clearly:

- **Symptom**
- **Immediate cause**
- **Root cause (true origin)**

Validate by checking upstream assumptions.

---

### 5) Propose Minimal Fix

Only after full validation:

- Fix at the **root cause location**
- Do not introduce unrelated changes
- Keep scope minimal

---

## Stop Condition

- Stop tracing once the root cause is confidently identified
- Do not explore unrelated downstream paths

---

## Output Template (Strict)

```markdown
## Root cause
<1–3 sentences explaining the causal chain and violated invariant>

## Failure point
- File: `<path>`
- Location: `<function/class>` at or near line <N>
- What happens there: <factual description>

## Evidence
- <file + function + observation>

## Minimal fix
<exact change location + concise rationale>

## Confidence
- High / Medium / Low