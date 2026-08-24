import todoListLocators from "../locators/todoListLocators";

describe("manage lists spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("can switch between multiple lists", () => {
    cy.get(todoListLocators.createNewListButton).click();
    cy.get(todoListLocators.listNameInput).type("List 1");
    cy.get(todoListLocators.submitButton).click();

    cy.get(todoListLocators.createNewListButton).click();
    cy.get(todoListLocators.listNameInput).type("List 2");
    cy.get(todoListLocators.submitButton).click();

    cy.get(todoListLocators.itemInput).type("Item 1");
    cy.get(todoListLocators.itemInput).type("{enter}");
    cy.get(todoListLocators.itemInput).type("Item 2");
    cy.get(todoListLocators.itemInput).type("{enter}");
    cy.get(todoListLocators.itemInput).type("Item 3");
    cy.get(todoListLocators.itemInput).type("{enter}");

    cy.get(todoListLocators.showListsToggle).click();
    cy.get(todoListLocators.listToggle("List 1")).click();
    cy.contains("List 1").should("be.visible");
    cy.contains("Item 1").should("not.exist");
    cy.contains("Item 2").should("not.exist");
    cy.contains("Item 3").should("not.exist");

    cy.get(todoListLocators.itemInput).type("Item 4");
    cy.get(todoListLocators.itemInput).type("{enter}");
    cy.get(todoListLocators.itemInput).type("Item 5");
    cy.get(todoListLocators.itemInput).type("{enter}");
    cy.get(todoListLocators.itemInput).type("Item 6");
    cy.get(todoListLocators.itemInput).type("{enter}");

    cy.get(todoListLocators.showListsToggle).click();
    cy.get(todoListLocators.listToggle("List 2")).click();
    cy.contains("List 2").should("be.visible");
    cy.contains("Item 1").should("exist");
    cy.contains("Item 2").should("exist");
    cy.contains("Item 3").should("exist");
    cy.contains("Item 4").should("not.exist");
    cy.contains("Item 5").should("not.exist");
    cy.contains("Item 6").should("not.exist");
  });
});
