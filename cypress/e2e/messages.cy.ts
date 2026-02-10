describe('Messages', () => {
  it('Post Messages', () => {
    cy.visit('http://localhost:4200');
    cy.wait(2000);
    cy.loginIfNeeded();
    cy.visit('http://localhost:4200/messages/dc10531d-1bda-4229-a113-6615e0e7f491')
    cy.wait(3000);
    cy.get('body').then($body => {
      const marioExists = $body.text().includes('Mario');
      if (!marioExists) {
        cy.contains("Nouveau message").click();
        cy.makeConvs()
        cy.wait(2000);
      }
      cy.contains("Mario").click();
      cy.makeMess();
    })
  })
})
