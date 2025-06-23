import { test, expect } from "@playwright/test";

test.describe("auth", () => {
  test("should have login and register button", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByTestId("auth-logout")).toBeVisible();
    await expect(page.getByTestId("sidebar-trigger")).toBeVisible();
    await page.getByTestId("sidebar-trigger").click();
    await page.getByTestId("auth-logout").click();
    await expect(page).toHaveURL("http://localhost:3000/");
    await expect(page.getByTestId("auth-login")).toBeVisible();
    await expect(page.getByTestId("auth-register")).toBeVisible();
  });

  test("should display the navigation bar and logout button", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page.getByTestId("sidebar")).toBeVisible();
    await expect(page.getByTestId("auth-logout")).toBeVisible();
  });
});
