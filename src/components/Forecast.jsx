import { API_KEY } from "../utils/api";
import { FORECAST_API_URL } from "../utils/api";
import { useContext } from "react";
import { Box } from "@mui/material";
import { locationContext } from "../context/locationContext";
import { toast } from "react-toastify";
import WeatherCard from "./WeatherCard";
import styled from "@emotion/styled";
import useFetch from "../hooks/useFetch";
import Loading from "./Loading";

const ForecastContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  flex: "3",
});

const LowerBox = styled(Box)({
  width: "100%",
  display: "flex",
  gap: "31px",
  justifyContent: "center",
  flexWrap: "wrap",
  maxWidth: "100%",
});

const Forecast = () => {
  const { locationData } = useContext(locationContext);
  const url = `${FORECAST_API_URL}/${locationData.value}?apikey=${API_KEY}&details=true&metric=true`;
  const { data: forecast, loading, error } = useFetch(url);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    toast.error("Error fetching forecast data");
  }

  return (
    <ForecastContainer>
      <LowerBox data-testid="weather-cards">
        {forecast?.DailyForecasts?.map((day) => (
          <WeatherCard key={day.id} data={day}  />
        ))}
      </LowerBox>
    </ForecastContainer>
  );
};

export default Forecast;
