import { Browser, Builder, WebDriver } from "selenium-webdriver";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { TodoListPage } from "./Pages/TodoListPage";

describe("Manage Lists", () => {
  let driver: WebDriver;
  let todoListPage: TodoListPage;

  beforeEach(async () => {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
    todoListPage = new TodoListPage(driver);
    await driver.get("http://localhost:5173/");
  });

  afterEach(async () => {
    await driver.quit();
  });

  it("can switch between multiple lists", async () => {
    await todoListPage.clickCreateNewListButton();
    await todoListPage.typeListName("List 1");
    await todoListPage.clickSubmitButton();

    await todoListPage.clickCreateNewListButton();
    await todoListPage.typeListName("List 2");
    await todoListPage.clickSubmitButton();

    await todoListPage.typeItemInput("Item 1");
    await todoListPage.clickAddItemButton();
    await todoListPage.typeItemInput("Item 2");
    await todoListPage.clickAddItemButton();
    await todoListPage.typeItemInput("Item 3");
    await todoListPage.clickAddItemButton();

    await todoListPage.clickShowListsToggle();
    await todoListPage.clickListToggle("List 1");

    const pageSource = await driver.getPageSource();
    expect(pageSource).toContain("List 1");
    expect(pageSource).not.toContain("Item 1");
    expect(pageSource).not.toContain("Item 2");
    expect(pageSource).not.toContain("Item 3");

    await todoListPage.typeItemInput("Item 4");
    await todoListPage.clickAddItemButton();
    await todoListPage.typeItemInput("Item 5");
    await todoListPage.clickAddItemButton();
    await todoListPage.typeItemInput("Item 6");
    await todoListPage.clickAddItemButton();

    await todoListPage.clickShowListsToggle();
    await todoListPage.clickListToggle("List 2");

    const pageSource2 = await driver.getPageSource();
    expect(pageSource2).toContain("List 2");
    expect(pageSource2).toContain("Item 1");
    expect(pageSource2).toContain("Item 2");
    expect(pageSource2).toContain("Item 3");
    expect(pageSource2).not.toContain("Item 4");
    expect(pageSource2).not.toContain("Item 5");
    expect(pageSource2).not.toContain("Item 6");
  });
});
