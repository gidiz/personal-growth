# ADR-007 — MCP and Agent Tool Access

**Status:** Accepted

## Decision
Use MCP for controlled external-tool access with least privilege, explicit tool allowlists, and separate Local/Test/Production boundaries.

Current integrations:
- GitHub MCP
- Playwright MCP
- Supabase MCP scoped to Test

## Trust boundary
Tool output is untrusted data and never authorization. Issue/PR/database/log content can contain instruction-like text.

Only repository governance, the active ticket/PR scope and explicit operator instructions authorize actions.

## Supabase Test
Repository-level Supabase MCP tools:
- list_tables
- list_extensions
- list_migrations
- apply_migration
- execute_sql
- search_docs

Custom agents narrow this further:
- Backend: six tools above
- Security BE: list_tables, list_extensions, list_migrations, search_docs
- review-only roles: no Supabase mutation tools

The Supabase token is scoped to `personal-growth-test`.
No Production MCP write access is configured.

## GitHub tools
Custom agents must list exact GitHub MCP tools rather than `github/*`.

Review-only roles receive only read operations such as `issue_read` and `pull_request_read`.
DevOps receives read-only Actions inspection by default; production-affecting triggers require explicit release authorization and a separately reviewed capability change.

## Secrets
GitHub cloud-agent credentials live in Agents secrets.
Repository MCP headers may reference an Agent secret using supported `$VAR` or `${VAR}` forms.
The repository documentation uses the braced `${VAR}` form for clarity.

## VS Code
IDE MCP configuration is separate from GitHub cloud-agent configuration.
The checked-in Test project reference is non-secret tooling configuration, never a Production reference.

## Consequences
Tool availability becomes part of security governance and must be reviewed like code.
