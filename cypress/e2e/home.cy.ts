describe('Home page', () => {
  it('should load the homepage', () => {
    cy.visit('http://localhost:4200');
    cy.wait(2000);
    cy.loginIfNeeded();
    // cy.contains("okeznfn").click();
  })
})

