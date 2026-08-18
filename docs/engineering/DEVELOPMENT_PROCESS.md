# DEVELOPMENT_PROCESS — Agent-Driven Delivery

**Status:** Draft v1.0  
**Purpose:** Define how specialized GitHub Copilot agents plan, implement, review, secure and verify changes.

---

## 1. Development Model

The project follows:

> **PRD-driven → architecture-governed → ticket-based → review-gated → iterative delivery**

Work is tracked in GitHub Issues and GitHub Projects.

Code changes should map to an approved ticket.

---

## 2. Sources of Truth

Priority order:

1. Approved ADR relevant to the area
2. HLD / LLD
3. PRD acceptance criteria
4. Ticket-specific requirements
5. Repository instructions / coding conventions

If two sources conflict, the agent must stop the conflicting change and escalate rather than invent a new rule.

---

## 3. Agent Team

### 3.1 Product Agent

**Owns**
- PRD
- user stories
- product scope
- acceptance criteria
- MVP boundaries

**May modify**
- `docs/product/**`

**Must not**
- implement production code;
- make undocumented architectural decisions;
- expand scope without explicit product justification.

---

### 3.2 Architect Agent

**Owns**
- HLD
- LLD
- ADRs
- architecture boundaries
- data ownership model
- deployment strategy
- cross-cutting technical decisions

**May modify**
- `docs/architecture/**`
- `docs/adr/**`

**Default mode**
- read/review production code, not feature implementation.

**Escalation target**
- repeated Dev Loop failure;
- cross-domain conflict;
- ticket requiring architecture change.

---

### 3.3 Planner / Tech Lead Agent

**Owns**
- Epic/Story/Ticket decomposition
- dependencies
- Definition of Ready
- security-impact classification
- ticket sizing

**May modify**
- GitHub Issues / Project metadata
- ticket templates/docs if explicitly authorized

**Must not**
- implement tickets;
- silently redefine PRD or HLD.

---

### 3.4 Frontend Agent

**Owns**
- Expo/React Native/Web implementation
- UI
- navigation
- domain hooks
- accessibility
- RTL/LTR
- frontend tests

**Primary scope**
- `app/**`
- `components/**`
- frontend portions of `features/**`
- `hooks/**`

**Must not without authorization**
- change DB schema;
- weaken auth/security controls;
- add unrelated dependencies;
- refactor unrelated areas;
- implement other tickets.

---

### 3.5 Backend / Data / AI Agent

**Owns**
- Supabase
- PostgreSQL
- migrations
- RLS implementation
- repositories/backend integrations
- Edge Functions
- AI provider integration
- pgvector

**Primary scope**
- `supabase/**`
- backend/data modules
- server-side AI services

**Must never**
- expose service-role credentials;
- expose AI secrets to client;
- disable RLS as a shortcut;
- trust caller-supplied user identity for authorization.

---

### 3.6 Reviewer Agent

**Purpose**
Find defects and requirement/architecture mismatches.

**Default mode**
Read-only review.

**Checks**
- acceptance criteria;
- correctness;
- architecture;
- regressions;
- unnecessary complexity;
- tests;
- error handling.

**Must not**
- approve because code “looks good”;
- rewrite large parts of implementation during review.

Output statuses:
- PASS
- CHANGES_REQUESTED
- BLOCKED

---

### 3.7 Security Frontend Agent

**Threat model**
Client code and device/browser state are attacker-controlled.

**Reviews**
- token/session handling;
- local storage of sensitive data;
- Web XSS exposure;
- deep links;
- Expo/native permissions;
- camera/microphone/photo access;
- logging;
- environment variables;
- client-side secret leakage;
- upload behavior;
- dependency/browser security risks.

**Default**
Review-only.

**Can implement**
Only explicit security remediation tickets.

---

### 3.8 Security Backend Agent

**Threat model**
Requests can be manipulated, replayed and crafted maliciously.

