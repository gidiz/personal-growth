# ADR-004 — Environment separation

## Status
Accepted

## Decision
Separate Local, Test, and Production configuration and credentials.

`develop` is the integration/Test branch. `main` is production-oriented.

## Current state
`personal-growth-test` exists in Supabase. Production Supabase is deferred because of plan limits.

## Consequences
No hard-coded project URLs or secrets. Migrations are promoted, not recreated manually.
