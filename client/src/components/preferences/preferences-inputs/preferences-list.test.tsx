import { fireEvent, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, MockedFunction, vi, beforeEach } from "vitest";
import { PreferenceList } from "./preferences-list";
import { usePreferences } from "@/hooks/query/use-preferences.query";
import { mockPreferencesData } from "../mock/preferences-mock-data";
import {
  renderWithQueryClient,
  createMockQueryResult,
} from "@/utils/utils-tests";

// Create persistent mock functions
const mockRefetch = vi.fn();
const mockMutateAsync = vi.fn().mockResolvedValue({});

// Mock the hooks
vi.mock("@/hooks/query/use-preferences.query", () => ({
  usePreferences: vi.fn(),
}));

vi.mock("../mutation/use-remove-preferences.mutation", () => ({
  useRemovePreferenceItem: vi.fn(() => ({
    mutateAsync: mockMutateAsync,
  })),
}));

const mockUsePreferences = usePreferences as MockedFunction<
  typeof usePreferences
>;

describe("PreferenceList component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockRefetch.mockClear();
    mockMutateAsync.mockClear();
  });

  it("should display loading message when data is pending", () => {
    mockUsePreferences.mockReturnValue(
      createMockQueryResult(mockRefetch, {
        data: undefined,
        isPending: true,
        isLoading: true,
      })
    );

    renderWithQueryClient(
      <PreferenceList preferenceKey="dietaryRestrictions" />
    );

    expect(screen.getByTestId("loading-container")).toBeInTheDocument();
    expect(
      screen.queryByTestId("preference-list-dietaryRestrictions")
    ).not.toBeInTheDocument();
  });

  describe("Success State", () => {
    beforeEach(() => {
      mockUsePreferences.mockReturnValue(
        createMockQueryResult(mockRefetch, {
          data: {
            ...mockPreferencesData,
            dietaryRestrictions: ["vegetarian", "gluten-free"],
            likes: ["pasta", "salads"],
          },
          isPending: false,
          isLoading: false,
          isSuccess: true,
        })
      );
    });

    it("should render preference list with items", () => {
      renderWithQueryClient(
        <PreferenceList preferenceKey="dietaryRestrictions" />
      );

      expect(
        screen.getByTestId("preference-list-dietaryRestrictions")
      ).toBeInTheDocument();
      expect(screen.getByText("vegetarian")).toBeInTheDocument();
      expect(screen.getByText("gluten-free")).toBeInTheDocument();
    });

    it("should render correct number of preference item badges", () => {
      renderWithQueryClient(<PreferenceList preferenceKey="likes" />);

      expect(screen.getByTestId("preference-item-badge-0")).toBeInTheDocument();
      expect(screen.getByTestId("preference-item-badge-1")).toBeInTheDocument();
      expect(screen.getByText("pasta")).toBeInTheDocument();
      expect(screen.getByText("salads")).toBeInTheDocument();
    });

    it("should display 'None specified' when preference array is empty", () => {
      renderWithQueryClient(
        <PreferenceList preferenceKey="excludedCuisines" />
      );

      expect(
        screen.getByTestId("preference-item-none-specified")
      ).toBeInTheDocument();
      expect(
        screen.queryByTestId("preference-item-badge-0")
      ).not.toBeInTheDocument();
    });
  });

  describe("Item Removal", () => {
    beforeEach(() => {
      mockUsePreferences.mockReturnValue(
        createMockQueryResult(mockRefetch, {
          data: {
            ...mockPreferencesData,
            dietaryRestrictions: ["vegetarian", "gluten-free"],
            likes: ["pasta", "salads"],
          },
          isPending: false,
          isLoading: false,
          isSuccess: true,
        })
      );
    });

    it("should call removeItemMutation when handleRemoveItem is called", async () => {
      renderWithQueryClient(
        <PreferenceList preferenceKey="dietaryRestrictions" />
      );

      const removeButton = screen.getByTestId(
        "preference-item-badge-remove-item-0"
      );
      fireEvent.click(removeButton);

      await waitFor(() => {
        expect(mockMutateAsync).toHaveBeenCalledWith({
          field: "dietaryRestrictions",
          item: "vegetarian",
        });
      });
    });

    it("should pass correct props to PreferenceItemBadge components", () => {
      renderWithQueryClient(<PreferenceList preferenceKey="likes" />);

      expect(
        screen.getByTestId("preference-item-badge-remove-item-0")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("preference-item-badge-remove-item-1")
      ).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("should handle when data is null", () => {
      mockUsePreferences.mockReturnValue(
        createMockQueryResult(mockRefetch, {
          data: null,
          isPending: false,
          isLoading: false,
          isSuccess: true,
        })
      );

      renderWithQueryClient(
        <PreferenceList preferenceKey="dietaryRestrictions" />
      );

      expect(
        screen.getByTestId("preference-item-none-specified")
      ).toBeInTheDocument();
    });

    it("should handle when data is undefined", () => {
      mockUsePreferences.mockReturnValue(
        createMockQueryResult(mockRefetch, {
          data: undefined,
          isPending: false,
          isLoading: false,
          isSuccess: false,
        })
      );

      renderWithQueryClient(
        <PreferenceList preferenceKey="dietaryRestrictions" />
      );

      expect(
        screen.getByTestId("preference-item-none-specified")
      ).toBeInTheDocument();
    });
  });
});
