
describe('Logout', () => {
    
    before(() => {
        //cy.session('user-session',() =>{ cy.loginUser() });
        cy.loginUser();
    });

    it('Verifies that a user is logged out', () => {
        
        cy.visit('/');

        cy.get('a[href="/logout"]').click();
        //Verify that the user is logged out
        cy.url().should('include', '/login');
        cy.get('a[href="/login"]').should('have.text', ' Signup / Login');        
    });
});
