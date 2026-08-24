# ADR-004 — Environment separation

## Status
Accepted

## Decision
Separate Local, Test, and Production configuration and credentials. `develop` is integration/Test; `main` is production-oriented.

## Current state
`personal-growth-test` exists. Production Supabase is deferred because of plan limits.

## Hard-coding rule
Application/runtime environment URLs, credentials, and secrets must not be hard-coded in source.

A narrow exception is allowed for non-secret Test-only developer tooling configuration when the value identifies Test (never Production), is not a credential, clearly documents Test-only intent, cannot grant broader permissions by itself, and credentials remain separately protected.

The committed `.vscode/mcp.json` Test project reference is such an exception.

## Consequences
Runtime application configuration remains environment-driven. Migrations are promoted, not recreated manually. Production secrets/project references are never copied into Test tooling files.
