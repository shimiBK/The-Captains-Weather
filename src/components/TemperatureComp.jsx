/* eslint-disable react/prop-types */
import { Typography } from "@mui/material";
import { celsiusToFahrenheit } from "../utils/utils";

const TemperatureComp = ({ measurement, value, variant, color }) => {
  const temperature =
    measurement === "Metric"
      ? `${Math.round(value)}°C`
      : `${celsiusToFahrenheit(Math.round(value))}°F`;

  return (
    <Typography variant={variant} color={color} fontWeight="bold">
      {temperature}
    </Typography>
  );
};

export default TemperatureComp;
