describe('Pokemons', () => {
  it('home page should load 25 pokemons at the begining', () => {
    cy.visit('/')

    cy.get('[data-cy="pokemon-card"]').should('have.length', 25)
  })

  it('should load more pokemons when scrolling at the botom', () => {
    cy.visit('/')
    cy.scrollTo('bottom')
    cy.wait(2000)

    cy.get('[data-cy="pokemon-card"]').should('have.length.greaterThan', 25)
  })

  it('it should add selected pokemos to the team', () => {
    cy.visit('/')
    cy.get('[data-cy="checkbox-charmander"]').first().click()
    cy.get('[data-cy="checkbox-squirtle"]').first().click()

    cy.get('[data-cy="add-to-team-button"]').click()

    // check if the route is /team
    cy.url().should('include', '/team')
    cy.get('[data-cy="pokemon-card"]').should('have.length', 2)
  })

  it('it should remove selected pokemos from the team', () => {
    cy.visit('/')
    cy.get('[data-cy="checkbox-charmander"]').first().click()
    cy.get('[data-cy="checkbox-squirtle"]').first().click()

    cy.get('[data-cy="add-to-team-button"]').click()

    cy.get('[data-cy="pokemon-card"]').should('have.length', 2)
    cy.get('[data-cy="remove-from-team-icon"]').first().click({ force: true })
    cy.get('[data-cy="pokemon-card"]').should('have.length', 1)
  })
})
