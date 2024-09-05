import { faker } from "@faker-js/faker";

describe('SignUp', () => {
  
    const visitHomePage = () => {
        cy.visit('/');
    };

    const clickSignUpLogin = () => {
        cy.get('a[href="/login"]').click();
    };

    const verifyURLContains = (text) => {
        cy.url().should('include', text);
    };

    const fillSignupForm = (userName, userEmail) => {
        cy.get('[data-qa="signup-name"]').type(userName);
        cy.get('[data-qa="signup-email"]').type(userEmail);
        cy.get('[data-qa="signup-button"]').click();
    };

    const verifyElementTextAndVisibility = (selector, text) => {
        cy.get(selector).should('have.text', text).should('be.visible');
    };

    const verifyMultiElementTextAndVisibility = (selector, text, index = 0) => {
        cy.get(selector).eq(index).should('have.text', text).should('be.visible');
    };

    const checkInputRequired = (selector) => {
        cy.get(selector).should('have.attr', 'required');
    };

    const verifyElementExistAndVisibility = (selector) => {
        cy.get(selector).should('exist').should('be.visible');
    };

    const verifyFormLabelsAndFields = () => {
        const fields = [
            { selector: 'h2.title', text: 'Enter Account Information' },
            { selector: 'div.clearfix > label', text: 'Title' },
            { selector: 'div.form-group > label', text: 'Name *' },
            { selector: 'div.form-group > label', text: 'Email *', index: 1 },
            { selector: 'div.form-group > label', text: 'Password *', index: 2 },
            { selector: 'div.form-group > label', text: 'Date of Birth', index: 3 },
            { selector: 'div.checkbox > label', text: 'Sign up for our newsletter!' },
            { selector: 'div.checkbox > label', text: 'Receive special offers from our partners!', index: 1 },
            { selector: 'h2.title', text: 'Address Information', index: 1 },
            { selector: 'p.form-group > label', text: 'First name *' },
            { selector: 'p.form-group > label', text: 'Last name *', index: 1 },
            { selector: 'p.form-group > label', text: 'Company', index: 2 },
            { selector: 'p.form-group > label', text: 'Address * (Street address, P.O. Box, Company name, etc.)', index: 3 },
            { selector: 'p.form-group > label', text: 'Address 2', index: 4 },
            { selector: 'p.form-group > label', text: 'Country * ', index: 5 },
            { selector: 'p.form-group > label', text: 'State * ', index: 6 },
            { selector: 'p.form-group > label', text: 'City * ', index: 7 },
            { selector: 'p.form-group > label', text: 'Zipcode * ', index: 8 },
            { selector: 'p.form-group > label', text: 'Mobile Number * ', index: 9 },
            { selector: 'button[data-qa="create-account"]', text: 'Create Account' }
        ];
        
        fields.forEach(({ selector, text, index = 0 }) => {
            cy.get(selector).eq(index).should('have.text', text).should('be.visible');
        });

        const requiredFields = [
            'input[data-qa="name"]',
            'input[data-qa="email"]',
            'input[data-qa="password"]',
            'input[data-qa="first_name"]',
            'input[data-qa="last_name"]',
            'input[data-qa="address"]',
            'select[data-qa="country"]',
            'input[data-qa="state"]',
            'input[data-qa="city"]',
            'input[data-qa="zipcode"]',
            'input[data-qa="mobile_number"]'
        ];

        requiredFields.forEach(selector => checkInputRequired(selector));

        const existFields = [
            'select[data-qa="days"]',
            'select[data-qa="months"]',
            'select[data-qa="years"]',
            'input#newsletter',
            'input#optin'
        ];

        existFields.forEach(selector => verifyElementExistAndVisibility(selector));
    };

    const verifyAccountCreation = () => {
        verifyURLContains('/account_created');
        verifyElementTextAndVisibility('h2[data-qa="account-created"]', 'Account Created!');
        verifyMultiElementTextAndVisibility('div.col-sm-9.col-sm-offset-1 > p', 'Congratulations! Your new account has been successfully created!');
        verifyMultiElementTextAndVisibility('div.col-sm-9.col-sm-offset-1 > p', 'You can now take advantage of member privileges to enhance your online shopping experience with us.', 1);

        cy.get('[data-qa="continue-button"]').should('have.attr', 'href', '/').contains('Continue').should('be.visible');
    };

    it('Validates sign-up page layouts', () => {
        const userName = faker.internet.userName();
        const userEmail = faker.internet.email();
        
        visitHomePage();
        clickSignUpLogin();
        verifyURLContains('/login');
        verifyElementTextAndVisibility('.signup-form h2', 'New User Signup!');
        
        fillSignupForm(userName, userEmail);
        verifyURLContains('/signup');
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
        verifyFormLabelsAndFields();
        // Navigate to the Account Created URL
        cy.visit('/account_created');
        verifyAccountCreation();
    });

    it('Verifies that a user can sign up successfully by filling in only the mandatory fields', () => {
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

        // visitHomePage();
        // clickSignUpLogin();
        cy.visit('/login');
        fillSignupForm(userName, userEmail);
        cy.get('[data-qa="password"]').type(userPassword);
        cy.get('[data-qa="first_name"]').type(userFirstName);
        cy.get('[data-qa="last_name"]').type(userLastName);
        cy.get('[data-qa="address"]').type(userAddress);
        cy.get('[data-qa="state"]').type(userState);
        cy.get('[data-qa="city"]').type(userCity);
        cy.get('[data-qa="zipcode"]').type(userZipCode);
        cy.get('[data-qa="mobile_number"]').type(userMobileNumber);
        cy.get('button[data-qa="create-account"]').click();
        verifyAccountCreation();
        cy.get('[data-qa="continue-button"]').click();
        verifyURLContains('/');
        cy.get('.shop-menu ul.nav.navbar-nav li').contains('Logged in as').should('contain.text', userName);
        cy.get('a[href="/delete_account"]').should('have.text', ' Delete Account').and('be.visible').click();
        verifyElementTextAndVisibility('h2[data-qa="account-deleted"]', 'Account Deleted!');
        cy.get('[data-qa="continue-button"]').contains('Continue').click();
    });

    it('Verifies that a user can successfully sign up with valid information', () => {
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

        // visitHomePage();
        // clickSignUpLogin();
        cy.visit('/login');
        fillSignupForm(userName, userEmail);
        
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
        verifyAccountCreation();
        cy.get('[data-qa="continue-button"]').click();
        verifyURLContains('/');
        cy.get('.shop-menu ul.nav.navbar-nav li').contains('Logged in as').should('contain.text', userName);
        cy.get('a[href="/logout"]').should('have.text',' Logout').and('be.visible');
        cy.get('a[href="/delete_account"]').should('have.text', ' Delete Account').and('be.visible').click();
        verifyElementTextAndVisibility('h2[data-qa="account-deleted"]', 'Account Deleted!');
        cy.get('[data-qa="continue-button"]').contains('Continue').click();
    });

    it('Verifies the error message for an already registered email', () => {
        const userName = faker.internet.userName();
        cy.visit('/login');
        fillSignupForm(userName, 'elizabethresiga@gmail.com');

        // Verify the error message
        cy.get('p').contains('Email Address already exist!').should('be.visible');        
    });

    it('Verifies SQL Injection Prevention', () => {
        
        const sqlInjectionStrings = "' DROP TABLE users; --";
        const userEmail = faker.internet.email();

        cy.visit('/login');
        fillSignupForm(sqlInjectionStrings, userEmail);

        // Validate that the form was not submitted successfully
        // and that no SQL-related error messages are exposed.
        cy.url().should('include', '/signup'); // Should still be on the signup page
        cy.get('body').should('not.contain', 'SQL'); // Body should not contain any SQL-related errors  
    });
});
