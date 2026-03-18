describe("create list spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("can create a new list through the menu dial", () => {
    cy.get("button[aria-label='Create New List']").click();
    cy.get("#listName").type("My New List");
    cy.get("button[type='submit']").click();
    cy.contains("My New List").should("be.visible");
  });

  it("can create a new list through side navigation", () => {
    cy.get("button[aria-label='Show Lists Toggle']").click();
    cy.get("div[role='button']").contains("Create New List").click();
    cy.get("#listName").type("My New List 2");
    cy.get("button[type='submit']").click();
    cy.contains("My New List 2").should("be.visible");
  });
});
