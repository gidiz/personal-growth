---
applyTo: "app/**/*.ts,app/**/*.tsx,components/**/*.ts,components/**/*.tsx,features/**/*.ts,features/**/*.tsx,hooks/**/*.ts,hooks/**/*.tsx"
---

# Frontend Instructions

Follow `.rule/coding-rules.md`, `.rule/ui-rules.md`, `.rule/style-rules.md`, `.rule/testing-rules.md`, and `.rule/error-handling-rules.md`.

- Keep Expo Router route files thin.
- Use domain hooks/services/repositories instead of direct persistence in UI.
- Use NativeWind as the primary shared styling system.
- Design for Web, iOS, Android, Hebrew RTL, and English LTR.
- Use start/end semantics instead of hard-coded left/right where appropriate.
- Do not place privileged secrets in Expo client code.
- Do not introduce web-only packages into shared native code without validating cross-platform support.
- Preserve local-first/optimistic behavior where the domain requires it.
