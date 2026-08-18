# ADR-001 — Local-First Interaction Strategy

**Status:** Accepted  
**Decision:** Common user mutations update local state immediately and synchronize to Supabase afterward.

## Context
The product depends on low-friction daily capture. Blocking routine interactions on network round trips would undermine the product promise.

## Decision
Use optimistic/local persistence with a pending mutation queue for applicable features. TanStack Query coordinates remote state while storage adapters persist local data/queue state.

Initial conflict strategy is Last-Write-Wins for simple single-user records.

## Consequences
### Positive
- fast UX;
- better temporary-offline behavior;
- user input can survive transient network failures.

### Negative
- synchronization code is more complex;
- retry/idempotency behavior is required;
- conflict semantics must be explicit.

## Not Chosen
A full CRDT/event-sourcing architecture is not justified for MVP.
