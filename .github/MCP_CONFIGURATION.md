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
        "Authorization": "Bearer $COPILOT_MCP_SUPABASE_TEST_ACCESS_TOKEN"
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

GitHub repository MCP settings do not automatically configure the IDE. `.vscode/mcp.json` uses the hosted Supabase Test MCP with interactive OAuth and no committed PAT.

The hard-coded Test `project_ref` is an explicit non-secret developer-tooling exception under ADR-004.

## 4. Production

Do not configure a write-enabled Production Supabase MCP server. Production migrations require controlled release.
