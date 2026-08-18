# ADR-002 — AI and Secret Security Boundary

**Status:** Accepted  
**Decision:** Privileged AI calls execute only in server-side Supabase Edge Functions/services.

## Context
The Expo application ships to browsers and devices. Client code and public environment variables cannot safely contain privileged provider credentials.

## Decision
- no AI provider secret in client;
- no Supabase service-role credential in client;
- client authenticates to Supabase;
- Edge Function validates JWT and derives user identity;
- Edge Function calls AI provider;
- AI structured output is runtime-validated before persistence.

## Consequences
AI work gains an explicit server boundary, operational logging point and security review surface.
