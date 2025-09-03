import { render, screen } from "@testing-library/react";
import { FeedbackMessageError } from "./feedback-message-error";
import { describe, it, expect } from "vitest";

describe("FeedbackMessageError", () => {
  it("renders default error message", () => {
    render(<FeedbackMessageError />);
    expect(screen.getByText("An error occurred")).toBeInTheDocument();
    expect(screen.getByText("Please try again later.")).toBeInTheDocument();
  });

  it("renders custom title and message", () => {
    render(
      <FeedbackMessageError
        title="Custom Title"
        message="Custom error message"
      />
    );
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
    expect(screen.getByText("Custom error message")).toBeInTheDocument();
  });
});
