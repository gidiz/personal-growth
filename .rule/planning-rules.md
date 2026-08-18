# Planning Rules

## Purpose

Define how implementation planning relates to GitHub Issues, architecture documents and local plan notes.

## Work Tracking Source of Truth

GitHub Issues + GitHub Projects are the source of truth for:
- Epics
- Stories
- Tickets
- status
- dependencies
- security impact
- iteration count

Do not create a parallel ticket backlog in `.plan/`.

## Ticket Requirements

A ticket is Ready only when it contains:
- context;
- goal;
- requirements;
- acceptance criteria;
- out-of-scope;
- dependencies;
- relevant PRD/HLD/LLD/ADR references;
- security impact: None / Frontend / Backend / Full;
- tests required.

Follow `docs/engineering/DEVELOPMENT_PROCESS.md`.

## `.plan/` Usage

`.plan/` is optional and temporary.

Use it only when an approved GitHub ticket requires a multi-step local execution plan that would be cumbersome inside the ticket.

A `.plan` file:
- must reference the GitHub ticket;
- must not redefine scope or acceptance criteria;
- must not replace the ticket;
- should be removed/archived when no longer useful.

## File Naming

If a local plan is needed:

`<ticket-id>-YYYY-MM-DD-<topic>.md`

Example:

`BE-014-2026-08-19-daily-pulse-rls.md`

## Required Plan Sections

- Ticket
- Goal
- Scope
- Assumptions
- Open Questions
- Steps
- Validation
- Risks
- Rollback

## Architecture Questions

If planning discovers a durable architecture change:
- stop implementation;
- escalate to Architect;
- create/update ADR before proceeding.

## Scope Lock

Planning must not use implementation discovery as permission to expand the ticket. Create a dependency/follow-up ticket when needed.
