import { screen } from "@testing-library/react";
import { describe, it, expect, beforeEach, MockedFunction, vi } from "vitest";
import { PreferenceItemList } from "./preferences-item-list";
import {
  createMockQueryResult,
  renderWithQueryClient,
} from "@/utils/utils-tests";
import { usePreferences } from "@/hooks/query/use-preferences.query";
import { mockPreferencesData } from "../mock/preferences-mock-data";

const mockMutateAsync = vi.fn().mockResolvedValue({});
vi.mock("@/hooks/query/use-preferences.query", () => ({
  usePreferences: vi.fn(),
}));

const mockRefetch = vi.fn();
const mockUsePreferences = usePreferences as MockedFunction<
  typeof usePreferences
>;

describe("PreferenceItemList component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockMutateAsync.mockClear();
    mockUsePreferences.mockReturnValue(
      createMockQueryResult(mockRefetch, {
        data: mockPreferencesData,
        isPending: false,
        isLoading: false,
        isSuccess: true,
      })
    );
  });
  it("renders component with title and preferenceKey", () => {
    renderWithQueryClient(
      <PreferenceItemList
        title="Dietary Restrictions"
        preferenceKey="dietaryRestrictions"
      />
    );
    expect(
      screen.getByTestId("preference-item-list-dietaryRestrictions")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("preference-item-title-dietaryRestrictions")
    ).toHaveTextContent("Dietary Restrictions");
  });

  it("renders component with dialog and list", () => {
    renderWithQueryClient(
      <PreferenceItemList
        title="Dietary Restrictions"
        preferenceKey="dietaryRestrictions"
      />
    );
    expect(
      screen.getByTestId(
        "preference-item-list-dialog-dietaryRestrictions-trigger"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("preference-list-dietaryRestrictions")
    ).toBeInTheDocument();
  });
});
