import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { PreferenceSection } from "./preference-section";

describe("PreferenceSection component", () => {
  it("render with title and children", () => {
    render(
      <PreferenceSection title="Custom Title" dataTestId="preference-section">
        <div data-testid="custom-children">Custom children</div>
      </PreferenceSection>
    );
    expect(screen.getByTestId("preference-section")).toBeInTheDocument();
    expect(screen.getByTestId("preference-section-title")).toBeInTheDocument();
    expect(screen.getByTestId("custom-children")).toBeInTheDocument();
  });
});
