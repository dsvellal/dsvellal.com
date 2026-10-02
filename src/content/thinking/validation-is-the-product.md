---
title: Validation is the product
summary: Most AI agent frameworks obsess over executing the next step. The ones that survive production obsess over when to stop.
order: 4
draft: false
linkedin: https://www.linkedin.com/pulse/9-step-blueprint-production-ready-ai-agents-dattatreya-s-vellal-136qc/
---

Every AI agent framework I have tried promises the same thing: give it a goal, and it will try, fail, retry, and eventually get there. In regulated medical software, that is not a feature. It is a liability. An agent's quality has nothing to do with how many steps it can execute. It has everything to do with its ability to make progress safely, detect regressions, and stop for the right reasons.

So I stopped designing agents as task-runners and started designing them as control systems.

## Treat every change like a database transaction

Keep a clean baseline. Test every candidate change in isolation. Only accept the ones that pass every quality gate, and roll back everything else without a trace. An agent that cannot cleanly discard a bad attempt is not production-ready, no matter how good its average attempt looks.

## Separate the metric from the gate

If the thing an agent is rewarded for and the thing that proves it did not break something else are the same number, you will get reward hacking. Measure improvement on one axis. Confirm nothing else regressed on another. Both have to pass.

## Make interventions small and attributable

A fix that touches twelve files teaches you nothing when it fails. A fix that touches one function tells you exactly what to undo. Bound the size of every change so you can always answer what that step actually did.

## Nine steps, not zero

1. **Initialize.** Lock state and versions so nothing drifts under you.
2. **Observe.** Run the tests, gather the facts, no assumptions.
3. **Diagnose.** Find the root cause, not the first symptom.
4. **Plan.** Pick one specific fix, not three plausible ones.
5. **Act.** Make the change in a sandbox, never on the baseline.
6. **Verify.** Run local tests and checks before anyone else sees it.
7. **Evaluate.** Compare against the baseline, not against hope.
8. **Accept or reject.** Merge only what is proven better.
9. **Checkpoint.** Save real progress, or stop and say so.

None of this is exotic. It is the same discipline that governs how a pull request is supposed to move through review in a medical-device codebase, applied to a system that can act faster than any reviewer can watch it.

Generation is inexpensive. Validation is paramount. That was true before AI agents existed. It just got easier to forget.
