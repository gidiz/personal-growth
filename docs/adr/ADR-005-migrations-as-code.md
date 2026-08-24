# ADR-005 — Database migrations as code

## Status
Accepted

## Decision
Permanent schema changes must be represented in `supabase/migrations/`.

## Rationale
Git becomes the auditable source of truth for database evolution.

## Consequences
Manual dashboard experiments must be converted to migrations before they are considered complete.
