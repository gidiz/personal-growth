# ADR-003 — Owned RAG with pgvector

## Status
Accepted

## Decision
Implement semantic retrieval using owned application data and pgvector rather than depending on NotebookLM as the runtime knowledge backend.

## Rationale
The application needs programmable, user-scoped retrieval integrated into product workflows.

## Consequences
We own embedding generation, indexing, retrieval quality, and evaluation.
