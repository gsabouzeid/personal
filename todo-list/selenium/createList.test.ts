import assert from "assert";
import { Browser, Builder, WebDriver } from "selenium-webdriver";
import { afterEach, beforeEach, describe, it } from "vitest";
import { TodoListPage } from "./Pages/TodoListPage";

describe("Create List", () => {
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

  it("can create a new list through the menu dial", async () => {
    await todoListPage.clickCreateNewListButton();
    await todoListPage.typeListName("My New List");
    await todoListPage.clickSubmitButton();

    const pageSource = await driver.getPageSource();
    assert.ok(pageSource.includes("My New List"));
  });

  it("can create a new list through side navigation", async () => {
    await todoListPage.clickShowListsToggle();
    await todoListPage.clickSideNavCreateNewListButton();
    await todoListPage.typeListName("My New List 2");
    await todoListPage.clickSubmitButton();

    const pageSource = await driver.getPageSource();
    assert.ok(pageSource.includes("My New List 2"));
  });
});
