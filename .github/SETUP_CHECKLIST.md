# Setup Checklist

## Foundation

- [X] PRD/HLD/LLD/ADRs
- [X] Development Process / AGENTS / rules
- [X] custom agents / prompts / Issue Forms

## GitHub

- [X] `develop` default branch
- [X] protected `main`/`develop`
- [X] GitHub Project fields
- [X] agent-routing labels
- [X] PR-only protection verified
- [X] Copilot code review verified

## Supabase Test

- [X] `personal-growth-test`, Frankfurt
- [X] GitHub integration
- [X] Data API enabled
- [X] auto-expose new tables disabled
- [X] automatic RLS enabled
- [X] scoped Test token
- [X] cloud-agent MCP auth/connectivity verified
- [X] update repository-level MCP config from wildcard to explicit six-tool allowlist in `.github/MCP_CONFIGURATION.md`
- [X] read-only MCP verification passed after allowlist update

## Supabase Production

- [ ] create later; currently deferred by free-plan project limit

## VS Code

- [ ] verify custom agents in Agent mode
- [ ] start workspace Supabase MCP and complete OAuth
- [ ] verify tools

## Application scaffold

- [ ] Expo / Router / TypeScript / NativeWind / TanStack Query / tests

## Deployment

- [ ] Vercel after Web scaffold
- [ ] EAS after Expo scaffold
