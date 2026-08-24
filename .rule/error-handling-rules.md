# Error Handling Rules

- validate inputs at boundaries.
- return stable application error shapes.
- do not expose secrets, raw SQL, provider internals, or private payloads in user-facing errors.
- log identifiers and operation context rather than sensitive content where possible.
