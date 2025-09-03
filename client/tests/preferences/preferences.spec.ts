import { test, expect } from "@playwright/test";

test.describe("preferences page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/preferences");
    await page.waitForTimeout(1000);
  });

  test("should display initial preferences correctly", async ({ page }) => {
    // Check for a main heading
    const title = page.locator(
      '[data-testid="preference-list-excludedCuisines"]'
    );

    const excludedCuisines = page.locator(
      '[data-testid="preference-list-excludedCuisines"]'
    );

    const sectionContainer = page.locator(
      '[data-testid="preferences-section-core-preferences"]'
    );

    const sectionMealconstraints = page.locator(
      '[data-testid="preferences-section-meal-constraints"]'
    );

    const sectionCulinaryPreferences = page.locator(
      '[data-testid="preferences-section-culinary-preferences"]'
    );

    const sectionSeasonalPreferences = page.locator(
      '[data-testid="preferences-section-seasonal-preferences"]'
    );

    await expect(title).toBeVisible();
    await expect(sectionContainer).toBeVisible();
    await expect(sectionMealconstraints).toBeVisible();
    await expect(sectionCulinaryPreferences).toBeVisible();
    await expect(sectionSeasonalPreferences).toBeVisible();

    await expect(
      excludedCuisines.getByTestId("preference-item-none-specified")
    ).toBeVisible();
  });

  test("should add a new preference item and remove it", async ({ page }) => {
    const dietaryRestrictionsItemList = page.locator(
      '[data-testid="preference-item-list-dietaryRestrictions"]'
    );

    await dietaryRestrictionsItemList
      .getByTestId("preference-item-list-dialog-dietaryRestrictions-trigger")
      .click();

    // 2. Verify the dialog is open and fill in the input
    const dialog = page.getByRole("dialog");
    await expect(
      dialog.getByTestId(
        `preference-item-list-dialog-dietaryRestrictions-input`
      )
    ).toBeVisible();
    await dialog
      .getByTestId(`preference-item-list-dialog-dietaryRestrictions-input`)
      .fill("vegan");

    await dialog.getByRole("button", { name: "Add Item" }).click();

    await expect(page.getByText("vegan")).toBeVisible();
    await expect(dialog).not.toBeVisible();

    const itemToRemove = page.getByTestId("preference-item-badge-0");
    await itemToRemove
      .getByTestId("preference-item-badge-remove-item-0")
      .click();

    await expect(page.getByText("vegan")).not.toBeVisible();
  });

  test("should toggle a seasonal preference checkbox", async ({ page }) => {
    const checkbox = page.locator(
      '[data-testid="preferences-item-checkbox-seasonalPreferences-winter"]'
    );

    const winterCheckbox = checkbox.getByTestId(
      "preferences-item-checkbox-button"
    );

    await expect(winterCheckbox).not.toBeChecked();
    await winterCheckbox.click();
    await expect(winterCheckbox).toBeChecked();
    await winterCheckbox.click();
    await expect(winterCheckbox).not.toBeChecked();
  });

  test("should select a new cooking skill level", async ({ page }) => {
    const selectTrigger = page.getByTestId(
      "preferences-item-select-button-cookingSkillLevel"
    );

    await selectTrigger.click();
    await page.getByRole("option", { name: "Intermediate" }).click();
    await expect(selectTrigger).toContainText("Intermediate");
  });
});
