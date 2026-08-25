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

### Planner GitHub tools

The Planner Agent uses the following GitHub MCP tools:

- `issue_read`
- `issue_write`
- `search_issues`
- `projects_list`
- `projects_write`
- `list_label`
- `label_write`

Tool identifiers must match the official GitHub MCP Server names exactly.
Any change to this allowlist requires updating both ADR-007 and
`.github/agents/planner.agent.md`.

## Secrets
GitHub cloud-agent credentials live in Agents secrets.
Repository MCP headers may reference an Agent secret using supported `$VAR` or `${VAR}` forms.
The repository documentation uses the braced `${VAR}` form for clarity.

## VS Code
IDE MCP configuration is separate from GitHub cloud-agent configuration.
The checked-in Test project reference is non-secret tooling configuration, never a Production reference.

## Consequences
Tool availability becomes part of security governance and must be reviewed like code.
