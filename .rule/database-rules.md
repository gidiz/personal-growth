# Database Rules

## Purpose

Define PostgreSQL/Supabase schema, migration, RLS, pgvector and environment rules.

## Source of Truth

Versioned files under:

`supabase/migrations/`

are the database schema change source of truth.

Do **not** maintain a separate hand-edited `schema.sql` as an independent competing source of truth unless a future ADR explicitly introduces one.

Generated schema/type artifacts may exist, but they must be regenerated from the migration-backed schema rather than manually diverging.

## Environments

- Local/development database for local work where practical.
- Dedicated Supabase Test project.
- Dedicated Supabase Production project.
- Never point Test tooling at Production to bypass setup problems.
- Backend agent MCP writes are limited to Local/Test.

## Core User-Owned Tables

Initial domain tables include:

- `profiles`
- `daily_pulse`
- `daily_goals`
- `knowledge_items`
- `insights`
- `skills_progress`
- `challenge_logs`
- `decision_logs`
- `periodic_reviews`
- `capture_jobs`

Refer to `../docs/architecture/LLD.md` for field-level design.

## Common Ownership Fields

User-owned tables normally include:

```text
id uuid
user_id uuid
created_at timestamptz
updated_at timestamptz
```

Use UUID generation consistent with the approved migration design.

## RLS

- Enable RLS on every user-owned table.
- Enforce ownership using authenticated identity.
- Never authorize using a client-supplied `user_id`.
- Cover SELECT/INSERT/UPDATE/DELETE as applicable.
- Security BE review is required for RLS changes.
- Client-side filters are not security.

## Migrations

- Every schema change is a migration.
- Keep migrations small and reviewable.
- Prefer additive/reversible changes where practical.
- Test migrations against Test before Production.
- Destructive migrations require explicit review and rollback/data-loss consideration.
- Never manually patch Production as normal workflow.

## pgvector / RAG

- Use vector dimensions compatible with the configured embedding model.
- Track embedding model/version/status metadata as defined by ADR-006.
- Vector search must remain user-scoped.
- RPC/vector functions must not accept a freely trusted target user id.
- HNSW/vector index changes require performance and Security BE consideration.

## Data Integrity

Use database constraints for durable invariants when practical:
- enum/check ranges;
- foreign keys;
- uniqueness;
- non-null requirements.

Application validation complements database constraints; it does not replace them.
