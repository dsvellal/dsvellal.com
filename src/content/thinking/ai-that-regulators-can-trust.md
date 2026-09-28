---
title: AI that an auditor can follow
summary: In regulated engineering, the useful question is not whether AI is accurate. It is whether a person can see, check and own every decision it touches.
order: 1
draft: false
---

Most conversations about AI in engineering start with speed. In medical-device software, that is the wrong place to start. The work is judged by its evidence: can you show which test covers which requirement, who decided, and why. An AI that is fast but leaves no trail makes that harder, not easier.

So I start somewhere else. What does the auditor need to see, and how can AI help produce it?

## Suggest, never decide

The pattern that works is simple. The AI proposes: a missing trace link, a test scenario nobody wrote, a requirement that reads two ways. A named engineer accepts or rejects it, and that choice is recorded. The system gets faster without anyone losing ownership of the result.

The pattern that fails is the one that looks most impressive in a demo: an assistant that writes the compliance document end to end. Nobody can defend a document they did not reason through.

## Keep the determinism where it matters

Some checks should never be probabilistic. Whether a requirement has a linked test is a yes or no question, so answer it with a query, not a model. Use AI where judgment is genuinely needed, and plain code everywhere else.

## Say what stage you are at

A pilot is a pilot. Calling it production to win a meeting costs you the next meeting. Being precise about maturity is what lets other teams trust it enough to try it.
