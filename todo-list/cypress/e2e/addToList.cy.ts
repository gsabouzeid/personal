import todoListLocators from "../locators/todoListLocators";

describe("add to list spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
    cy.get(todoListLocators.createNewListButton).click();
    cy.get(todoListLocators.listNameInput).type("My New List");
    cy.get(todoListLocators.submitButton).click();
  });

  it("can add items to list", () => {
    cy.get(todoListLocators.itemInput).type("Item 1");
    cy.get(todoListLocators.itemInput).type("{enter}");
    cy.contains("Item 1").should("be.visible");

    cy.get(todoListLocators.itemInput).type("Item 2");
    cy.get(todoListLocators.addItemButton).click();
    cy.contains("Item 1").should("be.visible");
    cy.contains("Item 2").should("be.visible");
  });

  it("cannot add empty item to list", () => {
    cy.get(todoListLocators.addItemButton).should("be.disabled");
    cy.get(todoListLocators.itemInput).type("   ");
    cy.get(todoListLocators.addItemButton).should("be.disabled");
  });

  it("can delete item from list", () => {
    cy.get(todoListLocators.itemInput).type("Item 1");
    cy.get(todoListLocators.itemInput).type("{enter}");
    cy.contains("Item 1").should("be.visible");

    cy.contains("Item 1")
      .parent()
      .find("button[aria-label='Delete Item']")
      .click();
    cy.contains("Item 1").should("not.exist");
  });
});
