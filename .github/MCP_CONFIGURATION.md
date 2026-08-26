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

GitHub repository MCP settings do not automatically configure the IDE. `.vscode/mcp.json` is the IDE's own configuration and registers two servers, both using interactive OAuth with no committed token.

### Supabase Test

The checked-in server sets `read_only=true`. VS Code has no per-server tool allowlist, so without it default agent mode would inherit `execute_sql` and `apply_migration` against the shared Test project. The read-only default keeps the IDE at least privilege no matter which agent is active.

Apply Test migrations with the Supabase CLI against the versioned files in `supabase/migrations/`, not by editing this configuration. Temporarily removing `read_only=true` is a deliberate local action, must not be committed, and must never target Production.

The hard-coded Test `project_ref` is an explicit non-secret developer-tooling exception under ADR-007.

### GitHub

Scoped with the `X-MCP-Toolsets` header to `issues,projects,labels,pull_requests,actions`, the union of what the agent profiles declare. The default toolset and `/x/all` are both deliberately avoided.

This server is not read-only, because Planner must create issues and set Project fields. Role narrowing comes from the `tools:` list in each agent profile. ADR-007 records the accepted residual risk in default agent mode.

Starting the server requires confirming the VS Code trust prompt and completing OAuth once. `gh` CLI authentication is separate and does not configure it.

### Playwright

Not configured. `.github/agents/frontend.agent.md` declares `playwright/*`, but the server stays deferred until application code exists to exercise it.

## 4. Production

Do not configure a write-enabled Production Supabase MCP server. Production migrations require controlled release.
