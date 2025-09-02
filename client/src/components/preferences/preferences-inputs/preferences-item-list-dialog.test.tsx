import { fireEvent, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, MockedFunction, vi } from "vitest";
import {
  createMockMutationResult,
  createMockQueryResult,
  renderWithQueryClient,
} from "@/utils/utils-tests";
import { usePreferences } from "@/hooks/query/use-preferences.query";
import { mockPreferencesData } from "../mock/preferences-mock-data";
import { PreferencesItemListDialog } from "./preferences-item-list-dialog";
import { useAddPreferenceItem } from "../mutation/use-add-preferences.mutation";

const mockRefetch = vi.fn();
const mockMutateAsync = vi.fn().mockResolvedValue({});
const mockGetQueryData = vi.fn(); // Add this mock function

vi.mock("@/hooks/query/use-preferences.query", () => ({
  usePreferences: vi.fn(),
}));

vi.mock("@/hooks/query/use-preferences.query", () => ({
  usePreferences: vi.fn(),
}));

vi.mock("../mutation/use-add-preferences.mutation", () => ({
  useAddPreferenceItem: vi.fn(() => ({
    mutateAsync: mockMutateAsync,
    isPending: false,
  })),
}));

vi.mock("@tanstack/react-query", async () => {
  const actual = await vi.importActual("@tanstack/react-query");
  return {
    ...actual,
    useQueryClient: vi.fn(() => ({
      getQueryData: mockGetQueryData,
    })),
  };
});

vi.mock("sonner", () => ({
  toast: {
    error: vi.fn(),
  },
}));

const mockUsePreferences = usePreferences as MockedFunction<
  typeof usePreferences
>;
const mockUseAddPreferenceItem = useAddPreferenceItem as MockedFunction<
  typeof useAddPreferenceItem
>;

