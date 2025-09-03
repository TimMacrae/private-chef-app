import { screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, MockedFunction, vi } from "vitest";
import {
  createMockMutationResult,
  renderWithQueryClient,
} from "@/utils/utils-tests";
import { useUpdatePreferences } from "../mutation/use-update-preferences.mutation";
import { mockPreferencesData } from "../mock/preferences-mock-data";
import { PreferencesItemCheckbox } from "./preferences-item-checkbox";
import { toast } from "sonner";

const mockMutateAsync = vi.fn().mockResolvedValue({});
const mockGetQueryData = vi.fn();

vi.mock("../mutation/use-update-preferences.mutation", () => ({
  useUpdatePreferences: vi.fn(),
}));

vi.mock("@tanstack/react-query", async () => {
  const actual = await vi.importActual("@tanstack/react-query");
  return {
    ...actual,
    useQueryClient: vi.fn(() => ({
      getQueryData: mockGetQueryData,
    })),
  };
});

vi.mock("sonner", () => ({
  toast: {
    error: vi.fn(),
  },
}));

const mockUseUpdatePreferences = useUpdatePreferences as MockedFunction<
  typeof useUpdatePreferences
>;

describe("PreferencesItemCheckbox component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockMutateAsync.mockClear();
    mockGetQueryData.mockClear();

    mockUseUpdatePreferences.mockReturnValue(
      createMockMutationResult(mockMutateAsync)
    );
    mockGetQueryData.mockReturnValue(mockPreferencesData);
  });

  describe("Initial Render", () => {
    it("should render the checkbox with the correct title", () => {
      renderWithQueryClient(
        <PreferencesItemCheckbox
          title="Autumn"
          preferenceKey="seasonalPreferences"
          preferenceSubKey="autumn"
        />
      );

      expect(screen.getByLabelText("Autumn")).toBeInTheDocument();
    });

    it("should render with the correct test IDs", () => {
      renderWithQueryClient(
        <PreferencesItemCheckbox
          title="Autumn"
          preferenceKey="seasonalPreferences"
          preferenceSubKey="autumn"
        />
      );

      expect(
        screen.getByTestId(
          "preferences-item-checkbox-seasonalPreferences-autumn"
        )
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("preferences-item-checkbox-button")
      ).toBeInTheDocument();
    });

    it("should be checked if the preference value is true", () => {
      renderWithQueryClient(
        <PreferencesItemCheckbox
          title="Spring"
          preferenceKey="seasonalPreferences"
          preferenceSubKey="spring"
        />
      );

      const checkbox = screen.getByTestId("preferences-item-checkbox-button");
      expect(checkbox).toBeChecked();
    });

    it("should be unchecked if the preference value is false", () => {
      const modifiedData = {
        ...mockPreferencesData,
        seasonalPreferences: {
          ...mockPreferencesData.seasonalPreferences,
          winter: false,
        },
      };
      mockGetQueryData.mockReturnValue(modifiedData);

      renderWithQueryClient(
        <PreferencesItemCheckbox
          title="Winter"
          preferenceKey="seasonalPreferences"
          preferenceSubKey="winter"
        />
      );

      const checkbox = screen.getByTestId("preferences-item-checkbox-button");
      expect(checkbox).not.toBeChecked();
    });

    it("should be unchecked if data is not available", () => {
      mockGetQueryData.mockReturnValue(null);

      renderWithQueryClient(
        <PreferencesItemCheckbox
          title="Summer"
          preferenceKey="seasonalPreferences"
          preferenceSubKey="summer"
        />
      );

      const checkbox = screen.getByTestId("preferences-item-checkbox-button");
      expect(checkbox).not.toBeChecked();
    });
  });

  describe("Interaction", () => {
    it("should call updateMutation when an unchecked box is clicked", async () => {
      const modifiedData = {
        ...mockPreferencesData,
        seasonalPreferences: {
          ...mockPreferencesData.seasonalPreferences,
          winter: false,
        },
      };
      mockGetQueryData.mockReturnValue(modifiedData);

      renderWithQueryClient(
        <PreferencesItemCheckbox
          title="Winter"
          preferenceKey="seasonalPreferences"
          preferenceSubKey="winter"
        />
      );

      const checkbox = screen.getByTestId("preferences-item-checkbox-button");
      expect(checkbox).not.toBeChecked();

      fireEvent.click(checkbox);

      const expectedValue = {
        ...modifiedData.seasonalPreferences,
        winter: true,
      };

      await waitFor(() => {
        expect(mockMutateAsync).toHaveBeenCalledWith({
          field: "seasonalPreferences",
          value: expectedValue,
          originalData: modifiedData,
        });
      });
    });

    it("should call updateMutation when a checked box is clicked", async () => {
      renderWithQueryClient(
        <PreferencesItemCheckbox
          title="Spring"
          preferenceKey="seasonalPreferences"
          preferenceSubKey="spring"
        />
      );

      const checkbox = screen.getByTestId("preferences-item-checkbox-button");
      expect(checkbox).toBeChecked();

      fireEvent.click(checkbox);

      const expectedValue = {
        ...mockPreferencesData.seasonalPreferences,
        spring: false,
      };

      await waitFor(() => {
        expect(mockMutateAsync).toHaveBeenCalledWith({
          field: "seasonalPreferences",
          value: expectedValue,
          originalData: mockPreferencesData,
        });
      });
    });
  });

  describe("Loading States", () => {
    it("should disable the checkbox when the mutation is pending", () => {
      mockUseUpdatePreferences.mockReturnValue(
        createMockMutationResult(mockMutateAsync, { isPending: true })
      );

      renderWithQueryClient(
        <PreferencesItemCheckbox
          title="Autumn"
          preferenceKey="seasonalPreferences"
          preferenceSubKey="autumn"
        />
      );

      const checkbox = screen.getByTestId("preferences-item-checkbox-button");
      expect(checkbox).toBeDisabled();
    });
  });

  describe("Error Handling", () => {
    it("should not call mutation and show toast error if no preferences data is available", async () => {
      mockGetQueryData.mockReturnValue(null);
      const mockToastError = vi.spyOn(toast, "error");

      renderWithQueryClient(
        <PreferencesItemCheckbox
          title="Autumn"
          preferenceKey="seasonalPreferences"
          preferenceSubKey="autumn"
        />
      );

      const checkbox = screen.getByTestId("preferences-item-checkbox-button");
      fireEvent.click(checkbox);

      await waitFor(() => {
        expect(mockMutateAsync).not.toHaveBeenCalled();
        expect(mockToastError).toHaveBeenCalledWith(
          "No preferences data available"
        );
      });
    });
  });
});
