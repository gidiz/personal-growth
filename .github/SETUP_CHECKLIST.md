# One-Time Platform Setup

These steps require platform/account configuration and cannot be completed by repository files alone.

## GitHub
- Protect `main` and `develop`.
- Create GitHub Project fields defined in `docs/engineering/DEVELOPMENT_PROCESS.md`.
- Create labels such as `type:feature`, `type:bug`, `type:security`, area/security-impact labels as desired.
- Verify custom agents appear after these files are committed to the default branch.
- Configure repository MCP servers only after reviewing ADR-007.

## Supabase
- Create dedicated Test project.
- Create dedicated Production project.
- Configure environment-specific public keys/URLs.
- Configure server-side secrets separately.
- Do not grant agent direct Production write access.

## Vercel
- Connect repository.
- Map Test/Preview deployments to Test Supabase variables.
- Map Production deployment to Production Supabase variables.

## Expo / EAS
- Initialize only through the approved bootstrap ticket.
- Configure preview/test and production build profiles.
- Store environment-specific values in approved EAS environment/secret configuration.

## MCP
- GitHub MCP: grant only role-required tools.
- Supabase MCP: project-scope to Test for agent work.
- Reviewer/Architect/Security BE should use read-only access when needed.
- No Production write MCP for agents.

## Before first implementation ticket
- Foundation docs committed.
- `.github/` committed.
- Required GitHub Project/labels created.
- Test environment credentials available.
- Production remains isolated.
