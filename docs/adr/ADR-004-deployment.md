# ADR-004 — Deployment Platforms

**Status:** Accepted

## Decision
- Web hosting: Vercel
- iOS/Android builds/distribution: Expo EAS
- Backend/Auth/DB/Storage/Edge Functions: Supabase

## Rationale
The architecture keeps the universal Expo client separate from managed backend/data services, while using platform-native release mechanisms for mobile.

## Release Mapping
- PR/feature changes may use preview deployments/builds.
- integration/Test changes target Test environment only.
- `main` is the Production release source after required gates.

## Consequences
Deployment configuration and secrets exist in multiple platforms and must be managed consistently by environment.
