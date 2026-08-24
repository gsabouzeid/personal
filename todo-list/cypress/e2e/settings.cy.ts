import todoListLocators from "../locators/todoListLocators";

describe("settings spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("can edit theme of app", () => {
    cy.get(todoListLocators.showListsToggle).click();
    cy.get(todoListLocators.settingsButton).click();
    cy.get("input[type='radio'][value='light']").check();
    cy.get("main")
      .children()
      .first()
      .should("have.css", "background-color", "rgb(255, 255, 255)");
    cy.get("input[type='radio'][value='dark']").check();
    cy.get("main")
      .children()
      .first()
      .should("have.css", "background-color", "rgb(18, 18, 18)");
  });
});
