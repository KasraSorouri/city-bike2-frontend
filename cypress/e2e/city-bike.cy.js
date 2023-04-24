describe('City-bike App', function() {
  beforeEach(function() {
    cy.initilalize()
    cy.visit('http://localhost:3000')
  })

  describe('Test Visual Content', function() {
    it('Front page open correctly', function() {
      cy.contains('About this App')
    })
    it('App menu are visbale and functioning', function() {
      cy.contains('Trips').click()
      cy.url().should('include', '/trips')
      cy.contains('Trips information')
      cy.contains('Stations').click()
      cy.url().should('include', '/stations')
      cy.contains('Stations information')
      cy.contains('StationInfo').click()
      cy.url().should('include', '/stationInfo')
      cy.contains('Upload Data').click()
      cy.url().should('include', '/uploadFiles')
      cy.contains('Here you can Upload the CSV file that includes Trips and Stations data.')
    })
    describe('Test Trip Page', function() {
      beforeEach(function() {
        cy.contains('Trips').click()
      })

      it('Test Table content', function() {
        cy.contains('Station 8')
      })

      it('Test Pagination', function() {
        cy.contains('Rows per page')
        cy.get('[data-testid="KeyboardArrowRightIcon"]').click()
        cy.contains('Station 14')
      })

      it('Test Filter', function() {
        cy.contains('of 43')
        cy.contains('Filter').click()
        cy.get('#distanceTo').type(1)
        cy.get('[data-testid="filterButton"]').click()
        cy.contains('Station S')
        cy.contains('10 of 43 is filtered')
        cy.get('[data-testid="resetButton"]').click()
        cy.contains('1–10 of 43')
      })
    })

    describe('Test Station Page', function() {
      beforeEach(function() {
        cy.contains('Stations').click()
      })

      it('Test Table content', function() {
        cy.contains('Station 6')
      })

      it('Test Pagination', function() {
        cy.contains('Rows per page')
        cy.get('[data-testid="KeyboardArrowRightIcon"]').click()
        cy.contains('Station 14')
      })
    })

    describe('Test Station Info Page', function() {
      beforeEach(function() {
        cy.contains('Stations').click()
      })

      it('page forward to station info by click on station', function() {
        cy.contains('Station 5').click()
        cy.url().should('include', '/stationInfo')
        cy.contains('Station information')
      })

      it('Show Statistics', function() {
        cy.contains('Station 5').click()
        cy.get('[data-testid="originTable"]').find('tr').should('have.length', 7)
        cy.get('[data-testid="originTable"]')
          .contains('Station 9')
          .parent()
          .contains('31.5')
        cy.get('[data-testid="destinationTable"]').find('tr').should('have.length', 7)
        cy.get('[data-testid="destinationTable"]')
          .contains('Station 13')
          .parent()
          .contains('3.1')
        cy.get('[data-testid="stationTable"]')
          .contains('Station capacity')
          .parent()
          .contains('30')
        cy.get('[data-testid="stationTable"]')
          .contains('Total trip from this station')
          .parent()
          .contains('16')
      })
    })
  })
})