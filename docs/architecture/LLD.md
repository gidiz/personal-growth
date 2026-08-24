# LLD — Low-Level Design

## 1. Repository target structure

```text
app/
  (auth)/
  (tabs)/
  modals/
  _layout.tsx
components/
  ui/
  daily/
  knowledge/
  challenges/
  capture/
  charts/
hooks/
lib/
  supabase/
  ai/
    transcription.ts
    vision.ts
    extraction.ts
    embeddings.ts
    synthesis.ts
  analytics/
supabase/
  migrations/
  functions/
```

## 2. Database conventions

For normal application-owned tables:
- `id uuid primary key default gen_random_uuid()`
- `user_id uuid not null references auth.users(id) on delete cascade`
- timestamps where appropriate
- explicit foreign keys and indexes
- RLS enabled
- explicit user policies

### Identity-table exception
`profiles` is intentionally 1:1 with `auth.users`. Its ownership key is its primary key: `profiles.id = auth.users.id`. Do not add a duplicate `user_id` column merely to satisfy the generic convention.

Use PostgreSQL enums only when stability outweighs migration cost; otherwise prefer constrained text with `CHECK`.

## 3. Initial schema

### profiles
- `id uuid primary key references auth.users(id) on delete cascade`
- `display_name text`
- `locale text`
- `timezone text`
- timestamps
- RLS policy uses `auth.uid() = id`

### daily_pulse
- `id`, `user_id`, `pulse_date date`
- `mood_score smallint check 1..5`
- `mental_clarity smallint check 1..5`
- `energy_level smallint check 1..5`
- sleep/exercise/social/trigger/uplifter/reflection fields
- unique `(user_id, pulse_date)`

### daily_goals
- `id`, `user_id`, `goal_date date`, `title text`
- `status text not null check (status in ('TODO','IN_PROGRESS','DONE','CANCELLED'))`
- `position smallint check (position between 1 and 3)`
- unique `(user_id, goal_date, position)`

### knowledge_items
- `id`, `user_id`, item/source/title/status/progress fields

### insights
- `id`, `user_id`, optional `knowledge_item_id`, content/source/tags
- `embedding vector(1536) nullable`
- `embedding_model text nullable`
- `embedding_version text nullable`
- `embedded_at timestamptz nullable`
- `embedding_status text not null default 'PENDING' check (embedding_status in ('PENDING','READY','STALE','FAILED'))`

### skills_progress
- `id`, `user_id`, `skill_name`
- baseline/current levels constrained 1..10
- proof links

### challenge_logs
- `id`, `user_id`, problem/action/resolution/lessons fields
- `status text not null check (status in ('OPEN','TESTING_SOLUTION','RESOLVED','STALLED'))`
- embedding + model/version/time/status metadata as above

### decision_logs
- `id`, `user_id`, title/rationale/assumptions/expected outcome
- `review_due_date date nullable`
- `actual_outcome text nullable`
- `reviewed_at timestamptz nullable`
- embedding + model/version/time/status metadata

Only reviewed decisions (`reviewed_at is not null`) enter the initial semantic retrieval corpus.

### periodic_reviews
- `id`, `user_id`, review type/period/summary/wins/challenges/next actions
- embedding + model/version/time/status metadata

### capture_jobs
- `id`, `user_id`
- `capture_type text not null check (capture_type in ('TEXT','VOICE','IMAGE'))`
- source fields
- `processing_status text not null check (processing_status in ('PENDING','PROCESSING','AWAITING_CONFIRMATION','COMPLETED','RETRYABLE_FAILURE','PERMANENT_FAILURE'))`
- `attempt_count integer not null default 0 check (attempt_count >= 0)`
- `max_attempts integer not null default 3 check (max_attempts between 1 and 10)`
- `classification_confidence numeric nullable check (classification_confidence between 0 and 1)`
- `routed_entity_type text nullable check (routed_entity_type is null or routed_entity_type in ('GOAL','MOOD_LOG','INSIGHT','CHALLENGE','DECISION'))`
- `routed_entity_id uuid nullable`
- `requires_confirmation boolean not null default false`
- retry/error timestamps and codes

Retry behavior:
- retry only `RETRYABLE_FAILURE`
- increment `attempt_count`
- never exceed `max_attempts`
- exhausted retries -> `PERMANENT_FAILURE`
- low-confidence routing -> `AWAITING_CONFIRMATION`
- original capture is not silently discarded

## 4. Vector search

Enable `vector`.

Initial RPCs:
- `match_insights(...)`
- `match_challenges(...)`
- `match_reviewed_decisions(...)`
- `match_periodic_reviews(...)`

All search functions must preserve user isolation, exclude STALE/FAILED embeddings, and retain lifecycle metadata needed for evaluation/debugging. Decision retrieval includes reviewed decisions only.

## 5. Client data access

Supabase client handles authenticated CRUD. TanStack Query owns server-state cache. Local persistence is cache, not authoritative truth. Offline writes require an explicit queue/conflict policy before being promised.

## 6. AI adapters

Do not call model APIs directly from UI components.

Adapters:
- transcription
- OCR / vision extraction
- structured extraction/routing
- embeddings
- synthesis

### OCR / vision flow
1. client uploads source through an authenticated path
2. server-side processing invokes the OCR/vision adapter
3. extracted text is schema-validated
4. routing receives normalized text + provenance
5. low-confidence routing requires user confirmation
6. source retention follows privacy/cleanup policy

AI outputs must be schema-validated before persistence. Confidence alone is not authorization to overwrite user-owned structured data.

## 7. Embedding lifecycle

For every vector-bearing entity persist model identifier, version/config identifier, embedded timestamp, and lifecycle status.

When model/config changes:
1. mark incompatible embeddings STALE
2. queue re-embedding
3. exclude stale vectors from normal retrieval
4. track failures explicitly

Never mix same-dimension vectors from incompatible models as if they were comparable.

## 8. Error handling

Return stable application errors rather than leaking raw provider/database errors. Log enough context for debugging without logging private content or secrets.

## 9. Testing layers

- unit: pure logic, validation, analytics
- component: critical UI behavior
- integration: Supabase access patterns/RLS
- e2e: high-value web flows
- cross-platform smoke tests for mobile
- capture-job retry/confirmation tests
- vector lifecycle/retrieval corpus tests
