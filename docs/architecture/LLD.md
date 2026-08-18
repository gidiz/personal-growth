# LLD — Personal Growth, Mental Health & Retrospective OS

**Status:** Draft v1.0  
**Purpose:** Concrete technical design baseline.  
**Rule:** This document may evolve through ADRs and ticket-specific design notes.

---

## 1. Technology Baseline

### Client
- Expo
- React Native
- Expo Router
- TypeScript
- NativeWind
- TanStack Query
- MMKV-compatible native storage adapter
- Web storage adapter

### Backend
- Supabase Auth
- PostgreSQL
- Supabase Storage
- Supabase Edge Functions
- pgvector

### AI
Server-side provider adapter supporting:
- transcription;
- structured extraction;
- vision/OCR;
- embeddings;
- grounded synthesis.

---

## 2. Proposed Repository Layout

```text
app/
├── (auth)/
│   ├── login.tsx
│   └── register.tsx
├── (tabs)/
│   ├── index.tsx
│   ├── knowledge/
│   ├── challenges/
│   ├── trends.tsx
│   └── search.tsx
├── modals/
│   ├── quick-capture.tsx
│   └── weekly-review.tsx
└── _layout.tsx

components/
├── ui/
├── daily/
├── knowledge/
├── challenges/
├── capture/
└── charts/

features/
├── auth/
├── daily/
├── knowledge/
├── challenges/
├── decisions/
├── capture/
├── analytics/
└── search/

repositories/
├── dailyPulse.repository.ts
├── goals.repository.ts
├── knowledge.repository.ts
├── insights.repository.ts
├── challenges.repository.ts
└── decisions.repository.ts

lib/
├── supabase/
├── storage/
├── sync/
├── validation/
├── analytics/
└── ai-contracts/

supabase/
├── migrations/
└── functions/
    ├── process-voice/
    ├── process-image/
    └── semantic-search/
```

---

## 3. Database Conventions

All user-owned tables should use:

```sql
id uuid primary key default gen_random_uuid(),
user_id uuid not null references auth.users(id) on delete cascade,
created_at timestamptz not null default now(),
updated_at timestamptz not null default now()
```

Prefer database enums or CHECK constraints for stable domain statuses.

All foreign keys should be indexed where query patterns justify it.

All schema changes must be migration files.

---

## 4. Core Schema

### 4.1 `profiles`

Fields:
- `id` UUID, same value as auth user id or explicit user_id mapping
- display preferences
- locale
- timezone
- timestamps

### 4.2 `daily_pulse`

Fields:
- id
- user_id
- local_date
- mood_score 1–5
- mental_clarity 1–5
- energy_level 1–5
- sleep_hours
- sleep_quality
- exercise_done
- social_connection
- reflection_text
- trigger tags
- uplifter tags
- timestamps

Constraint:
- one daily pulse per user/local_date unless product later allows multiple check-ins.

### 4.3 `daily_goals`

Fields:
- id
- user_id
- local_date
- title
- status
- sort_order 0–2
- timestamps

Business rule:
- max 3 active anchor positions per day.
- enforce in application and, where practical, database constraints/transaction logic.

### 4.4 `knowledge_items`

Fields:
- id
- user_id
- type
- title
- creator/source
- status
- progress_percent
- metadata jsonb
- timestamps

### 4.5 `insights`

Fields:
- id
- user_id
- knowledge_item_id nullable
- text
- page_number nullable
- tags
- embedding vector(1536)
- embedding_status
- timestamps

Index:
- HNSW vector index using chosen vector distance operator.

### 4.6 `skills_progress`

Fields:
- id
- user_id
- skill_name
- baseline_level
- current_level
- evidence_links jsonb
- timestamps

### 4.7 `challenge_logs`

Fields:
- id
- user_id
- problem_statement
- action_plan
- status
- resolution_notes
- lessons_learned
- embedding vector(1536)
- timestamps

### 4.8 `decision_logs`

Fields:
- id
- user_id
- title
- context
- assumptions
- alternatives
- rationale
- expected_outcome
- review_due_at
- actual_outcome
- lessons_learned
- reviewed_at
- embedding nullable
- timestamps

### 4.9 `periodic_reviews`

Fields:
- id
- user_id
- review_type
- period_start
- period_end
- generated_summary
- user_reflection
- lessons
- embedding nullable
- timestamps

### 4.10 Capture processing records

Recommended dedicated table:

`capture_jobs`

Fields:
- id
- user_id
- capture_type: TEXT / VOICE / IMAGE
- storage_path nullable
- raw_text nullable
- processing_status
- classified_type nullable
- confidence nullable
- error_code nullable
- retry_count
- timestamps

Purpose:
- preserve source and processing state independently from final routed entity.

---

## 5. RLS Pattern

For every user-owned table:

```sql
alter table <table_name> enable row level security;
```

Typical ownership policies:

```sql
using (auth.uid() = user_id)
with check (auth.uid() = user_id)
```

Never rely on a client-supplied user ID for authorization.

Special SQL functions used for vector search must derive/verify authenticated identity.

Service-role operations must be limited to Edge Functions that genuinely require them.

---

## 6. Vector Search Functions

Conceptual signatures:

```sql
match_insights(
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)

match_challenges(
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
```

The authenticated user scope should be derived inside the database function or enforced through RLS/security-safe query design.

Do not expose a free-form `target_user_id` parameter that permits cross-user lookup.

Return:
- record id;
- text/summary fields needed for retrieval;
- similarity score;
- safe metadata.

---

## 7. Supabase Client

Suggested files:

