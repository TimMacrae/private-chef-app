import { sidebarMenu } from "@/components/navigation/sidebarMenu.config";
import test, { expect } from "@playwright/test";

test.describe("navigation", () => {
  test("should display the sidebar bar with the correct items", async ({
    page,
  }) => {
    await page.goto("/");
    await page.waitForTimeout(1000);
    await expect(page.getByTestId("sidebar")).toBeVisible();
    sidebarMenu.forEach(async (item) => {
      await expect(page.getByTestId(item.dataTestId)).toBeVisible();
    });
  });

  test("mobile sidebar", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 }); // iPhone X
    await page.goto("/");
    await page.waitForTimeout(1000);
    await expect(page.getByTestId("sidebar")).not.toBeVisible();
    await expect(page.getByTestId("sidebar-trigger-mobile")).toBeVisible();
    await page.getByTestId("sidebar-trigger-mobile").click();
    await page.waitForTimeout(1000);
    sidebarMenu.forEach(async (item) => {
      await expect(page.getByTestId(item.dataTestId)).toBeVisible();
    });
  });
});
