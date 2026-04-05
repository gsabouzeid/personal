import assert from "assert";
import { Browser, Builder, WebDriver } from "selenium-webdriver";
import { afterAll, beforeAll, describe, it } from "vitest";
import { TodoListPage } from "./Pages/TodoListPage";

describe("Create List", () => {
  let driver: WebDriver;
  let todoListPage: TodoListPage;

  beforeAll(async () => {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
    todoListPage = new TodoListPage(driver);
  });

  afterAll(async () => {
    await driver.quit();
  });

  it("can create a new list through the menu dial", async () => {
    await driver.get("http://localhost:5173/");

    await todoListPage.clickCreateNewListButton();
    await todoListPage.typeListName("My New List");
    await todoListPage.clickSubmitButton();

    const pageSource = await driver.getPageSource();
    assert.ok(pageSource.includes("My New List"));
  });

  it("can create a new list through side navigation", async () => {
    await driver.get("http://localhost:5173/");

    await todoListPage.clickShowListsToggle();
    await todoListPage.clickSideNavCreateNewListButton();
    await todoListPage.typeListName("My New List 2");
    await todoListPage.clickSubmitButton();

    const pageSource = await driver.getPageSource();
    assert.ok(pageSource.includes("My New List 2"));
  });
});
