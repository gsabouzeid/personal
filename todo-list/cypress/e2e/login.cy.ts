describe("login spec", () => {
  it("can access to app", () => {
    cy.visit("http://localhost:5173/");
    cy.contains("Feels empty here... Create a new list to get started!").should(
      "be.visible",
    );
  });
});
