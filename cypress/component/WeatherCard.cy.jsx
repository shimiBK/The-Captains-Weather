/* eslint-disable no-undef */
import { lightTheme } from "../../src/theme";
import { ThemeProvider } from "@emotion/react";
import WeatherCard from "../../src/components/WeatherCard";
import { format } from "date-fns";





describe("Forecast component", () => {
  const weatherData = {
    Date: "2023-05-08T07:00:00+03:00",
    Temperature: {
      Minimum: {
        Value: 16.7,
        Unit: "C",
        UnitType: 17,
      },
      Maximum: {
        Value: 20.7,
        Unit: "C",
        UnitType: 17,
      },
    },
    Day: {
      Icon: 14,
      IconPhrase: "Partly sunny w/ showers",
    },
  };

const date = new Date(weatherData.Date);
const formatedDate = format(date, "dd/MM");
  
  beforeEach(() => {
    
    cy.viewport(1280, 720);
    cy.mount(
      <ThemeProvider theme={lightTheme}>
        <WeatherCard data={weatherData} />
      </ThemeProvider>
    );
  });

  it("displays weather cards with correct data when data is successfully fetched", () => {
    cy.get("[data-testid=weather-card]")
      .should("contain", formatedDate)
      .and("contain", "Partly sunny w/ showers")
      .and("contain",`${Math.round(weatherData.Temperature.Minimum.Value)}°C`)
      .and("contain",`${Math.round(weatherData.Temperature.Maximum.Value)}°C`)

  });
});
