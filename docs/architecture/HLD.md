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
       |                  OpenAI APIs
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
- Expo
- Expo Router
- React Native
- TypeScript
- NativeWind
- TanStack Query
- MMKV native cache
- LocalStorage web fallback

### Backend platform
- Supabase PostgreSQL
- Supabase Auth
- Supabase Storage
- Supabase Edge Functions
- pgvector

### AI
- speech transcription
- structured entity extraction/routing
- embeddings
- RAG synthesis

Model names are implementation details and may evolve; keep them behind adapters.

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

- feature/task/bug/security branches -> development work
- `develop` -> integration/Test
- `main` -> production-oriented release branch

## 5. Deployment

### Web
Vercel after Expo Web scaffold exists.

### Mobile
EAS after Expo scaffold exists.

## 6. Data security

- user-owned tables include `user_id`
- RLS on private data
- `auth.uid() = user_id` pattern unless a more specific policy is required
- service-role credentials never ship to clients
- secrets live in platform secret stores

## 7. AI / RAG

RAG remains an owned capability rather than outsourcing core retrieval to NotebookLM.

Embedding targets initially include:
- insights
- challenge logs
- selected decision/review content

Use pgvector similarity functions and synthesized responses.

## 8. Development control plane

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
