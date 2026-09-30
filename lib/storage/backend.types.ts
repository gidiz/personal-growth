/**
 * The narrow key/value surface the cache adapter needs from a platform.
 *
 * Deliberately synchronous and string-only: both backends can satisfy it without a promise, and
 * callers never have to care which platform they are on. Anything richer (batching, subscriptions,
 * JSON merging) belongs to the ticket that actually needs it.
 */
export interface KeyValueBackend {
  /** The value previously stored under `key`, or `null` when nothing is stored. */
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}
