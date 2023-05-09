export const generateId = () => {
    return Math.random().toString(36).substr(2, 9);
  };
  
export const getFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    return favorites;
  };
  
export const saveFavorite = (newFavorite) => {
    const favorites = getFavorites();
    favorites.push(newFavorite);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };
  
export const isLocationAlreadyInFavorites = (locationLabel) => {
    const favorites = getFavorites();
    return favorites.some((fav) => fav.location === locationLabel);
  };

export const deleteFavorite = (locationLabel) => {
    const favorites = getFavorites();
    const updatedFavorites = favorites.filter((favorite) => favorite.location !== locationLabel);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  
  

  
  