# Personal Growth OS

Foundation and execution package for **Personal Growth, Mental Health & Retrospective OS**.

This repository is intentionally structured so product intent, architecture, engineering rules,
GitHub Copilot agents, tickets, and runtime infrastructure do not drift apart.

## Canonical sources of truth

- `docs/product/PRD.md` — what and why we build.
- `docs/architecture/HLD.md` — high-level architecture.
- `docs/architecture/LLD.md` — implementation-level architecture.
- `docs/adr/` — architectural decisions and constraints.
- `docs/engineering/DEVELOPMENT_PROCESS.md` — how work moves from idea to Done.
- `AGENTS.md` — repository-wide rules for humans and AI agents.

## Copilot execution layer

The repository includes:

- `.github/copilot-instructions.md`
- custom agents under `.github/agents/`
- path-specific instructions under `.github/instructions/`
- reusable prompts under `.github/prompts/`
- GitHub Issue Forms under `.github/ISSUE_TEMPLATE/`
- `.github/SETUP_CHECKLIST.md`
- `.github/MCP_CONFIGURATION.md`

## Current external setup

### GitHub
- `develop` is the default development branch.
- protected `main` and `develop` rulesets are configured.
- a GitHub Project is configured with:
  - Status
  - Work Type
  - Area
  - Priority
  - Security Impact
  - Estimate
  - Iteration
- repository labels are configured for agent routing and `needs-human`.

### Supabase
- Test project: `personal-growth-test`
- Region: Central EU (Frankfurt)
- Data API enabled
- automatic exposure of new tables disabled
- automatic RLS enabled
- GitHub integration enabled
- Supabase MCP is configured for the GitHub Copilot cloud agent and scoped to Test only
- Production Supabase is intentionally deferred while the free-plan project limit applies

### Deployment
- Vercel: deferred until Expo/Web scaffold exists
- EAS: deferred until Expo scaffold exists

## Development principle

No feature starts from an unstructured "build this" prompt.

The expected flow is:

`Docs -> Planner -> GitHub Ticket -> Implementation -> Review -> Security Review (when required) -> QA -> Merge`

Database schema changes must be represented by versioned migrations in Git.
Production changes must never be made directly by an autonomous agent.
