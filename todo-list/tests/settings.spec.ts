import { test } from "@playwright/test";
import { TodoListPage } from "./Pages/todo-list-page";

test.describe("settings", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/");
  });

  test("edit theme of app", async ({ page }) => {
    const todoList = new TodoListPage(page);
    await todoList.clickShowListsToggle();
    await todoList.clickSettingsButton();
  });
});
