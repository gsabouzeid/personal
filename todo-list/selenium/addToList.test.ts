import { Browser, Builder, Key, WebDriver } from "selenium-webdriver";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { TodoListPage } from "./Pages/TodoListPage";

describe("Add to List", () => {
  let driver: WebDriver;
  let todoListPage: TodoListPage;

  beforeEach(async () => {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
    todoListPage = new TodoListPage(driver);
    await driver.get("http://localhost:5173/");
    await todoListPage.clickCreateNewListButton();
    await todoListPage.typeListName("My New List");
    await todoListPage.clickSubmitButton();
  });

  afterEach(async () => {
    await driver.quit();
  });

  it("can add items to list", async () => {
    await todoListPage.typeItemInput("Item 1");
    await driver.actions().sendKeys(Key.ENTER).perform();

    const pageSource1 = await driver.getPageSource();
    expect(pageSource1).toContain("Item 1");

    await todoListPage.typeItemInput("Item 2");
    await todoListPage.clickAddItemButton();

    const pageSource2 = await driver.getPageSource();
    expect(pageSource2).toContain("Item 1");
    expect(pageSource2).toContain("Item 2");
  });

  it("cannot add empty item to list", async () => {
    expect(await todoListPage.isAddItemButtonDisabled());
    await todoListPage.typeItemInput("   ");
    expect(await todoListPage.isAddItemButtonDisabled());
  });

  it("can delete item from list", async () => {
    await todoListPage.typeItemInput("Item 1");
    await driver.actions().sendKeys(Key.ENTER).perform();

    const pageSource1 = await driver.getPageSource();
    expect(pageSource1).toContain("Item 1");

    await todoListPage.clickDeleteItemButton("Item 1");

    const pageSource2 = await driver.getPageSource();
    expect(pageSource2).not.toContain("Item 1");
  });
});
