# ADR-007 — MCP and Agent Tool Access

**Status:** Accepted

## Decision
Use MCP for controlled external-tool access with least privilege, explicit tool allowlists, and separate Local/Test/Production boundaries.

Current integrations:
- GitHub MCP, scoped by toolset
- Supabase MCP scoped to Test

Deferred:
- Playwright MCP is not configured. `.github/agents/frontend.agent.md` and `.github/agents/qa.agent.md` declare `playwright/*`, but no server entry exists and none is added until application code exists to exercise it.

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
- `list_label`
- `label_write`

Planner has **no** Project tools. The IDE credential is a fine-grained PAT, and fine-grained PATs cannot access user-owned ProjectsV2 at all: GitHub exposes a Projects permission for organization-owned projects only, and documents user projects as reachable solely by a classic PAT or a GitHub App. Declaring `projects_list` / `projects_write` here would name tools that cannot work.

Project membership and field values are therefore applied in a separate step with the `gh` CLI, whose classic OAuth token carries the `project` scope granted deliberately and independently. Planner states the intended field values in the ticket; a human or the primary assistant applies them.

Do not re-add the `projects` toolset or the Project tools without first moving the Project to an organization or switching the credential to a classic PAT, and record that trade-off here.

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

VS Code applies no per-server tool allowlist, so server configuration is the only scope control that holds for every agent, including default agent mode where no role profile is active.

### Supabase Test

The checked-in IDE server uses `read_only=true`, which executes all queries as a read-only Postgres user.

Consequence: the Backend Agent cannot apply schema changes through IDE MCP. Test migrations are applied with the Supabase CLI from the versioned files in `supabase/migrations/`, which keeps migrations-as-code the only path to schema change. Removing `read_only=true` is a deliberate local action, must not be committed, and must never target Production.

### GitHub

The hosted GitHub MCP server is registered at `https://api.githubcopilot.com/mcp/`.

Scope is enforced at two layers.

**Transport scope** uses the `X-MCP-Toolsets` header:

`issues,labels,pull_requests,actions`

These four toolsets are the union of what the agent profiles declare. The default toolset and `/x/all` are both deliberately avoided. `projects` is excluded because the credential cannot use it.

**Credential scope** uses a fine-grained Personal Access Token restricted to the `gidiz/personal-growth` repository, supplied through a VS Code `promptString` input with `password: true`. The token is stored in VS Code secret storage and never written to a committed file. Its permissions are Issues read/write, Pull requests read, Actions read, Metadata read, and nothing else.

Interactive OAuth was evaluated and rejected. The VS Code OAuth grant requests account-wide permissions that include deleting any administrable repository, managing Codespaces and writing Packages, none of which the toolsets need. Toolset scoping limits which tools an agent can call, but it does not limit what the underlying credential can do; accepting that grant would have left the least-privilege position in this ADR unenforced at the credential layer.

This server is not read-only, because the Planner Agent must create issues and labels. Role narrowing therefore depends on the `tools:` list in each agent profile rather than on the server.

Accepted residual risk: in default agent mode, where no role profile applies, issue and label write tools are reachable. The blast radius is work-tracking metadata in a single repository, which is reversible and touches neither source code nor any database. Revisit this decision if that stops being true.

Known limitation: VS Code does not forward servers that require interactive input to the Agent Host, so this server is available in the IDE but not in Agent Host sessions.

## Consequences
Tool availability becomes part of security governance and must be reviewed like code.
