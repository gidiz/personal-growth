---
applyTo: "supabase/**/*,repositories/**/*.ts,lib/supabase/**/*.ts,lib/ai/**/*.ts,lib/ai-contracts/**/*.ts"
---

# Supabase / Backend Instructions

Follow `.rule/database-rules.md`, `.rule/error-handling-rules.md`, `.rule/testing-rules.md`, ADR-002, ADR-006, and ADR-007.

- Schema changes are migrations.
- Enable and test RLS for user-owned data.
- Derive user identity from authenticated context.
- Never authorize using caller-supplied `user_id`.
- Keep AI/service-role secrets server-side.
- Validate Edge Function inputs and AI structured output at runtime.
- Preserve source capture when AI processing fails.
- Vector retrieval must be user-scoped and preserve provenance.
- No direct Production MCP mutation.
