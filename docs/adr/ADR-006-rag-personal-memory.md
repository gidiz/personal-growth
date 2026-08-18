# ADR-006 — RAG & Personal Memory Architecture

**Status:** Accepted  
**Decision:** Personal semantic search uses a user-scoped retrieval pipeline over PostgreSQL/pgvector, with metadata-aware retrieval, embedding versioning, grounded synthesis, and source references.

## 1. Context

The product's long-term value depends on retrieving useful personal history at the moment it becomes relevant. Semantic search is therefore a core capability, but it must preserve authorization boundaries, provenance, model/version compatibility, and predictable failure behavior.

## 2. Initial Personal Memory Sources

The initial RAG corpus includes:

- Insights
- Resolved Challenges
- Reviewed Decisions
- Periodic Reviews

Additional entity types require an explicit product/architecture decision before being indexed by default.

## 3. Retrieval Pipeline

```text
User query
   |
   v
Authentication / authorization
   |
   v
Query normalization / intent hints
   |
   +------------------+
   |                  |
   v                  v
Semantic retrieval   Metadata filters
(pgvector)           (type/date/tags/source)
   |                  |
   +--------+---------+
            |
            v
      Candidate set
            |
            v
 Threshold / Top-K
            |
            v
     Context builder
            |
            v
 Grounded LLM synthesis
            |
            v
 Answer + source record references
```

Hybrid keyword + semantic retrieval may be introduced when exact names, titles, tags, or identifiers materially improve retrieval quality.

## 4. Authorization Rule

Retrieval is always scoped to the authenticated user.

- Never trust a caller-supplied target user id.
- Database functions/RPCs must derive or enforce user ownership through authenticated identity/RLS.
- Semantic similarity must never bypass normal tenant isolation.
- Service-role use, if required internally, must explicitly re-enforce ownership before retrieval.

## 5. Embedding Lifecycle

Embedding records must track enough metadata to support safe upgrades.

Recommended fields:

```text
embedding
embedding_model
embedding_version
embedding_status
embedded_at
```

Suggested statuses:

- PENDING
- READY
- FAILED
- STALE

Document and query embeddings used in one similarity space must be produced by a compatible embedding model/version.

Changing embedding models requires a controlled re-embedding strategy rather than silently mixing incompatible vectors.

## 6. Chunking Strategy

For MVP:

- short atomic records such as an Insight remain one semantic unit;
- challenge/decision/review records should be embedded from a curated retrieval text representation rather than blindly concatenating every field;
- large future documents may be chunked separately with parent-record references.

Chunking rules should optimize retrieval meaning, not arbitrary token counts.

## 7. Retrieval Configuration

The following are configuration, not hard-coded product truths:

- `top_k`
- similarity threshold
- allowed entity types
- date range
- metadata filters
- context budget

Defaults should be tuned using retrieval evaluation data.

## 8. Grounding & Provenance

Generated answers should retain references to the underlying application records.

The LLM may summarize retrieved context but must not be treated as the source of truth.

If retrieval evidence is weak, the system should communicate uncertainty rather than fabricate a confident personal conclusion.

## 9. Data Minimization

Only the minimum relevant retrieved context should be sent to the AI provider.

Do not send the user's entire history when a small authorized candidate set is sufficient.

## 10. Failure Handling

- embedding failure does not delete the original record;
- records can remain searchable through non-vector mechanisms where appropriate;
- failed/stale embeddings are retryable;
- RAG synthesis failure should still preserve retrieval results where useful.

## 11. Evaluation

Before advanced RAG changes are promoted, evaluate at minimum:

- retrieval relevance;
- source correctness;
- cross-user isolation;
- exact-name/title lookup behavior;
- low-evidence behavior;
- latency;
- cost.

## 12. Security Review

Changes to vector RPCs, RLS, semantic retrieval, context construction, AI prompts, or indexed sensitive fields require Backend Security review.

Client-side rendering/navigation of source references may additionally require Frontend Security review.

## 13. Consequences

### Positive
- explicit personal-memory boundary;
- safer model upgrades;
- grounded answers;
- auditable retrieval sources;
- future path to hybrid search.

### Negative
- additional embedding metadata and lifecycle management;
- retrieval quality must be evaluated, not assumed;
- re-embedding jobs become necessary when models change.
