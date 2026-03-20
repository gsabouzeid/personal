import todoListLocators from "../locators/todoListLocators";

describe("edit list spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
    cy.get(todoListLocators.createNewListButton).click();
    cy.get(todoListLocators.listNameInput).type("My New List");
    cy.get(todoListLocators.submitButton).click();
    cy.get(todoListLocators.editListButton).click();
  });

  it("can edit name of list", () => {
    cy.get(todoListLocators.listNameInput).clear().type("My Edited List");
    cy.get(todoListLocators.editButton).click();
    cy.contains("My Edited List").should("be.visible");
  });

  it("can delete list", () => {
    cy.get(todoListLocators.editButton).click();
    cy.get(todoListLocators.deleteButton).click();
    cy.contains("My New List").should("not.exist");
  });
});
