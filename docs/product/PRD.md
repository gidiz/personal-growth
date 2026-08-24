# PRD — Personal Growth, Mental Health & Retrospective OS

## 1. Product vision

A unified, low-friction personal growth system that combines:
- daily execution and goals
- emotional and physical baseline tracking
- long-term learning capture
- challenge/problem reflection
- decision journaling
- multimodal capture
- AI-assisted retrieval and retrospectives

The product should help a user answer not only "what do I need to do today?" but also:
- "what patterns affect my mood and energy?"
- "what did I learn?"
- "what worked the last time I faced this?"
- "which decisions were good in hindsight?"
- "am I actually progressing?"

## 2. Core user problems

Today these needs are often fragmented across:
- task managers
- notes
- mood trackers
- book highlights
- flashcard apps
- journals
- voice notes
- spreadsheets

Fragmentation creates friction and prevents long-term pattern recognition.

## 3. Product principles

1. Capture must be fast.
2. Personal data is private by default.
3. Reflection should be structured but lightweight.
4. AI should assist organization and retrieval, not become the source of truth.
5. The system should work well on Web, iOS, and Android.
6. Hebrew RTL and English LTR must be first-class.
7. The app must remain useful even when AI features are unavailable.

## 4. MVP functional areas

### A. Daily Pulse
Track:
- mood score 1–5
- mental clarity 1–5
- energy 1–5
- sleep hours
- sleep quality
- exercise
- social connection
- negative triggers
- uplifters
- end-of-day reflection

### B. Anchor Goals
Up to three meaningful daily goals with:
- TODO
- IN_PROGRESS
- DONE
- CANCELLED

### C. Knowledge Hub
Items:
- books
- courses
- podcasts
- articles

Track:
- progress
- status
- takeaways
- page/source metadata
- tags
- spaced repetition candidates

### D. Skills
Track:
- baseline level 1–10
- current level 1–10
- proof-of-work links

### E. Challenges
Record:
- problem statement
- action plan
- status
- resolution
- lessons learned

Statuses:
- OPEN
- TESTING_SOLUTION
- RESOLVED
- STALLED

### F. Decision Journal
Record:
- decision
- rationale
- assumptions
- expected outcome
- review date
- actual outcome

### G. Quick Capture
Support:
- text
- voice
- camera/OCR

AI may route captures into:
- GOAL
- MOOD_LOG
- INSIGHT
- CHALLENGE

### H. Trends
Examples:
- mood vs sleep
- mood vs exercise
- completion rate vs energy
- weekly/monthly retrospectives

### I. Semantic Brain Search
Natural-language questions over user-owned knowledge and resolved experiences.

Example:
"What helped me last time I felt overwhelmed and stuck?"

## 5. Non-goals for early MVP

- social network
- clinician-facing diagnosis
- medical decision support
- public sharing
- complex team collaboration
- autonomous production changes by AI agents

## 6. Success criteria for first usable release

A user can:
1. authenticate
2. complete a Daily Pulse
3. manage up to three daily goals
4. save knowledge items and insights
5. log a challenge or decision
6. find previous insights semantically
7. view at least one useful trend
8. complete a weekly review
9. use the experience on Web and at least one mobile platform