describe("PreferenceItemListDialog component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockMutateAsync.mockClear();
    mockRefetch.mockClear();
    mockGetQueryData.mockClear();

    mockUsePreferences.mockReturnValue(
      createMockQueryResult(mockRefetch, {
        data: mockPreferencesData,
        isPending: false,
        isLoading: false,
        isSuccess: true,
      })
    );

    mockUseAddPreferenceItem.mockReturnValue(
      createMockMutationResult(mockMutateAsync, {
        isPending: false,
      })
    );

    mockGetQueryData.mockReturnValue(mockPreferencesData);
  });

  it("renders component with trigger button and preferenceKey", () => {
    renderWithQueryClient(
      <PreferencesItemListDialog
        title="Dietary Restrictions"
        preferenceKey="dietaryRestrictions"
      />
    );

    expect(
      screen.getByTestId(
        "preference-item-list-dialog-dietaryRestrictions-trigger"
      )
    ).toBeInTheDocument();
  });
  it("should not show dialog content initially", () => {
    renderWithQueryClient(
      <PreferencesItemListDialog
        title="Dietary Restrictions"
        preferenceKey="dietaryRestrictions"
      />
    );

    expect(
      screen.queryByTestId(
        "preference-item-list-dialog-dietaryRestrictions-button"
      )
    ).toBeNull();
  });

  describe("Dialog Interaction", () => {
    it("should open dialog when trigger button is clicked", async () => {
      renderWithQueryClient(
        <PreferencesItemListDialog
          title="Dietary Restrictions"
          preferenceKey="dietaryRestrictions"
        />
      );

      const trigger = screen.getByTestId(
        "preference-item-list-dialog-dietaryRestrictions-trigger"
      );
      fireEvent.click(trigger);

      await waitFor(() => {
        expect(
          screen.getByText("Add Dietary Restrictions")
        ).toBeInTheDocument();
        expect(
          screen.getByText("Add a new item to your dietary restrictions.")
        ).toBeInTheDocument();
      });
    });

    it("should show correct title and description for different preference keys", async () => {
      renderWithQueryClient(
        <PreferencesItemListDialog
          title="Allergies"
          preferenceKey="allergies"
        />
      );

      const trigger = screen.getByTestId(
        "preference-item-list-dialog-allergies-trigger"
      );
      fireEvent.click(trigger);

      await waitFor(() => {
        expect(screen.getByText("Add Allergies")).toBeInTheDocument();
        expect(
          screen.getByText("Add a new item to your allergies.")
        ).toBeInTheDocument();
      });
    });

    it("should show input field and buttons when dialog is open", async () => {
      renderWithQueryClient(
        <PreferencesItemListDialog title="Likes" preferenceKey="likes" />
      );

      fireEvent.click(
        screen.getByTestId("preference-item-list-dialog-likes-trigger")
      );

      await waitFor(() => {
        expect(
          screen.getByTestId("preference-item-list-dialog-likes-input")
        ).toBeInTheDocument();
        expect(
          screen.getByRole("button", { name: "Cancel" })
        ).toBeInTheDocument();
        expect(
          screen.getByRole("button", { name: "Add Item" })
        ).toBeInTheDocument();
      });
    });
  });
  describe("Form Interaction", () => {
    beforeEach(async () => {
      renderWithQueryClient(
        <PreferencesItemListDialog
          title="Dietary Restrictions"
          preferenceKey="dietaryRestrictions"
        />
      );

      const trigger = screen.getByTestId(
        "preference-item-list-dialog-dietaryRestrictions-trigger"
      );
      fireEvent.click(trigger);

      await waitFor(() => {
        expect(
          screen.getByText("Add Dietary Restrictions")
        ).toBeInTheDocument();
      });
    });

    it("should update input value when typing", async () => {
      const input = screen.getByPlaceholderText("Enter dietary restriction");

      fireEvent.change(input, { target: { value: "keto" } });

      expect(input).toHaveValue("keto");
    });

    it("should disable add button when input is empty", () => {
      const addButton = screen.getByRole("button", { name: "Add Item" });
      expect(addButton).toBeDisabled();
    });

    it("should enable add button when input has value", async () => {
      const input = screen.getByPlaceholderText("Enter dietary restriction");
      const addButton = screen.getByRole("button", { name: "Add Item" });

      fireEvent.change(input, { target: { value: "keto" } });

      expect(addButton).not.toBeDisabled();
    });

    it("should call addItemMutation when form is submitted", async () => {
      const input = screen.getByPlaceholderText("Enter dietary restriction");
      const addButton = screen.getByRole("button", { name: "Add Item" });

      fireEvent.change(input, { target: { value: "keto" } });
      fireEvent.click(addButton);

      await waitFor(() => {
        expect(mockMutateAsync).toHaveBeenCalledWith({
          field: "dietaryRestrictions",
          item: "keto",
          originalData: mockPreferencesData,
        });
      });
    });

    it("should submit form on Enter key press", async () => {
      const input = screen.getByPlaceholderText("Enter dietary restriction");

      fireEvent.change(input, { target: { value: "paleo" } });
      fireEvent.submit(input.closest("form")!);

      await waitFor(() => {
        expect(mockMutateAsync).toHaveBeenCalledWith({
          field: "dietaryRestrictions",
          item: "paleo",
          originalData: mockPreferencesData,
        });
      });
    });

    it("should trim whitespace and convert to lowercase", async () => {
      const input = screen.getByPlaceholderText("Enter dietary restriction");
      const addButton = screen.getByRole("button", { name: "Add Item" });

      fireEvent.change(input, { target: { value: "  KETO  " } });
      fireEvent.click(addButton);

      await waitFor(() => {
        expect(mockMutateAsync).toHaveBeenCalledWith({
          field: "dietaryRestrictions",
          item: "keto",
          originalData: mockPreferencesData,
        });
      });
    });

    it("should not submit when input is only whitespace", async () => {
      const input = screen.getByPlaceholderText("Enter dietary restriction");
      const addButton = screen.getByRole("button", { name: "Add Item" });

      fireEvent.change(input, { target: { value: "   " } });
      fireEvent.click(addButton);

      await waitFor(() => {
        expect(mockMutateAsync).not.toHaveBeenCalled();
      });
    });

    it("should close dialog and clear input after successful submission", async () => {
      const input = screen.getByPlaceholderText("Enter dietary restriction");
      const addButton = screen.getByRole("button", { name: "Add Item" });

      fireEvent.change(input, { target: { value: "vegan" } });
      fireEvent.click(addButton);

      await waitFor(() => {
        expect(mockMutateAsync).toHaveBeenCalled();
      });

      // Dialog should close
      await waitFor(() => {
        expect(
          screen.queryByText("Add Dietary Restrictions")
        ).not.toBeInTheDocument();
      });
    });
  });

  describe("Loading States", () => {
    it("should disable trigger button when mutation is pending", () => {
      mockUseAddPreferenceItem.mockReturnValue(
        createMockMutationResult(mockMutateAsync, {
          isPending: true,
          status: "pending",
        })
      );

      renderWithQueryClient(
        <PreferencesItemListDialog
          title="Dietary Restrictions"
          preferenceKey="dietaryRestrictions"
        />
      );

      expect(
        screen.getByTestId(
          "preference-item-list-dialog-dietaryRestrictions-trigger"
        )
      ).toBeDisabled();
    });
  });

  describe("Error Handling", () => {
    it("should show error toast when no preferences data is available", async () => {
      mockGetQueryData.mockReturnValue(null);

      renderWithQueryClient(
        <PreferencesItemListDialog
          title="Dietary Restrictions"
          preferenceKey="dietaryRestrictions"
        />
      );

      const trigger = screen.getByTestId(
        "preference-item-list-dialog-dietaryRestrictions-trigger"
      );
      fireEvent.click(trigger);

      await waitFor(() => {
        const input = screen.getByTestId(
          "preference-item-list-dialog-dietaryRestrictions-input"
        );
        const addButton = screen.getByRole("button", { name: "Add Item" });

        fireEvent.change(input, { target: { value: "keto" } });
        fireEvent.click(addButton);
      });

      expect(mockMutateAsync).not.toHaveBeenCalled();
    });
  });
});
