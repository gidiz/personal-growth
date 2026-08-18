# Architecture Quick Reference

## Purpose

This file is a lightweight pointer for agents. It is **not** the architecture source of truth.

Canonical architecture documents:

- High-level architecture: `../docs/architecture/HLD.md`
- Detailed design: `../docs/architecture/LLD.md`
- Architectural decisions: `../docs/adr/`

## Current Runtime Topology

```text
Expo / React Native / TypeScript
        |
        +-- Web -> Vercel
        |
        +-- iOS / Android -> Expo EAS
        |
        v
Supabase
  Auth
  PostgreSQL
  RLS
  Storage
  Edge Functions
  pgvector
        |
        v
Server-side AI provider integrations
```

## Environment Topology

- Local: Expo local/dev + local/dev Supabase where practical
- Test: Vercel Test/Preview + EAS Preview + dedicated Supabase Test
- Production: Vercel Production + EAS Production + dedicated Supabase Production

## Critical Boundaries

- Client never contains OpenAI/API-provider secrets or Supabase service-role credentials.
- All user-owned data is protected by RLS.
- AI privileged processing occurs server-side.
- RAG retrieval is user-scoped.
- Direct agent/MCP writes to Production are forbidden.

## Update Rule

Do not independently maintain architecture decisions here. Update the canonical HLD/LLD/ADR first, then update this quick reference only if the summary becomes stale.
