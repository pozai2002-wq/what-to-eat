---
description: "Pre-landing code review. Find bugs that pass CI but break in prod. Auto-fix obvious ones."
---

# /review — Pre-Landing Code Review

Analyze the current branch's diff against the base branch for structural issues that tests don't catch.

## Step 1: Check Branch

```bash
git branch --show-current
git fetch origin main --quiet
git diff origin/main --stat
```

If on main or no diff, stop: "Nothing to review."

## Step 1.5: Scope Drift Detection

1. Read TODOS.md, commit messages (`git log origin/main..HEAD --oneline`)
2. Identify stated intent
3. Compare files changed vs stated intent
4. Output: `Scope Check: [CLEAN / DRIFT / REQUIREMENTS MISSING]`

## Step 2: Get the Diff

```bash
git fetch origin main --quiet
git diff origin/main
```

## Step 3: Two-Pass Review

**Pass 1 (CRITICAL):**
- SQL & Data Safety — unparameterized queries, missing transactions
- Race Conditions & Concurrency — shared mutable state, TOCTOU
- LLM Output Trust Boundary — unsanitized AI output hitting DB/DOM
- Enum & Value Completeness — new values not handled everywhere

**Pass 2 (INFORMATIONAL):**
- Conditional Side Effects — actions tied to if-branches
- Magic Numbers & String Coupling
- Dead Code & Consistency
- Test Gaps
- View/Frontend issues
- Performance & Bundle Impact

## Step 4: Test Coverage Diagram

For each changed file, trace execution:
1. Read full file (not just diff)
2. Diagram every function, branch, error path
3. Check each branch against existing tests
4. Output ASCII coverage diagram with gap identification

## Step 5: Fix-First Review

**Every finding gets action.**

### 5a: Classify
- **AUTO-FIX**: Mechanical fixes (missing error handling, obvious bugs)
- **ASK**: Judgment calls, architecture decisions

### 5b: Auto-fix all AUTO-FIX items
`[AUTO-FIXED] [file:line] Problem → what was done`

### 5c: Batch-ask ASK items
Present in ONE question with A) Fix / B) Skip for each.

### 5d: Apply user-approved fixes

## Step 6: Documentation Staleness Check

Cross-reference diff against .md files. Flag stale docs as informational.

## Verification of Claims
- "This is safe" → cite the specific line
- "Handled elsewhere" → read and cite the code
- "Tests cover this" → name the test file and method
- Never say "likely handled" — verify or flag unknown