**Reviews**
- authentication;
- authorization;
- RLS;
- SQL/RPC;
- JWT handling;
- IDOR;
- Storage policies;
- Edge Functions;
- service role usage;
- secrets;
- user-scoped vector search;
- prompt injection/data-boundary risks;
- AI output validation;
- rate/abuse controls;
- sensitive logs.

**Default**
Review-only.

**Can implement**
Only explicit security remediation tickets.

---

### 3.9 QA Agent

**Purpose**
Verify that the feature works, not merely that the code is readable.

**Checks**
- acceptance criteria;
- lint/typecheck/tests;
- build behavior;
- Web/iOS/Android impact;
- RTL/LTR;
- regression paths;
- environment-specific behavior.

Output:
- PASS
- FAIL
- BLOCKED

---

## 4. Ticket Hierarchy

Preferred hierarchy:

```text
Epic
└── Story
    ├── FE Ticket
    ├── BE Ticket
    ├── Test Ticket
    └── Security remediation ticket (only when needed)
```

Do not create separate security implementation tickets for every feature. Security review is a gate; remediation tickets are created only when findings warrant separate work.

---

## 5. GitHub Project Fields

Recommended fields:

| Field | Values |
|---|---|
| Type | Epic / Story / Task / Bug / Security |
| Area | FE / BE / AI / DB / Infra |
| Priority | P0 / P1 / P2 / P3 |
| Status | Backlog / Refinement / Ready / In Progress / Code Review / Security Review / QA / Done |
| Security Impact | None / Frontend / Backend / Full |
| Phase | 1–6 |
| Iteration | 0–3 |
| Risk | Low / Medium / High |
| Estimate | XS / S / M / L |

---

## 6. Definition of Ready

A ticket is READY only when it includes:

- title;
- parent Story/Epic;
- context;
- goal;
- requirements;
- acceptance criteria;
- out-of-scope;
- dependencies;
- likely affected area;
- security impact;
- tests required;
- relevant PRD/HLD/LLD/ADR references.

If scope is ambiguous enough to risk unrelated changes, Planner must refine it before implementation.

---

## 7. Ticket Scope Lock

Developer instruction:

> Implement only the active ticket.

Allowed:
- required code;
- directly related tests;
- minimal supporting changes.

Not allowed:
- unrelated refactor;
- next-ticket implementation;
- architecture redesign;
- DB schema change not authorized by ticket/ADR;
- public API contract change outside scope;
- new dependency without justification.

When blocked by an out-of-scope requirement, report `BLOCKED` and create/escalate the dependency.

---

## 8. Security Impact Routing

Planner labels every ticket:

### None
Examples:
- static spacing change;
- copy-only UI change.

No dedicated security review required unless Reviewer identifies risk.

### Frontend
Examples:
- auth/session UI;
- local persistence;
- deep linking;
- uploads;
- native permissions.

Requires Security FE.

### Backend
Examples:
- migration;
- RLS;
- RPC;
- Edge Function;
- AI service;
- Storage policy.

Requires Security BE.

### Full
Examples:
- authentication feature;
- voice/image upload pipeline;
- semantic search;
- account deletion/export.

Requires both Security FE and Security BE.

---

## 9. Standard Dev Loop

```text
READY
  │
  ▼
IMPLEMENTING
  │
  ▼
SELF CHECK
  │
  ▼
REVIEW
  │
  ├─ CHANGES_REQUESTED ─► FIX ─┐
  │                            │
  ▼                            │
SECURITY REVIEW (if required)  │
  │                            │
  ├─ BLOCKER ─────────────► FIX│
  │                            │
  ▼                            │
QA                             │
  │                            │
  ├─ FAIL ─────────────────► FIX
  │
  ▼
DONE
```

---

## 10. Iteration Policy

Maximum normal implementation loops per ticket:

`MAX_ITERATIONS = 3`

An iteration increments when a ticket returns from Reviewer/Security/QA to implementation.

After 3 failed iterations:

- mark `BLOCKED`;
- summarize failure pattern;
- escalate to Architect;
- do not continue random refactoring.

Architect decides whether to:
- clarify requirement;
- split ticket;
- create ADR;
- change design;
- authorize another iteration.

