/* eslint-disable react/prop-types */
import { Box, IconButton, Typography } from "@mui/material";
import { CURRENT_API_URL } from "../utils/api";
import { locationContext } from "../context/locationContext";
import { useContext, useEffect, useState } from "react";
import { measureContext } from "../context/measureContext";
import { API_KEY } from "../utils/api";
import { lightTheme } from "../theme";
import { toast } from "react-toastify";
import {
  generateId,
  saveFavorite,
  isLocationAlreadyInFavorites,
  deleteFavorite,
} from "../utils/storage.js";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import styled from "@emotion/styled";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import iconsTable from "../utils/iconsTable";
import useFetch from "../hooks/useFetch";
import Loading from "./Loading";
import TemperatureComp from "./TemperatureComp";

const CurrentContainer = styled(Box)({
  display: "flex",
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  gap: "40px",
  flexWrap: "wrap",

  [lightTheme.breakpoints.down("lg")]: {
    marginTop: "30px",
  },


});

const LeftBox = styled(Box)({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  width: "492px",
  height: "300px",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid lightgray",
  borderRadius: "20px",
  gap: "15px",
  boxShadow: "5px 5px 15px 5px rgba(0,0,0,0.41)",
  WebkitBoxShadow: "5px 5px 15px 5px rgba(0,0,0,0.41)",
  backgroundColor: "background.default",

  [lightTheme.breakpoints.down("sm")]: {
    width: "350px",
    height: "270px",
    gap: "15px",
  },
});

const RightBox = styled(Box)({
  display: "flex",
  width: "492px",
  height: "300px",
  border: "1px solid lightgray",
  borderRadius: "20px",
  justifyContent: "center",
  alignItems: "center",
  boxShadow: "5px 5px 15px 5px rgba(0,0,0,0.41)",
  WebkitBoxShadow: "5px 5px 15px 5px rgba(0,0,0,0.41)",

  [lightTheme.breakpoints.down("sm")]: {
    width: "350px",
    height: "270px",
  },
});

const ImageBox = styled(Box)({
  height: 100,
  width: 100,

  [lightTheme.breakpoints.down("sm")]: {
    marginTop: "5px",
  },
});

const FavoriteBox = styled(Box)({
  position: "absolute",
  top: "3px",
  right: "20px",

  [lightTheme.breakpoints.down("sm")]: {
    top: "5px",
  },
});

const LocationBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  position: "absolute",
  top: "15px",
  left: "20px",
  color: lightTheme.palette.secondary.main,
  gap: "5px",
});

const LeftInnerBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
  alignItems: "center",
  width: "45%",
  height: "95%",
  backgroundColor: "#007f95",
  borderRadius: "20px",
});

const RightInnerBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
  alignItems: "center",
  width: "50%",
  height: "95%",
});

const PropsTitles = styled(Typography)({
  variant: "span",
  fontWeight: "bold",
  fontSize: "18px",
  color: "white",
});

const PropsValues = styled(Typography)({
  variant: "span",
  fontSize: "18px",
  fontWeight: "bold",
  color: lightTheme.palette.secondary.main,
});

const CurrentWeather = () => {
  const { value: locationValue, label: locationLabel } =
    useContext(locationContext).locationData;
  const { measurement } = useContext(measureContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentWeather, setCurrentWeather] = useState({});

  const url = `${CURRENT_API_URL}/${locationValue}?apikey=${API_KEY}&details=true`;

  const { data, error, loading } = useFetch(url);

  const {
    WeatherIcon,
    Temperature,
    WeatherText,
    RealFeelTemperature,
    RelativeHumidity,
    Wind,
    Visibility,
    UVIndex,
  } = currentWeather;

  useEffect(() => {
    if (data) {
      setCurrentWeather({ ...data[0] });
    }
  }, [data]);

  useEffect(() => {
    const locationExists = isLocationAlreadyInFavorites(locationLabel);
    setIsFavorite(locationExists);
  }, [isFavorite, locationValue, locationLabel]);

  const handleAddLocationToFavorites = () => {
    const newFavorite = {
      id: generateId(),
      location: locationLabel,
      key: locationValue,
    };

    toast.success("Location was added to favorites");
    saveFavorite(newFavorite);
    setIsFavorite(true);
  };

  const handleRemoveLocationFromFavorites = () => {
    deleteFavorite(locationLabel);
    setIsFavorite(false);
    toast.success("Location was deleted from favorites");
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    toast.error("Error fetching current weather data");
  }

  return (
    <>
      <CurrentContainer data-testid="current-container">
        <LeftBox data-testid="current-leftbox">
          <LocationBox data-testid="locationbox">
            <LocationOnIcon />
            <Typography
              variant="span"
              fontSize="20px"
              fontWeight="bold"
              color="secondary"
            >
              {locationLabel.toUpperCase()}
            </Typography>
          </LocationBox>
          <FavoriteBox >
            <IconButton
              aria-label="add to favorites"
              color="secondary"
              size="large"
              onClick={
                isFavorite
                  ? handleRemoveLocationFromFavorites
                  : handleAddLocationToFavorites
              }
              data-testid="favorite-icon"
            >
              {isFavorite ? (
                <FavoriteIcon fontSize="inherit" />
              ) : (
                <FavoriteBorderIcon fontSize="inherit" />
              )}
            </IconButton>
          </FavoriteBox>
          <ImageBox
            component="img"
            alt=""
            src={iconsTable[WeatherIcon]}
          />
          <TemperatureComp
            measurement={measurement}
            value={Temperature?.Metric?.Value}
            variant="h4"
            color="secondary"
          />
          <Typography
            variant="span"
            fontSize="30px"
            fontWeight="bold"
            color="secondary"
          >
            {WeatherText?.toUpperCase()}
          </Typography>
        </LeftBox>
        <RightBox>
          <LeftInnerBox>
            <PropsTitles>Felt Temp.</PropsTitles>
            <PropsTitles>Humidity</PropsTitles>
            <PropsTitles>Wind</PropsTitles>
            <PropsTitles>Visibility</PropsTitles>
            <PropsTitles>UVIndex</PropsTitles>
          </LeftInnerBox>
          <RightInnerBox>
            <TemperatureComp
              measurement={measurement}
              value={RealFeelTemperature?.Metric?.Value}
              variant="span"
              color="secondary"
            />
            <PropsValues>{RelativeHumidity}%</PropsValues>
            <PropsValues>{Wind?.Speed?.Metric?.Value} km/h</PropsValues>
            <PropsValues>{Visibility?.Metric?.Value} km</PropsValues>
            <PropsValues>{UVIndex}</PropsValues>
          </RightInnerBox>
        </RightBox>
      </CurrentContainer>
    </>
  );
};

export default CurrentWeather;
