# ADR-007 — MCP and agent tool access

## Status
Accepted

## Decision
Use MCP to grant controlled tool access to external systems.

Current integrations:
- GitHub MCP
- Playwright MCP
- Supabase MCP scoped to Test

## Security model
- project scope whenever possible
- least privilege
- secrets stored in platform secret stores
- no production MCP write access
- no secret values committed to Git
- tool exposure should be reduced from wildcard access when stable tool requirements are known

## GitHub cloud agent
The repository-level Supabase MCP configuration uses:
- Test project ref
- an Agents secret named `COPILOT_MCP_SUPABASE_TEST_ACCESS_TOKEN`
- scoped token permissions

## VS Code
IDE MCP configuration is separate from GitHub cloud-agent MCP configuration.
Prefer interactive OAuth for the hosted Supabase MCP when supported by the IDE.
