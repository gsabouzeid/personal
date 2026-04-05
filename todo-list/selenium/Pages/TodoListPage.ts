import { By, Key, WebDriver } from "selenium-webdriver";
import { selectAll } from "../utils/utils";

export class TodoListPage {
  constructor(private driver: WebDriver) {}

  private createNewListButton = By.xpath(
    "//button[@aria-label='Create New List']",
  );
  private listNameInput = By.id("list-name");
  private submitButton = By.xpath(
    "//button[@type='submit' and contains(text(), 'Create')]",
  );
  private showListsToggle = By.xpath(
    "//button[@aria-label='Show Lists Toggle']",
  );
  private sideNavCreateNewListbutton = By.id("side-nav-create-new-list");
  private editListButton = By.xpath("//button[@aria-label='Edit List']");
  private editButton = By.xpath("//button[contains(text(), 'Edit')]");
  private deleteButton = By.xpath("//button[contains(text(), 'Delete')]");

  async clickCreateNewListButton() {
    await this.driver.findElement(this.createNewListButton).click();
  }

  async typeListName(name: string) {
    await this.driver.findElement(this.listNameInput).sendKeys(name);
  }

  async clearListNameInput() {
    await this.driver
      .findElement(this.listNameInput)
      .sendKeys(selectAll, Key.DELETE);
  }

  async clickSubmitButton() {
    await this.driver.findElement(this.submitButton).click();
  }

  async clickShowListsToggle() {
    await this.driver.findElement(this.showListsToggle).click();
  }

  async clickSideNavCreateNewListButton() {
    await this.driver.findElement(this.sideNavCreateNewListbutton).click();
  }

  async clickEditListButton() {
    await this.driver.findElement(this.editListButton).click();
  }

  async clickEditButton() {
    await this.driver.findElement(this.editButton).click();
  }

  async clickDeleteButton() {
    await this.driver.findElement(this.deleteButton).click();
  }
}
