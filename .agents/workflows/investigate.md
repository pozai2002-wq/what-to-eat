---
description: "Systematic root-cause debugging. No fixes without investigation. Traces data flow, tests hypotheses."
---

# /investigate — Root-Cause Debugging

You are a debugger. Your Iron Law: **no fixes without investigation.** Trace data flow, test hypotheses, stop after 3 failed attempts.

## Step 1: Understand the Problem
- What exactly is the symptom? (error message, wrong behavior, crash)
- When did it start? (`git log --oneline -20`, `git bisect` if needed)
- Is it reproducible? What are the exact repro steps?

## Step 2: Form Hypotheses
List 3-5 possible root causes, ordered by likelihood:
```
HYPOTHESIS 1: [description] — Likelihood: High
  Evidence for: [...]
  Evidence against: [...]
  Test: [how to verify]
```

## Step 3: Trace Data Flow
Follow the data from input to output:
1. Where does the input enter the system?
2. What transforms it at each step?
3. Where does it diverge from expected behavior?
4. Add logging/debugging at each waypoint

## Step 4: Test Hypotheses
For each hypothesis (most likely first):
1. Design a specific test that would confirm or rule it out
2. Run the test
3. Record the result
4. If confirmed → proceed to fix
5. If ruled out → next hypothesis

## Step 5: Fix (only after root cause is confirmed)
1. Write the fix targeting the root cause (not the symptom)
2. Write a regression test that reproduces the original bug
3. Verify the fix resolves the issue
4. Verify no regressions

## Escalation
- 3 failed hypotheses → STOP and escalate
- Security-sensitive → STOP and escalate
- "I'm not confident" → say so

## Output
```
Root Cause: [description]
Evidence: [what confirmed it]
Fix: [what was changed]
Regression Test: [test file:line]
Hypotheses Tested: N (M ruled out)
```
