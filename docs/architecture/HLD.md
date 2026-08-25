# HLD — High-Level Design

## 1. System context

```text
Web / iOS / Android
       |
       v
Expo + React Native + Expo Router
       |
       +----------------------+
       |                      |
       v                      v
Supabase Client          Edge / AI flows
       |                      |
       v                      v
Auth + Postgres +        Supabase Edge Functions
Storage + Realtime              |
       |                        v
       |                  AI Provider Adapters
       |                        |
       +------------+-----------+
                    |
                    v
                  Data
                    |
                    v
             pgvector / RAG
```

## 2. Technology stack

### Client
Expo, Expo Router, React Native, TypeScript, NativeWind, TanStack Query, MMKV native cache, and LocalStorage web fallback.

### Backend platform
Supabase PostgreSQL, Auth, Storage, Edge Functions, and pgvector.

### AI
Provider-agnostic adapters for speech transcription, OCR/vision extraction, structured entity extraction/routing, embeddings, and RAG synthesis.

Concrete provider/model choices are implementation decisions unless accepted by ADR.

## 3. Environments

### Local
Developer machine and local tooling.

### Test
- Supabase: `personal-growth-test`
- MCP writes permitted with least privilege
- future Vercel preview/test
- future EAS preview

### Production
- separate Supabase project
- future Vercel production
- future EAS production
- no autonomous agent direct DB writes

Production Supabase is currently deferred because of plan limits; architecture remains environment-separated.

## 4. Branch/environment mapping

- `feature/*`, `task/*`, `bugfix/*`, `security/*` -> development work
- `develop` -> integration/Test
- `main` -> production-oriented release branch

## 5. Deployment

### Web
Vercel after Expo Web scaffold exists.

### Mobile
EAS after Expo scaffold exists.

## 6. Data security

- user-owned tables include `user_id`, except explicit identity tables documented as exceptions
- `profiles` is a 1:1 identity extension where `profiles.id = auth.users.id`
- RLS on private data
- `auth.uid() = user_id` pattern unless a more specific documented policy applies
- service-role credentials never ship to clients
- secrets live in platform secret stores

## 7. AI / RAG

RAG remains an owned capability rather than outsourcing core retrieval to NotebookLM.

Initial Personal Memory embedding/retrieval corpus:
- insights
- challenge lessons
- reviewed decisions
- periodic reviews

Embedding records must retain model/version lifecycle metadata so vectors can be re-embedded safely when providers/models change.

## 8. Quick Capture processing boundary

```text
Text / Voice / Camera
        |
        v
Capture Job
        |
        +--> transcription adapter
        +--> OCR / vision adapter
        |
        v
Structured extraction + confidence
        |
        +--> high confidence -> candidate entity
        +--> low confidence -> user confirmation
        |
        v
Validated persistence
```

Source capture is preserved according to retention/privacy policy until processing is safely complete.

## 9. Development control plane

```text
PRD/HLD/LLD/ADRs
       |
       v
Planner Agent
       |
       v
GitHub Issues + Project
       |
       v
Implementation Agents
       |
       +--> GitHub MCP
       +--> Supabase MCP (Test)
       +--> Playwright MCP
       |
       v
PR -> Review -> Security -> QA -> Merge
```

MCP provides controlled tool access; repository rules and tickets remain authoritative.
