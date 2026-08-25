# Glossary

## Product domain

- **Daily Pulse** — one structured daily check-in containing mood, mental clarity, energy, sleep, exercise, social connection, triggers, uplifters, and reflection.
- **Anchor Goal** — one of up to three meaningful goals for a given day.
- **Knowledge Item** — a book, course, podcast, article, or similar learning source tracked in the Knowledge Hub.
- **Insight** — a reusable takeaway captured from learning or personal experience.
- **Challenge** — a problem being worked through with an action plan, status, resolution, and lessons learned.
- **Decision** — a recorded decision with rationale, assumptions, expected outcome, review date, and eventual actual outcome.
- **Quick Capture** — low-friction text, voice, or camera/OCR input that may be routed into a structured entity. Routed entity types are `GOAL`, `DAILY_PULSE`, `INSIGHT`, `CHALLENGE` and `DECISION`; `DAILY_PULSE` targets the existing Daily Pulse record for the capture's day rather than a separate mood-log entity.
- **Periodic Review** — a weekly, monthly, or other bounded retrospective over progress and patterns.
- **Personal Memory** — the user-owned body of insights, resolved challenges, reviewed decisions, and periodic reviews that can participate in semantic retrieval.
- **Semantic Brain Search** — natural-language retrieval over Personal Memory using vector search plus synthesis.

## Engineering

- **RAG** — Retrieval-Augmented Generation.
- **RLS** — PostgreSQL Row Level Security.
- **MCP** — Model Context Protocol; a standardized tool interface between agents and external systems.
- **ADR** — Architecture Decision Record.
- **HLD** — High-Level Design.
- **LLD** — Low-Level Design.
- **Iteration** — the GitHub Project two-week planning period.
- **Review Cycle** — one automated fix/re-review pass; distinct from Iteration.
- **Test** — non-production environment where scoped agent write access may be permitted.
- **Production** — live environment; autonomous direct database writes are prohibited.
