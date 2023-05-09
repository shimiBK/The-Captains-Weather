/* eslint-disable no-undef */
import { lightTheme } from "../../src/theme";
import { ThemeProvider } from "@emotion/react";
import CurrentWeather from "../../src/components/CurrentWeather";

describe("Forecast component", () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.mount(
      <ThemeProvider theme={lightTheme}>
        <CurrentWeather />
      </ThemeProvider>
    );
  });


  it("should toggle favorite icon when clicked and then clicked again", () => {
    cy.wait(1000);
      cy.get("[data-testid=favorite-icon]").click();
      cy.get("[data-testid=FavoriteIcon]").should("be.visible");
      cy.get("[data-testid=favorite-icon]").click();
      cy.get("[data-testid=FavoriteBorderIcon]").should("be.visible");
    });


    it("should check that the current weather data fetched properly", () => {
      cy.get("[data-testid=current-leftbox]")
        .should("contain", "TEL AVIV, ISRAEL")
  
    });



  });

