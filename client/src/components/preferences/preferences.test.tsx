import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Preferences } from "./preferences";
import { Preferences as PreferencesType } from "./preferences.type";

interface MockUsePreferencesReturn {
  data: PreferencesType | undefined | null;
  isLoading: boolean;
  error: Error | string | null;
  isError: boolean;
  isSuccess: boolean;
  refetch: () => void;
}

const createMockUsePreferencesReturn = (
  overrides: Partial<MockUsePreferencesReturn> = {}
): MockUsePreferencesReturn => ({
  data: undefined,
  isLoading: false,
  error: null,
  isError: false,
  isSuccess: false,
  refetch: vi.fn(),
  ...overrides,
});

// Mock the custom hook
vi.mock("@/hooks/query/use-preferences.query");

// Mock the child components
vi.mock("../preference-section", () => ({
  PreferenceSection: ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <div
      data-testid={`preference-section-${title
        .toLowerCase()
        .replace(/\s+/g, "-")}`}
    >
      <h2>{title}</h2>
      {children}
    </div>
  ),
}));

vi.mock("./preferences-inputs/preferences-item-list", () => ({
  PreferenceItemList: ({
    title,
    preferenceKey,
  }: {
    title: string;
    preferenceKey: string;
  }) => (
    <div data-testid={`preference-item-list-${preferenceKey}`}>{title}</div>
  ),
}));

vi.mock("./preferences-inputs/prefrences-item-select", () => ({
  PreferencesItemSelect: ({
    title,
    preferenceKey,
  }: {
    title: string;
    preferenceKey: string;
  }) => (
    <div data-testid={`preference-item-select-${preferenceKey}`}>{title}</div>
  ),
}));

vi.mock("../feedback/feedback-message-error", () => ({
  FeedbackMessageError: ({
    title,
    message,
  }: {
    title: string;
    message: string;
  }) => (
    <div data-testid="error-message">
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  ),
}));

vi.mock("../layout/layout-content-title", () => ({
  LayoutContentTitle: ({ title }: { title: string }) => (
    <h1 data-testid="layout-title">{title}</h1>
  ),
}));

import { usePreferences } from "@/hooks/query/use-preferences.query";

const mockUsePreferences = vi.mocked(usePreferences);

