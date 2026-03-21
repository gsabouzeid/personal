import { type Locator, type Page } from "@playwright/test";

export class TodoListPage {
  readonly page: Page;
  readonly feelsEmptyText: Locator;
  readonly createNewListButton: Locator;
  readonly listNameInput: Locator;
  readonly createButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.feelsEmptyText = page.getByText(
      "Feels empty here... Create a new list to get started!",
    );
    this.createNewListButton = page.getByRole("button", {
      name: "Create New List",
    });
    this.listNameInput = page.locator("#list-name");
    this.createButton = page.getByRole("button", { name: "Create" });
  }

  async clickCreateNewListButton() {
    await this.createNewListButton.click();
  }

  async typeListName(listName: string) {
    await this.listNameInput.fill(listName);
  }

  async clickCreateButton() {
    await this.createButton.click();
  }
}
