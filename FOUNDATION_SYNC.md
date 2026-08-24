# Foundation Sync — Review Cycle 1 Fixes

This package incorporates the first Copilot PR review.

Accepted corrections include: restored domain glossary, complete Reviewer/Security/QA gate contracts, shared 3-cycle correction budget, Test-only data guardrails, explicit `.vscode/mcp.json` Test-only exception, DevOps role alignment, provider-agnostic AI boundary, `bugfix/*` vocabulary, OCR/vision design, capture retry/confidence lifecycle, full RAG corpus contracts, constrained goal/challenge states, embedding lifecycle metadata, DECISION routing, low-confidence confirmation, non-causal trend language, bug/security Issue Form fields, QA/DevOps casing, explicit Supabase MCP allowlist, and read-only Security BE tools.

Deliberately rejected: adding a redundant `profiles.user_id`. `profiles.id = auth.users.id` is the explicit 1:1 identity-table exception.

## Manual GitHub setting still required
Update Repository Settings -> Copilot -> MCP servers to match `.github/MCP_CONFIGURATION.md`, replacing `tools: ["*"]` with:
- list_tables
- list_extensions
- list_migrations
- apply_migration
- execute_sql
- search_docs

Then re-run a read-only MCP verification.
