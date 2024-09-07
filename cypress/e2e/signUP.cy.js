import { faker } from "@faker-js/faker";
import SignUp from "../pageobjects/signUpPage";

describe('SignUp', () => {

    it('Validates sign-up page layouts', () => {

        const signUp = new SignUp();
        const userName = faker.internet.userName();
        const userEmail = faker.internet.email();
        
        cy.visit('/');
        cy.get('a[href="/login"]').click();
        signUp.verifyURLContains('/login');
        signUp.verifyElementTextAndVisibility('.signup-form h2', 'New User Signup!');
        
        signUp.fillandSubmitSignupForm(userName, userEmail);
        signUp.verifyURLContains('/signup');
        // Confirm that the name matches the one used on the sign-up page.
        cy.get('[data-qa="name"]').should('attr', 'value', userName);
        // Confirm that the name matches the one used on the sign-up page and can't be changed.
        cy.get('[data-qa="email"]').should('attr', 'value', userEmail).should('be.disabled');
        // Check the status of the checkbox
        cy.get('#newsletter').should('not.be.checked');
        // Check the status of the checkbox
        cy.get('#optin').should('not.be.checked');
        // Verify the value has been selected
        cy.get('[data-qa="country"]').should('have.value', 'India').should('be.visible');
        signUp.verifyFormLabelsAndFields();
    });

    it('Verifies that a user can sign up successfully by filling in only the mandatory fields', () => {

        const signUp = new SignUp();
        const userName = faker.internet.userName();
        const userEmail = faker.internet.email();
        const userPassword = faker.internet.password();
        const userFirstName = faker.person.firstName();
        const userLastName = faker.person.lastName();
        const userAddress = faker.location.streetAddress();
        const userState = faker.location.state();
        const userCity = faker.location.city();
        const userZipCode = faker.location.zipCode();
        const userMobileNumber = faker.phone.number();

        cy.visit('/login');
        signUp.fillandSubmitSignupForm(userName, userEmail);
        cy.get('[data-qa="password"]').type(userPassword);
        cy.get('[data-qa="first_name"]').type(userFirstName);
        cy.get('[data-qa="last_name"]').type(userLastName);
        cy.get('[data-qa="address"]').type(userAddress);
        cy.get('[data-qa="state"]').type(userState);
        cy.get('[data-qa="city"]').type(userCity);
        cy.get('[data-qa="zipcode"]').type(userZipCode);
        cy.get('[data-qa="mobile_number"]').type(userMobileNumber);
        cy.get('button[data-qa="create-account"]').click();
        signUp.verifyAccountCreation();
        cy.get('[data-qa="continue-button"]').click();
        signUp.verifyURLContains('/');
        cy.get('.shop-menu ul.nav.navbar-nav li').contains('Logged in as').should('contain.text', userName);
        cy.get('a[href="/delete_account"]').should('have.text', ' Delete Account').and('be.visible').click();
        signUp.verifyElementTextAndVisibility('h2[data-qa="account-deleted"]', 'Account Deleted!');
        cy.get('[data-qa="continue-button"]').contains('Continue').click();
    });

    it('Verifies that a user can successfully sign up with all available fields', () => {
        const signUp = new SignUp();
        const userName = faker.internet.userName();
        const userEmail = faker.internet.email();
        const userPassword = faker.internet.password();
        const userFirstName = faker.person.firstName();
        const userLastName = faker.person.lastName();
        const userCompany = faker.company.name();
        const userAddress = faker.location.streetAddress();
        const userSecondaryAddress = faker.location.secondaryAddress();
        const userState = faker.location.state();
        const userCity = faker.location.city();
        const userZipCode = faker.location.zipCode();
        const userMobileNumber = faker.phone.number();

        cy.visit('/login');
        signUp.fillandSubmitSignupForm(userName, userEmail);
        
        // Select and check if the "Mr." radio button is selected.
        cy.get('label[for="id_gender1"]').should('contain.text', 'Mr.').click();
        cy.get('input[type="radio"][value="Mr"]').should('be.checked');
        
        // Select and check if the "Mrs." radio button is selected.
        cy.get('label[for="id_gender2"]').should('contain.text', 'Mrs.').click();
        cy.get('input[type="radio"][value="Mrs"]').should('be.checked');
        
        cy.get('[data-qa="password"]').type(userPassword);

         // Select the day, month, and year
        cy.get('#days').select('15');
        cy.get('#months').select('5');
        cy.get('#years').select('1990');
        // Verify the values have been selected
        cy.get('#days').should('have.value', '15');
        cy.get('#months').should('have.value', '5');
        cy.get('#years').should('have.value', '1990');
        
        // Check and uncheck the checkbox
        cy.get('#newsletter').check().should('be.checked');
        cy.get('#newsletter').uncheck().should('not.be.checked');        
        cy.get('#optin').check().should('be.checked');
        cy.get('#optin').uncheck().should('not.be.checked');
        
        cy.get('[data-qa="first_name"]').type(userFirstName);
        cy.get('[data-qa="last_name"]').type(userLastName);
        cy.get('[data-qa="company"]').type(userCompany);
        cy.get('[data-qa="address"]').type(userAddress);
        cy.get('[data-qa="address2"]').type(userSecondaryAddress);
        cy.get('[data-qa="country"]').select('Israel').should('have.value', 'Israel');
        cy.get('[data-qa="state"]').type(userState);
        cy.get('[data-qa="city"]').type(userCity);
        cy.get('[data-qa="zipcode"]').type(userZipCode);
        cy.get('[data-qa="mobile_number"]').type(userMobileNumber);

        cy.get('button[data-qa="create-account"]').click();
        signUp.verifyAccountCreation();
        cy.get('[data-qa="continue-button"]').click();
        signUp.verifyURLContains('/');
        cy.get('.shop-menu ul.nav.navbar-nav li').contains('Logged in as').should('contain.text', userName);
        cy.get('a[href="/logout"]').should('have.text',' Logout').and('be.visible');
        cy.get('a[href="/delete_account"]').should('have.text', ' Delete Account').and('be.visible').click();
        signUp.verifyElementTextAndVisibility('h2[data-qa="account-deleted"]', 'Account Deleted!');
        cy.get('[data-qa="continue-button"]').contains('Continue').click();
    });

    it('Verifies the error message for an already registered email', () => {
        const signUp = new SignUp();
        const userName = faker.internet.userName();
        const userExistEmail = 'elizabethresiga@gmail.com';
        cy.visit('/login');
        signUp.fillandSubmitSignupForm(userName, userExistEmail);

        // Verify the error message
        cy.get('p').contains('Email Address already exist!').should('be.visible');        
    });

    it('Verifies SQL Injection Prevention', () => {
        const signUp = new SignUp();
        const sqlInjectionStrings = "' DROP TABLE users; --";
        const userEmail = faker.internet.email();

        cy.visit('/login');
        signUp.fillandSubmitSignupForm(sqlInjectionStrings, userEmail);

        //The website doesn't process SQL scripts
        // Validate that the form was not submitted successfully
        // and that no SQL-related error messages are exposed.
        cy.url().should('include', '/signup'); // Should still be on the signup page
        cy.get('body').should('not.contain', 'SQL'); // Body should not contain any SQL-related errors  
    });
});
