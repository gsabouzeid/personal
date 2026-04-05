import { By, WebDriver } from "selenium-webdriver";

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

  async clickCreateNewListButton() {
    await this.driver.findElement(this.createNewListButton).click();
  }

  async typeListName(name: string) {
    await this.driver.findElement(this.listNameInput).sendKeys(name);
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
}
