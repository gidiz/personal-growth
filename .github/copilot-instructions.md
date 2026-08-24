# GitHub Copilot Instructions

You are working in the Personal Growth OS repository.

Before making meaningful changes:
1. read `AGENTS.md`
2. read the relevant PRD/HLD/LLD section
3. read relevant ADRs and `.rule/` files
4. identify the GitHub ticket and acceptance criteria

Do not invent missing product or architecture decisions.

## Workflow vocabulary

Use the exact GitHub Project vocabulary from `AGENTS.md`.

Do not create a Story layer.
Do not use old Security Impact values such as Frontend/Backend/Full.
Security Impact is: None / Low / Medium / High.

Do not use "Iteration" for review retries.
Use "review cycle".

## Database

All permanent Supabase schema changes must be migrations.
RLS is mandatory for private data.
Never place service-role or MCP tokens in source files.

## MCP

GitHub cloud-agent MCP and VS Code MCP are separate configurations.
Supabase MCP is Test-only for write operations.
Production direct write access is prohibited.

## Learning

When completing non-trivial implementation work, include a short technical explanation:
- what changed
- why
- how it was validated
