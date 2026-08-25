---
applyTo: "supabase/**/*,lib/supabase/**/*,lib/ai/**/*,lib/ai-contracts/**/*,repositories/**/*,data/**/*"
---

# Supabase / Backend Data Instructions

- permanent schema changes are migrations-as-code.
- private user-owned data must use RLS.
- never trust a caller-supplied `user_id` for authorization; derive ownership from authenticated identity.
- service-role access must explicitly re-enforce user ownership.
- no service-role key or AI provider secret in client code.
- AI structured output must be runtime/schema validated before persistence.
- MCP writes are Test-only.
- do not change Production directly.
- vector/RPC functions must preserve user isolation.
- new Data API resources require explicit exposure/grants in the migration or deployment contract.
