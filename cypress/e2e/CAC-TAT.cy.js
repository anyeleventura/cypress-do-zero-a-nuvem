describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html');
  });

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
  });

  it('preenche os campos obrigatórios e envia o formulário', () => {
    const longText = Cypress._.repeat('Neste sentido, a valorização de fatores subjetivos agrega valor ao estabelecimento dos métodos utilizados na avaliação de resultados.', 10)
    cy.get('#firstName').type('Anyele');
    cy.get('#lastName').type('Ventura');
    cy.get('#email').type('teste@email.com');
    cy.get('#open-text-area').type(longText, { delay: 0 });
    cy.contains('button', 'Enviar').click();

    cy.get('.success').should('be.visible');
  });

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Anyele');
    cy.get('#lastName').type('Ventura');
    cy.get('#email').type('testeemail');
    cy.get('#open-text-area').type('Neste sentido, a valorização de fatores subjetivos agrega valor ao estabelecimento dos métodos utilizados na avaliação de resultados.A prática cotidiana prova que a consulta aos diversos militantes apresenta tendências no sentido de aprovar a manutenção de alternativas às soluções ortodoxas.', { delay: 0 });
    cy.contains('button', 'Enviar').click();

    cy.get('.error').should('be.visible');
  });

  it('campo telefone continua vazio quando preenchido com um valor não numérico', () => {
    cy.get('#phone')
      .type('abc')
      .should('have.value', '');
  });

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    const longText = Cypress._.repeat('Neste sentido, a valorização de fatores subjetivos agrega valor ao estabelecimento dos métodos utilizados na avaliação de resultados.', 10)
    cy.get('#firstName').type('Anyele');
    cy.get('#lastName').type('Ventura');
    cy.get('#email').type('teste@email.com');
    cy.get('#open-text-area').type(longText, { delay: 0 });
    cy.get('#phone-checkbox').check();
    cy.contains('button', 'Enviar').click();

    cy.get('.error').should('be.visible');
  });

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('Anyele')
      .should('have.value', 'Anyele')
      .clear()
      .should('have.value', '');
      cy.get('#lastName')
      .type('Ventura')
      .should('have.value', 'Ventura')
      .clear()
      .should('have.value', '');
      cy.get('#email')
      .type('teste@email.com')
      .should('have.value', 'teste@email.com')
      .clear()
      .should('have.value', '');
      cy.get('#phone')
      .type('85991100909')
      .should('have.value', '85991100909')
      .clear()
      .should('have.value', '');
  });

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button', 'Enviar').click();

    cy.get('.error').should('be.visible');
  });

  it('envia o formuário com sucesso usando um comando customizado', () => {
    const data = {
      firstName: 'Anyele',
      lastName: 'Ventura', 
      email: 'teste@email.com',
      textArea: Cypress._.repeat('Neste sentido, a valorização de fatores subjetivos agrega valor ao estabelecimento dos métodos utilizados na avaliação de resultados.', 10)
    }
    cy.fillMandatoryFieldsAndSubmit(data);

    cy.get('.success').should('be.visible');
  });  

  it('envia o formuário com sucesso usando um comando customizado com default', () => {
    cy.fillMandatoryFieldsAndSubmit();

    cy.get('.success').should('be.visible');
  }); 

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product').select('YouTube').should('have.value', 'youtube');
  });

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product').select('mentoria').should('have.value', 'mentoria');
  });

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product').select(1).should('have.value', 'blog');
  });

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]').check().should('be.checked');
  });

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]').each(typeOfService => {
      cy.wrap(typeOfService).check().should('be.checked');
    });
  });

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]').check().should('be.checked')
    .last()
    .uncheck()
    .should('be.not.checked');
  });

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload').selectFile('cypress/fixtures/example.json')
    .should(input => {
      console.log(input[0].files[0].name)
      expect(input[0].files[0].name).to.equal('example.json');
    })
  });

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload').selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
    .should(input => {
      console.log(input[0].files[0].name)
      expect(input[0].files[0].name).to.equal('example.json');
    })
  });

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile');
    cy.get('#file-upload').selectFile('@sampleFile')
    .should(input => {
      console.log(input[0].files[0].name)
      expect(input[0].files[0].name).to.equal('example.json');
    });
  });
});
