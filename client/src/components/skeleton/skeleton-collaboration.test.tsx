import { render, screen } from "@testing-library/react";
import { SkeletonCollaboration } from "./skeleton-collaboration";

import { describe, expect, it } from "vitest";

describe("SkeletonCollaboration", () => {
  it("should render the skeleton collaboration component correctly", () => {
    render(<SkeletonCollaboration />);

    expect(screen.getByTestId("loading-container")).toBeInTheDocument();
    expect(screen.getByTestId("skeleton-title")).toBeInTheDocument();

    expect(screen.getByTestId("skeleton-invite-form")).toBeInTheDocument();
    expect(
      screen.getByTestId("skeleton-collaborators-list")
    ).toBeInTheDocument();

    const listItems = screen.getAllByTestId("skeleton-collaborator-list-item");
    expect(listItems).toHaveLength(2);
  });
});
