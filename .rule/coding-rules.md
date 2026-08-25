# Coding Rules

- TypeScript strict mode.
- Prefer explicit types at system boundaries.
- Avoid `any` unless justified.
- Keep components focused.
- Keep provider/API code behind adapters.
- Never hard-code secrets.
- Runtime application and Edge Function environment-specific URLs must come from environment configuration.
- Non-secret Test-only developer-tooling URLs/project references may be committed only when explicitly documented by an ADR.
- Production project references must never be hard-coded into Test tooling.
- Explain non-obvious decisions in code comments or ADRs, not obvious syntax.
