import { test, expect } from "@playwright/test";
import { TodoListPage } from "./Pages/todo-list-page";

test.describe("create new list", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/");
  });

  test("create new list on main page", async ({ page }) => {
    const todoList = new TodoListPage(page);
    await todoList.clickCreateNewListButton();
    await todoList.typeListName("My New List");
    await todoList.clickCreateButton();
    await expect(page.getByText("My New List")).toBeVisible();
  });

  test("create new list through side navigation", async ({ page }) => {
    const todoList = new TodoListPage(page);
  });
});
