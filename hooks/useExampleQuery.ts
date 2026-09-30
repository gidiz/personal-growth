import { useQuery } from '@tanstack/react-query';

import { CACHE_KEYS, cacheStorage } from '@/lib/storage';

/**
 * Scaffold probe, not a feature. It proves three things at once on every platform: the
 * `QueryClientProvider` is mounted above the routes, the cache adapter round-trips through one
 * shared interface, and neither needs a `Platform.OS` branch at the call site.
 *
 * It performs no network I/O. Replace it once a real repository hook exists.
 */

const PRINCIPLES = [
  'Capture first, organise later.',
  'A retrospective is only useful if it changes the next week.',
  'Small, repeatable, honest.',
] as const;

export const exampleQueryKey = ['example', 'principle'] as const;

export type ExampleData = {
  principle: string;
  /** Value written by the previous run of this query, read back from persistent cache. */
  previousSeenAt: string | null;
};

export function useExampleQuery() {
  return useQuery({
    queryKey: exampleQueryKey,
    queryFn: (): ExampleData => {
      const previousSeenAt = cacheStorage.get(CACHE_KEYS.exampleLastSeenAt);
      cacheStorage.set(CACHE_KEYS.exampleLastSeenAt, new Date().toISOString());

      const index = Math.floor(Math.random() * PRINCIPLES.length);
      return { principle: PRINCIPLES[index], previousSeenAt };
    },
  });
}
