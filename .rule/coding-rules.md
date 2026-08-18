# Coding Rules

## Purpose

Define implementation rules for the Expo / React Native / TypeScript / Supabase codebase.

## TypeScript

- Use TypeScript for application and Edge Function code.
- Keep strict typing enabled.
- Avoid `any`; use `unknown` plus validation/narrowing when input is untrusted.
- Prefer explicit domain types over loosely shaped objects.
- Validate network, database RPC, file metadata and AI structured output at runtime.
- Do not use trailing semicolons in JavaScript or TypeScript.
- If a semicolon is required for syntax safety, place it at the beginning of the line.

## Architecture Boundaries

UI/route components must not directly own persistence or privileged integration logic.

Preferred flow:

```text
UI / Route
  -> domain hook / feature service
  -> repository / adapter
  -> local storage and/or Supabase
```

- Keep Supabase queries centralized in repository/data modules.
- Keep AI provider calls server-side.
- Keep platform-specific storage behind adapters.
- Do not introduce a new cross-cutting abstraction without a demonstrated use case.

## React / Expo

- Prefer functional components and hooks.
- Keep route files thin.
- Reusable behavior belongs in feature/domain hooks or services.
- Avoid platform forks unless behavior genuinely differs.
- Consider Web, iOS, Android, Hebrew RTL and English LTR for shared UI changes.
- Do not block routine UI interactions on long-running AI processing.

## State Management

- TanStack Query manages server/query lifecycle and mutations.
- Local-first state uses approved storage/sync abstractions.
- Do not create a second global state framework without an ADR.
- Optimistic updates must have a defined rollback/retry behavior.

## Services

- External providers are accessed through interfaces/adapters.
- AI model identifiers belong in configuration, not scattered through feature code.
- Client code must never call privileged OpenAI/provider APIs with secret credentials.

## Dependencies

- Prefer existing dependencies.
- New dependencies require a ticket-relevant justification.
- Avoid adding overlapping libraries for capabilities already present.
