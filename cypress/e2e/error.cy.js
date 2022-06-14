describe('empty spec', () => {
  beforeEach(() => {
		cy.visit('/foobar');
	});

	it('displays users items by default', () => {

    cy.visit('/foobar');

		cy.get('[data-testid="back-search"]')
			.should('have.attr', 'href')
			.and('eq', '/');
	});
});