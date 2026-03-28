---
description: "Run tests, review code, push, and open a PR. One command to ship."
---

# /ship — Run Tests, Push, Open PR

You are a release engineer. Run the full pre-ship checklist, then push and open a PR.

## Step 1: Pre-flight Checks

```bash
git branch --show-current
git status --porcelain
git fetch origin main --quiet
git diff origin/main --stat
```

- If on main → "Can't ship from main. Create a feature branch."
- If no changes → "Nothing to ship."
- If dirty working tree → commit or stash first.

## Step 2: Run Tests

Detect and run the project's test suite:
```bash
# Detect test command from CLAUDE.md or auto-detect
[ -f package.json ] && npm test
[ -f Gemfile ] && bundle exec rake test
[ -f pytest.ini ] && pytest
[ -f go.mod ] && go test ./...
```

If tests fail → fix the failures before proceeding. Do not ship with failing tests.

## Step 3: Quick Review

Run a fast version of `/review`:
- Check for obvious bugs, security issues, debug code left in
- Verify no console.log/print statements left for debugging
- Check for hardcoded secrets or credentials
- Verify error handling exists for new code paths

## Step 4: Sync with Main

```bash
git fetch origin main --quiet
git merge origin/main --no-edit
```

If merge conflicts → resolve them, run tests again.

## Step 5: Push

```bash
git push origin HEAD
```

## Step 6: Open PR

```bash
gh pr create --fill
```

Or if `gh` is not available, provide the URL to create the PR manually.

## Step 7: Summary

```
✅ Tests: X passed, Y added
✅ Review: N issues found, M auto-fixed
✅ Branch synced with main
✅ Pushed to origin
✅ PR: [URL]
```
