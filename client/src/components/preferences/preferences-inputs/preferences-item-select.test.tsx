import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

import { PreferencesItemSelect } from "./preferences-item-select";
import { useUpdatePreferences } from "../mutation/use-update-preferences.mutation";
import {
  createTestQueryClient,
  renderWithQueryClient,
  TestQueryClientProvider,
} from "@/utils/utils-tests";
import { QueryClientProvider } from "@tanstack/react-query";
import { apiConfig } from "@/lib/api/api-config";

const mockMutateAsync = vi.fn().mockResolvedValue({});
vi.mock("../mutation/use-update-preferences.mutation", () => ({
  useUpdatePreferences: vi.fn(() => ({
    mutateAsync: mockMutateAsync,
  })),
}));

vi.mock("./preferences-item-select-options", () => ({
  preferenceItemSelectOptions: () => [
    { label: "15 minutes", value: 15 },
    { label: "30 minutes", value: 30 },
    { label: "60 minutes", value: 60 },
  ],
}));

vi.mock("sonner", () => ({
  toast: {
    error: vi.fn(),
  },
}));

describe("PreferencesItemSelect", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockMutateAsync.mockClear();
  });

  it("renders default PreferencesItemSelect", () => {
    renderWithQueryClient(
      <PreferencesItemSelect
        title="Max Prep Time"
        preferenceKey="maxPrepTimeMinutes"
      />
    );

    expect(screen.getByText("Max Prep Time")).toBeInTheDocument();
    expect(
      screen.getByTestId("preferences-item-select-button-maxPrepTimeMinutes")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("preferences-item-select-value")
    ).toBeInTheDocument();
  });

  it("displays current value when preferences data exists", () => {
    render(
      <TestQueryClientProvider
        queryKey={apiConfig.QUERY_KEYS.PREFERENCES}
        state={{ maxPrepTimeMinutes: 30 }}
      >
        <PreferencesItemSelect
          title="Max Prep Time"
          preferenceKey="maxPrepTimeMinutes"
        />
      </TestQueryClientProvider>
    );

    expect(
      screen.getByTestId("preferences-item-select-value")
    ).toHaveTextContent("30 minutes");
  });

  it("shows placeholder when no current value", () => {
    renderWithQueryClient(
      <PreferencesItemSelect
        title="Max Prep Time"
        preferenceKey="maxPrepTimeMinutes"
      />
    );

    expect(screen.getByText("Select max prep time")).toBeInTheDocument();
  });

  it("handles value change for numeric preferences", async () => {
    const queryClient = createTestQueryClient();
    queryClient.setQueryData([apiConfig.QUERY_KEYS.PREFERENCES], {
      maxPrepTimeMinutes: 15,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <PreferencesItemSelect
          title="Max Prep Time"
          preferenceKey="maxPrepTimeMinutes"
        />
      </QueryClientProvider>
    );

    const selectButton = screen.getByTestId(
      "preferences-item-select-button-maxPrepTimeMinutes"
    );
    fireEvent.click(selectButton);

    await waitFor(() => {
      const option = screen.getByText("30 minutes");
      fireEvent.click(option);
    });

    expect(useUpdatePreferences().mutateAsync).toHaveBeenCalledWith({
      field: "maxPrepTimeMinutes",
      value: 30,
      originalData: { maxPrepTimeMinutes: 15 },
    });
  });
});
