import Storage from 'expo-sqlite/kv-store';

import type { KeyValueBackend } from './backend.types';

/**
 * Native backend for the cache adapter, resolved by Metro on iOS and Android.
 *
 * `expo-sqlite/kv-store` rather than MMKV: it ships with the Expo SDK, needs no extra native
 * module, works in Expo Go, and exposes synchronous accessors, so the shared interface stays
 * synchronous on both platforms. It is plain on-device SQLite with no encryption at rest, which
 * is exactly why this module is contractually limited to non-sensitive cache data.
 */
export const backend: KeyValueBackend = {
  getItem(key) {
    return Storage.getItemSync(key);
  },
  setItem(key, value) {
    Storage.setItemSync(key, value);
  },
  removeItem(key) {
    Storage.removeItemSync(key);
  },
};
