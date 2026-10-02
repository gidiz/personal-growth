# Personal Growth OS

Foundation and execution package for **Personal Growth, Mental Health & Retrospective OS**.

This repository is intentionally structured so product intent, architecture, engineering rules,
GitHub Copilot agents, tickets, and runtime infrastructure do not drift apart.

## Canonical sources of truth

- `docs/product/PRD.md` — what and why we build.
- `docs/architecture/HLD.md` — high-level architecture.
- `docs/architecture/LLD.md` — implementation-level architecture.
- `docs/adr/` — architectural decisions and constraints.
- `docs/engineering/DEVELOPMENT_PROCESS.md` — how work moves from idea to Done.
- `AGENTS.md` — repository-wide rules for humans and AI agents.

## Copilot execution layer

The repository includes:

- `.github/copilot-instructions.md`
- custom agents under `.github/agents/`
- path-specific instructions under `.github/instructions/`
- reusable prompts under `.github/prompts/`
- GitHub Issue Forms under `.github/ISSUE_TEMPLATE/`
- `.github/SETUP_CHECKLIST.md`
- `.github/MCP_CONFIGURATION.md`

## Current external setup

### GitHub
- `develop` is the default development branch.
- protected `main` and `develop` rulesets are configured.
- a GitHub Project is configured with:
  - Status
  - Work Type
  - Area
  - Priority
  - Security Impact
  - Estimate
  - Iteration
- repository labels are configured for agent routing and `needs-human`.

### Supabase
- Test project: `personal-growth-test`
- Region: Central EU (Frankfurt)
- Data API enabled
- automatic exposure of new tables disabled
- automatic RLS enabled
- GitHub integration enabled
- Supabase MCP is configured for the GitHub Copilot cloud agent and scoped to Test only
- Production Supabase is intentionally deferred while the free-plan project limit applies

### Deployment
- Vercel: deferred until Expo/Web scaffold exists
- EAS: deferred until Expo scaffold exists

## Local development

### Prerequisites

- Node.js 22.x — the `actions/setup-node` step in `.github/workflows/ci.yml` pins `node-version: '22'`,
  so 22 is the only major CI verifies. Newer majors generally work locally, but a failure that
  reproduces only on a newer major is not a CI failure.
- npm 10 or newer.
- For native targets: Expo Go on a device, or Android Studio / Xcode simulators.

### Environment variables

Copy `.env.example` to `.env` at the repository root and fill in the values:

```bash
cp .env.example .env
```

The app validates its configuration on startup in `lib/env.ts` and **refuses to boot** if a
variable is missing, naming the variable in the error. After changing `.env`, restart with
`npx expo start --clear` so the new value is inlined.

> **`EXPO_PUBLIC_*` values are compiled into the shipped client bundle and are therefore public.**
> Anyone who downloads the app or opens the Web bundle can read them. Never give an
> `EXPO_PUBLIC_` name to a Supabase service-role key, a database password, an AI provider secret,
> or an MCP token. `.env` is gitignored; `.env.example` is tracked and must only ever contain
> empty values.

`lib/env.ts` is the only module permitted to read `process.env`. Everything else imports `env`
from it.

### Commands

```bash
npm ci            # deterministic install from package-lock.json
npm run lint      # ESLint, fails on any warning
npm run typecheck # tsc --noEmit, strict mode
npm start         # Expo dev server, choose a target
npm run web       # web only
```

`lint` and `typecheck` are the two scripts the `app-checks` CI job runs, so a clean local run is
the same check the merge gate applies.

## Styling conventions

- **NativeWind first.** Style with `className`. Reach for a `StyleSheet` object or an inline
  `style` prop only when NativeWind genuinely cannot express it, and say why in the PR.
- **Primitives live in `components/ui/`.** Feature-specific components belong in the other
  `components/` subfolders from `docs/architecture/LLD.md` section 1.
- **Tokens live in `tailwind.config.js`.** Colour, spacing and radius come from the theme, not
  from literals in components. `components/ui/Button.tsx` is the reference for the house pattern:
  typed props, an accessible name and role, a 44px minimum touch target, a visible Web focus ring,
  and disabled/pressed states that survive a greyscale view.

## Data layer conventions

- **Server state goes through TanStack Query.** The single `QueryClient` lives in
  `lib/query-client.ts` and is provided from `app/_layout.tsx`. Its `staleTime`, `gcTime` and
  `retry` defaults are set explicitly and explained there; mutations are never retried
  automatically, because the offline queue in `docs/adr/ADR-001-local-first.md` owns idempotency.
- **Persistent client storage goes through `lib/storage`.** One synchronous interface,
  `expo-sqlite/kv-store` on native and `localStorage` on Web, selected by Metro's platform file
  resolution. There is no `Platform.OS` branch at any call site.
- **`lib/storage` is a non-sensitive cache and nothing else.** It is unencrypted on both
  platforms. Every key must be declared in `CACHE_KEYS` *and* given a value schema in
  `CACHE_SCHEMA` — the `Record<CacheKey, …>` makes a missing schema a compile error — and writes of
  credential-shaped values are rejected at runtime on top of that. Auth tokens, sessions and
  provider keys do not belong there.
- **Hooks live in `hooks/` and are named `useX`.** `hooks/useExampleQuery.ts` is the current
  reference wiring; it is a scaffold probe with no network I/O and is expected to be replaced.

## Development principle

No feature starts from an unstructured "build this" prompt.

The expected flow is:

`Docs -> Planner -> GitHub Ticket -> Implementation -> Review -> Security Review (when required) -> QA -> Merge`

Database schema changes must be represented by versioned migrations in Git.
Production changes must never be made directly by an autonomous agent.
