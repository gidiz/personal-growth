# Foundation Sync — Review Cycle 2 Fixes

This revision addresses the second Copilot PR review.

Key corrections:
- exact GitHub MCP tools replace `github/*` wildcards
- tool/MCP output is explicitly untrusted data
- Supabase/Test instructions cover AI/data/server paths
- Supabase tests receive the test/RLS/privacy instruction set
- ticket creation records parent Epic/sub-issue relationship
- negative security tests cover cross-user RLS, Storage ownership, RPC/vector isolation and caller-supplied identity
- Web accessibility restores keyboard, semantic-label/role, focus and no-color-only requirements
- Anchor Goal `position` is NOT NULL
- semantic retrieval accepts only READY embeddings
- review-cycle count has a persistent GitHub issue marker
- engineering Definition of Done is explicit
- Data API exposure/grants are part of migration validation
- PRD restores the previously accepted low-friction, reliability, accessibility, privacy, metrics and product-DoD constraints
- duplicate ADR IDs are removed; the original ADR-001..006 series remains canonical
- ADR-007 covers MCP/tool governance
- ADR-008 extends the original GitHub workflow vocabulary and adds DevOps

External setup already completed:
- Supabase MCP repository allowlist updated
- read-only post-change connectivity test passed
