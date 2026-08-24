import { test, expect } from "@playwright/test";
import { TodoListPage } from "./Pages/todo-list-page";

test.describe("login", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/");
  });

  test("main page", async ({ page }) => {
    const todoList = new TodoListPage(page);
    expect(todoList.feelsEmptyText).toBeVisible();
  });
});
