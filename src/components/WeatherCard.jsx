/* eslint-disable react/prop-types */
import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import { measureContext } from "../context/measureContext.js";
import { format } from "date-fns";
import { lightTheme } from "../theme.js";
import styled from "@emotion/styled";
import WEEK_DAYS from "../utils/weekDays.js";
import iconsTable from "../utils/iconsTable.js";
import TemperatureComp from "./TemperatureComp.jsx";

const DailyCard = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width: "180px",
  height: "230px",
  border: "none",
  borderRadius: "15px",
  boxShadow: "5px 5px 15px 5px rgba(0,0,0,0.41)",
  WebkitBoxShadow: "5px 5px 15px 5px rgba(0,0,0,0.41)",
  backgroundColor: "background.default",
});

const UpperCard = styled(Box)({
  display: "flex",
  flexDirection: "column",
  flex:1,
  textAlign: "center",
  marginTop: "10px",
  gap: "5px",
});

const LowerCard = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "15px",
  flex:3,
});

const DegreeBox = styled(Box)({
  display: "flex",
  gap: "55px",
  marginTop: "5px",
});

const ImageBox = styled(Box)({
  height: 70,
  width: 70,

});

const TextTypo = styled(Typography)({
  variant: "span",
  color: lightTheme.palette.secondary.main,
  fontWeight: "bold",
});



const WeatherCard = ({ data }) => {
  
  const { measurement } = useContext(measureContext);
  const date = new Date(data.Date);
  const dayOfWeek = WEEK_DAYS[date.getDay()];
  const formatedDate = format(date, "dd/MM");

  return (
    <DailyCard data-testid="weather-card">
      <UpperCard>
        <TextTypo>{dayOfWeek}</TextTypo> 
         <TextTypo fontSize="14px ">{formatedDate}</TextTypo>
      </UpperCard>
      <LowerCard>
        <ImageBox
          component="img"
          alt=""
          src={iconsTable[data.Day.Icon]}
        />
        <TextTypo fontSize="14px">{data.Day.IconPhrase}</TextTypo>
        <DegreeBox>
        <TemperatureComp measurement={measurement} value={data.Temperature.Minimum.Value} variant="span" color="secondary" />
        <TemperatureComp measurement={measurement} value={data.Temperature.Maximum.Value} variant="span" color="secondary" />
        </DegreeBox>
      </LowerCard>
    </DailyCard>
  );
};

export default WeatherCard;
