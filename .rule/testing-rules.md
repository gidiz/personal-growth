# Testing Rules

## Purpose

Define test expectations for a cross-platform, local-first, Supabase-backed application.

## Principles

- Test behavior, not implementation details.
- Keep tests deterministic.
- Prefer fast unit tests, targeted integration tests and E2E for critical journeys.
- Every bug fix should include a regression test when feasible.
- Do not rely on test order.

## Required Areas

### Domain
- Daily Pulse validation/state
- Anchor Goal limits/status transitions
- Challenge/Decision transitions
- analytics calculations

### Auth / Security
- authenticated vs unauthenticated access
- RLS ownership isolation
- cross-user access denial
- Storage ownership
- vector/RPC user isolation

### Local-First
- optimistic update
- pending mutation persistence
- retry
- rollback/failure state
- app restart with pending data where applicable

### AI / Capture
- transcription/classification failure
- invalid AI structured output
- capture source preservation
- low-confidence routing
- embedding failure

### RAG
- correct user scoping
- source/provenance returned
- low-evidence behavior
- incompatible/stale embedding handling
- exact-name/metadata retrieval scenarios when hybrid search exists

### UI
- Web/iOS/Android impact for critical shared components
- Hebrew RTL
- English LTR
- accessibility labels/keyboard behavior where applicable

## Database Tests

Migration/RLS-sensitive tickets must validate against Local/Test Supabase, never Production.

Security BE tickets should include explicit attempts to access another user's records.

## Pull Request Expectations

New features:
- happy path;
- important failure path;
- acceptance-criteria coverage.

Security-sensitive changes:
- abuse/negative tests, not only successful access.

## Test Data

- synthetic/minimal fixtures only;
- no real personal journal data;
- no real credentials/secrets;
- freeze time/randomness where needed.