```text
lib/supabase/client.ts
lib/supabase/types.ts
features/auth/useAuth.ts
```

Responsibilities:
- configure public URL/anon key;
- platform-appropriate session persistence;
- auth lifecycle;
- no service-role key;
- no AI provider secret.

---

## 8. Repository Contract

Example:

```ts
export interface DailyPulseRepository {
  getByDate(date: string): Promise<DailyPulse | null>;
  upsert(input: DailyPulseInput): Promise<DailyPulse>;
}
```

UI should consume domain hooks rather than call Supabase directly.

---

## 9. Local Storage Abstraction

Interface:

```ts
export interface KeyValueStore {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T): Promise<void>;
  remove(key: string): Promise<void>;
}
```

Adapters:
- native secure/fast adapter as appropriate for data type;
- web adapter;
- auth token/session handling may use a stricter adapter than ordinary non-sensitive cache.

Do not treat every cached value as equivalent from a security perspective.

---

## 10. Pending Mutation Queue

Conceptual type:

```ts
type PendingMutation = {
  id: string;
  entityType: string;
  entityId: string;
  operation: 'CREATE' | 'UPDATE' | 'DELETE';
  payload: unknown;
  createdAt: string;
  retryCount: number;
  status: 'PENDING' | 'SYNCING' | 'FAILED';
};
```

Rules:
- optimistic UI first;
- persist queue before considering action durable offline;
- idempotency key = mutation id where useful;
- exponential retry/backoff;
- avoid duplicate side effects.

---

## 11. AI Service Contracts

Server-side interface:

```ts
interface AIService {
  transcribe(input: AudioInput): Promise<Transcript>;
  classifyCapture(input: string): Promise<Classification>;
  extractStructuredData<T>(schema: Schema<T>, input: string): Promise<T>;
  embed(text: string): Promise<number[]>;
  synthesizeGroundedAnswer(input: RagContext): Promise<RagAnswer>;
}
```

Structured outputs must be schema-validated before persistence.

Model identifiers are environment configuration.

---

## 12. Voice Processing Flow

1. Client creates `capture_job`.
2. Client uploads audio to private user-scoped storage.
3. Client invokes `process-voice`.
4. Edge Function validates JWT.
5. Function derives authenticated user id.
6. Function verifies storage ownership/path.
7. Audio is transcribed.
8. Transcript is classified/extracted.
9. Structured result is schema-validated.
10. Embedding is generated if relevant.
11. Final entity is persisted.
12. `capture_job` becomes COMPLETED.
13. On failure, source remains and job becomes FAILED/RETRYABLE.

---

## 13. Image/OCR Flow

Same security and job-state principles as voice.

Validation:
- allowed content type;
- maximum file size;
- ownership/path;
- no implicit trust in filename or client metadata.

---

## 14. Semantic Search Flow

1. Authenticated user submits query.
2. Edge Function validates request.
3. Query embedding generated.
4. User-scoped vector functions retrieve Top-K.
5. Context payload is minimized to relevant records.
6. LLM synthesizes answer.
7. Response contains source record IDs/references.
8. Client can navigate to source records.

---

## 15. Analytics Implementation

First version:
- SQL aggregation/RPC or client-side transformation for modest datasets;
- avoid sending raw personal history to an LLM merely to compute averages/correlations;
- statistical language should include sample size where useful.

Example result contract:

```ts
type AssociationInsight = {
  metricA: string;
  metricB: string;
  baselineAverage: number;
  comparisonAverage: number;
  percentageDifference: number;
  sampleSize: number;
};
```

---

## 16. Validation

Use shared runtime schemas for:
- forms;
- Edge Function request payloads;
- AI structured output;
- critical DB-bound domain objects.

Never assume TypeScript compile-time typing validates network input.

---

## 17. Error Model

Recommended application error classes/codes:

- AUTH_REQUIRED
- FORBIDDEN
- VALIDATION_FAILED
- NETWORK_UNAVAILABLE
- STORAGE_UPLOAD_FAILED
- AI_TRANSCRIPTION_FAILED
- AI_CLASSIFICATION_FAILED
- EMBEDDING_FAILED
- SYNC_FAILED
- UNKNOWN

User-facing messages should avoid exposing internal secrets, SQL details or stack traces.

---

## 18. Environment Configuration

### Local
`.env.local` or Expo-compatible local configuration; never committed.

### Test
Vercel Test environment variables + EAS preview variables + Supabase Test secrets.

### Production
Vercel Production environment variables + EAS production variables + Supabase Production secrets.

Client-safe values:
- public Supabase URL;
- public/anon publishable key as appropriate.

Server-only:
- AI API keys;
- Supabase service role;
- privileged webhook/signing secrets.

---

## 19. CI / Quality Gates

For pull requests:
- install dependencies;
- lint;
- typecheck;
- unit tests;
- selected integration tests;
- secret scan/dependency checks as configured;
- build validation where practical.

For Test promotion:
- migrations apply cleanly to Test;
- Web Test deployment succeeds;
- required EAS preview build passes;
- QA executes relevant acceptance criteria.

For Production:
- approved PR;
- required Security FE/BE PASS;
- QA PASS;
- no unresolved CRITICAL/HIGH security blocker;
- migrations applied through controlled pipeline;
- deploy from `main`.

---

## 20. Ticket-Level Design Rule

LLD is the baseline, not a reason to make every ticket enormous.

A ticket that changes:
- cross-domain architecture;
- DB ownership model;
- auth model;
- sync strategy;
- AI security boundary;
- deployment strategy

must create/update an ADR before implementation proceeds.
