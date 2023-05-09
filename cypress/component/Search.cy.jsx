/* eslint-disable no-undef */
/* eslint-disable no-undef */
import Search from "../../src/components/Search";

describe("Test the Search functionality", () => {
  beforeEach(() => {
    cy.mount(<Search/>);
    cy.wait(1000);
    cy.get('[data-testid="search"]').as("search");
  });

  it("should render the Search component", () => {
    cy.get("@search").should("be.visible");
  });

  it("should search for a city", () => {
    cy.get("@search").type("Tel Aviv");
    cy.wait(1000);
    cy.get('.css-1nmdiq5-menu').first().click();
    cy.get('.css-1dimb5e-singleValue').should("have.text", "Tel Aviv, Israel");
  });
});
