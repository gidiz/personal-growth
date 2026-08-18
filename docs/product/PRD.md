# PRD — Personal Growth, Mental Health & Retrospective OS

**Status:** Draft v1.0  
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

---

## 2. Problem Statement

Useful personal information is fragmented and frequently lost:

- tasks and goals live in task apps;
- reflections live in notes;
- learning lives in books, courses, screenshots and highlights;
- important decisions are rarely reviewed against their original assumptions;
- emotional and physical patterns are usually remembered inaccurately;
- past solutions are difficult to retrieve at the moment they become useful.

Even when this information is recorded, it is rarely structured or resurfaced at the right time.

The system will provide one private, searchable personal memory layer that turns lightweight daily capture into long-term insight.

---

## 3. Target User

Initial target user:

- wants to improve personal effectiveness and self-awareness;
- consumes books, courses, podcasts or articles;
- manages personal or professional goals;
- wants a low-friction system rather than a complex life-tracking spreadsheet;
- is comfortable with AI-assisted organization but must remain in control of the data and classifications.

The first version is a single-user-per-account product. No collaboration or social features are required for MVP.

---

## 4. Product Principles

### 4.1 Low Friction
Daily use should require minimal effort. The typical Daily Pulse should be completable in under 30 seconds.

### 4.2 AI Organizes; User Owns
AI may classify, extract, summarize and retrieve. The user can always inspect and correct AI-generated classifications.

### 4.3 Progressive Value
Day 1 provides capture. Weeks provide trends. Months provide personal historical context.

### 4.4 Evidence Before Claims
Analytics must describe associations rather than imply causation.

### 4.5 Privacy by Design
The system may contain highly personal information. Access control, data minimization and secret isolation are first-class requirements.

### 4.6 Local Responsiveness
Common interactions should feel immediate even when network latency exists.

---

## 5. Core Product Loop

### Daily loop

1. Select up to three Anchor Goals.
2. Capture thoughts, insights or problems during the day through text, voice or camera.
3. Complete a short Daily Pulse.
4. Optionally leave an end-of-day reflection.
5. System organizes and stores the information.

### Periodic loop

1. Surface historical trends and previously captured insights.
2. Review open challenges and decisions due for review.
3. Complete guided weekly/monthly retrospective.
4. Save lessons back into personal memory.
5. Reuse those lessons in future search and recommendations.

---

## 6. Functional Scope

### 6.1 Daily Pulse & Baseline

Capture:

- `mood_score`: 1–5
- `mental_clarity`: 1–5
- `energy_level`: 1–5
- `sleep_hours`
- `sleep_quality`: POOR / FAIR / GOOD / EXCELLENT
- `exercise_done`
- `social_connection`
- negative trigger tags
- uplifting/relief tags
- short reflection text or audio

### 6.2 Anchor Goals

A maximum of three primary daily goals.

Statuses:

- TODO
- IN_PROGRESS
- DONE
- CANCELLED

### 6.3 Knowledge Hub

Knowledge item types:

- Book
- Course
- Podcast
- Article

Capabilities:

- progress 0–100%;
- reading/learning status;
- text insights and quotes;
- source metadata and page number;
- camera/OCR capture;
- tags;
- semantic embedding;
- resurfacing / spaced repetition.

### 6.4 Skills Progress

Track:

- skill name;
- baseline level 1–10;
- current level 1–10;
- evidence / proof-of-work links.

Advanced competency frameworks are out of MVP scope.

### 6.5 Challenge Journal

Each challenge contains:

- problem statement;
- context;
- current action plan;
- status;
- resolution notes;
- lessons learned.

Statuses:

- OPEN
- TESTING_SOLUTION
- RESOLVED
- STALLED

Resolved challenges become part of searchable personal memory.

### 6.6 Decision Journal

Each decision contains:

- title;
- context;
- alternatives;
- assumptions;
- rationale;
- expected outcome;
- review due date;
- actual outcome;
- lessons learned.

The key behavior is delayed comparison between expectation and reality.

### 6.7 Zero-Friction Capture

Global Quick Capture supports:

- text;
- voice;
- camera/book image.

AI-assisted processing can classify into:

- GOAL
- MOOD_LOG
- INSIGHT
- CHALLENGE
- DECISION

The user can undo or change the destination.

Low-confidence classification should request user confirmation rather than silently route.

### 6.8 Trends

Initial relationships:

- mood vs sleep;
- mood vs exercise;
- energy vs goal completion;
- mental clarity vs sleep;
- social connection vs mood.

