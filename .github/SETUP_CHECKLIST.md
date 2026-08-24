# Setup Checklist

## Foundation
- [x] PRD/HLD/LLD/ADRs
- [x] Development Process / AGENTS / rules
- [x] custom agents / prompts / Issue Forms

## GitHub
- [x] `develop` default branch
- [x] protected `main`/`develop`
- [x] GitHub Project fields
- [x] agent-routing labels
- [x] PR-only protection verified
- [x] Copilot code review verified

## Supabase Test
- [x] `personal-growth-test`, Frankfurt
- [x] GitHub integration
- [x] Data API enabled
- [x] auto-expose new tables disabled
- [x] automatic RLS enabled
- [x] scoped Test token
- [x] cloud-agent MCP auth/connectivity verified
- [ ] update repository-level MCP config from wildcard to explicit six-tool allowlist in `.github/MCP_CONFIGURATION.md`
- [ ] re-run read-only MCP verification after allowlist update

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
