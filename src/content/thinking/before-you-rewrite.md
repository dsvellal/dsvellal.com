---
title: Before you rewrite it
summary: A full rewrite feels like the brave choice. Usually it is the risky one. Notes on paying down technical debt while the product keeps shipping.
order: 2
draft: false
---

In 2014 a defect in a health insurance exchange portal I worked on kept getting reopened. The root cause was code that nobody dared remove: dead paths, repeated logic and long chains of conditions. I did not propose a rewrite. I proposed three phases: remove the dead code, make the controllers modular, then pull the shared logic into one module. We did the first phase in slack time, without touching the release.

Every team living with a legacy system eventually hears the same proposal: stop, rewrite it properly, and switch over when it is done. It is appealing because it promises a clean slate. It is dangerous because it asks the business to stand still for as long as the rewrite takes, and rewrites almost always take longer than planned.

## Tie every step to something a customer wants

Paying down debt in steps, each tied to something a customer is waiting for, does two things. The business keeps funding the work, because every step ships value. And the effort cannot drift into a project with no end date.

## Stop the bleeding first

Before taking anything apart, put quality checks at the developer desk. There is little point paying down debt while new code adds to it at the same rate.

## Count it in money

Technical debt gets funded when it is described in the same terms as everything else the business spends on: cost, risk and time. Code metrics convince engineers. Savings convince budget owners.

## What a rewrite is good for

Sometimes a rewrite is right: when the platform cannot support what the business needs next, and there is a clear way to run both systems side by side. A useful test is whether you can describe the switch-over day in detail. If you cannot, you are not ready to rewrite.
