describe('Clicking through site', () => {
  before(() => {
    cy.visit('/');
  });

  it('has 24 svgs', () => {
    const svgs = cy.get('svg');
    svgs.should('have.length', 24);
  });

  it('has 1 input', () => {
    const element = cy.get('input');
    element.should('have.length', 1);
  });

  it('has 15 divs', () => {
    const svgs = cy.get('div');
    svgs.should('have.length', 15);
  });

  it('clicks new component and updates console with correct text', () => {
    cy.get('[data-cy=new-component]').click();
    cy.get('.terminal pre').should('have.html', 'ng generate component xyz');
  });

  it('clicks angular material and updates console with correct text', () => {
    cy.get('[data-cy=angular-material]').click();
    cy.get('.terminal pre').should('have.html', 'ng add @angular/material');
  });

  it('clicks add pwa support and updates console with correct text', () => {
    cy.get('[data-cy=add-pwa]').click();
    cy.get('.terminal pre').should('have.html', 'ng add @angular/pwa');
  });

  it('clicks Run tests and updates console with correct text', () => {
    cy.get('[data-cy=run-watch]').click();
    cy.get('.terminal pre').should('have.html', 'ng test');
  });
});
