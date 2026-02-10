declare namespace Cypress {
    interface Chainable {
        loginIfNeeded(): Chainable<void>;
        makeConvs(): Chainable<void>;
        makeMess(): Chainable<void>;
    }
}