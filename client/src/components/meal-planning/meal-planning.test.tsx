import { fireEvent, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, MockedFunction, vi, beforeEach } from "vitest";
import { MealPlanning } from "./meal-planning";
import { useMealPlanning } from "@/hooks/query/use-meal-planning.query";
import {
  renderWithQueryClient,
  createMockQueryResult,
} from "@/utils/utils-tests";
import { mockMealPlanningData } from "./mock/meal-planning-mock-data";

// Create persistent mock functions
const mockMutate = vi.fn();
const mockRefetch = vi.fn();

// Mock the hooks
vi.mock("@/hooks/query/use-meal-planning.query", () => ({
  useMealPlanning: vi.fn(),
}));

vi.mock("./mutation/use-update-meal-planning.mutation", () => ({
  useUpdateMealPlanning: vi.fn(() => ({
    mutate: mockMutate,
  })),
}));

const mockUseMealPlanning = useMealPlanning as MockedFunction<
  typeof useMealPlanning
>;

describe("MealPlanning component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockMutate.mockClear();
    mockRefetch.mockClear();
  });

  it("should display loading spinner when data is loading", () => {
    mockUseMealPlanning.mockReturnValue(
      createMockQueryResult(mockRefetch, {
        data: undefined,
        isLoading: true,
        error: null,
      })
    );

    renderWithQueryClient(<MealPlanning />);
    expect(screen.getByTestId("loading-container")).toBeInTheDocument();

    expect(screen.queryByTestId("meal-planning-table")).toBeNull();
  });

  it("should display error message when there is an error", () => {
    const errorMessage = "Failed to fetch meal plan";
    mockUseMealPlanning.mockReturnValue(
      createMockQueryResult(mockRefetch, {
        data: undefined,
        isLoading: false,
        error: new Error(errorMessage),
      })
    );

    renderWithQueryClient(<MealPlanning />);

    expect(screen.getByTestId("feedback-message-error")).toBeInTheDocument();
  });

  describe("Success State", () => {
    beforeEach(() => {
      mockUseMealPlanning.mockReturnValue(
        createMockQueryResult(mockRefetch, {
          data: mockMealPlanningData,
          isLoading: false,
          error: null,
        })
      );
    });

    it("should render the meal planning table with data", () => {
      renderWithQueryClient(<MealPlanning />);
      expect(screen.getByTestId("layout-content-title")).toBeInTheDocument();
      expect(screen.getByTestId("meal-planning-table")).toBeInTheDocument();
      expect(
        screen.getByTestId("meal-planning-table-head-breakfast")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("meal-planning-table-head-lunch")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("meal-planning-table-head-dinner")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("meal-planning-table-cell-monday")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("meal-planning-table-cell-tuesday")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("meal-planning-table-cell-wednesday")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("meal-planning-table-cell-thursday")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("meal-planning-table-cell-friday")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("meal-planning-table-cell-saturday")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("meal-planning-table-cell-sunday")
      ).toBeInTheDocument();

      // Check for buttons and check icons in cell
      expect(
        screen.getByTestId("meal-planning-table-cell-button-monday-breakfast")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("meal-planning-table-cell-button-monday-lunch")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("meal-planning-table-cell-button-monday-dinner")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("meal-planning-table-cell-check-monday-breakfast")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("meal-planning-table-cell-check-monday-lunch")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("meal-planning-table-cell-check-monday-dinner")
      ).toBeInTheDocument();

      expect(
        screen.getByTestId("meal-planning-table-cell-button-tuesday-breakfast")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("meal-planning-table-cell-button-tuesday-lunch")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("meal-planning-table-cell-button-tuesday-dinner")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("meal-planning-table-cell-check-tuesday-breakfast")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("meal-planning-table-cell-check-tuesday-lunch")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("meal-planning-table-cell-check-tuesday-dinner")
      ).toBeInTheDocument();

      expect(
        screen.getByTestId(
          "meal-planning-table-cell-button-wednesday-breakfast"
        )
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("meal-planning-table-cell-button-wednesday-lunch")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("meal-planning-table-cell-button-wednesday-dinner")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("meal-planning-table-cell-check-wednesday-breakfast")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("meal-planning-table-cell-check-wednesday-lunch")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("meal-planning-table-cell-check-wednesday-dinner")
      ).toBeInTheDocument();

      expect(
        screen.getByTestId("meal-planning-table-cell-button-thursday-breakfast")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("meal-planning-table-cell-button-thursday-lunch")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("meal-planning-table-cell-button-thursday-dinner")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("meal-planning-table-cell-check-thursday-breakfast")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("meal-planning-table-cell-check-thursday-lunch")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("meal-planning-table-cell-check-thursday-dinner")
      ).toBeInTheDocument();

      expect(
        screen.getByTestId("meal-planning-table-cell-button-friday-breakfast")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("meal-planning-table-cell-button-friday-lunch")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("meal-planning-table-cell-button-friday-dinner")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("meal-planning-table-cell-check-friday-breakfast")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("meal-planning-table-cell-check-friday-lunch")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("meal-planning-table-cell-check-friday-dinner")
      ).toBeInTheDocument();

      expect(
        screen.getByTestId("meal-planning-table-cell-button-saturday-breakfast")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("meal-planning-table-cell-button-saturday-lunch")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("meal-planning-table-cell-button-saturday-dinner")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("meal-planning-table-cell-check-saturday-breakfast")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("meal-planning-table-cell-check-saturday-lunch")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("meal-planning-table-cell-check-saturday-dinner")
      ).toBeInTheDocument();

      expect(
        screen.getByTestId("meal-planning-table-cell-button-sunday-breakfast")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("meal-planning-table-cell-button-sunday-lunch")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("meal-planning-table-cell-button-sunday-dinner")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("meal-planning-table-cell-check-sunday-breakfast")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("meal-planning-table-cell-check-sunday-lunch")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("meal-planning-table-cell-check-sunday-dinner")
      ).toBeInTheDocument();

      // Check for a checked and an unchecked cell
      const mondayBreakfastCell = screen.getByTestId(
        "meal-planning-table-cell-check-monday-breakfast"
      );
      const mondayLunchCell = screen.getByTestId(
        "meal-planning-table-cell-check-monday-lunch"
      );

      expect(mondayBreakfastCell).toHaveClass("opacity-100");
      expect(mondayLunchCell).toHaveClass("opacity-0");
    });

    it("should render the toggle switch correctly when active", () => {
      renderWithQueryClient(<MealPlanning />);
      const toggle = screen.getByTestId("meal-planning-switch");
      expect(toggle).toBeInTheDocument();
      expect(toggle).toBeChecked();
      expect(screen.getByText("Deactivate")).toBeInTheDocument();
    });

    it("should render the toggle switch correctly when inactive", () => {
      mockUseMealPlanning.mockReturnValue(
        createMockQueryResult(mockRefetch, {
          data: { ...mockMealPlanningData, active: false },
          isLoading: false,
          error: null,
        })
      );
      renderWithQueryClient(<MealPlanning />);
      const toggle = screen.getByTestId("meal-planning-switch");
      expect(toggle).not.toBeChecked();
      expect(screen.getByText("Activate")).toBeInTheDocument();
    });
  });

  describe("Interactions", () => {
    beforeEach(() => {
      mockUseMealPlanning.mockReturnValue(
        createMockQueryResult(mockRefetch, {
          data: mockMealPlanningData,
          isLoading: false,
          error: null,
        })
      );
    });

    it("should call update mutation when a table cell is clicked", async () => {
      renderWithQueryClient(<MealPlanning />);

      const cellButton = screen.getByTestId(
        "meal-planning-table-cell-button-wednesday-lunch"
      );
      fireEvent.click(cellButton);

      await waitFor(() => {
        expect(mockMutate).toHaveBeenCalledTimes(1);
        const expectedPlan = JSON.parse(JSON.stringify(mockMealPlanningData));
        expectedPlan.wednesday.lunch = true;
        expect(mockMutate).toHaveBeenCalledWith(expectedPlan);
      });
    });

    it("should call update mutation when the active toggle is switched", async () => {
      renderWithQueryClient(<MealPlanning />);

      const toggle = screen.getByRole("switch");
      fireEvent.click(toggle);

      await waitFor(() => {
        expect(mockMutate).toHaveBeenCalledTimes(1);
        expect(mockMutate).toHaveBeenCalledWith({
          ...mockMealPlanningData,
          active: false,
        });
      });
    });
  });
});
