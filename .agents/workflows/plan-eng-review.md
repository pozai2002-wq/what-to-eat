---
description: "Engineering manager-mode plan review. Lock architecture, data flow, edge cases, and test coverage."
---

# /plan-eng-review — Engineering Architecture Review

Review plans with maximum rigor before implementation begins. For every issue, explain tradeoffs, give an opinionated recommendation, and ask for input.

**Do NOT make code changes. Review only.**

## Step 0: Scope Challenge

1. **Existing code leverage** — What already partially solves each sub-problem?
2. **Minimum set** — What's the minimum change that achieves the goal? Flag deferrable work.
3. **Complexity check** — 8+ files or 2+ new classes = smell. Challenge it.
4. **Search check** — Does the runtime have a built-in? Is the approach current best practice?
5. **TODOS cross-reference** — Are deferred items blocking or unlockable?
6. **Completeness check** — Is this the complete version or a shortcut?

If complexity triggers, recommend scope reduction via question.

## Review Sections

### 1. Architecture Review
- System design, component boundaries, dependency graph
- Data flow patterns and bottlenecks
- Scaling characteristics, single points of failure
- Security architecture (auth, data access, APIs)
- ASCII diagrams for every non-trivial flow
- One realistic production failure scenario per integration point

### 2. Code Quality Review
- Organization and module structure
- DRY violations (be aggressive)
- Error handling patterns and missing edge cases
- Technical debt hotspots
- Over-engineered vs under-engineered assessment

### 3. Test Review — Coverage Diagram

Trace every codepath. For each changed file, diagram:
- Every function added/modified
- Every conditional branch (if/else, switch, guard)
- Every error path (try/catch, fallback)
- Every edge (null, empty, invalid type)

Also map user flows and interaction edge cases:
- Double-click/rapid resubmit
- Navigate away mid-operation
- Stale data, slow connection
- Empty states, boundary conditions

Output ASCII coverage diagram:
```
[+] src/services/billing.ts
    ├── processPayment()
    │   ├── [★★★ TESTED] Happy path — billing.test.ts:42
    │   ├── [GAP] Network timeout — NO TEST
    │   └── [GAP] Invalid currency — NO TEST
COVERAGE: X/Y paths tested (Z%)
GAPS: N paths need tests
```

### 4. Performance Review
- N+1 queries and DB access patterns
- Memory usage concerns
- Caching opportunities
- Slow or high-complexity paths

## Engineering Preferences
- DRY: flag repetition aggressively
- Tests: non-negotiable. Too many > too few
- "Engineered enough" — not fragile, not over-abstracted
- Handle more edge cases, not fewer
- Explicit over clever
- Minimal diff: fewest new abstractions

## Required Outputs
- NOT in scope section
- What already exists section
- TODOS.md updates (ask one per question)
- Failure modes (test + error handling + silent failure check)
- Completion summary

## Question Format
ONE ISSUE = ONE QUESTION. Describe concretely with file/line references. Present 2-3 options with effort (human: ~X / AI: ~Y). Map recommendation to engineering preferences. Label: NUMBER + LETTER (e.g., "3A").
