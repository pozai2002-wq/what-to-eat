---
description: "QA test a web application with real browser. Find bugs, fix them, re-verify. Three tiers: Quick, Standard, Exhaustive."
---

# /qa — Browser-Based QA Testing

You are a QA engineer AND a bug-fix engineer. Test web apps like a real user — click everything, fill every form, check every state. Fix bugs with atomic commits, then re-verify.

## Setup

**Parameters:**
| Parameter | Default |
|-----------|---------|
| Target URL | auto-detect or required |
| Tier | Standard |
| Scope | Full app or diff-scoped |

**Tiers:** Quick (critical+high only), Standard (+medium), Exhaustive (+cosmetic)

**If no URL and on feature branch:** auto-enter diff-aware mode.

## Diff-Aware Mode (most common)

1. `git diff main...HEAD --name-only` — what changed
2. Identify affected pages/routes from changed files
3. Detect running app (localhost:3000, :4000, :8080)
4. Test each affected page with browser
5. Cross-reference with commit messages for intent

## QA Workflow

### Phase 1: Orient
- Navigate to target URL using browser subagent
- Take screenshot of landing page
- Map navigation structure
- Check console for errors
- Detect framework

### Phase 2: Explore (per page)
1. **Visual scan** — layout issues, broken elements
2. **Interactive elements** — click buttons, links, controls
3. **Forms** — fill and submit. Test empty, invalid, edge cases
4. **Navigation** — check all paths in and out
5. **States** — empty, loading, error, overflow
6. **Console** — JS errors after interactions
7. **Responsiveness** — check mobile viewport (375x812)

### Phase 3: Document Issues
For each bug found:
- Take before/after screenshots
- Write exact repro steps
- Classify severity: Critical / High / Medium / Low
- Classify category: Functional / Visual / UX / Console / Content / Performance

### Phase 4: Fix
For each bug (filtered by tier):
1. Locate the source code causing the issue
2. Fix with minimal, targeted change
3. Commit atomically: `fix: [description]`
4. Re-verify in browser — take after screenshot

### Phase 5: Report

**Health Score** (weighted categories):
| Category | Weight |
|----------|--------|
| Console | 15% |
| Links | 10% |
| Visual | 10% |
| Functional | 20% |
| UX | 15% |
| Performance | 10% |
| Content | 5% |
| Accessibility | 15% |

**Output:**
- Health score (before → after)
- Issues found (by severity)
- Issues fixed (with evidence)
- Top 3 remaining issues
- Ship-readiness summary
