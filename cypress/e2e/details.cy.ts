describe('Details page', () => {
  it('Go to an listing page', () => {
    cy.visit('http://localhost:4200');
    cy.wait(2000);
    cy.loginIfNeeded();
    cy.contains("okeznfn").click();
  })
})

