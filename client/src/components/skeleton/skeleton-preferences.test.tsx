import { render, screen, within } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { SkeletonPreferences } from "./skeleton-preferences";

// Mock the SkeletonTitle component
vi.mock("./skeleton-title", () => ({
  SkeletonTitle: () => <div data-testid="skeleton-title"></div>,
}));

describe("SkeletonPreferences component", () => {
  beforeEach(() => {
    render(<SkeletonPreferences />);
  });

  it("should render the main loading container and title", () => {
    expect(screen.getByTestId("loading-container")).toBeInTheDocument();
    expect(screen.getByTestId("skeleton-title")).toBeInTheDocument();
  });

  describe("Preference Sections", () => {
    it("should render the Core Preferences section", () => {
      const corePrefsSection = screen.getByTestId("skeleton-core-preferences");
      expect(corePrefsSection).toBeInTheDocument();
    });

    it("should render the Culinary Preferences section", () => {
      const culinaryPrefsSection = screen.getByTestId(
        "skeleton-culinary-preferences"
      );
      expect(culinaryPrefsSection).toBeInTheDocument();
    });

    it("should render the Meal Constraints section", () => {
      const mealConstraintsSection = screen.getByTestId(
        "skeleton-meal-constraints"
      );
      expect(mealConstraintsSection).toBeInTheDocument();
    });

    it("should render the Seasonal Preferences section", () => {
      const seasonalPrefsSection = screen.getByTestId(
        "skeleton-seasonal-preferences"
      );
      expect(seasonalPrefsSection).toBeInTheDocument();
    });
  });

  describe("SkeletonPreferenceListItem rendering", () => {
    it("should render correctly for 'isNone' prop", () => {
      const corePrefsSection = screen.getByTestId("skeleton-core-preferences");
      const firstListItem = within(corePrefsSection).getAllByTestId(
        "skeleton-preference-list-item"
      )[0];
      const skeletons = within(firstListItem).getAllByRole("generic", {
        hidden: true,
      });
      expect(skeletons).toHaveLength(2);
    });
  });
});
