import { Box, Stack } from "@mui/material";
import { lightTheme } from "../theme";
import Forecast from "../components/Forecast";
import CurrentWeather from "../components/CurrentWeather";
import styled from "@emotion/styled";

const HomeContainer = styled(Box)({
  
  [lightTheme.breakpoints.down('sm')]: {
    overflowX:"scroll"

  },
});

const Weather = () => {
  return (
    <HomeContainer >
      <Stack sx={{minHeight:"calc(100vh - 80px)"}} spacing={[4, 4, 4, 0]} direction="column">
        <CurrentWeather />
        <Forecast />
      </Stack>
    </HomeContainer>
  );
};

export default Weather;
