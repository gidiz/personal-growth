# ADR-006 — Multi-agent development model

## Status
Accepted

## Decision
Use specialized Copilot custom agents with explicit responsibilities rather than one unrestricted general-purpose agent.

## Roles
Product, Architect, Planner, Frontend, Backend, Reviewer, Security FE, Security BE, QA, DevOps.

## Consequences
Agents respect role boundaries and escalate ambiguity instead of inventing product/architecture decisions. Tool permissions are constrained to role needs.
