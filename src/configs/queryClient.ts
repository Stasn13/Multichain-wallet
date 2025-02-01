import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: 120_000,
      refetchIntervalInBackground: true,
      refetchOnReconnect: true,
    },
  },
})