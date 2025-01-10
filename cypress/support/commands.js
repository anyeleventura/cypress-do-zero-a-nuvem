Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {
    firstName: 'Ana',
    lastName: 'Silva', 
    email: 'asilva@email.com',
    textArea: 'teste'
  }) => {
    cy.get('#firstName').type(data.firstName);
    cy.get('#lastName').type(data.lastName);
    cy.get('#email').type(data.email);
    cy.get('#open-text-area').type(data.textArea, { delay: 0 });
    cy.contains('button', 'Enviar').click();

    cy.get('.success').should('be.visible');
})