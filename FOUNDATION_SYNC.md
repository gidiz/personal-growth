# Foundation Sync — August 2026

This package synchronizes repository files with the setup already completed in GitHub and Supabase.

## Main corrections

- removed obsolete Epic -> Story -> Ticket planning model
- standardized on Epic -> Feature/Task/Bug/Security
- updated all GitHub Project field vocabulary
- changed Security Impact to None/Low/Medium/High
- renamed automated retry concept from Iteration to Review Cycle
- added missing `technical-task.yml`
- removed obsolete `type:*` labels from Issue Forms
- updated README so `.github/` is no longer described as missing
- updated setup checklist to reflect completed GitHub/Supabase work
- documented Test-only Supabase MCP
- added a VS Code workspace MCP config because IDE MCP is separate from GitHub cloud-agent MCP
- added a DevOps custom agent to align with the existing `agent:devops` routing label
- added feature scoping (`database,docs`) to the documented Supabase MCP URL
- documented wildcard MCP tools as temporary and requiring later allowlist hardening

## Intentionally not included

- secret values
- Supabase database password
- Supabase access token
- production credentials
- generated application code (Expo scaffold is the next development step)
