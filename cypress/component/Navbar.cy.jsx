/* eslint-disable no-undef */
import Navbar from "../../src/components/Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import { lightTheme } from "../../src/theme";
import { ThemeProvider } from "@emotion/react";




describe("Navbar", () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.mount(
      <ThemeProvider theme={lightTheme}>
      <Router>
        <Navbar/>
      </Router>
      </ThemeProvider>
    );
  });

  it("should display the app name", () => {
    cy.get("[data-testid=app-name]").should("be.visible");
  });

  it("should navigate to home page when clicking on app name", () => {
    cy.get("[data-testid=app-name]").click();
    cy.url().should("include", "/");

  });

  it("should navigate to favorites page when click on favorites button", () => {
    cy.get("[data-testid=FavoriteBorderIcon]").click();
    cy.url().should("include", "/favorites");

  });
  
  it("should toggle the Metric Toggle'", () => {
    cy.get(".MuiBox-root.css-yeouz0 label:nth-child(1)").click()
  
  });

  it("should toggle the Mode Toggle'", () => {
    cy.get(".MuiBox-root.css-yeouz0 label:nth-child(2)").click()
  
  });
  
  
  

});
