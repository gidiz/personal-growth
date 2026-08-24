# AGENTS.md

Repository-wide operating rules for humans and AI agents.

## 1. Sources of truth

Read these before changing product behavior or architecture:

1. `docs/product/PRD.md`
2. `docs/architecture/HLD.md`
3. `docs/architecture/LLD.md`
4. relevant ADRs in `docs/adr/`
5. `docs/engineering/DEVELOPMENT_PROCESS.md`
6. `.rule/` files relevant to the change

If two sources conflict, stop and flag `needs-human` rather than inventing a decision.

## 2. Branching

- `develop` is the default integration branch.
- work is done on short-lived branches created from `develop`.
- `main` is production-oriented and protected.
- no direct pushes to protected branches.
- use pull requests for merging.

Recommended branch format:

- `feature/<issue>-short-name`
- `task/<issue>-short-name`
- `bugfix/<issue>-short-name`
- `security/<issue>-short-name`

## 3. Work must map to a GitHub ticket

Do not implement untracked work unless explicitly requested for emergency recovery.

Every implementation ticket should have:

- Work Type
- Area
- Priority
- Security Impact
- Estimate
- Status
- Iteration when scheduled
- acceptance criteria
- validation plan

## 4. GitHub Project vocabulary

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

`XL` work should normally be decomposed before moving to `Ready`.

### Status
- Backlog
- Ready
- In Progress
- In Review
- Security Review
- QA
- Blocked
- Done

`Blocked` is an exception state reachable from any workflow stage.

## 5. Database and Supabase

- schema changes are migrations-as-code.
- never create permanent schema changes manually in the dashboard and leave them unrepresented in Git.
- all user-owned data tables must use `user_id` and RLS.
- RLS policies must be explicit and testable.
- no service-role key in client code.
- no secrets in committed files.
- Supabase MCP write access is allowed only for development/test environments.
- no autonomous direct write access to production Supabase.
- migrations must be reviewed before production application.

## 6. MCP

MCP provides tools; it is not a replacement for repository rules.

Current design:
- GitHub MCP: repository operations / Issues / PR context.
- Playwright MCP: browser validation.
- Supabase MCP: development/test database tooling.

For cloud agents, credentials live in GitHub **Agents secrets**, not source code.
For VS Code, IDE MCP configuration is separate from GitHub cloud-agent MCP configuration.

Prefer project scoping and least privilege.
Do not broaden MCP permissions to fix a task without documenting why.

## 7. Security gates

Security review is mandatory when `Security Impact` is Medium or High.

Routing:
- Frontend affected -> Security FE
- Backend / Database / AI-RAG / Infrastructure affected -> Security BE
- Cross-Cutting -> both when applicable

Security reviewers may block a ticket.

## 8. Review cycles

A ticket may go through up to `MAX_REVIEW_CYCLES = 3` automated fix/review cycles.
This is deliberately named **review cycle**, not **Iteration**, because Iteration is the GitHub two-week planning field.

After 3 failed cycles:
- set `Status = Blocked`
- add `needs-human`
- summarize the unresolved issue

## 9. Learning rule

This project is also a learning project.

When making a non-trivial change, agents should explain:
- what changed
- why this approach was chosen
- what trade-offs exist
- how to validate it

Keep explanations concise and technical; do not hide important reasoning behind generated code.
