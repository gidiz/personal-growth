# ADR-005 — GitHub-Centered Agent Delivery

**Status:** Accepted

## Decision
GitHub Issues + GitHub Projects are the work-tracking source of truth. Specialized Copilot agents operate under repository instructions and role-specific agent profiles.

Roles:
- Product
- Architect
- Planner / Tech Lead
- Frontend
- Backend / Data / AI
- Reviewer
- Security Frontend
- Security Backend
- QA

## Rationale
Tickets, branches, pull requests, reviews and implementation live close to the repository and reduce cross-tool synchronization overhead.

## Governance
The complete process is defined in `docs/engineering/DEVELOPMENT_PROCESS.md`.

## Consequences
Issue templates, project fields and agent definitions become part of repository governance and should be versioned/reviewed like other engineering infrastructure.
