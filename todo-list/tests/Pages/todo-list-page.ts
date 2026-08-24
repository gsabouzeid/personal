import { type Locator, type Page } from "@playwright/test";

export class TodoListPage {
  readonly page: Page;
  readonly feelsEmptyText: Locator;
  readonly createNewListButton: Locator;
  readonly listNameInput: Locator;
  readonly createButton: Locator;
  readonly showListsToggle: Locator;
  readonly sideNavCreateNewListbutton: Locator;
  readonly itemInput: Locator;
  readonly addItemButton: Locator;
  readonly editListButton: Locator;
  readonly editButton: Locator;
  readonly deleteButton: Locator;
  readonly settingsButton: Locator;
  readonly lightRadioInput: Locator;
  readonly darkRadioInput: Locator;

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
    this.showListsToggle = page.getByRole("button", {
      name: "Show Lists Toggle",
    });
    this.sideNavCreateNewListbutton = page.locator("#side-nav-create-new-list");
    this.itemInput = page.locator("#item-input");
    this.addItemButton = page.getByRole("button", { name: "Add Item" });
    this.editListButton = page.getByRole("button", { name: "Edit List" });
    this.editButton = page.getByRole("button", { name: "Edit" });
    this.deleteButton = page.getByRole("button", { name: "Delete" });
    this.settingsButton = page.getByRole("button", { name: "Settings" });
    this.lightRadioInput = page.getByRole("radio", { name: "Light" });
    this.darkRadioInput = page.getByRole("radio", { name: "Dark" });
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

  async clickShowListsToggle() {
    this.showListsToggle.click();
  }

  async clickSideNavCreateNewListButton() {
    this.sideNavCreateNewListbutton.click();
  }

  async typeItemName(item: string) {
    await this.itemInput.fill(item);
  }

  async clickAddItemButton() {
    await this.addItemButton.click();
  }

  async clickDeleteItemButton(item: string) {
    await this.page
      .getByText(item)
      .locator("//ancestor::div")
      .getByRole("button", { name: "Delete Item" })
      .click();
  }

  async clickEditListButton() {
    await this.editListButton.click();
  }

  async clickEditButton() {
    await this.editButton.click();
  }

  async clickDeleteButton() {
    await this.deleteButton.click();
  }

  async clickSettingsButton() {
    await this.settingsButton.click();
  }

  async clickLightRadioButton() {
    await this.lightRadioInput.click();
  }

  async clickDarkRadioButton() {
    await this.darkRadioInput.click();
  }

  async clickListToggle(listName: string) {
    await this.page.getByRole("button", { name: listName }).click();
  }
}
