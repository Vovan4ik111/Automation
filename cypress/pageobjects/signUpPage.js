class SignUp{

    verifyURLContains = (text) => {
       cy.url().should('include', text);
    };

    fillandClickSignupForm = (userName, userEmail) => {
        cy.get('[data-qa="signup-name"]').type(userName);
        cy.get('[data-qa="signup-email"]').type(userEmail);
        cy.get('[data-qa="signup-button"]').click();
    };

    verifyElementTextAndVisibility = (selector, text, index = 0) => {
        cy.get(selector).eq(index).should('have.text', text).and('be.visible');
    };

    // verifyMultiElementTextAndVisibility = (selector, text, index = 0) => {
    //     return  cy.get(selector).eq(index).should('have.text', text).should('be.visible');
    // };

    checkInputRequired = (selector) => {
        cy.get(selector).should('have.attr', 'required');
    };

    verifyElementExistAndVisibility = (selector) => {
        cy.get(selector).should('exist').and('be.visible');
    };

    verifyFormLabelsAndFields = () => {
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
        //    cy.get(selector).eq(index).should('have.text', text).and('be.visible');
            this.verifyElementTextAndVisibility(selector, text, index);
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

        requiredFields.forEach(selector => 
            // cy.get(selector).should('have.attr', 'required');
            this.checkInputRequired(selector));

        const existFields = [
            'select[data-qa="days"]',
            'select[data-qa="months"]',
            'select[data-qa="years"]',
            'input#newsletter',
            'input#optin'
        ];

        existFields.forEach(selector => 
            // cy.get(selector).should('exist').and('be.visible');
            this.verifyElementExistAndVisibility(selector));
    };

    verifyAccountCreation = () => {
        this.verifyURLContains('/account_created');
        this.verifyElementTextAndVisibility('h2[data-qa="account-created"]', 'Account Created!');
        this.verifyElementTextAndVisibility('div.col-sm-9.col-sm-offset-1 > p', 'Congratulations! Your new account has been successfully created!');
        this.verifyElementTextAndVisibility('div.col-sm-9.col-sm-offset-1 > p', 'You can now take advantage of member privileges to enhance your online shopping experience with us.', 1);

        cy.get('[data-qa="continue-button"]').should('have.attr', 'href', '/').contains('Continue').should('be.visible');
    };

}

export default SignUp;
