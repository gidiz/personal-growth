# MCP Configuration

MCP is configured differently for GitHub cloud agents and VS Code.

## 1. GitHub Copilot cloud agent

Managed in `Repository Settings -> Copilot -> MCP servers`.

Use:

```json
{
  "mcpServers": {
    "supabase-test": {
      "type": "http",
      "url": "https://mcp.supabase.com/mcp?project_ref=ehppewofypspcfzboqvm&features=database,docs",
      "headers": {
        "Authorization": "Bearer ${COPILOT_MCP_SUPABASE_TEST_ACCESS_TOKEN}"
      },
      "tools": [
        "list_tables",
        "list_extensions",
        "list_migrations",
        "apply_migration",
        "execute_sql",
        "search_docs"
      ]
    }
  }
}
```

The secret is the GitHub Agents secret `COPILOT_MCP_SUPABASE_TEST_ACCESS_TOKEN`; never commit its value.

Supabase documents the Database tools `list_tables`, `list_extensions`, `list_migrations`, `apply_migration`, and `execute_sql`; `search_docs` is the docs tool.

## 2. Role-level policy

Backend: all six.

Security BE: `list_tables`, `list_extensions`, `list_migrations`, `search_docs` only.

Reviewer: no Supabase mutation tools.

## 3. VS Code

GitHub repository MCP settings do not automatically configure the IDE. `.vscode/mcp.json` is the IDE's own configuration and registers two servers. Neither holds a committed token: Supabase uses interactive OAuth, GitHub uses a secret input.

### Supabase Test

The checked-in server sets `read_only=true`. VS Code has no per-server tool allowlist, so without it default agent mode would inherit `execute_sql` and `apply_migration` against the shared Test project. The read-only default keeps the IDE at least privilege no matter which agent is active.

Apply Test migrations with the Supabase CLI against the versioned files in `supabase/migrations/`, not by editing this configuration. Temporarily removing `read_only=true` is a deliberate local action, must not be committed, and must never target Production.

The hard-coded Test `project_ref` is an explicit non-secret developer-tooling exception under ADR-007.

### GitHub

Scoped with the `X-MCP-Toolsets` header to `issues,labels,pull_requests,actions`, the union of what the agent profiles declare. The default toolset and `/x/all` are both deliberately avoided.

Authentication uses a **fine-grained Personal Access Token**, not interactive OAuth. VS Code prompts for it once through a `promptString` input with `password: true` and stores it in secret storage; it is never written to `.vscode/mcp.json`.

Create the token at `https://github.com/settings/personal-access-tokens` with:

- Repository access: **Only select repositories** -> `gidiz/personal-growth`
- Repository permissions: Issues **Read and write**, Pull requests **Read-only**, Actions **Read-only**, Metadata **Read-only**
- An expiry date; rotate by re-entering the new token when the server next starts

Grant nothing else. Issues covers the label tools. If a tool fails with a permission error, widen one permission deliberately and record why here rather than broadening the token to keep moving.

OAuth was rejected because the VS Code grant requests account-wide permissions including deletion of any administrable repository. ADR-007 records that reasoning.

**No Project tools.** Fine-grained PATs cannot reach user-owned ProjectsV2 - GitHub offers a Projects permission for organization-owned projects only. Project membership and field values are applied separately with the `gh` CLI, which holds the `project` scope. See ADR-007 before changing this.

This server is not read-only, because Planner must create issues and labels. Role narrowing comes from the `tools:` list in each agent profile.

### Playwright

Not configured. `.github/agents/frontend.agent.md` and `.github/agents/qa.agent.md` declare `playwright/*`, but the server stays deferred until application code exists to exercise it.

## 4. Production

Do not configure a write-enabled Production Supabase MCP server. Production migrations require controlled release.
