# Tooling and Environments

## GitHub

Repository:
`gidiz/personal-growth`

Default branch:
`develop`

Protected branches:
- `develop`
- `main`

GitHub Project fields:
- Status
- Work Type
- Area
- Priority
- Security Impact
- Estimate
- Iteration

Repository labels currently used:
- `agent:architect`
- `agent:frontend`
- `agent:backend`
- `agent:security-fe`
- `agent:security-be`
- `agent:qa`
- `agent:devops`
- `needs-human`

## Supabase Test

Project display name:
`personal-growth-test`

Project ref:
`ehppewofypspcfzboqvm`

Region:
Central EU (Frankfurt)

Security defaults:
- Data API enabled
- automatically expose new tables disabled
- automatic RLS enabled

## GitHub Copilot cloud-agent MCP

Repository MCP server name:
`supabase-test`

Credential:
GitHub Agents secret `COPILOT_MCP_SUPABASE_TEST_ACCESS_TOKEN`

The secret value must never be committed.

Verified:
Copilot cloud agent successfully reached `personal-growth-test`.

## VS Code MCP

GitHub.com repository MCP configuration does **not** configure VS Code.
VS Code maintains its own MCP configuration.

See `.vscode/mcp.json` and `.github/MCP_CONFIGURATION.md`.

## Production

Supabase production creation is deferred while the account is constrained by the free project limit.

This does not change the architecture:
- production remains a separate environment
- separate credentials are required
- agents do not get direct write access to production