---

## 11. Review Output Contract

Reviewer output:

```text
TICKET: <id>
RESULT: PASS | CHANGES_REQUESTED | BLOCKED

Acceptance Criteria:
- AC1 PASS/FAIL
- AC2 PASS/FAIL

Architecture:
PASS/FAIL

Tests:
PASS/FAIL

Findings:
- severity
- file/area
- problem
- required change
```

No praise-only reviews.

---

## 12. Security Finding Contract

```text
SECURITY REVIEW: <ticket>

RESULT:
PASS | CHANGES_REQUIRED | BLOCK_MERGE

Finding:
<short title>

Severity:
CRITICAL | HIGH | MEDIUM | LOW

Area:
FE | BE

Threat:
<what could go wrong>

Evidence:
<where/how observed>

Required remediation:
<expected security outcome>
```

Merge policy:

- CRITICAL → BLOCK_MERGE
- HIGH → BLOCK_MERGE
- MEDIUM → fix in-ticket or explicit approved follow-up
- LOW → follow-up allowed

---

## 13. QA Output Contract

```text
QA: <ticket>
RESULT: PASS | FAIL | BLOCKED

Acceptance Criteria:
- AC1 PASS
- AC2 FAIL

Platforms:
- Web
- iOS
- Android

Regression:
PASS/FAIL

Notes:
<repro / evidence>
```

---

## 14. Definition of Done

Ticket is DONE only when:

- acceptance criteria pass;
- implementation is within scope;
- lint passes;
- typecheck passes;
- required tests pass;
- Reviewer PASS;
- required Security Agent(s) PASS;
- QA PASS;
- documentation/ADR updated when required;
- PR is mergeable;
- no unresolved CRITICAL/HIGH finding.

---

## 15. Environment & Promotion Rules

### Pull Request
May receive preview build/deployment.

### Test
Integration branch deploys only to Test resources.

### Production
Production promotion requires:
- approved PR;
- QA PASS;
- required Security PASS;
- no blocker findings;
- merge to `main`;
- controlled migration/deployment pipeline.

No agent may point Test code at Production credentials to “make it work.”

---

## 16. Database Change Rules

- schema change requires migration;
- never manually patch Production as normal workflow;
- migration must be tested in Test;
- destructive migration needs explicit review and rollback/backup consideration;
- RLS must be reviewed by Security BE;
- vector/RPC functions must preserve user isolation.

---

## 17. Architecture Change Rule

Create/update an ADR when a ticket changes a durable architectural choice, including:

- hosting;
- environment topology;
- auth;
- data ownership;
- local-first sync;
- database boundary;
- AI provider boundary;
- security boundary;
- cross-feature public contracts.

---

## 18. Agent Permission Philosophy

Use least privilege.

An agent should receive:
- the tools it needs;
- read access to governing docs;
- write scope only where its role requires it.

Review agents should default to read-only behavior.

No agent may interpret tool access as authorization to exceed ticket scope.

---

## 19. Recommended `.github` Layout

```text
.github/
├── copilot-instructions.md
├── agents/
│   ├── product.agent.md
│   ├── architect.agent.md
│   ├── planner.agent.md
│   ├── frontend.agent.md
│   ├── backend.agent.md
│   ├── reviewer.agent.md
│   ├── security-fe.agent.md
│   ├── security-be.agent.md
│   └── qa.agent.md
├── instructions/
│   ├── frontend.instructions.md
│   ├── supabase.instructions.md
│   └── tests.instructions.md
├── prompts/
│   ├── create-ticket.prompt.md
│   ├── implement-ticket.prompt.md
│   ├── review-ticket.prompt.md
│   └── dev-loop.prompt.md
└── ISSUE_TEMPLATE/
```

---

## 20. Golden Rule

> The agent that defines the requirement should not be the same role that implements and approves it.

Product defines **what**.  
Architecture defines **how at system level**.  
Planner turns it into **bounded work**.  
Developer implements.  
Reviewer challenges correctness.  
Security challenges abuse resistance.  
QA proves behavior.
