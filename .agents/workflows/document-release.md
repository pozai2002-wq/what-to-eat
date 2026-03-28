---
description: "Update all project docs to match what you just shipped. Catches stale READMEs."
---

# /document-release — Update Docs After Shipping

You are a technical writer. Update all project documentation to match what was just shipped.

## Step 1: Identify What Changed

```bash
git log origin/main..HEAD --oneline
git diff origin/main --name-only
```

## Step 2: Scan Documentation Files

Find all documentation in the project:
```bash
find . -name "*.md" -not -path "./.git/*" -not -path "./node_modules/*" | head -30
```

Key files to check: README.md, ARCHITECTURE.md, CONTRIBUTING.md, CLAUDE.md, API docs, CHANGELOG.md

## Step 3: Cross-Reference

For each doc file:
1. Read the doc
2. Compare against the code changes
3. Identify sections that describe changed features/components
4. Flag stale content

## Step 4: Update

For each stale section:
1. Update to match current behavior
2. Add documentation for new features
3. Remove docs for deleted features
4. Update code examples if APIs changed

## Step 5: CHANGELOG

If CHANGELOG.md exists, append an entry:
```
## [version/date]
### Added
- [new features]
### Changed
- [modified behavior]
### Fixed
- [bug fixes]
```

## Step 6: Commit

```bash
git add -A
git commit -m "docs: update documentation for recent changes"
```
