import { faker } from "@faker-js/faker";

describe('SignUp', () => {
    
    it('Verify that a user can successfully sign up with valid information', () => {

        const name = faker.internet.userName();
        const userEmail = faker.internet.email();
        const password = faker.internet.password();
        const userFirstName = faker.person.firstName();
        const userLastName = faker.person.lastName();
        const userCompany = faker.company.name();
        const userAddress = faker.location.streetAddress();
        const userSecondaryAddress = faker.location.secondaryAddress();
        const userState = faker.location.state();
        const userCity = faker.location.city();
        const userZipCode = faker.location.zipCode();
        const userMobileNumber = faker.phone.number();
        
        cy.visit('/');        

        // Click on the "Signup / Login" link
        cy.get('a[href="/login"]').click();

        //Verify URL contains login
        cy.url().should('include', '/login');
        
        //Verify Sign Up form
        cy.get('.signup-form h2').should('have.text', 'New User Signup!');

        //fill Name
        cy.get('[data-qa="signup-name"]').type(name);
        //fill Name
        cy.get('[data-qa="signup-email"]').type(userEmail);
        //Click "SignUp" button
        cy.get('[data-qa="signup-button"]').click();

        //Verify URL contains signup
        cy.url().should('include', '/signup');

        //Check that the first h2 contains the text "Enter Account Information"
        cy.get('h2.title').eq(0).should('have.text', 'Enter Account Information');

        // Verify the Title label text
        cy.get('div.clearfix > label').should('have.text', 'Title');

        // Verify that the label for the selected radio button is "Mr."
        cy.get('label[for="id_gender1"]').should('contain.text', 'Mr.').click();
        // Check if the "Mr" radio button is selected
        cy.get('input[type="radio"][value="Mr"]').should('be.checked');

        // Verify that the label for the selected radio button is "Mrs."
        cy.get('label[for="id_gender2"]').should('contain.text', 'Mrs.').click();
        // Check if the "Mrs" radio button is selected
        cy.get('input[type="radio"][value="Mrs"]').should('be.checked');

        // Verify the Name * label text
        cy.get('div.form-group > label').first().should('have.text', 'Name *');
        // Check if the input element has the class "required"
        // cy.get('#name').parent('.required').should('exist');
        cy.get('input[data-qa="name"]').closest('.form-group').should('have.class', 'required');
        //Confirm that the name matches the one used on the sign-up page.
        cy.get('[data-qa="name"]').should('attr', 'value', name);

        // Verify the Email * label text
        cy.get('div.form-group > label').eq(1).should('have.text', 'Email *');
        // Check if the input element has the class "required"
        // cy.get('#name').parent('.required').should('exist');
        cy.get('input[data-qa="email"]').closest('.form-group').should('have.class', 'required');
        //Confirm that the name matches the one used on the sign-up page.
        cy.get('[data-qa="email"]').should('attr', 'value', userEmail).should('be.disabled');

        // Verify the Password * label text
        cy.get('div.form-group > label').eq(2).should('have.text', 'Password *');
        // Check if the input element has the class "required"
        // cy.get('#name').parent('.required').should('exist');
        cy.get('input[data-qa="password"]').closest('.form-group').should('have.class', 'required');
        //Type password.
        cy.get('[data-qa="password"]').type(password);

        // Verify the Date of Birth label text
        cy.get('div.form-group > label').eq(3).should('have.text', 'Date of Birth');

        // Verify the day, month, and year fields are present
        cy.get('#days').should('exist');
        cy.get('#months').should('exist');
        cy.get('#years').should('exist');

        // Select the day, month, and year
        cy.get('#days').select('15');   // Select 15th day
        cy.get('#months').select('5');  // Select May
        cy.get('#years').select('1990'); // Select year 1990

        // Verify the values have been selected
        cy.get('#days').should('have.value', '15');
        cy.get('#months').should('have.value', '5');
        cy.get('#years').should('have.value', '1990');

        // Verify that the newsletter checkbox is present and has text Sign up for our newsletter!
        cy.get('#newsletter').should('exist');
        cy.get('div.checkbox > label').first().should('have.text', 'Sign up for our newsletter!');
        // Check the status of the checkbox
        cy.get('#newsletter').should('not.be.checked');
        // Select (check) the checkbox
        cy.get('#newsletter').check().should('be.checked');
        // Uncheck the checkbox
        cy.get('#newsletter').uncheck().should('not.be.checked');

        // Verify that the newsletter checkbox is present and has text Receive special offers from our partners!
        cy.get('#optin').should('exist');
        cy.get('div.checkbox > label').eq(1).should('have.text', 'Receive special offers from our partners!');
        // Check the status of the checkbox
        cy.get('#optin').should('not.be.checked');
        // Select (check) the checkbox
        cy.get('#optin').check().should('be.checked');
        // Uncheck the checkbox
        cy.get('#optin').uncheck().should('not.be.checked');

        //Check that the second h2 contains the text "Address Information."
        cy.get('h2.title').eq(1).should('have.text', 'Address Information');

        // Verify the First name * label text
        cy.get('p.form-group > label').first().should('have.text', 'First name *');
        // Check if the input element has the class "required"
        // cy.get('#name').parent('.required').should('exist');
        cy.get('input[data-qa="first_name"]').closest('.form-group').should('have.class', 'required');
        //Type user First Name
        cy.get('[data-qa="first_name"]').type(userFirstName);

        // Verify the Last name * label text
        cy.get('p.form-group > label').eq(1).should('have.text', 'Last name *');
        // Check if the input element has the class "required"
        // cy.get('#name').parent('.required').should('exist');
        cy.get('input[data-qa="last_name"]').closest('.form-group').should('have.class', 'required');
        //Type user Last Name
        cy.get('[data-qa="last_name"]').type(userLastName);

        // Verify the Company label text
        cy.get('p.form-group > label').eq(2).should('have.text', 'Company');
        //Type user Last Name
        cy.get('[data-qa="company"]').type(userCompany);

        // Verify the Address * (Street address, P.O. Box, Company name, etc.) label text
        cy.get('p.form-group > label').eq(3).should('have.text', 'Address * (Street address, P.O. Box, Company name, etc.)');
        // Check if the input element has the class "required"
        // cy.get('#name').parent('.required').should('exist');
        cy.get('input[data-qa="address"]').closest('.form-group').should('have.class', 'required');
        //Type user Last Name
        cy.get('[data-qa="address"]').type(userAddress);

        // Verify the Address 2 label text
        cy.get('p.form-group > label').eq(4).should('have.text', 'Address 2');
        //Type user Last Name
        cy.get('[data-qa="address2"]').type(userSecondaryAddress);

        // Verify the Country * label text
        cy.get('p.form-group > label').eq(5).should('have.text', 'Country * ');
        // Check if the input element has the class "required"
        // cy.get('#name').parent('.required').should('exist');
        cy.get('select[data-qa="country"]').closest('.form-group').should('have.class', 'required');
        // Verify the value has been selected
        cy.get('#country').should('have.value', 'India');
        //Select country Israel
        cy.get('#country').select('Israel'); 

        // Verify the State * label text
        cy.get('p.form-group > label').eq(6).should('have.text', 'State * ');
        // Check if the input element has the class "required"
        // cy.get('#name').parent('.required').should('exist');
        cy.get('input[data-qa="state"]').closest('.form-group').should('have.class', 'required');
        //Type user Last Name
        cy.get('[data-qa="state"]').type(userState);

        // Verify the City * label text
        cy.get('p.form-group > label').eq(7).should('have.text', 'City * ');
        // Check if the input element has the class "required"
        // cy.get('#name').parent('.required').should('exist');
        cy.get('input[data-qa="city"]').closest('.form-group').should('have.class', 'required');
        //Type user Last Name
        cy.get('[data-qa="city"]').type(userCity);

        // Verify the Zipcode * label text
        cy.get('p.form-group > label').eq(8).should('have.text', 'Zipcode * ');
        // Check if the input element has the class "required"
        // cy.get('#name').parent('.required').should('exist');
        cy.get('input[data-qa="zipcode"]').closest('.form-group').should('have.class', 'required');
        //Type user Last Name
        cy.get('[data-qa="zipcode"]').type(userZipCode);

        // Verify the Mobile Number * label text
        cy.get('p.form-group > label').eq(9).should('have.text', 'Mobile Number * ');
        // Check if the input element has the class "required"
        // cy.get('#name').parent('.required').should('exist');
        cy.get('input[data-qa="mobile_number"]').closest('.form-group').should('have.class', 'required');
        //Type user Last Name
        cy.get('[data-qa="mobile_number"]').type(userMobileNumber);

        //Click the Create Account button
        cy.get('button[data-qa="create-account"]').should('have.text', 'Create Account').click();

        //Verify redirected URL
        cy.url().should('include', '/account_created');

        //Verify that the account created text
        cy.get('h2[data-qa="account-created"]').should('have.text', 'Account Created!');
        // Check the first paragraph text
        cy.get('p').contains('Congratulations! Your new account has been successfully created!')
            .should('exist');
        // Check the second paragraph text
        cy.get('p').contains('You can now take advantage of member privileges to enhance your online shopping experience with us.')
            .should('exist');

        // Click on "Continue" button
        cy.get('[data-qa="continue-button"]').should('attr', 'href', '/').contains('Continue').click();

        //Verify the main page URL
        cy.url('/').should('eq', 'https://www.automationexercise.com/');

        // Check that the username is displayed correctly
        cy.get('.shop-menu ul.nav.navbar-nav li').contains('Logged in as').should('contain.text', name);

        // Check the Logout link is exist and displayed
        cy.get('a[href="/logout"]').should('have.text',' Logout').and('be.visible');

        // Check the Logout link is exist and displayed
        cy.get('a[href="/delete_account"]').should('have.text',' Delete Account').and('be.visible');
    });
});
