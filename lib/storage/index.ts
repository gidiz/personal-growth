import { backend } from './backend';

/**
 * Client-side cache storage.
 *
 * **Contract: non-sensitive cache only.** Per `docs/architecture/LLD.md` section 5 local
 * persistence is a cache, never authoritative truth, and per
 * `.github/instructions/frontend.instructions.md` no auth or provider secret may be persisted in
 * plain storage. Neither backend encrypts at rest: on Web this is `localStorage`, readable by any
 * script on the origin; on native it is an unencrypted on-device SQLite file.
 *
 * The contract is enforced, not merely documented, in three layers:
 *  1. `CacheKey` is a closed union built from `CACHE_KEYS`, so a caller cannot invent a key.
 *  2. `CACHE_SCHEMA` is a `Record<CacheKey, ...>`, so declaring a key without declaring the only
 *     value shape it accepts is a compile error. This is the layer that matters: a Supabase
 *     refresh token is an opaque string, so no pattern can recognise one, but it is not an ISO
 *     timestamp either and an allowlisted shape rejects it.
 *  3. `CREDENTIAL_SHAPES` still rejects recognisable credentials, which keeps a key whose schema
 *     is legitimately permissive (free text, say) from becoming a hole.
 *
 * Where a Supabase session is persisted is deliberately NOT decided here. It is an Auth-ticket
 * decision, and this module guarantees only that the default cache is not a legitimate answer.
 */

/** Raised when a write would put credential-shaped material into the plain cache. */
export class SensitiveCacheWriteError extends Error {
  constructor(readonly key: string) {
    // The rejected value is never included: echoing it would leak the very thing we refused.
    super(
      `Refused to cache the value for "${key}": it is shaped like a credential. ` +
        `This cache is not encrypted and must hold non-sensitive data only. ` +
        `Auth tokens, sessions and provider keys belong in a dedicated secure store.`,
    );
    this.name = 'SensitiveCacheWriteError';
  }
}

/** Raised when a value does not match the shape its key is declared to accept. */
export class CacheSchemaViolationError extends Error {
  constructor(
    readonly key: string,
    expected: string,
  ) {
    super(`Refused to cache the value for "${key}": it must be ${expected}.`);
    this.name = 'CacheSchemaViolationError';
  }
}

/**
 * Every key this app may persist. Keys are prefixed so the Web backend cannot collide with other
 * scripts on the same origin.
 */
export const CACHE_KEYS = {
  /** Timestamp of the last successful example query; proves the adapter round-trips. */
  exampleLastSeenAt: 'pg.cache.ui.example-last-seen-at',
} as const;

export type CacheKey = (typeof CACHE_KEYS)[keyof typeof CACHE_KEYS];

type CacheValueSchema = {
  /** Completes the sentence "it must be ..." in the rejection message. */
  expected: string;
  accepts: (value: string) => boolean;
};

const ISO_TIMESTAMP = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;

const CACHE_SCHEMA: Record<CacheKey, CacheValueSchema> = {
  [CACHE_KEYS.exampleLastSeenAt]: {
    expected: 'an ISO 8601 UTC timestamp',
    accepts: (value) => ISO_TIMESTAMP.test(value),
  },
};

const CREDENTIAL_SHAPES: readonly RegExp[] = [
  // Three base64url segments: a JWT, which covers Supabase access tokens and anon keys.
  /^[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}$/,
  // Supabase API keys (publishable and secret) and personal access tokens.
  /^sb_[a-z]{3,}_/,
  /^sbp_/,
  // A serialised session or credential object, whatever key it is filed under.
  /"(access|refresh|id|provider)_token"\s*:/i,
  /"(password|client_secret|private_key|api[_-]?key)"\s*:/i,
];

function assertWritable(key: CacheKey, value: string): void {
  if (CREDENTIAL_SHAPES.some((shape) => shape.test(value))) {
    throw new SensitiveCacheWriteError(key);
  }
  const schema = CACHE_SCHEMA[key];
  if (!schema.accepts(value)) {
    throw new CacheSchemaViolationError(key, schema.expected);
  }
}

export const cacheStorage = {
  get(key: CacheKey): string | null {
    const value = backend.getItem(key);
    if (value === null) {
      return null;
    }
    // Web `localStorage` is writable by any script on the origin, so a stored value is untrusted
    // input on the way back in too. A value that no longer matches its schema is a cache miss, and
    // so is an undeclared key arriving from an untyped boundary.
    return CACHE_SCHEMA[key]?.accepts(value) ? value : null;
  },
  set(key: CacheKey, value: string): void {
    assertWritable(key, value);
    backend.setItem(key, value);
  },
  remove(key: CacheKey): void {
    backend.removeItem(key);
  },
};
