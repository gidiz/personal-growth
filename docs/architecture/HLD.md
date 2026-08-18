# HLD — Personal Growth, Mental Health & Retrospective OS

**Status:** Draft v1.0  
**Scope:** High-level system architecture

---

## 1. Architecture Goals

The architecture must support:

- Web, iOS and Android from one Expo/React Native codebase;
- low-latency local-first user interactions;
- secure multi-tenant data isolation;
- server-side AI processing;
- semantic retrieval using PostgreSQL + pgvector;
- separate Test and Production environments;
- incremental, ticket-based delivery by specialized Copilot agents.

---

## 2. System Context

```text
┌──────────────────────────────────────────────┐
│               Expo Application              │
│        Web / iOS / Android / TypeScript     │
└──────────────────────┬───────────────────────┘
                       │
            Authenticated Supabase calls
                       │
             ┌─────────▼─────────┐
             │     Supabase      │
             │ Auth / Postgres   │
             │ Storage / RLS     │
             │ Edge Functions    │
             │ pgvector          │
             └─────────┬─────────┘
                       │ server-side only
                       ▼
             ┌───────────────────┐
             │    AI Provider    │
             │ transcription     │
             │ structured output │
             │ vision / OCR      │
             │ embeddings / RAG  │
             └───────────────────┘
```

The client never calls privileged AI or service-role APIs directly.

---

## 3. Major Domains

### Daily OS
Daily Pulse, baseline signals, Anchor Goals, end-of-day reflection.

### Knowledge OS
Knowledge items, insights, quotes, source metadata, skill progress and resurfacing.

### Challenge OS
Problem statements, experiments/action plans, resolutions and lessons.

### Decision OS
Assumptions, rationale, expected outcome, review dates and actual outcomes.

### Capture OS
Text, voice and camera capture with server-side classification and extraction.

### Personal Intelligence OS
Deterministic analytics, retrospectives, embeddings, semantic retrieval and grounded AI synthesis.

---

## 4. Client Architecture

Layered design:

```text
UI / Routes / Components
          │
          ▼
Feature & Domain Hooks
          │
          ▼
Repository / Service Layer
      ┌───┴────┐
      ▼        ▼
Local Store   Supabase
```

Rules:

- UI components do not own persistence logic.
- Supabase calls are centralized in repository/service modules.
- platform-specific local storage is hidden behind adapters.
- TanStack Query manages remote query/mutation lifecycle.
- local-first behavior is a domain concern, not ad-hoc component state.

---

## 5. Local-First Strategy

“Local-first” means user actions update local state immediately and synchronize remotely afterward.

```text
User action
   │
   ▼
Local optimistic update
   │
   ▼
Persist pending mutation
   │
   ▼
Attempt remote sync
   ├── Success → mark synced
   └── Failure → retry / surface state
```

Initial conflict policy:

- server timestamps + client mutation IDs;
- Last-Write-Wins for simple single-user records;
- no complex CRDT/merge framework in MVP;
- conflict strategy can be upgraded only when real usage demonstrates need.

Potential mutation status values:

- PENDING
- SYNCING
- SYNCED
- FAILED

---

## 6. Backend Architecture

Supabase responsibilities:

- authentication;
- PostgreSQL database;
- Row Level Security;
- storage for audio/images;
- Edge Functions;
- pgvector;
- database migrations.

Every user-owned row carries `user_id`.

RLS policies enforce ownership using authenticated identity.

Client-side filtering is not security.

---

## 7. AI Boundary

All privileged AI operations execute server-side.

```text
Client
  │ Supabase JWT
  ▼
Edge Function
  │
  ├─ authenticate
  ├─ validate request
  ├─ derive user identity
  ├─ enforce ownership
  ├─ call AI provider
  ├─ validate structured output
  └─ persist result
```

AI capabilities are exposed behind application-level abstractions:

- `transcribe()`
- `extractStructuredData()`
- `classifyCapture()`
- `embed()`
- `synthesizeGroundedAnswer()`

Specific model identifiers should be configuration rather than embedded architecture assumptions.

---

## 8. Semantic Memory / RAG

Initial vectorized content:

- insights;
- resolved challenges;
- reviewed decisions;
- periodic reviews.

