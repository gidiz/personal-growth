# ADR-002 — Supabase backend platform

## Status
Accepted

## Decision
Use Supabase for PostgreSQL, Auth, Storage, Edge Functions, and pgvector.

## Rationale
It reduces operational overhead while preserving PostgreSQL and explicit security policies.

## Consequences
RLS is mandatory for private user data. Platform-specific configuration must be versioned or documented.
