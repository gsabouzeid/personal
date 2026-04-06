import assert from "assert";
import { Browser, Builder } from "selenium-webdriver";
import { describe, it } from "vitest";

describe("Todo List", () => {
  it("opens the app", async () => {
    const driver = await new Builder().forBrowser(Browser.CHROME).build();

    await driver.get("http://localhost:5173/");

    const pageSource = await driver.getPageSource();
    assert.ok(
      pageSource.includes(
        "Feels empty here... Create a new list to get started!",
      ),
    );
    await driver.quit();
  });
});
