import SignUp from "../pageobjects/signUpPage";
import LogIn from "../pageobjects/logInPage";

describe('LogIn', () => {
    
    it('Verifies that a user can successfully log in with valid credentials', () => {
        
        const signUp = new SignUp();
        const logIn = new LogIn();
        const email = 'exampleemail@example.com';
        const password = 'examplepassword';
        const userName = 'Example';

        cy.visit('/');
        cy.get('a[href="/login"]').click();
        signUp.verifyURLContains('/login');
        signUp.verifyElementTextAndVisibility('.login-form h2', 'Login to your account');

        logIn.fillandSubmitLogInForm(email, password);
        signUp.verifyURLContains('/');
        cy.get('.shop-menu ul.nav.navbar-nav li').contains('Logged in as').should('contain.text', userName);
        cy.get('a[href="/logout"]').should('have.text',' Logout').and('be.visible');
    });

    it('Verifies that a user cannot log in with wrong email', () => {

        const logIn = new LogIn();
        const email = 'wrongemail@example.com';
        const password = 'examplepassword';

        cy.visit('/login');
        logIn.fillandSubmitLogInForm(email, password);

        // Verify the error message
        cy.get('p').contains('Your email or password is incorrect!').should('be.visible');
    });

    it('Verifies that a user cannot log in with wrong password', () => {

        const logIn = new LogIn();
        const email = 'exampleemail@example.com';
        const password = 'wrongPassword';

        cy.visit('/login');
        logIn.fillandSubmitLogInForm(email, password);

        // Verify the error message
        cy.get('p').contains('Your email or password is incorrect!').should('be.visible');
    });

    it('Verifies that email and password fields can not be empty', () => {
        const signUp = new SignUp();

        cy.visit('/login');

        //Verify the fields have attribute required
        cy.get('[data-qa="login-email"]').should('have.attr', 'required');
        cy.get('[data-qa="login-password"]').should('have.attr', 'required');

        cy.get('[data-qa="login-button"]').click();

        //Verify that page does not redirect to another
        signUp.verifyURLContains('/login');
    });

    it.only('Verifies SQL Injection Prevention', () => {
        const logIn = new LogIn();
        const password = "' DROP TABLE users; --";
        const email = 'exampleemail@example.com';

        cy.visit('/login');
        logIn.fillandSubmitLogInForm(email, password);

        //The website doesn't process SQL scripts
        // Validate that the form was not submitted successfully
        // and that no SQL-related error messages are exposed.
        cy.get('p').contains('Your email or password is incorrect!').should('be.visible');
        cy.get('body').should('not.contain', 'SQL'); // Body should not contain any SQL-related errors  
    });
});
