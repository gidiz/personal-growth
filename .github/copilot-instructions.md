# GitHub Copilot Instructions

Before meaningful changes read `AGENTS.md`, `.doc/glossary.md`, relevant PRD/HLD/LLD, ADRs/rules, and the ticket.

Use exact Project vocabulary. Do not create a Story layer. Security Impact is None/Low/Medium/High. Review Cycle is a correction retry; Iteration is planning.

Permanent Supabase changes are migrations. RLS is mandatory for private data. Never commit service-role/MCP tokens.

GitHub cloud-agent MCP and VS Code MCP are separate. Supabase MCP is Test-only for writes. Production direct writes are prohibited. Repository-level MCP uses explicit tool allowlists.

For non-trivial work explain what changed, why, and how it was validated.
