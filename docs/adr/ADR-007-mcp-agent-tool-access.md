# ADR-007 — MCP and agent tool access

## Status
Accepted

## Decision
Use MCP to grant controlled tool access to external systems.

Current integrations: GitHub MCP, Playwright MCP, Supabase MCP scoped to Test.

## Security model
- project scope whenever possible
- least privilege
- secrets in platform secret stores
- no Production MCP write access
- no secret values committed to Git
- repository-level MCP tool exposure uses an explicit allowlist
- custom agents further narrow tools per role

## Supabase Test tool policy

Repository-level Supabase MCP allowlist:
- `list_tables`
- `list_extensions`
- `list_migrations`
- `apply_migration`
- `execute_sql`
- `search_docs`

Role narrowing:
- Backend may use all six
- Security BE may use only `list_tables`, `list_extensions`, `list_migrations`, `search_docs`
- Reviewer gets no Supabase mutation tools
- other agents get no Supabase tools unless justified

The scoped token remains restricted to `personal-growth-test`.

## GitHub cloud agent
Credential: `COPILOT_MCP_SUPABASE_TEST_ACCESS_TOKEN`. Never commit the secret value.

## VS Code
IDE MCP configuration is separate. The checked-in Test project ref is the non-secret tooling exception documented by ADR-004.

## Production
Do not configure a write-enabled Production MCP server.
