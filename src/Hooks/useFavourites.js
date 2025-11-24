import { useState, useEffect } from "react";

const useFavourites = () => {
  const [favourites, setFavourites] = useState({});

  useEffect(() => {
    getFavourites();
  }, []);

  const setFavourite = (event) => {
    const favourites = localStorage.getItem("favourites")
      ? JSON.parse(localStorage.getItem("favourites"))
      : {};

    // Toggle: if already favourite, remove it; otherwise add it
    if (favourites[event.id]) {
      delete favourites[event.id];
    } else {
      favourites[event.id] = event;
    }

    console.log("Favourites", favourites);
    localStorage.setItem("favourites", JSON.stringify(favourites));
    setFavourites(favourites); // Update state to trigger re-render
  };

  const getFavourites = () => {
    const favourites = localStorage.getItem("favourites")
      ? JSON.parse(localStorage.getItem("favourites"))
      : {};
    setFavourites(favourites);
  };

  return { favourites, setFavourite, getFavourites };
};

export default useFavourites;
