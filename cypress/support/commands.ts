// ***********************************************
// This example namespace declaration will help
// with Intellisense and code completion in your
// IDE or Text Editor.
// ***********************************************
// declare namespace Cypress {
//   interface Chainable<Subject = any> {
//     customCommand(param: any): typeof customCommand;
//   }
// }
//
// function customCommand(param: any): void {
//   console.warn(param);
// }
//
// NOTE: You can use it like so:
// Cypress.Commands.add('customCommand', customCommand);
//
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('loginIfNeeded', () => {
    cy.get('body').then($body => {
        if ($body.find('input[formcontrolname="email"]').length > 0) {
            cy.log('🔐 Login required');

            cy.get('input[formcontrolname="email"]').type('test@gmail.com');
            cy.get('input[formcontrolname="password"]').type('mwahaha');

            cy.contains('Connexion').click();

            cy.contains('BestBNB', { timeout: 3000 }).should('exist');
        } else {
            cy.log('✅ Already authenticated');
        }
    });
});

Cypress.Commands.add('makeConvs', () => {
    cy.get('input[placeholder="Titre de la Conversation"]').type('Mario');
    cy.contains('Créer').click();
});
Cypress.Commands.add('makeMess', () => {
    cy.get('input[placeholder="Écrivez votre message..."]').type('Je suis tout puissant');
    cy.contains('Envoyer').click();
});