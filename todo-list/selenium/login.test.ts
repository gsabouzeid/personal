import assert from "assert";
import { Browser, Builder, WebDriver } from "selenium-webdriver";

import { afterAll, beforeAll, describe, it } from "vitest";

describe("Todo List", () => {
  let driver: WebDriver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  it("opens the app", async () => {
    await driver.get("http://localhost:5173/");

    const pageSource = await driver.getPageSource();
    assert.ok(
      pageSource.includes(
        "Feels empty here... Create a new list to get started!",
      ),
    );
  });
});
