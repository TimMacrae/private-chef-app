import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PreferencesItemSelect } from "./preferences-item-select";
import { useUpdatePreferences } from "../mutation/use-update-preferences.mutation";

// Mock the dependencies
vi.mock("../mutation/use-update-preferences.mutation", () => ({
  useUpdatePreferences: () => ({
    mutateAsync: vi.fn().mockResolvedValue({}),
  }),
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

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

const renderWithQueryClient = (component: React.ReactElement) => {
  const queryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{component}</QueryClientProvider>
  );
};

describe("PreferencesItemSelect", () => {
  beforeEach(() => {
    vi.clearAllMocks();
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
      screen.getByTestId("preferences-item-select-button")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("preferences-item-select-value")
    ).toBeInTheDocument();
  });

  //   it("displays current value when preferences data exists", () => {
  //     const queryClient = createTestQueryClient();
  //     queryClient.setQueryData(["preferences"], {
  //       maxPrepTimeMinutes: 30,
  //     });

  //     render(
  //       <QueryClientProvider client={queryClient}>
  //         <PreferencesItemSelect
  //           title="Max Prep Time"
  //           preferenceKey="maxPrepTimeMinutes"
  //         />
  //       </QueryClientProvider>
  //     );

  //     expect(screen.getByDisplayValue("30")).toBeInTheDocument();
  //   });

  //   it("shows placeholder when no current value", () => {
  //     renderWithQueryClient(
  //       <PreferencesItemSelect
  //         title="Max Prep Time"
  //         preferenceKey="maxPrepTimeMinutes"
  //       />
  //     );

  //     expect(screen.getByText("Select max prep time")).toBeInTheDocument();
  //   });

  //   it("opens select options when clicked", async () => {
  //     renderWithQueryClient(
  //       <PreferencesItemSelect
  //         title="Max Prep Time"
  //         preferenceKey="maxPrepTimeMinutes"
  //       />
  //     );

  //     const selectButton = screen.getByTestId("preferences-item-select-button");
  //     fireEvent.click(selectButton);

  //     await waitFor(() => {
  //       expect(screen.getByText("15 minutes")).toBeInTheDocument();
  //       expect(screen.getByText("30 minutes")).toBeInTheDocument();
  //       expect(screen.getByText("60 minutes")).toBeInTheDocument();
  //     });
  //   });

  //   it("handles value change for numeric preferences", async () => {
  //     const queryClient = createTestQueryClient();
  //     queryClient.setQueryData(["preferences"], {
  //       maxPrepTimeMinutes: 15,
  //     });

  //     render(
  //       <QueryClientProvider client={queryClient}>
  //         <PreferencesItemSelect
  //           title="Max Prep Time"
  //           preferenceKey="maxPrepTimeMinutes"
  //         />
  //       </QueryClientProvider>
  //     );

  //     const selectButton = screen.getByTestId("preferences-item-select-button");
  //     fireEvent.click(selectButton);

  //     await waitFor(() => {
  //       const option = screen.getByText("30 minutes");
  //       fireEvent.click(option);
  //     });

  //     // The mutation should be called with the parsed integer value
  //     expect(useUpdatePreferences().mutateAsync).toHaveBeenCalledWith({
  //       field: "maxPrepTimeMinutes",
  //       value: 30,
  //       originalData: { maxPrepTimeMinutes: 15 },
  //     });
  //   });
});
