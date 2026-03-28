---
description: "One command, fully reviewed plan. Runs CEO → design → eng review automatically."
---

# /autoplan — Automated Review Pipeline

Run the full review pipeline in sequence:

## Pipeline

1. **CEO Review** (`/plan-ceo-review`)
   - Scope challenge, premise check, alternatives
   - Mode selection (Expansion/Selective/Hold/Reduction)
   - Surface expansions for user approval

2. **Design Review** (`/plan-design-review`) — if UI changes detected
   - Rate all 8 dimensions
   - Flag AI slop
   - Provide actionable fixes for low-scoring areas

3. **Engineering Review** (`/plan-eng-review`)
   - Architecture, code quality, test coverage, performance
   - ASCII diagrams, coverage maps
   - Issue-by-issue interactive resolution

## Flow Control
- Only pause for user decisions that require taste/judgment
- Auto-resolve mechanical issues
- Skip design review if no frontend changes
- Present consolidated summary at end

## Output
```
AUTOPLAN COMPLETE
=================
CEO Review:    [status] — N issues, M resolved
Design Review: [status] — score X/10
Eng Review:    [status] — N issues, M resolved, coverage X%
=================
VERDICT: [READY / NOT READY]
```
