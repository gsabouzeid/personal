import { expect, test } from "@playwright/test";
import { TodoListPage } from "./Pages/todo-list-page";

test.describe("edit list", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/");
    const todoList = new TodoListPage(page);
    await todoList.clickCreateNewListButton();
    await todoList.typeListName("My New List");
    await todoList.clickCreateButton();
    await todoList.clickEditListButton();
  });

  test("edit name of list", async ({ page }) => {
    const todoList = new TodoListPage(page);
    await todoList.listNameInput.clear();
    await todoList.typeListName("My Edited List");
    await todoList.clickEditButton();
    await expect(page.getByText("My Edited List")).toBeVisible();
  });

  test("delete list", async ({ page }) => {
    const todoList = new TodoListPage(page);
    await todoList.clickDeleteButton();
    await expect(page.getByText("My Edited List")).not.toBeVisible();
  });
});
