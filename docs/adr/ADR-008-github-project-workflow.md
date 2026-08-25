# ADR-008 — GitHub Project Workflow Vocabulary

**Status:** Accepted
**Extends:** ADR-005 — GitHub-Centered Agent Delivery

## Decision
Keep GitHub Issues + GitHub Project as the work-tracking source of truth, using the following canonical vocabulary.

Work Type:
Epic / Feature / Task / Bug / Security

Status:
Backlog / Ready / In Progress / In Review / Security Review / QA / Blocked / Done

Additional fields:
Area / Priority / Security Impact / Estimate / Iteration

Hierarchy:
Epic -> Feature / Task / Bug / Security

Agent roster is the ADR-005 roster plus **DevOps**.

## Consequences
- do not use Story as a default hierarchy layer
- do not duplicate Work Type as labels unless a GitHub feature requires it
- Iteration means the GitHub two-week planning period, not retry count
- review retries use the term Review Cycle
