import {
  QueryClient,
  QueryClientProvider,
  UseMutationResult,
} from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { MockedFunction, vi } from "vitest";

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
  ...overrides,
});

export function createMockMutationResult<
  TData,
  TError = Error,
  TVariables = unknown,
  TContext = unknown
>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mockMutateAsync: (...args: any[]) => Promise<any>,
  overrides: Partial<
    UseMutationResult<TData, TError, TVariables, TContext>
  > = {}
): UseMutationResult<TData, TError, TVariables, TContext> {
  return {
    mutateAsync: mockMutateAsync as UseMutationResult<
      TData,
      TError,
      TVariables,
      TContext
    >["mutateAsync"],
    mutate: vi.fn() as UseMutationResult<
      TData,
      TError,
      TVariables,
      TContext
    >["mutate"],
    reset: vi.fn(),
    status: "idle",
    isIdle: true,
    isPending: false,
    // @ts-expect-error isLoading error
    isLoading: false,
    isError: false,
    isSuccess: false,
    isPaused: false,
    error: null as unknown as TError,
    data: undefined as unknown as TData, // <- typed but unset by default
    failureCount: 0,
    failureReason: null as unknown as TError,
    variables: undefined as unknown as TVariables,
    context: undefined as unknown as TContext,
    submittedAt: 0,
    ...overrides,
  };
}

export const createMockMutationPending = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mockMutateAsync: MockedFunction<any>
) =>
  createMockMutationResult(mockMutateAsync, {
    isPending: true,
    status: "pending",
  });

export const createMockMutationError = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mockMutateAsync: MockedFunction<any>,
  error: Error = new Error("Mutation failed")
) =>
  createMockMutationResult(mockMutateAsync, {
    isError: true,
    error,
    status: "error",
  });

export const createMockMutationSuccess = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mockMutateAsync: MockedFunction<any>,
  data: unknown = { success: true }
) =>
  createMockMutationResult(mockMutateAsync, {
    isSuccess: true,
    data,
    status: "success",
  });
