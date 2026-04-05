import assert from "assert";
import { Browser, Builder, WebDriver } from "selenium-webdriver";
import { afterAll, beforeAll, describe, it } from "vitest";
import { TodoListPage } from "./Pages/TodoListPage";

describe("Edit List", () => {
  let driver: WebDriver;
  let todoListPage: TodoListPage;

  beforeAll(async () => {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
    todoListPage = new TodoListPage(driver);
    await driver.get("http://localhost:5173/");
    await todoListPage.clickCreateNewListButton();
    await todoListPage.typeListName("My New List");
    await todoListPage.clickSubmitButton();
    await todoListPage.clickEditListButton();
  });

  afterAll(async () => {
    await driver.quit();
  });

  it("can edit name of list", async () => {
    await todoListPage.clearListNameInput();
    await todoListPage.typeListName("My Edited List");
    await todoListPage.clickEditButton();

    const pageSource = await driver.getPageSource();
    assert.ok(pageSource.includes("My Edited List"));
    assert.ok(!pageSource.includes("My New List"));
  });

  it("can delete list", async () => {
    await todoListPage.clickDeleteButton();

    const pageSource = await driver.getPageSource();
    assert.ok(!pageSource.includes("My New List"));
  });
});
