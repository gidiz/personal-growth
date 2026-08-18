---
applyTo: "**/*.test.ts,**/*.test.tsx,**/*.spec.ts,**/*.spec.tsx,supabase/tests/**/*,tests/**/*"
---

# Test Instructions

Follow `.rule/testing-rules.md`.

- Test observable behavior.
- Add negative/abuse tests for security-sensitive work.
- Use synthetic data only.
- Never use Production credentials/data.
- RLS tests must attempt cross-user access denial.
- Local-first tests should cover pending/retry/failure behavior where relevant.
- AI tests should not depend on nondeterministic live model output unless explicitly marked as integration tests.