Flow:

```text
User question
     │
     ▼
Query embedding
     │
     ▼
User-scoped pgvector search
     │
     ▼
Top-K authorized records
     │
     ▼
Grounded synthesis
     │
     ▼
Answer + source record references
```

The database is the system of record. The LLM is not treated as permanent memory.

---

## 9. Analytics

Initial analytics are deterministic SQL/TypeScript calculations rather than free-form LLM inference.

Examples:

- average mood on exercise vs non-exercise days;
- sleep vs mood;
- sleep vs energy;
- goal completion vs energy;
- social connection vs mood.

Correlations are described as associations, not causal conclusions.

---

## 10. Deployment Topology

### Local Development

```text
Developer machine
├── Expo development build / Web dev server
├── local Supabase where practical
├── migration files
└── local non-production environment variables
```

### Test

```text
GitHub develop / approved integration branch
├── Web → Vercel Test deployment
├── iOS/Android → EAS preview/test builds
└── Backend → dedicated Supabase Test project
```

### Production

```text
GitHub main
├── Web → Vercel Production deployment
├── iOS/Android → EAS production build / store distribution
└── Backend → dedicated Supabase Production project
```

Test and Production use different Supabase projects and credentials.

Production secrets are never used in Test.

---

## 11. Environment Strategy

Required environments:

| Environment | Web | Mobile | Backend |
|---|---|---|---|
| Local | Expo local | Expo dev build | Local/dev Supabase |
| Test | Vercel Test | EAS Preview | Supabase Test |
| Production | Vercel Production | EAS Production | Supabase Production |

Public client variables may include environment-specific Supabase public URL/key values.

Privileged keys exist only in secure server-side/environment secret stores.

---

## 12. Source Control & Release Flow

Recommended baseline:

```text
feature/*
    │
    ▼
Pull Request
    │
    ▼
develop
    │
    ▼
Test environment
    │
    ▼
QA + required Security gates
    │
    ▼
PR to main
    │
    ▼
Production
```

Vercel may additionally provide isolated preview deployments for pull requests.

Production releases require passing the delivery gates in `DEVELOPMENT_PROCESS.md`.

---

## 13. Security Architecture

Key controls:

- strict RLS;
- user identity derived from authenticated session, not trusted request payload;
- server-side secrets;
- minimal privileged surface;
- validation of AI structured output;
- server-side file validation;
- no unnecessary sensitive logging;
- signed/authorized access to private storage;
- semantic search always user-scoped;
- no service-role credentials in client.

Two independent security review responsibilities exist:

- Frontend Security Agent;
- Backend Security Agent.

Their process is defined outside this HLD in engineering governance documents.

---

## 14. Reliability

Rules:

- capture source is preserved when downstream AI fails;
- processing states are explicit;
- retryable failures remain retryable;
- AI is treated as fallible;
- DB schema changes are migration-driven;
- Production schema is never changed manually as an undocumented shortcut.

---

## 15. Observability

Server-side structured logs should include operational metadata such as:

- request ID;
- function/operation;
- duration;
- outcome/error code;
- AI provider/model identifier where useful;
- token/usage metadata when available.

Sensitive journal/capture content should not be copied into logs unless strictly required.

---

## 16. High-Level Repository Structure

```text
app/
components/
features/
hooks/
lib/
repositories/
supabase/
  migrations/
  functions/

docs/
  product/
  architecture/
  adr/
  engineering/

.github/
  agents/
  instructions/
  prompts/
  ISSUE_TEMPLATE/
```

---

## 17. Engineering Governance

Development is PRD-driven and ticket-based.

Sources of truth:

- Product requirements: `docs/product/PRD.md`
- High-level architecture: `docs/architecture/HLD.md`
- Detailed design: `docs/architecture/LLD.md`
- Architecture decisions: `docs/adr/`
- Delivery process: `docs/engineering/DEVELOPMENT_PROCESS.md`
- Work tracking: GitHub Issues + GitHub Projects
- Agent definitions: `.github/agents/`

Production changes should originate from an approved ticket and pass required review, security and QA gates.

Agent prompts and ticket lifecycle rules are intentionally not duplicated in this HLD.
