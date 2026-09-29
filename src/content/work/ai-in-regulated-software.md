---
title: Making AI useful where mistakes are not allowed
pillar: AI in regulated software
order: 1
summary: An AI-assisted traceability platform and a practical AI curriculum, built so medical-device engineers can use AI while a person still makes every regulated decision.
employer: Philips
period: 2024 to now
headlineClaim: traceability-adoption
problem: Every requirement in medical-device software has to be traced to its design, tests and risks. That trace was kept by hand across many tools, and gaps surfaced late.
decision: Model the trace as a knowledge graph on top of the tools engineers already use. AI suggests links and flags gaps, and a person decides anything regulated.
shifts:
  - traceability-adoption
  - traceability-hours
  - platform-nps
outcomes:
  - traceability-hours
  - ai-people-trained
  - ai-sessions-rating
quote: q-qpm-vision
doAgain: Surface the evidence for a person to judge before trying to automate the judgment. Start with deterministic checks, measure how much they handle, and only then bring in a larger model. When the evidence is missing, the tool should say so instead of guessing.
---

## Context

Medical-device software is built under IEC 62304. Every requirement has to be traced to its design, its tests and its risks, and that trace is what an auditor reads. Keeping it complete takes a lot of careful manual work, and gaps that are found late are expensive to fix.

At the same time, generative AI was arriving across the business, and teams needed a clear view of where it was safe to use on regulated work.

Before, traceability and gap analysis were done by hand, spread across many documents and tools. It was slow and error-prone, and new engineers needed about three weeks to learn how a product's trace fitted together.

## The decision

The core design decision was to model the trace as a knowledge graph that links requirements, design, code and test evidence, rather than as a relational schema. AI suggests links and flags gaps, and engineers accept or reject each suggestion.

Across the AI pilots the same rule holds: a person makes the final decision on anything regulated, and checks that can be answered with a plain yes or no stay deterministic instead of going to a model.

We chose not to replace the tools engineers already used. The platform sits on top of the existing lifecycle systems as a knowledge graph you can query in plain language.

## What I did, and what the team did

I conceived the platform, set its core design and guided its development. I also secured innovation funding for the work. The team built it, piloted it with one business, and took it into production across 14.

In 2026 I presented the platform to the Philips Executive Committee, two businesses scored it 10 out of 10, and the platform team was recognized as "Impact Makers" at a global town hall.

The platform links requirements, tests and risks in one graph. It gives one-click impact analysis, flags gaps between requirements and tests, and suggests missing test scenarios. We released it in steps: each release went live for one business first, then rolled out to the next once its data was validated.

Alongside the platform, I built and taught a practical AI curriculum for engineers, architects, managers and analysts: prompt and context engineering, AI-assisted testing and technical debt work, and a course on using AI while staying IEC 62304 compliant. Several communities asked for repeat sessions.

I am now proposing the next step: a governed, permission-aware layer of engineering context that AI agents across the product lifecycle can share, instead of every tool rebuilding its own.
