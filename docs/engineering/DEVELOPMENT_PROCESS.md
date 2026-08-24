# Development Process

## 1. Work hierarchy

```text
Epic
└── Feature / Task / Bug / Security
```

## 2. Project fields

Status: Backlog / Ready / In Progress / In Review / Security Review / QA / Blocked / Done

Work Type: Epic / Feature / Task / Bug / Security

Area: Frontend / Backend / Database / AI / RAG / Infrastructure / Cross-Cutting

Priority: P0 – Critical / P1 – High / P2 – Medium / P3 – Low

Security Impact: None / Low / Medium / High

Estimate: XS / S / M / L / XL

Iteration is the native GitHub two-week planning field, not a retry counter.

## 3. Gate result contract

### Reviewer
- APPROVE
- CHANGES_REQUIRED
- BLOCKED

### Security
- PASS
- CHANGES_REQUIRED
- BLOCKED

Each Security finding includes severity (Critical/High/Medium/Low), affected trust boundary, exploit/impact statement, required remediation, and verification method.

Unresolved Critical/High findings block merge. Unresolved Medium findings block merge unless a human explicitly accepts the risk with rationale.

### QA
- PASS
- FAIL
- BLOCKED

A QA failure includes failed criterion/regression, reproduction evidence, expected behavior, and recommended routing.

## 4. Security routing

- None / Low: normal review + QA unless escalated
- Medium / High: Security Review mandatory
- Frontend impact: Security FE
- Backend/Database/AI/Infrastructure impact: Security BE
- Cross-Cutting: both when applicable

## 5. Automated correction budget

Use one shared correction budget across all required gates:

`MAX_REVIEW_CYCLES = 3`

One cycle is consumed whenever Reviewer returns CHANGES_REQUIRED, Security returns CHANGES_REQUIRED, or QA returns FAIL.

Any BLOCKED result immediately moves the ticket to Blocked.

After three failed correction cycles:
- move to Blocked
- add `needs-human`
- summarize unresolved blockers and failed gates

## 6. Branch and PR flow

1. branch from `develop`
2. implement one coherent ticket
3. commit with ticket reference
4. push branch
5. open PR to `develop`
6. Reviewer / Security / QA gates
7. squash merge unless another strategy is explicitly required

## 7. Database changes

1. create migration file
2. review SQL
3. apply to Test
4. validate schema/RLS with synthetic or purpose-built Test data
5. merge migration
6. later promote the same reviewed migration to Production

Never validate a migration with Production credentials or private Production user data.

## 8. Learning output

For meaningful tickets, include architecture touched, files changed, validation performed, and one or two key technical lessons.
