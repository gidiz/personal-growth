import { QueryClient } from '@tanstack/react-query';

/**
 * The single `QueryClient` for the app.
 *
 * A module-level constant rather than `useState(() => new QueryClient())`: there is exactly one
 * root layout, and a module singleton makes "created once" a property of the module system instead
 * of something a future refactor of the layout can accidentally break.
 *
 * Defaults are set explicitly because TanStack Query's out-of-the-box behaviour (`staleTime: 0`,
 * `retry: 3` on mutations as well) is tuned for dashboards, not for a mostly-offline journalling
 * app on a phone.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Personal-growth data changes when the user acts on it, not continuously. 30s is long
      // enough to stop a tab switch or a remount from refetching, short enough that a second
      // device's write shows up quickly.
      staleTime: 30_000,
      // Keep unused data for half an hour so returning to a screen renders instantly from cache.
      // Not longer: this is in-memory only, and mobile RAM is the budget being spent.
      gcTime: 30 * 60_000,
      // `.rule/error-handling-rules.md`: retries are bounded by an explicit attempt limit, and an
      // exhausted budget becomes a permanent failure.
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1_000 * 2 ** attemptIndex, 30_000),
    },
    mutations: {
      // Mutations are NOT retried automatically. ADR-001's offline queue owns retry, idempotency
      // and conflict handling; blind retries here would duplicate user captures before that
      // exists.
      retry: 0,
    },
  },
});
