import { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext();

// Безопасное чтение из localStorage
const getSavedFavorites = () => {
  try {
    const saved = localStorage.getItem("favorites");

    if (!saved) {
      return [];
    }

    const parsed = JSON.parse(saved);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed;
  } catch {
    return [];
  }
};

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(getSavedFavorites);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (product) => {
    setFavorites((prev) => {
      const exists = prev.some((item) => item.id === product.id);

      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      }

      return [...prev, product];
    });
  };

  const isFavorite = (id) => {
    return favorites.some((item) => item.id === id);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
