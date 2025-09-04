import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { LoadingSpinner } from "./loading-spinner";

describe("LoadingSpinner component", () => {
  it("renders loading spinner", () => {
    render(<LoadingSpinner />);
    expect(screen.getByTestId("loading-container")).toBeInTheDocument();
  });
});
