# Testing Rules

- test behavior, not implementation details.
- add regression tests for bugs.
- use synthetic, seeded, or deliberately created Test fixtures.
- never use private Production journal/personal-growth data as test fixtures.
- never require Production database credentials for normal automated tests.
- tests that touch Supabase target Local/Test unless a human explicitly runs a release-verification procedure.
- RLS tests must include same-user success **and cross-user denial**.
- Storage-policy tests must include ownership and unauthorized-object access cases.
- vector/RPC tests must prove one user cannot retrieve another user's records.
- Edge Function/service-role tests must verify caller-supplied `user_id` cannot override authenticated ownership.
- validate critical Web flows with Playwright when available.
- consider Web/iOS/Android and RTL/LTR impact for Expo changes.
- redact sensitive data from logs, snapshots, screenshots and failure artifacts.
