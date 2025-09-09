import { render, screen, within } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { SkeletonMealPlanning } from "./skeleton-meal-planning";

// Mock the SkeletonTitle component to isolate the test
vi.mock("./skeleton-title", () => ({
  SkeletonTitle: () => <div data-testid="skeleton-title"></div>,
}));

describe("SkeletonMealPlanning component", () => {
  it("should render the main loading container and title", () => {
    render(<SkeletonMealPlanning />);
    expect(screen.getByTestId("loading-container")).toBeInTheDocument();
    expect(screen.getByTestId("skeleton-title")).toBeInTheDocument();
  });

  it("should render the skeleton table structure", () => {
    render(<SkeletonMealPlanning />);
    expect(
      screen.getByTestId("skeleton-meal-planning-table")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("skeleton-meal-planning-table-header")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("skeleton-meal-planning-table-body")
    ).toBeInTheDocument();
  });

  it("should render the correct number of skeleton rows in the table body", () => {
    render(<SkeletonMealPlanning />);
    const tableBody = screen.getByTestId("skeleton-meal-planning-table-body");
    const rows = within(tableBody).getAllByRole("row");
    expect(rows).toHaveLength(7);
  });

  it("should render the skeleton footer elements", () => {
    render(<SkeletonMealPlanning />);
    const footer = screen.getByTestId("skeleton-meal-planning-table-footer");
    expect(footer).toBeInTheDocument();

    // Check for the two skeleton elements inside the footer
    const skeletons = within(footer).getAllByRole("generic", { hidden: true });
    expect(skeletons).toHaveLength(2);
  });
});
