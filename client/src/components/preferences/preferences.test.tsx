import { describe, it, expect, vi, beforeEach, MockedFunction } from "vitest";
import { screen } from "@testing-library/react";
import { Preferences } from "./preferences";
import { mockPreferencesData } from "./mock/preferences-mock-data";
import { usePreferences } from "@/hooks/query/use-preferences.query";
import {
  createMockQueryResult,
  renderWithQueryClient,
} from "@/utils/utils-tests";

const mockRefetch = vi.fn();

vi.mock("@/hooks/query/use-preferences.query", () => ({
  usePreferences: vi.fn(),
}));

const mockUsePreferences = usePreferences as MockedFunction<
  typeof usePreferences
>;

describe("Preferences Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockRefetch.mockClear();
  });

  it("should display loading container when data is loading", () => {
    mockUsePreferences.mockReturnValue(
      createMockQueryResult(mockRefetch, {
        isLoading: true,
        status: "loading",
        fetchStatus: "fetching",
      })
    );

    renderWithQueryClient(<Preferences />);

    expect(screen.getByTestId("loading-container")).toBeInTheDocument();
    expect(screen.queryByTestId("preferences-section-container")).toBeNull();
  });

  it("should display error message when there is an error and not render preferences", () => {
    const errorMessage = "Failed to fetch preferences";
    mockUsePreferences.mockReturnValue(
      createMockQueryResult(mockRefetch, {
        data: undefined,
        isLoading: false,
        error: new Error(errorMessage),
        isError: true,
        isSuccess: false,
        refetch: mockRefetch,
      })
    );

    renderWithQueryClient(<Preferences />);

    expect(screen.getByTestId("feedback-message-error")).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.queryByTestId("preferences-section-container")).toBeNull();
  });

  describe("Success State", () => {
    beforeEach(() => {
      mockUsePreferences.mockReturnValue(
        createMockQueryResult(mockRefetch, {
          data: mockPreferencesData,
          isLoading: false,
          error: null,
          isError: false,
          isSuccess: true,
          refetch: mockRefetch,
        })
      );
    });

    it("should render the page title", () => {
      renderWithQueryClient(<Preferences />);

      expect(screen.getByTestId("layout-content-title")).toBeInTheDocument();
      expect(screen.getByText("Preferences")).toBeInTheDocument();
    });

    it("should render Core Preferences section", () => {
      renderWithQueryClient(<Preferences />);

      expect(
        screen.getByTestId("preferences-section-core-preferences")
      ).toBeInTheDocument();

      expect(
        screen.getByTestId("preferences-section-meal-constraints")
      ).toBeInTheDocument();

      expect(
        screen.getByTestId("preferences-section-culinary-preferences")
      ).toBeInTheDocument();

      expect(
        screen.getByTestId("preferences-section-seasonal-preferences")
      ).toBeInTheDocument();
    });

    it("should render all items", () => {
      renderWithQueryClient(<Preferences />);

      expect(
        screen.getByTestId("preference-item-list-dietaryRestrictions")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("preference-item-list-allergies")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("preference-item-list-likes")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("preference-item-list-dislikes")
      ).toBeInTheDocument();

      expect(
        screen.getByTestId("preferences-item-select-maxPrepTimeMinutes")
      ).toBeInTheDocument();

      expect(
        screen.getByTestId("preferences-item-select-budgetLevel")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("preferences-item-select-cookingSkillLevel")
      ).toBeInTheDocument();

      expect(
        screen.getByTestId("preference-item-list-preferredCuisines")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("preference-item-list-excludedCuisines")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("preference-item-list-preferredChefStyles")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("preference-item-list-excludedChefStyles")
      ).toBeInTheDocument();

      expect(
        screen.getByTestId(
          "preferences-item-checkbox-seasonalPreferences-spring"
        )
      ).toBeInTheDocument();
      expect(
        screen.getByTestId(
          "preferences-item-checkbox-seasonalPreferences-summer"
        )
      ).toBeInTheDocument();
      expect(
        screen.getByTestId(
          "preferences-item-checkbox-seasonalPreferences-autumn"
        )
      ).toBeInTheDocument();
      expect(
        screen.getByTestId(
          "preferences-item-checkbox-seasonalPreferences-winter"
        )
      ).toBeInTheDocument();
    });
  });

  it("should not render when preferences data is null", () => {
    mockUsePreferences.mockReturnValue(
      createMockQueryResult(mockRefetch, {
        data: null,
        isLoading: false,
        error: null,
        isError: false,
        isSuccess: true,
        refetch: mockRefetch,
      })
    );

    renderWithQueryClient(<Preferences />);

    expect(screen.queryByTestId("preferences-section-container")).toBeNull();
  });
});
