import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { PreferenceItemBadge } from "./preferences-item-badge";
import { createMockMutationResult } from "@/utils/utils-tests";

const mockHandleRemoveItem = vi.fn();
const mockMutateAsync = vi.fn().mockResolvedValue({});

describe("PreferenceItemBadge component", () => {
  const defaultProps = {
    item: "vegetarian",
    index: 0,
    handleRemoveItem: mockHandleRemoveItem,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    removeItemMutation: createMockMutationResult(mockMutateAsync) as any,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Initial Render", () => {
    it("should render the badge with the item text", () => {
      render(<PreferenceItemBadge {...defaultProps} />);
      expect(screen.getByText("vegetarian")).toBeInTheDocument();
    });

    it("should render with the correct test IDs", () => {
      render(<PreferenceItemBadge {...defaultProps} />);
      expect(screen.getByTestId("preference-item-badge-0")).toBeInTheDocument();
      expect(
        screen.getByTestId("preference-item-badge-remove-item-0")
      ).toBeInTheDocument();
    });

    it("should render the remove button", () => {
      render(<PreferenceItemBadge {...defaultProps} />);
      const removeButton = screen.getByRole("button");
      expect(removeButton).toBeInTheDocument();
    });
  });

  describe("Interaction", () => {
    it("should call handleRemoveItem with the correct item when the remove button is clicked", () => {
      render(<PreferenceItemBadge {...defaultProps} />);
      const removeButton = screen.getByTestId(
        "preference-item-badge-remove-item-0"
      );
      fireEvent.click(removeButton);
      expect(mockHandleRemoveItem).toHaveBeenCalledWith("vegetarian");
      expect(mockHandleRemoveItem).toHaveBeenCalledTimes(1);
    });

    it("should change badge style on mouse enter and leave of the remove button", () => {
      render(<PreferenceItemBadge {...defaultProps} />);
      const badge = screen.getByTestId("preference-item-badge-0");
      const removeButton = screen.getByTestId(
        "preference-item-badge-remove-item-0"
      );

      // Initial state
      expect(badge.className).toContain("bg-primary");
      expect(badge.className).not.toContain("bg-primary/80");

      // Hover state
      fireEvent.mouseEnter(removeButton);
      expect(badge.className).toContain("bg-primary/80");
      expect(badge.className).not.toContain("bg-primary ");

      // Mouse leave state
      fireEvent.mouseLeave(removeButton);
      expect(badge.className).toContain("bg-primary");
      expect(badge.className).not.toContain("bg-primary/80");
    });
  });

  describe("Loading State", () => {
    it("should disable the remove button when the mutation is pending", () => {
      const pendingMutation = createMockMutationResult(mockMutateAsync, {
        isPending: true,
      });

      render(
        <PreferenceItemBadge
          {...defaultProps}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          removeItemMutation={pendingMutation as any}
        />
      );

      const removeButton = screen.getByTestId(
        "preference-item-badge-remove-item-0"
      );
      expect(removeButton).toBeDisabled();
    });

    it("should not disable the remove button when the mutation is not pending", () => {
      render(<PreferenceItemBadge {...defaultProps} />);
      const removeButton = screen.getByTestId(
        "preference-item-badge-remove-item-0"
      );
      expect(removeButton).not.toBeDisabled();
    });
  });
});
