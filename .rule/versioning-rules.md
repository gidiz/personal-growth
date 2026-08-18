# Versioning & Branch Rules

## Purpose

Define Git branch, PR, release and environment promotion rules.

## Branch Model

Protected long-lived branches:

- `main` → Production source
- `develop` → shared Test/integration source

Short-lived branches branch from `develop` unless a documented hotfix process says otherwise.

Naming:

- `feat/<ticket-id>-<topic>`
- `fix/<ticket-id>-<topic>`
- `chore/<ticket-id>-<topic>`
- `docs/<ticket-id>-<topic>`
- `sec/<ticket-id>-<topic>`

Keep names lowercase and concise.

## Pull Requests

Normal feature flow:

```text
feature/fix branch
  -> PR
  -> develop
  -> Test deployment
  -> QA/Security gates
  -> release PR
  -> main
  -> Production
```

PRs may receive Vercel preview deployments and relevant preview builds.

## Commit Rules

- Keep commits scoped and reviewable.
- Use concise imperative subjects.
- Reference ticket/issue where repository convention supports it.
- Never commit secrets or generated credential files.
- Agents must not commit/merge unless the active workflow explicitly authorizes it.

## Merge Rules

- Required review gates must pass.
- CRITICAL/HIGH security findings block merge.
- Do not merge unresolved scope/architecture questions.
- Production promotion requires QA PASS and required Security PASS.

## Database / Production

Production schema changes are deployed from reviewed migration files.

No direct agent MCP write to Production.

## Release Versioning

Use Semantic Versioning for product releases when release versioning begins:

`MAJOR.MINOR.PATCH`

Mobile build numbers/store versions are managed according to EAS/store requirements and release automation.

## Hotfixes

A future explicit hotfix workflow may branch from `main`, but must preserve review/security/QA requirements appropriate to severity.
