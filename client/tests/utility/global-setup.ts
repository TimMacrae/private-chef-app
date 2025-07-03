// global-setup.ts
import { chromium } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

export default async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto("http://localhost:3000/auth/login");
  await page
    .getByRole("textbox", { name: /email|username/i })
    .fill(process.env.E2E_USER_EMAIL!);
  await page
    .getByRole("textbox", { name: /password/i })
    .fill(process.env.E2E_USER_PASSWORD!);
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.waitForURL("http://localhost:3000/");
  // Save storage state
  await page.context().storageState({ path: "storageState.json" });
  await browser.close();
}
