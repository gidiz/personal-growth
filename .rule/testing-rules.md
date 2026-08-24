# Testing Rules

- test behavior, not implementation details.
- add regression tests for bugs.
- include RLS/integration tests for security-sensitive DB changes.
- validate critical web flows with Playwright when available.
- consider cross-platform behavior for Expo changes.
- use synthetic, seeded, or deliberately created Test fixtures.
- never use private Production journal/personal-growth data as test fixtures.
- never require Production database credentials for normal automated tests.
- Supabase tests target Local/Test unless a human explicitly runs a release verification procedure.
- redact sensitive data from logs, snapshots, screenshots, and failure artifacts.
