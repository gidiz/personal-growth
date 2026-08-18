# Glossary

## Purpose

Define canonical domain and engineering terms used across code, database, tickets, docs and agent communication.

## Product Terms

### `Daily Pulse`
A user's lightweight daily check-in containing mood, mental clarity, energy, sleep, exercise, social connection, triggers/uplifters and optional reflection.

Use `Daily Pulse`, not `daily status`, `mood form`, or `check-in record` when referring to the complete domain concept.

### `Anchor Goal`
One of up to three primary goals selected for a specific day.

### `Knowledge Item`
A source being learned from, such as a book, course, podcast or article.

### `Insight`
A reusable takeaway captured directly or extracted from a Knowledge Item.

### `Challenge`
A problem being tracked through problem statement, action plan/testing, resolution and lessons.

### `Decision`
A meaningful decision recorded with rationale, assumptions, expected outcome and later review.

### `Periodic Review`
A weekly/monthly/quarterly retrospective record.

### `Quick Capture`
The global low-friction text, voice or image capture entry point.

### `Capture Job`
A persisted processing record that preserves source/status while AI transcription/classification/embedding is performed.

### `Personal Memory`
The authorized set of historical records eligible for semantic retrieval/RAG.

### `Brain Search`
The user-facing natural-language search experience over Personal Memory.

### `RAG`
Retrieval-Augmented Generation. Retrieve authorized application records first, then synthesize a grounded answer.

### `Embedding`
Vector representation used for semantic retrieval. Embeddings must track model/version compatibility.

## Platform Terms

### `Local`
Developer/local application environment.

### `Test`
Shared non-production environment: Vercel Test/Preview, EAS Preview/Test, dedicated Supabase Test.

### `Production`
Live environment: Vercel Production, EAS Production/store distribution, dedicated Supabase Production.

### `RLS`
Supabase/PostgreSQL Row Level Security. Primary database-level user isolation mechanism.

### `Edge Function`
Server-side Supabase function used for privileged processing such as AI integration.

### `MCP`
Model Context Protocol used in this project primarily for controlled development-tool access by agents.

## Naming Alignment

Keep this glossary aligned with `../.rule/naming-rules.md`.

Add a shared term here before introducing competing synonyms broadly across the repository.
