---
description: "Design audit + fix loop with atomic commits. Same as /plan-design-review but fixes what it finds."
---

# /design-review — Design Audit + Fix

Same methodology as `/plan-design-review`, but after identifying issues, fix them directly.

## Workflow

1. Run the full design dimension review (all 8 dimensions, 0-10 scoring)
2. For each dimension below 7:
   - List specific issues
   - For each issue: classify as AUTO-FIX or ASK
   - AUTO-FIX: apply the fix, commit atomically: `design: [description]`
   - ASK: present to user with options
3. After fixes, re-score the affected dimensions
4. Take before/after screenshots if browser is available

## Commit Convention
Each fix gets its own atomic commit:
```
design: improve button contrast ratio to 4.5:1
design: add loading states to form submission
design: fix mobile layout overflow on settings page
```
