import { backend } from './backend';
import {
  CACHE_KEYS,
  CacheSchemaViolationError,
  cacheStorage,
  SensitiveCacheWriteError,
} from './index';

// The platform backend is replaced with an in-memory map so these tests cover the contract this
// module enforces, not localStorage or SQLite.
jest.mock('./backend', () => {
  const store = new Map<string, string>();
  return {
    backend: {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => void store.set(key, value),
      removeItem: (key: string) => void store.delete(key),
    },
  };
});

const KEY = CACHE_KEYS.exampleLastSeenAt;
const VALID = '2026-01-01T00:00:00.000Z';

// Synthetic throughout: none of these is or was a real credential. The secret-key prefix is
// assembled at runtime because the literal trips the repo-hygiene scan on tracked files.
const OPAQUE_REFRESH_TOKEN = 'v1xK8sPq2mN4tR7wZ3bY6cD9fG1hJ5kL';
const JWT_SHAPED = 'aaaaaaaaaaaa.bbbbbbbbbbbb.cccccccccccc';
const SERIALISED_SESSION = '{"access_token": "synthetic", "user": {}}';
const SECRET_KEY = 'sb_' + 'secret_' + '0000000000000000';

beforeEach(() => {
  backend.removeItem(KEY);
});

describe('cacheStorage', () => {
  it('round-trips a value its key is declared to accept', () => {
    cacheStorage.set(KEY, VALID);

    expect(cacheStorage.get(KEY)).toBe(VALID);
  });

  it('reports an unset key as a miss', () => {
    expect(cacheStorage.get(KEY)).toBeNull();
  });

  it('removes a value', () => {
    cacheStorage.set(KEY, VALID);
    cacheStorage.remove(KEY);

    expect(cacheStorage.get(KEY)).toBeNull();
  });
});

describe('write guards', () => {
  it('rejects an opaque token, which no credential pattern can recognise', () => {
    expect(() => cacheStorage.set(KEY, OPAQUE_REFRESH_TOKEN)).toThrow(CacheSchemaViolationError);
  });

  it('rejects a JWT-shaped value', () => {
    expect(() => cacheStorage.set(KEY, JWT_SHAPED)).toThrow(SensitiveCacheWriteError);
  });

  it('rejects a serialised session object', () => {
    expect(() => cacheStorage.set(KEY, SERIALISED_SESSION)).toThrow(SensitiveCacheWriteError);
  });

  it('rejects a Supabase secret key', () => {
    expect(() => cacheStorage.set(KEY, SECRET_KEY)).toThrow(SensitiveCacheWriteError);
  });

  it('leaves the stored value untouched when a write is rejected', () => {
    cacheStorage.set(KEY, VALID);

    expect(() => cacheStorage.set(KEY, OPAQUE_REFRESH_TOKEN)).toThrow();
    expect(cacheStorage.get(KEY)).toBe(VALID);
  });

  it.each([
    ['schema violation', OPAQUE_REFRESH_TOKEN],
    ['credential shape', JWT_SHAPED],
  ])('never echoes the rejected value in the error (%s)', (_label: string, rejected: string) => {
    expect(() => cacheStorage.set(KEY, rejected)).toThrow(
      expect.not.stringContaining(rejected) as unknown as string,
    );
  });
});

describe('read guard', () => {
  it('treats a value written past this module as a cache miss', () => {
    // Web localStorage is writable by any script on the origin, so a stored value is untrusted
    // input on the way back in too.
    backend.setItem(KEY, 'tampered-by-another-script');

    expect(cacheStorage.get(KEY)).toBeNull();
  });

  it('recovers on the next legitimate write', () => {
    backend.setItem(KEY, 'tampered-by-another-script');
    cacheStorage.set(KEY, VALID);

    expect(cacheStorage.get(KEY)).toBe(VALID);
  });
});
