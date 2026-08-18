# ADR-003 — Environment Isolation

**Status:** Accepted  
**Decision:** Maintain Local, Test and Production environments with separate Test and Production Supabase projects.

## Topology

### Local
Expo local/dev build + local/dev Supabase where practical.

### Test
- Web: Vercel Test/preview deployment
- Mobile: EAS preview/test build
- Backend: dedicated Supabase Test project

### Production
- Web: Vercel Production
- Mobile: EAS production/store build
- Backend: dedicated Supabase Production project

## Rules
- Test credentials cannot access Production.
- Production secrets are never copied into Test for convenience.
- Database changes flow through migrations.
- Test is the proving ground for migrations before Production.

## Rationale
Auth, Storage, Edge Functions and database data should be isolated, not merely separated by a schema or naming convention.
