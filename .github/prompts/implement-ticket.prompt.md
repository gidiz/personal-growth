---
mode: agent
description: Implement one Ready ticket with scoped changes and validation.
---

Act as the implementation agent appropriate to the ticket Area.

Before editing:
- read the ticket and acceptance criteria
- read `AGENTS.md`
- read relevant architecture/rules
- state the intended files and validation plan

Implement only the ticket scope.

For DB changes:
- create migrations
- apply/validate in Test
- preserve RLS
- never write Production through MCP

Before finishing:
- run relevant lint/typecheck/tests
- summarize files changed
- explain one or two key technical decisions
- identify any required Reviewer/Security/QA gates
