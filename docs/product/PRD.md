# PRD — Personal Growth, Mental Health & Retrospective OS

**Status:** Draft v1.1
**Owner:** Product
**Product type:** Cross-platform personal intelligence / retrospective system
**Platforms:** Web, iOS, Android

---

## 1. Product Vision

Build a personal operating system that helps a user capture what happens in daily life, preserve useful knowledge and decisions, identify patterns over time, and reuse past experience when it becomes relevant.

The product is not primarily a task manager, journal, mood tracker, or knowledge base. Those are modules inside a larger system.

The core value proposition is:

> **Capture → Remember → Connect → Reflect → Learn → Act**

The product succeeds when the value returned to the user becomes substantially greater than the effort required to feed the system.

## 2. Product Principles

### Low Friction
Daily use should require minimal effort. The typical Daily Pulse should be completable in under 30 seconds.

### AI Organizes; User Owns
AI may classify, extract, summarize and retrieve. The user can inspect, undo and correct AI-generated classifications. Low-confidence routing requires confirmation.

### Evidence Before Claims
Analytics describe associations rather than imply causation.

### Privacy by Design
Access control, data minimization and secret isolation are first-class requirements.

### Local Responsiveness
Common interactions should feel immediate even when network latency exists.

### Accessibility
Core Web flows must be keyboard accessible, controls must have accessible labels/semantics, meaning must not rely on color alone, and Hebrew RTL / English LTR are first-class.

## 3. Core Product Loop

### Daily
1. Select up to three Anchor Goals.
2. Capture thoughts, insights or problems using text, voice or camera.
3. Complete a short Daily Pulse.
4. Optionally leave an end-of-day reflection.
5. System organizes and stores the information without silently discarding source capture.

### Periodic
1. Surface trends and historical insights.
2. Review open challenges and decisions due for review.
3. Complete guided weekly/monthly retrospective.
4. Save lessons into Personal Memory.
5. Reuse lessons in future semantic search.

## 4. Functional Scope

### Daily Pulse
- mood score 1–5
- mental clarity 1–5
- energy 1–5
- sleep hours
- sleep quality: POOR / FAIR / GOOD / EXCELLENT
- exercise
- social connection
- negative triggers
- uplifters
- reflection text/audio

### Anchor Goals
Maximum three daily goals.
Statuses: TODO / IN_PROGRESS / DONE / CANCELLED.

### Knowledge Hub
Book / Course / Podcast / Article with progress, status, insights/quotes, source metadata/page, camera/OCR capture, tags, embeddings and resurfacing.

### Skills
Skill name, baseline/current level 1–10 and proof-of-work links.

### Challenges
Problem/context/action plan/status/resolution/lessons.
Statuses: OPEN / TESTING_SOLUTION / RESOLVED / STALLED.
Resolved challenges enter Personal Memory.

### Decision Journal
Title/context/alternatives/assumptions/rationale/expected outcome/review due date/actual outcome/lessons.
Reviewed decisions enter Personal Memory.

### Quick Capture
Text / voice / camera-book image.
AI routes to GOAL / DAILY_PULSE / INSIGHT / CHALLENGE / DECISION.
`DAILY_PULSE` targets the existing Daily Pulse record for the capture's day. There is no separate mood-log entity.
Routing is reversible/correctable. Low-confidence routing requires confirmation.
A capture routed to `DAILY_PULSE` may propose or prefill values, but must never silently overwrite a mood, mental clarity, energy or other structured value the user already entered. Any proposed change that would overwrite existing structured user input requires explicit user confirmation.
AI-processing failure must preserve retryable source data/status.

### Trends
Initial associations include mood/sleep, mood/exercise, energy/goal completion, clarity/sleep and social connection/mood.
Wording is observational, not causal, and weak evidence/sample sizes must be communicated.

### Retrospectives
Weekly and monthly in MVP; quarterly later.
Surface completed goals, mood/energy, triggers/uplifters, insights, unresolved challenges and decisions due for review.

### Semantic Brain Search
Natural-language queries over user-owned Personal Memory:
- insights
- resolved challenge lessons
- reviewed decisions
- periodic reviews

Results should link to underlying records and communicate uncertainty when evidence is weak.

## 5. MVP

Included:
- Authentication
- Daily Pulse
- Three Anchor Goals
- Text/voice capture
- camera/OCR capture path
- Insights
- Challenges
- Basic Decision Journal
- Weekly Review
- Basic Trends
- Semantic Search
- Local/Test/Production architecture (Production provisioning may be deferred operationally)

Deferred:
- sophisticated spaced repetition
- advanced skill matrix
- predictive recommendations
- complex analytics dashboards
- multi-user collaboration
- advanced offline merge/conflict algorithms
- broad social features

## 6. Non-Functional Requirements

### Performance
- optimistic/local updates for common interactions
- avoid blocking routine UI actions on AI processing
- lazy-load expensive analytics where practical

### Reliability
- user capture must not disappear because AI processing fails
- failed processing retains retryable source data/status
- migrations are version controlled
- retry loops are bounded

### Security
- strict RLS on user-owned Supabase data
- client is untrusted
- caller-supplied `user_id` is never authorization
- no AI provider secret or Supabase service-role credential in client code
- sensitive content is not unnecessarily logged
- uploads are validated server-side

### Accessibility
- keyboard-accessible Web UI
- accessible labels, roles and controls
- visible focus
- no color-only semantics
- RTL Hebrew and LTR English support

### Portability
- shared application code across Web/iOS/Android where reasonable
- platform adapters for storage/native capabilities

## 7. Product Success Metrics

- Daily Pulse completion rate
- median Daily Pulse completion time
- captures per active week
- percentage of AI-routed captures corrected by the user
- weekly retrospective completion rate
- semantic search usefulness feedback
- percentage of active users revisiting historical content

North-star qualitative outcome:

> “The system remembered something from my past that was useful to me right now.”

## 8. Release Phases

1. Foundation — Auth/schema/RLS/pgvector/base client structure
2. Application Shell — navigation, RTL/LTR, NativeWind, UI primitives, loading/error states
3. Daily Core Loop — Daily Pulse, Anchor Goals, reflection, optimistic/local persistence
4. Personal Memory — Knowledge, Insights, Challenges, Decisions
5. Zero-Friction Capture — voice, camera/OCR, AI classification, embeddings
6. Personal Intelligence — Trends, retrospectives, semantic search, RAG synthesis

## 9. Product Definition of Done

A feature is product-complete only when:
- acceptance criteria are satisfied
- expected error/failure states are covered
- required accessibility behavior works
- Hebrew RTL and English LTR impact has been considered
- privacy/security implications were reviewed where applicable
- AI/source-data failure behavior preserves user input where applicable
- analytics wording does not overclaim causation
- it passes the engineering Definition of Done in `docs/engineering/DEVELOPMENT_PROCESS.md`
