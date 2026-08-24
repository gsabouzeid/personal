import { Browser, Builder, WebDriver } from "selenium-webdriver";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { TodoListPage } from "./Pages/TodoListPage";

describe("Settings", () => {
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

  it("can edit theme of app", async () => {
    await todoListPage.clickShowListsToggle();
    await todoListPage.clickSettingsButton();

    await todoListPage.clickLightRadioButton();
    const mainElement = await driver.findElement({ tagName: "main" });
    const firstChild = await mainElement.findElement({ xpath: "./*" });
    const backgroundColorLight =
      await firstChild.getCssValue("background-color");
    expect(backgroundColorLight).toBe("rgba(255, 255, 255, 1)");

    await todoListPage.clickDarkRadioButton();
    const backgroundColorDark =
      await firstChild.getCssValue("background-color");
    expect(backgroundColorDark).toBe("rgba(18, 18, 18, 1)");
  });
});