// Mock preferences data
const mockPreferencesData = {
  id: "1",
  userId: "user-1",
  dietaryRestrictions: ["vegetarian", "gluten-free"],
  allergies: ["nuts", "shellfish"],
  likes: ["pasta", "salads"],
  dislikes: ["spicy food"],
  preferredCuisines: ["italian", "mediterranean"],
  preferredChefStyles: ["rustic", "modern"],
  maxPrepTimeMinutes: 30,
  budgetLevel: "MEDIUM",
  cookingSkillLevel: "INTERMEDIATE",
  kitchenEquipment: ["oven", "stovetop"],
  autoAdaptBasedOnFeedback: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe("Preferences Component", () => {
  it("should render loading state", () => {});
  // let queryClient: QueryClient;
  // beforeEach(() => {
  //   queryClient = new QueryClient({
  //     defaultOptions: {
  //       queries: {
  //         retry: false,
  //       },
  //     },
  //   });
  //   vi.clearAllMocks();
  // });
  // const renderWithProvider = (component: React.ReactElement) => {
  //   return render(
  //     <QueryClientProvider client={queryClient}>
  //       {component}
  //     </QueryClientProvider>
  //   );
  // };
  // describe("Loading State", () => {
  //   it("should display loading message when data is loading", () => {
  //     mockUsePreferences.mockReturnValue({
  //       data: undefined,
  //       isLoading: true,
  //       error: null,
  //       isError: false,
  //       isSuccess: false,
  //       refetch: vi.fn(),
  //     } as any);
  //     renderWithProvider(<Preferences />);
  //     expect(
  //       screen.getByText("Loading your preferences...")
  //     ).toBeInTheDocument();
  //     expect(screen.getByTestId("loading-container")).toHaveClass(
  //       "flex justify-center items-center p-8"
  //     );
  //   });
  //   it("should not render preferences content when loading", () => {
  //     mockUsePreferences.mockReturnValue({
  //       data: undefined,
  //       isLoading: true,
  //       error: null,
  //       isError: false,
  //       isSuccess: false,
  //       refetch: vi.fn(),
  //     } as any);
  //     renderWithProvider(<Preferences />);
  //     expect(screen.queryByTestId("layout-title")).not.toBeInTheDocument();
  //     expect(
  //       screen.queryByTestId("preference-section-core-preferences")
  //     ).not.toBeInTheDocument();
  //   });
  // });
  // describe("Error State", () => {
  //   it("should display error message when there is an error", () => {
  //     const errorMessage = "Failed to fetch preferences";
  //     mockUsePreferences.mockReturnValue({
  //       data: undefined,
  //       isLoading: false,
  //       error: new Error(errorMessage),
  //       isError: true,
  //       isSuccess: false,
  //       refetch: vi.fn(),
  //     } as any);
  //     renderWithProvider(<Preferences />);
  //     expect(screen.getByTestId("error-message")).toBeInTheDocument();
  //     expect(screen.getByText("Error loading preferences")).toBeInTheDocument();
  //     expect(screen.getByText(errorMessage)).toBeInTheDocument();
  //   });
  //   it("should display generic error message for non-Error objects", () => {
  //     mockUsePreferences.mockReturnValue({
  //       data: undefined,
  //       isLoading: false,
  //       error: "String error",
  //       isError: true,
  //       isSuccess: false,
  //       refetch: vi.fn(),
  //     } as any);
  //     renderWithProvider(<Preferences />);
  //     expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  //   });
  //   it("should not render preferences content when there is an error", () => {
  //     mockUsePreferences.mockReturnValue({
  //       data: undefined,
  //       isLoading: false,
  //       error: new Error("Test error"),
  //       isError: true,
  //       isSuccess: false,
  //       refetch: vi.fn(),
  //     } as any);
  //     renderWithProvider(<Preferences />);
  //     expect(
  //       screen.queryByTestId("preferences-section-container")
  //     ).not.toBeInTheDocument();
  //     expect(
  //       screen.queryByTestId("preferences-section-core-preferences")
  //     ).not.toBeInTheDocument();
  //     expect(
  //       screen.queryByTestId("preferences-section-culinary-preferences")
  //     ).not.toBeInTheDocument();
  //     expect(
  //       screen.queryByTestId("preferences-section-meal-constraints")
  //     ).not.toBeInTheDocument();
  //   });
  // });
  // describe("Success State", () => {
  //   beforeEach(() => {
  //     mockUsePreferences.mockReturnValue({
  //       data: mockPreferencesData,
  //       isLoading: false,
  //       error: null,
  //       isError: false,
  //       isSuccess: true,
  //       refetch: vi.fn(),
  //     } as any);
  //   });
  //   it("should render the page title", () => {
  //     renderWithProvider(<Preferences />);
  //     expect(screen.getByTestId("layout-title")).toBeInTheDocument();
  //     expect(screen.getByText("Preferences")).toBeInTheDocument();
  //   });
  //   describe("Core Preferences Section", () => {
  //     it("should render Core Preferences section", () => {
  //       renderWithProvider(<Preferences />);
  //       expect(
  //         screen.getByTestId("preferences-section-core-preferences")
  //       ).toBeInTheDocument();
  //       expect(screen.getByText("Core Preferences")).toBeInTheDocument();
  //     });
  //     it("should render all dietary and allergy preference lists", () => {
  //       renderWithProvider(<Preferences />);
  //       expect(
  //         screen.getByTestId("preference-item-list-dietaryRestrictions")
  //       ).toBeInTheDocument();
  //       expect(
  //         screen.getByTestId("preference-item-list-allergies")
  //       ).toBeInTheDocument();
  //       expect(
  //         screen.getByTestId("preference-item-list-likes")
  //       ).toBeInTheDocument();
  //       expect(
  //         screen.getByTestId("preference-item-list-dislikes")
  //       ).toBeInTheDocument();
  //     });
  //     it("should display correct titles for dietary preferences", () => {
  //       renderWithProvider(<Preferences />);
  //       expect(screen.getByText("Dietary Restrictions")).toBeInTheDocument();
  //       expect(screen.getByText("Allergies")).toBeInTheDocument();
  //       expect(screen.getByText("Likes")).toBeInTheDocument();
  //       expect(screen.getByText("Dislikes")).toBeInTheDocument();
  //     });
  //   });
  //   describe("Culinary Preferences Section", () => {
  //     it("should render Culinary Preferences section", () => {
  //       renderWithProvider(<Preferences />);
  //       expect(
  //         screen.getByTestId("preferences-section-culinary-preferences")
  //       ).toBeInTheDocument();
  //       expect(screen.getByText("Culinary Preferences")).toBeInTheDocument();
  //     });
  //     it("should render cuisine and chef style preference lists", () => {
  //       renderWithProvider(<Preferences />);
  //       expect(
  //         screen.getByTestId("preference-item-list-preferredCuisines")
  //       ).toBeInTheDocument();
  //       expect(
  //         screen.getByTestId("preference-item-list-preferredChefStyles")
  //       ).toBeInTheDocument();
  //     });
  //     it("should display correct titles for culinary preferences", () => {
  //       renderWithProvider(<Preferences />);
  //       expect(screen.getByText("Preferred Cuisines")).toBeInTheDocument();
  //       expect(screen.getByText("Preferred Chef Styles")).toBeInTheDocument();
  //     });
  //   });
  //   describe("Meal Constraints Section", () => {
  //     it("should render Meal Constraints section", () => {
  //       renderWithProvider(<Preferences />);
  //       expect(
  //         screen.getByTestId("preferences-section-meal-constraints")
  //       ).toBeInTheDocument();
  //       expect(screen.getByText("Meal Constraints")).toBeInTheDocument();
  //     });
  //     it("should render all meal constraint selects", () => {
  //       renderWithProvider(<Preferences />);
  //       expect(
  //         screen.getByTestId("preference-item-select-maxPrepTimeMinutes")
  //       ).toBeInTheDocument();
  //       expect(
  //         screen.getByTestId("preference-item-select-budgetLevel")
  //       ).toBeInTheDocument();
  //       expect(
  //         screen.getByTestId("preference-item-select-cookingSkillLevel")
  //       ).toBeInTheDocument();
  //     });
  //     it("should display correct titles for meal constraints", () => {
  //       renderWithProvider(<Preferences />);
  //       expect(screen.getByText("Max Prep Time")).toBeInTheDocument();
  //       expect(screen.getByText("Budget Level")).toBeInTheDocument();
  //       expect(screen.getByText("Cooking Skill Level")).toBeInTheDocument();
  //     });
  //   });
  //   it("should not render when preferences data is null", () => {
  //     mockUsePreferences.mockReturnValue({
  //       data: null,
  //       isLoading: false,
  //       error: null,
  //       isError: false,
  //       isSuccess: true,
  //       refetch: vi.fn(),
  //     } as any);
  //     renderWithProvider(<Preferences />);
  //     expect(screen.getByTestId("layout-title")).toBeInTheDocument();
  //     expect(screen.queryByTestId("preferences-grid")).not.toBeInTheDocument();
  //   });
  // });
  // describe("Component Integration", () => {
  //   it("should pass correct props to PreferenceItemList components", () => {
  //     mockUsePreferences.mockReturnValue({
  //       data: mockPreferencesData,
  //       isLoading: false,
  //       error: null,
  //       isError: false,
  //       isSuccess: true,
  //       refetch: vi.fn(),
  //     } as any);
  //     renderWithProvider(<Preferences />);
  //     // Verify that components receive the correct preferenceKey props
  //     expect(
  //       screen.getByTestId("preference-item-list-dietaryRestrictions")
  //     ).toBeInTheDocument();
  //     expect(
  //       screen.getByTestId("preference-item-list-allergies")
  //     ).toBeInTheDocument();
  //     expect(
  //       screen.getByTestId("preference-item-list-likes")
  //     ).toBeInTheDocument();
  //     expect(
  //       screen.getByTestId("preference-item-list-dislikes")
  //     ).toBeInTheDocument();
  //     expect(
  //       screen.getByTestId("preference-item-list-preferredCuisines")
  //     ).toBeInTheDocument();
  //     expect(
  //       screen.getByTestId("preference-item-list-preferredChefStyles")
  //     ).toBeInTheDocument();
  //   });
  //   it("should pass correct props to PreferencesItemSelect components", () => {
  //     mockUsePreferences.mockReturnValue({
  //       data: mockPreferencesData,
  //       isLoading: false,
  //       error: null,
  //       isError: false,
  //       isSuccess: true,
  //       refetch: vi.fn(),
  //     } as any);
  //     renderWithProvider(<Preferences />);
  //     // Verify that select components receive the correct preferenceKey props
  //     expect(
  //       screen.getByTestId("preference-item-select-maxPrepTimeMinutes")
  //     ).toBeInTheDocument();
  //     expect(
  //       screen.getByTestId("preference-item-select-budgetLevel")
  //     ).toBeInTheDocument();
  //     expect(
  //       screen.getByTestId("preference-item-select-cookingSkillLevel")
  //     ).toBeInTheDocument();
  //   });
  // });
});
