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
 * The contract is enforced, not merely documented:
 *  1. `CacheKey` is a closed union built from `CACHE_KEYS`, so a caller cannot invent a key.
 *     Storing something new means editing this file, which is the review checkpoint.
 *  2. `set` rejects values shaped like credentials, so a secret smuggled under an innocent-looking
 *     key still fails loudly.
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

/**
 * Every key this app may persist. Keys are prefixed so the Web backend cannot collide with other
 * scripts on the same origin.
 */
export const CACHE_KEYS = {
  /** Timestamp of the last successful example query; proves the adapter round-trips. */
  exampleLastSeenAt: 'pg.cache.ui.example-last-seen-at',
} as const;

export type CacheKey = (typeof CACHE_KEYS)[keyof typeof CACHE_KEYS];

const CREDENTIAL_SHAPES: readonly RegExp[] = [
  // Three base64url segments: a JWT, which covers Supabase access and refresh tokens.
  /^[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}$/,
  // Supabase API keys (publishable and secret) and personal access tokens.
  /^sb_[a-z]{3,}_/,
  /^sbp_/,
  // A serialised session or credential object, whatever key it is filed under.
  /"(access|refresh|id|provider)_token"\s*:/i,
  /"(password|client_secret|private_key|api[_-]?key)"\s*:/i,
];

function assertNotCredentialShaped(key: CacheKey, value: string): void {
  if (CREDENTIAL_SHAPES.some((shape) => shape.test(value))) {
    throw new SensitiveCacheWriteError(key);
  }
}

export const cacheStorage = {
  get(key: CacheKey): string | null {
    return backend.getItem(key);
  },
  set(key: CacheKey, value: string): void {
    assertNotCredentialShaped(key, value);
    backend.setItem(key, value);
  },
  remove(key: CacheKey): void {
    backend.removeItem(key);
  },
};
