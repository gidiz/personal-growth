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

Agent routing labels. One per agent, ordered to follow the delivery flow:
- `agent:product`
- `agent:planner`
- `agent:architect`
- `agent:frontend`
- `agent:backend`
- `agent:reviewer`
- `agent:security-fe`
- `agent:security-be`
- `agent:qa`
- `agent:devops`

Workflow labels:
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

`.vscode/mcp.json` registers two servers:
- `supabase-test` with `read_only=true`, interactive OAuth; Test migrations are applied with the Supabase CLI.
- `github` scoped by `X-MCP-Toolsets` to `issues,labels,pull_requests,actions`, authenticated with a fine-grained PAT limited to this repository. Project fields are set with the `gh` CLI, not through MCP.

No token is committed. The GitHub PAT is entered once through a VS Code secret input. Playwright MCP is deferred.

See `.vscode/mcp.json` and `.github/MCP_CONFIGURATION.md`.

## Production

Supabase production creation is deferred while the account is constrained by the free project limit.

This does not change the architecture:
- production remains a separate environment
- separate credentials are required
- agents do not get direct write access to production

## Data API migration rule

Because automatic exposure of new tables is disabled, a migration that introduces a resource
needed by the authenticated client must also explicitly configure the required Data API/PostgREST
exposure and grants.

A schema migration is not considered validated until:
1. the table/function exists in Test
2. RLS/policies are correct
3. required client roles have only the intended grants
4. an authenticated client path succeeds
5. unauthorized/cross-user access fails

Server-only tables/functions should remain unexposed when client access is unnecessary.
