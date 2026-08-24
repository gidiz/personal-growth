# PRD — Personal Growth, Mental Health & Retrospective OS

## 1. Product vision

A unified, low-friction personal growth system that combines daily execution, emotional and physical baseline tracking, long-term learning capture, challenge/problem reflection, decision journaling, multimodal capture, and AI-assisted retrieval and retrospectives.

The product should help a user answer not only “what do I need to do today?” but also what patterns affect mood/energy, what was learned, what worked previously, which decisions were good in hindsight, and whether meaningful progress is happening.

## 2. Core user problems

Today these needs are often fragmented across task managers, notes, mood trackers, book highlights, flashcard apps, journals, voice notes, and spreadsheets. Fragmentation creates friction and prevents long-term pattern recognition.

## 3. Product principles

1. Capture must be fast.
2. Personal data is private by default.
3. Reflection should be structured but lightweight.
4. AI should assist organization and retrieval, not become the source of truth.
5. The system should work well on Web, iOS, and Android.
6. Hebrew RTL and English LTR must be first-class.
7. The app must remain useful even when AI features are unavailable.
8. AI classifications must remain reviewable and correctable by the user.
9. Trend reporting must use observational language; association must not be presented as causation.

## 4. MVP functional areas

### A. Daily Pulse
Track mood 1–5, mental clarity 1–5, energy 1–5, sleep hours, sleep quality, exercise, social connection, negative triggers, uplifters, and end-of-day reflection.

### B. Anchor Goals
Up to three meaningful daily goals with: TODO, IN_PROGRESS, DONE, CANCELLED.

### C. Knowledge Hub
Books, courses, podcasts, and articles. Track progress, status, takeaways, page/source metadata, tags, and spaced-repetition candidates.

### D. Skills
Track baseline level 1–10, current level 1–10, and proof-of-work links.

### E. Challenges
Record problem statement, action plan, status, resolution, and lessons learned.

Statuses: OPEN, TESTING_SOLUTION, RESOLVED, STALLED.

### F. Decision Journal
Record decision, rationale, assumptions, expected outcome, review date, and actual outcome.

### G. Quick Capture
Support text, voice, and camera/OCR.

AI may route captures into:
- GOAL
- MOOD_LOG
- INSIGHT
- CHALLENGE
- DECISION

Routing requirements:
- routing must be reversible/correctable
- low-confidence classifications require user confirmation before final structured persistence
- failed processing must preserve the original capture when safe to do so
- classification confidence must be available to the routing workflow
- AI routing never silently discards the user's source input

### H. Trends
Examples: mood vs sleep, mood vs exercise, completion rate vs energy, weekly/monthly retrospectives.

Trend language must describe observed associations, not causal claims. Where sample size or evidence is weak, the UI should say so rather than overstate a pattern.

### I. Semantic Brain Search
Natural-language questions over user-owned Personal Memory.

Initial retrieval corpus:
- insights
- resolved challenge lessons
- reviewed decisions
- periodic reviews

Example: “What helped me last time I felt overwhelmed and stuck?”

## 5. Non-goals for early MVP

- social network
- clinician-facing diagnosis
- medical decision support
- causal health conclusions from personal correlations
- public sharing
- complex team collaboration
- autonomous production changes by AI agents

## 6. Success criteria for first usable release

A user can authenticate, complete a Daily Pulse, manage up to three daily goals, save knowledge items and insights, log a challenge or decision, find prior Personal Memory semantically, view at least one useful observational trend, complete a weekly review, and use the experience on Web and at least one mobile platform.
