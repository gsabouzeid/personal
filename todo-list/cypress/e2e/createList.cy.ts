import todoListLocators from "../locators/todoListLocators";

describe("create list spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("can create a new list through the menu dial", () => {
    cy.get(todoListLocators.createNewListButton).click();
    cy.get(todoListLocators.listNameInput).type("My New List");
    cy.get(todoListLocators.submitButton).click();
    cy.contains("My New List").should("be.visible");
  });

  it("can create a new list through side navigation", () => {
    cy.get(todoListLocators.showListsToggle).click();
    cy.get(todoListLocators.sideNavCreateNewListbutton).click();
    cy.get(todoListLocators.listNameInput).type("My New List 2");
    cy.get(todoListLocators.submitButton).click();
    cy.contains("My New List 2").should("be.visible");
  });
});
