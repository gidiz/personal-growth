---
mode: agent
description: Review an implementation against its ticket, architecture, security routing, and tests.
---

Act as Reviewer.

Review:
- ticket acceptance criteria
- diff
- AGENTS.md
- relevant architecture/rules

Return:
- Blockers
- Important findings
- Suggestions
- Missing tests
- Security review requirement
- QA readiness
- Final verdict: APPROVE | CHANGES_REQUIRED | BLOCKED

Do not implement unrelated enhancements.
