import type { KeyValueBackend } from './backend.types';

/**
 * Web backend for the cache adapter.
 *
 * This file has no platform suffix on purpose: Metro resolves `./backend` to `backend.native.ts`
 * on iOS and Android and falls through to this file on Web, which is also the module TypeScript
 * sees. That is what keeps `Platform.OS` out of every call site.
 */
function localStorageOrThrow(): Storage {
  const store = globalThis.localStorage;
  if (!store) {
    throw new Error('Cache storage is unavailable: this Web runtime exposes no localStorage.');
  }
  return store;
}

export const backend: KeyValueBackend = {
  getItem(key) {
    return localStorageOrThrow().getItem(key);
  },
  setItem(key, value) {
    localStorageOrThrow().setItem(key, value);
  },
  removeItem(key) {
    localStorageOrThrow().removeItem(key);
  },
};
