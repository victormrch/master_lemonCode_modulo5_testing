describe('Login specs', () => {
  it('should visit the login page', () => {
    cy.visit('/');
  });
  it('should user input has the focus when click', () => {
    // Arrange

    // Act
    cy.visit('/');
    cy.findAllByRole('textbox').click();

    // Assert
    cy.findAllByRole('textbox').should('have.focus');
  });

  it('should user input has the focus when load the page', () => {
    // Arrange

    // Act
    cy.visit('/');

    // Assert
    cy.findAllByRole('textbox').should('have.focus');
  });

  it('should show an alert when credentials are wrong', () => {
    // Arrange
    const user = 'admin';
    const password = 'sss';
    const alertText = 'Usuario y/o password no válidos';

    // Act
    cy.visit('/');
    cy.findAllByRole('textbox').as('userInput');
    cy.findByLabelText('Contraseña *').as('passwordInput');
    cy.get('@userInput').type(user);
    cy.get('@passwordInput').type(password);
    cy.findByRole('button').click();

    // Assert
    cy.get('@userInput').should('have.value', user);
    cy.get('@passwordInput').should('have.value', password);
    cy.findByRole('alert').should('have.text', alertText);
  });

  it('should navigate to the app when credentials are correct', () => {
    // Arrange
    const user = 'admin';
    const password = 'test';

    // Act
    cy.visit('/');
    cy.findAllByRole('textbox').as('userInput');
    cy.findByLabelText('Contraseña *').as('passwordInput');
    cy.get('@userInput').type(user);
    cy.get('@passwordInput').type(password);
    cy.findByRole('button').click();

    // Assert
    cy.url().should('include', '/submodule-list');
  });
});
