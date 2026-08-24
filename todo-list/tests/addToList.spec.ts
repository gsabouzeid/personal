import { expect, test } from "@playwright/test";
import { TodoListPage } from "./Pages/todo-list-page";

test.describe("add to list", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/");
    const todoList = new TodoListPage(page);
    await todoList.clickCreateNewListButton();
    await todoList.typeListName("My New List");
    await todoList.clickCreateButton();
  });

  test("add items to list", async ({ page }) => {
    const todoList = new TodoListPage(page);
    await todoList.typeItemName("Item 1");
    await todoList.itemInput.press("Enter");
    await expect(page.getByText("Item 1")).toBeVisible();

    await todoList.typeItemName("Item 2");
    await todoList.clickAddItemButton();
    await expect(page.getByText("Item 1")).toBeVisible();
    await expect(page.getByText("Item 2")).toBeVisible();
  });

  test("cannot add empty item to list", async ({ page }) => {
    const todoList = new TodoListPage(page);
    await expect(todoList.addItemButton).toBeDisabled();
    await todoList.typeItemName("   ");
    await expect(todoList.addItemButton).toBeDisabled();
  });

  test("can delete item from list", async ({ page }) => {
    const todoList = new TodoListPage(page);
    await todoList.typeItemName("Item 1");
    await todoList.itemInput.press("Enter");
    await expect(page.getByText("Item 1")).toBeVisible();

    await todoList.clickDeleteItemButton("Item 1");
    await expect(page.getByText("Item 1")).not.toBeVisible();
  });
});
