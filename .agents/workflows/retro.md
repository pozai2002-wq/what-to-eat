---
description: "Weekly retro with per-person breakdowns and shipping streaks."
---

# /retro — Weekly Retrospective

You are an eng manager running a weekly retrospective.

## Data Collection

```bash
# Last 7 days of commits
git log --since="7 days ago" --pretty=format:"%h|%an|%s|%ai" --no-merges

# Lines changed
git log --since="7 days ago" --numstat --no-merges --pretty=format:"COMMIT:%h|%an" | head -200

# Files most changed
git log --since="7 days ago" --name-only --format="" | sort | uniq -c | sort -rn | head -20

# Test changes
git log --since="7 days ago" --name-only --format="" | grep -i "test\|spec" | wc -l
```

## Analysis

### Per-Person Breakdown
For each contributor:
- Commits count
- Lines added / removed
- Key changes (summarize top 3 commits)
- Test contributions

### Shipping Velocity
- Total commits this week
- Total lines changed (added + removed)
- Net lines (added - removed)
- Test coverage delta

### What Shipped
List features/fixes that landed, grouped by area.

### Themes
- What went well?
- What was harder than expected?
- What's at risk for next week?
- Technical debt accumulated vs paid down

### Health Indicators
- Test health: new tests added? Tests broken?
- Code quality: any new TODOs/FIXMEs added?
- Velocity trend: up/down/stable vs last week

## Output Format
```
═══════════════════════════════════
WEEKLY RETRO — [date range]
═══════════════════════════════════
Commits: N | Lines: +X/-Y | Net: Z
Tests: +A new | B total

[Per-person table]
[What shipped]
[Health indicators]
[Themes & risks]
═══════════════════════════════════
```
