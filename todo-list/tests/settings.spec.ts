import { expect, test } from "@playwright/test";
import { TodoListPage } from "./Pages/todo-list-page";

test.describe("settings", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/");
  });

  test("edit theme of app", async ({ page }) => {
    const todoList = new TodoListPage(page);
    await todoList.clickShowListsToggle();
    await todoList.clickSettingsButton();
    await todoList.clickLightRadioButton();
    await expect(page.locator("main > div")).toHaveCSS(
      "background-color",
      "rgb(255, 255, 255)",
    );
    await todoList.clickDarkRadioButton();
    await expect(page.locator("main > div")).toHaveCSS(
      "background-color",
      "rgb(18, 18, 18)",
    );
  });
});
