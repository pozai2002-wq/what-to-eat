---
description: "Warn before destructive commands. Safety guardrails for production work."
---

# /careful — Safety Guardrails

When this workflow is active, apply extra caution before any potentially destructive operation.

## Destructive Command Detection

Before executing ANY command, check if it matches these patterns:
- `rm -rf` or `rm -r` on non-temp directories
- `DROP TABLE`, `DELETE FROM` without WHERE clause
- `git push --force` or `git push -f`
- `git reset --hard`
- `git clean -fd`
- Any `sudo` command
- `chmod 777`
- Database migration rollbacks
- Environment variable changes on production
- Deployment commands

## When Detected

**STOP** and present to the user:

```
⚠️ CAREFUL: Destructive command detected
Command: [the command]
Risk: [what could go wrong]
Reversible: [yes/no — how to undo if yes]

A) Proceed — I understand the risk
B) Modify — suggest a safer alternative
C) Abort — cancel this action
```

## Override
The user can always override. This is an advisory, not a block. But always present the warning first.
