import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";

export const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

export const renderWithQueryClient = (component: React.ReactElement) => {
  const queryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{component}</QueryClientProvider>
  );
};

export const TestQueryClientProvider = ({
  queryKey,
  state,
  children,
}: {
  queryKey: string | string[];
  state: object;
  children: React.ReactNode;
}) => {
  const queryClient = createTestQueryClient();

  const key = Array.isArray(queryKey) ? queryKey : [queryKey];
  queryClient.setQueryData(key, state);
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createMockQueryResult = (mockRefetch: any, overrides: any) => ({
  data: undefined,
  isLoading: false,
  error: null,
  isError: false,
  isSuccess: false,
  refetch: mockRefetch,
  isPending: false,
  isLoadingError: false,
  isRefetchError: false,
  isPlaceholderData: false,
  isFetching: false,
  isFetched: false,
  isFetchedAfterMount: false,
  isRefetching: false,
  isStale: false,
  status: "idle" as const,
  fetchStatus: "idle" as const,
  errorUpdateCount: 0,
  errorUpdatedAt: 0,
  failureCount: 0,
  failureReason: null,
  dataUpdatedAt: 0,
  // Override with provided values
  ...overrides,
});
