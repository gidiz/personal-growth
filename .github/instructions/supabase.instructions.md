---
applyTo: "supabase/**/*,lib/supabase/**/*"
---

# Supabase Instructions

- migrations-as-code.
- private user data must use RLS.
- policies must be explicit.
- use `auth.uid()` for user isolation where appropriate.
- no service-role key in app/client code.
- MCP writes are Test-only.
- do not change Production directly.
- vector/RPC functions must preserve user scope.
