/* eslint-disable react/prop-types */
import { API_KEY, CURRENT_API_URL } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { locationContext } from "../context/locationContext";
import { useContext, useEffect, useState } from "react";
import { measureContext } from "../context/measureContext";
import { toast } from "react-toastify";
import useFetch from "../hooks/useFetch";
import styled from "@emotion/styled";
import iconsTable from "../utils/iconsTable";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Loading from "./Loading";
import TemperatureComp from "./TemperatureComp";

const FavoriteCard = styled(Button)({
  display: "flex",
  flexDirection: "column",
  width: "250px",
  height: "300px",
  border: "none",
  borderRadius: "15px",
  boxShadow: "5px 5px 15px 5px rgba(0,0,0,0.41)",
  WebkitBoxShadow: "5px 5px 15px 5px rgba(0,0,0,0.41)",
  "&:hover": {
    transform: "scale(1.1)",
    transition: "all .2s ease-in-out",
  },
});

const ItemsBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "15px",
});

const LocationBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  position: "absolute",
  top: "0",
  left: "0",
  padding: "6px",
});

const ImageBox = styled(Box)({
  height: 100,
  width: 100,
});


const FavoritesCard = ({ favorite }) => {
  const { setLocationData } = useContext(locationContext);
  const { measurement } = useContext(measureContext);
  const [currentWeather, setCurrentWeather] = useState({});
  const url = `${CURRENT_API_URL}/${favorite.key}?apikey=${API_KEY}&details=true`;

  const { location } = favorite;
  const { WeatherIcon, Temperature, WeatherText } = currentWeather;
  const { data, error, loading } = useFetch(url);

  useEffect(() => {
    if (data) {
      setCurrentWeather({ ...data[0] });
    }
  }, [data]);

  const navigate = useNavigate();

  const handleFavoriteClick = (favorite) => {
    setLocationData({
      value: favorite.key,
      label: favorite.location,
    });
    navigate("/");
  };

  if (loading) {
    return <Loading />;
  }
  if (error) {
    toast.error("Error fetching current weather data");
  }

  return (
    <FavoriteCard onClick={() => handleFavoriteClick(favorite)}>
      <ItemsBox>
        <LocationBox>
          <LocationOnIcon />
          <Typography variant="span" fontWeight="bold" fontSize="13px">
            {location}
          </Typography>
        </LocationBox>
        <ImageBox
          component="img"
          alt=""
          src={iconsTable[WeatherIcon]}
        />
        <TemperatureComp measurement={measurement} value={Temperature?.Metric?.Value} variant="h5" color="secondary" />
        <Typography variant="h6" color="secondary">
          {WeatherText}
        </Typography>
      </ItemsBox>
    </FavoriteCard>
  );
};

export default FavoritesCard;
