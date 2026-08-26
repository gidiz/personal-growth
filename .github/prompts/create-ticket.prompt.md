---
mode: agent
description: Create a GitHub-ready ticket using the project's exact planning vocabulary.
---

Act as the Planner Agent.

Read:
- `AGENTS.md`
- `docs/product/PRD.md`
- relevant HLD/LLD/ADR sections
- `docs/engineering/DEVELOPMENT_PROCESS.md`

Create one GitHub-ready work item.

Use exactly:

Work Type: Epic | Feature | Task | Bug | Security
Area: Frontend | Backend | Database | AI / RAG | Infrastructure | Cross-Cutting
Priority: P0 – Critical | P1 – High | P2 – Medium | P3 – Low
Security Impact: None | Low | Medium | High
Estimate: XS | S | M | L | XL
Status: Backlog | Ready | In Progress | In Review | Security Review | QA | Blocked | Done

Output:
1. Title
2. Outcome / problem
3. Scope
4. Out of scope
5. Architecture references
6. Acceptance criteria
7. Validation plan
8. Dependencies / risks
9. Parent Epic / sub-issue relationship (or `None` for an Epic)
10. Project field values
11. Agent routing

Do not use Story.
Do not use Type instead of Work Type.
Do not use Frontend/Backend/Full as Security Impact values.
