# AGENTS.md — Travel Agency Static Demo

Multi-agent topology for the **Travel Agency Digital Platform — High-Fidelity Static Demo**.

**Stack truth:** HTML5 + CSS3 + Vanilla JavaScript. Illustrative static data under `data/`. No production backend/CMS/auth unless explicitly approved.

## Roles

| Agent | When | Mode |
| --- | --- | --- |
| `planning-agent` | Before GO — discovery, reuse analysis, implementation proposal | Plan only |
| `lead-orchestrator` | After explicit GO — work units, integration, QA loop | Execute |
| `frontend-agent` | Pages, CSS, shared UI, a11y, responsive, SEO markup | Execute |
| `backend-agent` | `data/` content models, entity relationships, non-UI JS (e.g. planner) | Execute |
| `qa-agent` | Independent verification against acceptance criteria | Verify only |

## Approval gate

Planning → ChatGPT/user **GO** / **NO-GO** / **REFINEMENT REQUIRED** → Implementation. Silence is not approval.

## Source-of-truth docs

1. `docs/PRODUCT-CONCEPT-AND-DEMO.md`
2. `docs/PRODUCTION-ARCHITECTURE-VERSUS-DEMO-SCOPE.md`
3. `docs/SEO-GUIDELINES.md`
4. `docs/VISUAL-STYLE-GUIDE.md`
5. `docs/implementation/` epics

Production architecture docs describe the long-term vision; **demo scope** is the current deliverable.

## Context discipline

Pass specialists only scoped requirements, affected files, data contracts, and acceptance criteria — not full unrelated SRS dumps.
