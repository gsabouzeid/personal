import { expect, test } from "@playwright/test";
import { TodoListPage } from "./Pages/todo-list-page";

test.describe("manage lists", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/");
  });

  test("switch between multiple lists", async ({ page }) => {
    const todoList = new TodoListPage(page);
    await todoList.clickCreateNewListButton();
    await todoList.typeListName("List 1");
    await todoList.clickCreateButton();

    await todoList.clickCreateNewListButton();
    await todoList.typeListName("List 2");
    await todoList.clickCreateButton();

    await todoList.typeItemName("Item 1");
    await todoList.itemInput.press("Enter");
    await todoList.typeItemName("Item 2");
    await todoList.itemInput.press("Enter");
    await todoList.typeItemName("Item 3");
    await todoList.itemInput.press("Enter");

    await todoList.clickShowListsToggle();
    await todoList.clickListToggle("List 1");
    expect(page.locator("#nav-list-name").getByText("List 1")).toBeVisible();
    expect(page.getByText("Item 1")).not.toBeVisible();
    expect(page.getByText("Item 2")).not.toBeVisible();
    expect(page.getByText("Item 3")).not.toBeVisible();

    await todoList.typeItemName("Item 4");
    await todoList.itemInput.press("Enter");
    await todoList.typeItemName("Item 5");
    await todoList.itemInput.press("Enter");
    await todoList.typeItemName("Item 6");
    await todoList.itemInput.press("Enter");

    await todoList.clickShowListsToggle();
    await todoList.clickListToggle("List 2");
    expect(page.locator("#nav-list-name").getByText("List 2")).toBeVisible();
    expect(page.getByText("Item 1")).toBeVisible();
    expect(page.getByText("Item 2")).toBeVisible();
    expect(page.getByText("Item 3")).toBeVisible();
    expect(page.getByText("Item 4")).not.toBeVisible();
    expect(page.getByText("Item 5")).not.toBeVisible();
    expect(page.getByText("Item 6")).not.toBeVisible();
  });
});
