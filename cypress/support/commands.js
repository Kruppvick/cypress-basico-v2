Cypress.Commands.add("fillMandatoryFieldsAndSubmit", function () {
  cy.get("#firstName").type("Victoria");
  cy.get("#lastName").type("Krupp");
  cy.get("#email").type("teste@teste.com");
  cy.get("#phone").type("5198145621");
  cy.get("#open-text-area").type("teste");
  cy.contains("button", "Enviar").click();
});
