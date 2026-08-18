# Error Handling Rules

## Purpose

Define consistent error handling across Expo client, Supabase repositories, Edge Functions, AI processing and local sync.

## Principles

- Fail fast on invalid input.
- Preserve user capture even when downstream processing fails.
- Return safe actionable messages.
- Keep internal implementation details out of user-facing errors.
- Retry only transient/idempotent operations.
- Never use infinite retry loops.

## Application Error Codes

Prefer stable codes such as:

- `AUTH_REQUIRED`
- `FORBIDDEN`
- `VALIDATION_FAILED`
- `NETWORK_UNAVAILABLE`
- `STORAGE_UPLOAD_FAILED`
- `AI_TRANSCRIPTION_FAILED`
- `AI_CLASSIFICATION_FAILED`
- `EMBEDDING_FAILED`
- `SYNC_FAILED`
- `UNKNOWN`

## Edge Functions

Use a stable safe error shape:

```text
error.code
error.message
error.details?   // only safe structured validation details
requestId
```

Never return:
- stack traces;
- SQL text;
- tokens/secrets;
- raw provider credentials;
- unnecessary personal content.

## Capture / AI Failure

AI is fallible.

If transcription/classification/embedding fails:
- retain the original `capture_job` source/status;
- mark a retryable failure when appropriate;
- do not silently delete the user's input;
- allow retry or manual recovery.

## Local-First Sync

- Persist failed/pending mutations.
- Retry transient network/infrastructure failures with bounded backoff.
- Do not retry validation/domain failures automatically.
- Avoid duplicate side effects using idempotency/mutation identifiers where appropriate.

## Logging

Include operational metadata such as:
- request ID;
- operation;
- user identifier only when required and safe;
- duration;
- status/error code.

Do not log full journal entries, transcripts, decision content or secrets by default.

## Frontend UX

- Use concise recovery-oriented messages.
- Distinguish offline/sync failure from validation failure.
- Do not expose internal architecture/provider details to the user.
- Toast implementation must follow `.rule/ui-rules.md`.

## Tests

Critical flows require tests for:
- validation;
- authorization;
- offline/sync failure;
- AI/provider failure;
- storage failure;
- safe error output.
