# Development Process

## 1. Purpose

This document defines how humans and Copilot agents turn product intent into reviewed, tested code.

## 2. Work hierarchy

Keep the hierarchy intentionally simple:

```text
Epic
└── Feature / Task / Bug / Security
```

Do not introduce a Story layer unless the project later has a clear need for it.

## 3. GitHub Project fields

### Status
- Backlog — defined but not yet ready
- Ready — refined and approved for implementation
- In Progress — implementation underway
- In Review — implementation complete, code/architecture review pending
- Security Review — required security review underway
- QA — acceptance/regression/cross-platform validation
- Blocked — unresolved dependency/decision/problem
- Done — acceptance criteria and required gates passed

### Work Type
- Epic
- Feature
- Task
- Bug
- Security

### Area
- Frontend
- Backend
- Database
- AI / RAG
- Infrastructure
- Cross-Cutting

### Priority
- P0 – Critical
- P1 – High
- P2 – Medium
- P3 – Low

### Security Impact
- None
- Low
- Medium
- High

### Estimate
- XS
- S
- M
- L
- XL

`XL` should normally be decomposed before `Ready`.

### Iteration
Use the native GitHub Iteration field with a two-week cadence.

Do not use "Iteration" to mean automated retry cycles.

## 4. Ticket lifecycle

```text
Backlog
   |
   v
Ready
   |
   v
In Progress
   |
   v
In Review
   |
   +--------------------+
   |                    |
   | security required? |
   | yes                | no
   v                    |
Security Review         |
   |                    |
   +---------+----------+
             |
             v
            QA
             |
             v
            Done
```

`Blocked` may be entered from any stage.

## 5. Definition of Ready

A non-Epic ticket is Ready only when:
- problem/outcome is clear
- scope is bounded
- acceptance criteria are testable
- dependencies are known
- Area is assigned
- Security Impact is assigned
- Estimate is not XL unless explicitly approved
- relevant architecture references are identified

## 6. Definition of Done

Done requires:
- acceptance criteria met
- code/types/lint/tests pass as applicable
- reviewer approval
- required security review passed
- QA passed
- docs/ADRs updated when behavior/architecture changed
- no secret leakage
- migration represented in Git when DB changed

## 7. Agent routing

### Product
Clarifies value, scope, and acceptance behavior.

### Architect
Owns system boundaries and ADR decisions.

### Planner
Breaks approved scope into actionable tickets and fills Project fields.

### Frontend
Expo/React Native/Web UI and client logic.

### Backend
Supabase integration, Edge Functions, server-side logic, database implementation.

### Reviewer
Code/architecture quality gate.

### Security FE
Client-side security and trust-boundary review.

### Security BE
Auth, RLS, database, API, secrets, server/AI trust-boundary review.

### QA
Acceptance, regression, cross-platform, and test-quality gate.

### DevOps
CI/CD, environments, Vercel, EAS, deployment, runtime configuration.

## 8. Security routing

- None / Low: normal review + QA unless reviewer escalates
- Medium / High: Security Review mandatory
- Frontend impact: Security FE
- Backend/Database/AI/Infrastructure impact: Security BE
- Cross-Cutting: both when applicable

## 9. Review loop

Use a maximum of:

`MAX_REVIEW_CYCLES = 3`

A review cycle means:
1. review finds blocking issue
2. implementation agent fixes it
3. review runs again

After three failed cycles:
- move to Blocked
- add `needs-human`
- summarize unresolved blockers

This is unrelated to the GitHub two-week `Iteration` field.

## 10. Branch and PR flow

1. branch from `develop`
2. implement one coherent ticket
3. commit with ticket reference
4. push branch
5. open PR to `develop`
6. reviewer/security/QA gates
7. squash merge unless a different merge strategy is explicitly required

Production promotion from `develop` to `main` is a separate release decision.

## 11. Database changes

1. create migration file
2. review SQL
3. apply to Test
4. validate schema/RLS
5. merge migration
6. later promote same migration to Production

Do not rely on a dashboard-only schema state.

## 12. Learning output

For meaningful tickets, implementation summaries should include:
- architecture touched
- files changed
- validation performed
- one or two key technical lessons
