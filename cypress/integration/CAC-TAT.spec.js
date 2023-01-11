/// <reference types="cypress" />

beforeEach(() => {
  cy.visit("./src/index.html");
});

describe("Central de Atendimento ao Cliente TAT", function () {
  it("verifica o título da aplicação", function () {
    cy.title().should("eq", "Central de Atendimento ao Cliente TAT");
  });

  const longText =
    "Fazendo um teste na aplicação e vendo no que vai dar, Fazendo um teste na aplicação e vendo no que vai dar, Fazendo um teste na aplicação e vendo no que vai dar, Fazendo um teste na aplicação e vendo no que vai dar,Fazendo um teste na aplicação e vendo no que vai dar";

  it("preenche os campos obrigatórios e envia o formulário", () => {
    cy.get("#firstName").type("Victoria");
    cy.get("#lastName").type("Krupp");
    cy.get("#email").type("teste@teste.com");
    cy.get("#phone").type("5198145621");
    cy.get("#open-text-area").type(longText, { delay: 0 });
    cy.contains("button", "Enviar").click();
    cy.get(".success").should("be.visible");
  });

  it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", () => {
    cy.get("#firstName").type("Victoria");
    cy.get("#lastName").type("Krupp");
    cy.get("#email").type("teste.teste.com");
    cy.get("#phone").type("5198145621");
    cy.get("#open-text-area").type(longText, { delay: 0 });
    cy.contains("button", "Enviar").click();
    cy.get(".error").should("be.visible");
  });

  it("Passando o telefone de forma não numeral", () => {
    cy.get("#phone").type("abvcsadas").should("have.value", "");
  });

  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
    cy.get("#firstName").type("Victoria");
    cy.get("#lastName").type("Krupp");
    cy.get("#email").type("teste.teste.com");
    cy.get("#open-text-area").type(longText, { delay: 0 });
    cy.get("#phone-checkbox").check();
    cy.contains("button", "Enviar").click();
    cy.get(".error").should("be.visible");
  });

  it("preenche e limpa os campos nome, sobrenome, email e telefone", () => {
    cy.get("#firstName")
      .type("Victoria")
      .should("have.value", "Victoria")
      .clear()
      .should("have.value", "");
    cy.get("#lastName")
      .type("Krupp")
      .should("have.value", "Krupp")
      .clear()
      .should("have.value", "");
    cy.get("#email")
      .type("teste@teste.com")
      .should("have.value", "teste@teste.com")
      .clear()
      .should("have.value", "");
    cy.get("#phone")
      .type("5198145621")
      .should("have.value", "5198145621")
      .clear()
      .should("have.value", "");
    cy.get("#open-text-area")
      .type("teste")
      .should("have.value", "teste")
      .clear()
      .should("have.value", "");
  });

  it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", () => {
    cy.contains("button", "Enviar").click();
    cy.get(".error").should("be.visible");
  });

  it("envia o formuário com sucesso usando um comando customizado", () => {
    cy.fillMandatoryFieldsAndSubmit();
    cy.get(".success").should("be.visible");
  });

  it("seleciona um produto (YouTube) por seu texto", () => {
    cy.get("#product").select("YouTube").should("have.value", "youtube");
  });

  it("seleciona um produto (Mentoria) por seu valor (value)", () => {
    cy.get("#product").select("mentoria").should("have.value", "mentoria");
  });

  it("seleciona um produto (Blog) por seu índice", () => {
    cy.get("#product").select(1).should("have.value", "blog");
  });

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"]')
      .check("feedback")
      .should("have.value", "feedback");
  });

  it("marca cada tipo de atendimento", () => {
    cy.get('input[type="radio"]').check("ajuda").should("be.checked");
    cy.get('input[type="radio"]')
      .check("feedback")
      .should("have.value", "feedback")
      .should("be.checked");
    cy.get('input[type="radio"]')
      .check("elogio")
      .should("have.value", "elogio")
      .should("be.checked");
  });

  it("marca cada tipo de atendimento", () => {
    cy.get('input[type="radio"]')
      .should("have.length", 3)
      .each(function ($radio) {
        cy.wrap($radio).check();
        cy.wrap($radio).should("be.checked");
      });
  });

  it("marca ambos checkboxes, depois desmarca o último", () => {
    cy.get('input[type="checkbox"]')
      .check()
      .last()
      .uncheck()
      .should("not.be.checked");
  });

  it("seleciona um arquivo da pasta fixtures", () => {
    cy.get('input[type="file"]')
      .should("not.have.value")
      .selectFile("cypress/fixtures/example.json")
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal("example.json");
      });
  });

  it("seleciona um arquivo simulando um drag-and-drop", () => {
    cy.get('input[type="file"]')
      .should("not.have.value")
      .selectFile("cypress/fixtures/example.json", { action: "drag-drop" })
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal("example.json");
      });
  });

  it("seleciona um arquivo utilizando uma fixture para a qual foi dada um alias", () => {
    cy.fixture("example.json").as("sampleFile");
    cy.get('input[type="file"]')
      .selectFile("@sampleFile")
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal("example.json");
      });
  });

  it("verifica que a política de privacidade abre em outra aba sem a necessidade de um clique", () => {
    cy.get("#privacy a").should("have.attr", "target", "_blank");
  });

  it("acessa a página da política de privacidade removendo o target e então clicando no link", () => {
    cy.get("#privacy a").invoke("removeAttr", "target").click();
    cy.contains("Talking About Testing").should("be.visible");
  });
});
