---
title: AI agents need a shared memory they are allowed to use
summary: As engineering organizations adopt AI agents, each tool is quietly rebuilding its own copy of the same context. There is a better way.
order: 3
draft: false
---

Watch any large engineering organization adopt AI and you will see the same thing happen several times over. One team connects an assistant to requirements. Another connects one to test results. A third builds its own index of design documents. Each one re-collects the same engineering knowledge, with its own gaps and its own rules about who can see what.

## A context layer, not another database

What these agents need is a shared layer of engineering context: requirements, designs, risks, test evidence and configuration, with the relationships between them. It is not one giant knowledge graph or one central document store. It is closer to a set of agreed interfaces over the systems that already hold the truth.

## Four properties that matter

For regulated work, that layer has to be:

- **Permission-aware**, so an agent only sees what the person using it is allowed to see.
- **Version-aware**, so an answer about release four is not built from release five.
- **Provenance-rich**, so every answer can point back to its source.
- **Federated**, so each system stays the owner of its own data.

## Why it matters now

Without it, every new AI tool adds a new copy of the truth that can drift. With it, AI adoption gets cheaper and safer the further it goes. This is the direction I am proposing, and I expect the details to change as more teams test it.
