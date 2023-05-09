import { Box, Typography } from "@mui/material";
import { getFavorites } from "../utils/storage.js";
import styled from "@emotion/styled";
import FavoritesCard from "../components/FavoritesCard";

const FavoritesBox = styled(Box)({
  display: "flex",
  minHeight: "calc(100vh - 120px)",
  justifyContent: "center",
  alignItems: "flex-start",
  paddingTop: "40px",
});

const FavoriteCards = styled(Box)({
  width: "65%",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: "30px",
});

const EmptyLocations = styled(Typography)({
  variant:"h4",
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%,-50%)",

})

const Favorites = () => {
  const favorites = getFavorites();

  return (
    <FavoritesBox>
      {favorites.length === 0 ? (
        <EmptyLocations variant="h4" color="secondary">
          YOU DONT HAVE ANY FAVORITE LOCATIONS
        </EmptyLocations>
      ) : (
        <FavoriteCards>
          {favorites.map((item) => (
            <FavoritesCard key={item.id} favorite={item} />
          ))}
        </FavoriteCards>
      )}
    </FavoritesBox>
  );
};

export default Favorites;
