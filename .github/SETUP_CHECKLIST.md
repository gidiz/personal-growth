# Setup Checklist

Last synchronized with the repository setup performed during August 2026.

## Foundation
- [x] PRD
- [x] HLD
- [x] LLD
- [x] ADRs
- [x] Development Process
- [x] AGENTS.md
- [x] repository rules
- [x] Copilot custom agents
- [x] reusable prompts
- [x] Issue Forms

## GitHub
- [x] repository created
- [x] `develop` default branch
- [x] `main` and `develop` protection/rulesets
- [x] GitHub Project created
- [x] Status configured:
  - Backlog
  - Ready
  - In Progress
  - In Review
  - Security Review
  - QA
  - Blocked
  - Done
- [x] Work Type:
  - Epic
  - Feature
  - Task
  - Bug
  - Security
- [x] Area:
  - Frontend
  - Backend
  - Database
  - AI / RAG
  - Infrastructure
  - Cross-Cutting
- [x] Priority:
  - P0 – Critical
  - P1 – High
  - P2 – Medium
  - P3 – Low
- [x] Security Impact:
  - None
  - Low
  - Medium
  - High
- [x] Estimate:
  - XS
  - S
  - M
  - L
  - XL
- [x] Iteration field configured with two-week cadence
- [x] labels:
  - agent:architect
  - agent:frontend
  - agent:backend
  - agent:security-fe
  - agent:security-be
  - agent:qa
  - agent:devops
  - needs-human

## Supabase Test
- [x] project created
- [x] renamed/displayed as `personal-growth-test`
- [x] Frankfurt region
- [x] GitHub repository connected
- [x] Data API enabled
- [x] automatic exposure of new tables disabled
- [x] automatic RLS enabled
- [x] GitHub Copilot cloud-agent MCP configured
- [x] scoped token limited to Test
- [x] MCP authentication tested successfully

## Supabase Production
- [ ] create separate Production project
- [ ] separate credentials/secrets
- [ ] production deployment process

Current state: deferred because the account has reached the free-plan project limit.

## VS Code
- [ ] verify custom agents appear in Copilot Agent mode
- [ ] start workspace Supabase MCP and complete OAuth
- [ ] verify Supabase MCP tools are visible in VS Code

## Application scaffold
- [ ] Expo project
- [ ] Expo Router
- [ ] TypeScript strict
- [ ] NativeWind
- [ ] TanStack Query
- [ ] local cache adapter
- [ ] initial tests/lint/typecheck

## Vercel
- [ ] configure after Web scaffold exists
- [ ] Test/Preview environment
- [ ] Production environment

## EAS
- [ ] configure after Expo scaffold exists
- [ ] preview profile
- [ ] production profile

## First development loop
- [ ] Planner creates first Epic
- [ ] first implementation ticket is Ready
- [ ] implementation branch
- [ ] PR
- [ ] Reviewer
- [ ] Security gate when required
- [ ] QA
- [ ] merge to develop
