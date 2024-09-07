class LogIn{

    fillandSubmitLogInForm = (userEmail, password) => {
        cy.get('[data-qa="login-email"]').type(userEmail);
        cy.get('[data-qa="login-password"]').type(password);
        cy.get('[data-qa="login-button"]').click();
    };
}

export default LogIn;
