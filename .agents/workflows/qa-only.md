---
description: "Same QA methodology as /qa but report only — no code changes."
---

# /qa-only — QA Report Only

Same methodology as `/qa`, but report bugs without fixing them. Pure bug report.

Follow the exact same workflow as `/qa` (orient, explore, document) but:
- Do NOT fix any bugs
- Do NOT make any code changes
- Do NOT commit anything

Output a structured bug report with:
- Health score
- All issues found (severity + category)
- Repro steps for each
- Screenshots as evidence
- Prioritized fix recommendations
