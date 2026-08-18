# Naming Rules

## Purpose

Keep product, TypeScript, route, database and file naming predictable.

## Domain Vocabulary

Use canonical terms from `.doc/glossary.md`.

Do not invent synonyms for established concepts such as:
- Daily Pulse
- Anchor Goal
- Knowledge Item
- Insight
- Challenge
- Decision
- Periodic Review
- Quick Capture
- Capture Job
- Personal Memory
- Brain Search

## TypeScript

- Components: `PascalCase`
- Types/interfaces: `PascalCase`
- Functions/hooks/variables: `camelCase`
- Hooks begin with `use`
- Constants: use project-consistent `camelCase` or `UPPER_SNAKE_CASE` only for true constants/config conventions
- Repository files: `<domain>.repository.ts`
- Tests: match the project test naming convention adjacent to the code

## Database

- Tables/columns/functions: `snake_case`
- Foreign keys use `<entity>_id`
- User ownership column is `user_id`
- Timestamp columns use `_at`
- Boolean columns should read naturally, e.g. `exercise_done`

## Routes / Features

- Expo Router paths should be human-readable and aligned with product terminology.
- Feature folders should represent bounded product areas, not implementation technologies.

## AI / RAG

Use explicit names:
- `embedding_model`
- `embedding_version`
- `embedding_status`
- `embedded_at`

Avoid ambiguous names like `vector_data`, `ai_value`, or `memory_blob`.

## Environments

Use canonical environment names:
- `local`
- `test`
- `production`

Do not use `prod`/`stage` interchangeably in persistent configuration unless required by a provider and documented.
