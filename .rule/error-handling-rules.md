# Error Handling Rules

- validate inputs at boundaries.
- return stable application error shapes.
- do not expose secrets, raw SQL, provider internals, or private payloads in user-facing errors.
- log identifiers and operation context rather than sensitive content where possible.
- an original user capture is never silently lost or discarded because downstream processing failed.
- distinguish retryable failures from permanent ones and record which applies.
- retries are bounded by an explicit attempt limit; an exhausted retry budget becomes a permanent failure that still retains the source data.
- retries must be idempotent and must not duplicate the entity a capture resolves to.
- low-confidence AI routing requires user confirmation instead of automatic persistence.
