/* eslint-disable no-undef */
import { lightTheme } from "../../src/theme";
import { ThemeProvider } from "@emotion/react";
import Forecast from "../../src/components/Forecast";

describe("Forecast component", () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.mount(
      <ThemeProvider theme={lightTheme}>
        <Forecast />
      </ThemeProvider>
    );
  });

  it("should fetch the forecast data from the API", () => {
    cy.wait("@forecast", { timeout: 30000 });
  });

  it("displays weather cards are successfully fetched", () => {
    cy.get("[data-testid=weather-cards]")
      .children("div")
      .should("have.length", 5); // assuming there are 5 days of forecast data
  });
});
