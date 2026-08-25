---
applyTo: "**/*.test.ts,**/*.test.tsx,**/*.spec.ts,**/*.spec.tsx,tests/**/*,e2e/**/*,supabase/tests/**/*"
---

# Test Instructions

- use deterministic, synthetic or purpose-built Test fixtures.
- never use private Production user data or Production credentials for ordinary tests.
- add regression tests for bugs.
- for RLS/auth changes, include negative cross-user access tests.
- validate storage ownership when storage policies change.
- validate vector/RPC user isolation when semantic-search functions change.
- Playwright is preferred for important Web end-to-end flows.
- cover RTL/LTR and cross-platform behavior when relevant.
- redact sensitive content from logs, snapshots, screenshots and artifacts.
