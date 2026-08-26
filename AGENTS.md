# AGENTS.md

## Sources of truth
Read PRD, HLD, LLD, relevant ADRs, Development Process, `.doc/glossary.md`, and relevant `.rule/` files. Conflicts -> `needs-human`.

## Branching
`develop` is default integration. Use short-lived `feature/`, `task/`, `bugfix/`, `security/` branches and PRs. No direct pushes to protected branches.

## GitHub Project vocabulary
Work Type: Epic | Feature | Task | Bug | Security

Area: Frontend | Backend | Database | AI / RAG | Infrastructure | Cross-Cutting

Priority: P0 – Critical | P1 – High | P2 – Medium | P3 – Low

Security Impact: None | Low | Medium | High

Estimate: XS | S | M | L | XL

Status: Backlog | Ready | In Progress | In Review | Security Review | QA | Blocked | Done

Values are separated by `|` and must match the GitHub Project single-select options exactly. `AI / RAG` is one Area value, not two.

## Database / Supabase
- migrations-as-code
- normal user-owned tables use `user_id` + RLS
- explicit exception: `profiles.id = auth.users.id`
- no service-role key in client
- no secrets in committed files
- Supabase MCP writes only Local/Test
- no autonomous Production direct writes

## MCP
Repository-level Supabase MCP uses an explicit allowlist. Custom agents narrow it further. Reviewer/Security roles do not get Supabase mutation tools. Cloud-agent credentials are Agents secrets; VS Code MCP is separate and read-only, so Test migrations are applied with the Supabase CLI.

## Security gates
Security result: PASS | CHANGES_REQUIRED | BLOCKED. Unresolved Critical/High blocks merge; Medium requires remediation or explicit human risk acceptance.

## Review cycles
One shared `MAX_REVIEW_CYCLES = 3` across Reviewer, Security, QA. CHANGES_REQUIRED/FAIL consumes a cycle; BLOCKED stops automation. Iteration is planning, not retries.

## Testing/privacy
Use synthetic/Test fixtures. Never use private Production journal/personal-growth content or Production credentials for normal tests. Redact sensitive artifacts.

## Learning
For non-trivial changes explain what changed, why, trade-offs, and validation.