Wording must remain observational, e.g.:

> “On days where exercise was recorded, average mood was higher.”

Not:

> “Exercise caused your mood to improve.”

### 6.9 Retrospectives

Supported:

- weekly;
- monthly;
- quarterly later.

Weekly review should surface:

- completed goals;
- average mood / energy;
- common triggers;
- common uplifters;
- new insights;
- unresolved challenges;
- decisions due for review.

Guided questions:

- What worked?
- What drained you?
- What should you repeat?
- What should you change?

### 6.10 Semantic Brain Search

Natural-language queries across high-value personal memory.

Examples:

- “What helped me last time I felt stuck?”
- “What did I learn about system design?”
- “Which assumptions in past decisions were wrong?”

Results should link back to underlying records where possible.

---

## 7. MVP

### Included

- Authentication
- Daily Pulse
- Three Anchor Goals
- Text capture
- Voice capture
- Insights
- Challenges
- Basic Decision Journal
- Weekly Review
- Basic Trends
- Semantic Search
- Test and Production environments

### Deferred

- sophisticated spaced-repetition algorithms;
- advanced skill matrix;
- predictive recommendations;
- complex analytics dashboards;
- multi-user collaboration;
- advanced offline merge/conflict algorithms;
- broad social features.

---

## 8. User Stories

### US-001 Daily Pulse
As a user, I want to record my daily state quickly so the system can identify longitudinal patterns without becoming a burden.

### US-002 Anchor Goals
As a user, I want to choose up to three important goals so I can focus on what matters today.

### US-003 Voice Capture
As a user, I want to speak a thought without choosing a destination first so the system can organize it for me.

### US-004 Insight Capture
As a user, I want to save useful knowledge with its source so it can be resurfaced later.

### US-005 Challenge Reuse
As a user, I want to find similar past challenges so I can reuse what worked before.

### US-006 Decision Review
As a user, I want to revisit decisions after enough time has passed so I can compare assumptions against reality.

### US-007 Weekly Review
As a user, I want a concise weekly summary so I can notice patterns and deliberately adjust the following week.

### US-008 Brain Search
As a user, I want to ask natural-language questions about my own history and receive grounded answers linked to my records.

---

## 9. Non-Functional Requirements

### Performance
- optimistic/local updates for common interactions;
- avoid blocking routine UI actions on AI processing;
- lazy-load expensive analytics where practical.

### Reliability
- user capture must not disappear because AI processing fails;
- failed processing must retain retryable source data/status;
- migrations are version-controlled.

### Security
- strict Row Level Security on all user-owned Supabase tables;
- client is untrusted;
- no OpenAI secret or Supabase service-role credential in client code;
- sensitive content should not be unnecessarily logged;
- file uploads must be validated server-side.

### Accessibility
- keyboard-accessible Web UI;
- accessible labels and controls;
- RTL Hebrew and LTR English support.

### Portability
- shared application code across Web/iOS/Android where reasonable;
- platform adapters permitted for storage and native capabilities.

---

## 10. Product Success Metrics

Initial product metrics:

- Daily Pulse completion rate;
- median Daily Pulse completion time;
- number of captures per active week;
- percentage of AI-routed captures corrected by user;
- weekly retrospective completion rate;
- semantic search result usefulness feedback;
- percentage of active users who revisit historical content.

North-star qualitative outcome:

> “The system remembered something from my past that was useful to me right now.”

---

## 11. Release Phases

### Phase 1 — Foundation
Authentication, schema, RLS, pgvector, base client/repository structure.

### Phase 2 — Application Shell
Navigation, RTL/LTR, NativeWind, UI primitives, loading/error states.

### Phase 3 — Daily Core Loop
Daily Pulse, Anchor Goals, reflection, optimistic/local persistence.

### Phase 4 — Personal Memory
Knowledge, Insights, Challenges, Decisions.

### Phase 5 — Zero-Friction Capture
Voice, camera/OCR, AI classification, embeddings.

### Phase 6 — Personal Intelligence
Trends, retrospectives, semantic search, RAG synthesis.

---

## 12. Product Definition of Done

A feature is product-complete only when:

- acceptance criteria are satisfied;
- expected error states are covered;
- required accessibility behavior works;
- Hebrew RTL and English LTR impact has been considered;
- analytics/security implications were reviewed where applicable;
- it passes the engineering delivery process defined in `docs/engineering/DEVELOPMENT_PROCESS.md`.
