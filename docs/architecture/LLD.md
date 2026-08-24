# LLD — Low-Level Design

## 1. Repository target structure

```text
app/
  (auth)/
    login.tsx
    register.tsx
  (tabs)/
    index.tsx
    knowledge/
    challenges/
    trends.tsx
    search.tsx
  modals/
    quick-capture.tsx
    weekly-review.tsx
  _layout.tsx

components/
  ui/
  daily/
  knowledge/
  challenges/
  capture/
  charts/

hooks/
  useAuth.ts
  useDailyPulse.ts
  useKnowledge.ts
  useChallenges.ts
  useBrainSearch.ts

lib/
  supabase/
    client.ts
    types.ts
  ai/
  analytics/

supabase/
  migrations/
  functions/
```

## 2. Database conventions

For application-owned tables:
- `id uuid primary key default gen_random_uuid()`
- `user_id uuid not null references auth.users(id) on delete cascade`
- `created_at timestamptz not null default now()`
- `updated_at timestamptz not null default now()` where mutable
- explicit foreign keys
- indexes for common user/date queries
- RLS enabled
- explicit user policies

Use PostgreSQL enums only when stability outweighs migration cost; otherwise prefer constrained text.

## 3. Initial schema

### profiles
- `id uuid` mapped to `auth.users.id`
- `display_name text`
- `locale text`
- `timezone text`
- timestamps

### daily_pulse
- `id`
- `user_id`
- `pulse_date date`
- `mood_score smallint check 1..5`
- `mental_clarity smallint check 1..5`
- `energy_level smallint check 1..5`
- `sleep_hours numeric`
- `sleep_quality text`
- `exercise_done boolean`
- `social_connection smallint nullable`
- `negative_triggers text[]`
- `uplifters text[]`
- `reflection_text text`
- `reflection_audio_path text nullable`
- timestamps
- unique `(user_id, pulse_date)`

### daily_goals
- `id`
- `user_id`
- `goal_date date`
- `title text`
- `status text`
- `position smallint check 1..3`
- timestamps
- unique `(user_id, goal_date, position)`

### knowledge_items
- `id`
- `user_id`
- `item_type text`
- `title text`
- `author_or_source text`
- `status text`
- `progress_percent smallint check 0..100`
- `source_url text`
- timestamps

### insights
- `id`
- `user_id`
- `knowledge_item_id uuid nullable`
- `content text`
- `page_number integer nullable`
- `source_capture_path text nullable`
- `tags text[]`
- `embedding vector(1536) nullable`
- timestamps

### skills_progress
- `id`
- `user_id`
- `skill_name text`
- `baseline_level smallint check 1..10`
- `current_level smallint check 1..10`
- `proof_links text[]`
- timestamps

### challenge_logs
- `id`
- `user_id`
- `problem_statement text`
- `action_plan text`
- `status text`
- `resolution_notes text`
- `lessons_learned text`
- `embedding vector(1536) nullable`
- timestamps

### decision_logs
- `id`
- `user_id`
- `title text`
- `rationale text`
- `assumptions text`
- `expected_outcome text`
- `review_due_date date nullable`
- `actual_outcome text nullable`
- `embedding vector(1536) nullable`
- timestamps

### periodic_reviews
- `id`
- `user_id`
- `review_type text`
- `period_start date`
- `period_end date`
- `summary text`
- `wins text`
- `challenges text`
- `next_actions text`
- `embedding vector(1536) nullable`
- timestamps

### capture_jobs
- `id`
- `user_id`
- `capture_type text`
- `storage_path text nullable`
- `raw_text text nullable`
- `processing_status text`
- `routed_entity_type text nullable`
- `routed_entity_id uuid nullable`
- `error_message text nullable`
- timestamps

## 4. Vector search

Enable `vector`.

Create HNSW indexes when enough data exists to justify them.

Functions:
- `match_insights(query_embedding vector(1536), match_threshold float, match_count int)`
- `match_challenges(query_embedding vector(1536), match_threshold float, match_count int)`

Functions must preserve user isolation.

## 5. Client data access

- Supabase client handles authenticated CRUD.
- TanStack Query owns server-state cache.
- optimistic updates only where rollback behavior is well-defined.
- local persistence is cache, not authoritative truth.
- offline writes require an explicit queue/conflict policy before being promised as a product guarantee.

## 6. AI adapters

Do not call model APIs directly from UI components.

Use adapters for:
- transcription
- structured extraction/routing
- embeddings
- synthesis

AI outputs must be schema-validated before persistence.

## 7. Error handling

Return stable application errors rather than leaking raw provider/database errors.
Log enough context for debugging without logging private content or secrets.

## 8. Testing layers

- unit: pure logic, validation, analytics
- component: critical UI behavior
- integration: Supabase access patterns/RLS
- e2e: high-value user flows on web
- cross-platform smoke tests for mobile
