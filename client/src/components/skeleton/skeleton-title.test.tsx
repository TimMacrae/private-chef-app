import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { SkeletonTitle } from "./skeleton-title";

describe("SkeletonTitle component", () => {
  it("should render the skeleton component with the correct test ID", () => {
    render(<SkeletonTitle />);
    const skeletonTitle = screen.getByTestId("skeleton-title");
    expect(skeletonTitle).toBeInTheDocument();
  });
});
