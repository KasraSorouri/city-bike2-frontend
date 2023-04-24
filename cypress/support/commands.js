Cypress.Commands.add('initilalize', () => {
  cy.request('POST', 'http://localhost:3005/test/reset')
    .then(() => {
      cy.request('POST','http://localhost:3005/test/upload-csv')
    })
})

Cypress.Commands.add('clearDatabase', () => {
  cy.request('POST', 'http://localhost:3005/test/reset')
})