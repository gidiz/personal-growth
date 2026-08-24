# MCP Configuration

MCP is configured differently for GitHub cloud agents and VS Code.

## 1. GitHub Copilot cloud agent

The GitHub repository-level MCP configuration is managed in:

`Repository Settings -> Copilot -> MCP servers`

Current Supabase Test configuration concept:

```json
{
  "mcpServers": {
    "supabase-test": {
      "type": "http",
      "url": "https://mcp.supabase.com/mcp?project_ref=ehppewofypspcfzboqvm&features=database,docs",
      "headers": {
        "Authorization": "Bearer $COPILOT_MCP_SUPABASE_TEST_ACCESS_TOKEN"
      },
      "tools": ["*"]
    }
  }
}
```

The secret is stored as a GitHub **Agents secret**:
`COPILOT_MCP_SUPABASE_TEST_ACCESS_TOKEN`

Never commit its value.

### Tool hardening
`tools: ["*"]` is currently acceptable only as a temporary discovery/bootstrap state.
Once the exact required Supabase MCP tool names are verified in the environment, replace wildcard exposure with a specific allowlist.

The Supabase URL is also feature-scoped to `database,docs` to reduce exposed capability groups.

## 2. VS Code

GitHub repository MCP settings do not automatically configure the IDE.

This package includes `.vscode/mcp.json` for VS Code.

The VS Code configuration uses Supabase hosted MCP with project scoping and interactive OAuth, so no personal access token is committed.

After opening the workspace:
1. open Copilot Chat
2. switch to Agent mode
3. open the tools/MCP picker
4. start/connect `supabase-test`
5. complete Supabase browser authentication if prompted
6. verify with a read-only question before making changes

## 3. Production

Do not configure a write-enabled Production Supabase MCP server.

Production migrations must be reviewed and deployed through a controlled release process.
