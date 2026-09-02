import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App.jsx";

import { FavoritesProvider } from "./context/FavoritesContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { LocationProvider } from "./context/LocationContext.jsx";
import { ProductsProvider } from "./context/ProductsContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ProductsProvider>
      <FavoritesProvider>
        <CartProvider>
          <LocationProvider>
            <App />
          </LocationProvider>
        </CartProvider>
      </FavoritesProvider>
    </ProductsProvider>
  </StrictMode>
);