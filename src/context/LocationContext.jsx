import { createContext, useContext, useState } from "react";

const LocationContext = createContext();

export function LocationProvider({ children }) {
  const [location, setLocation] = useState(null);

  const selectLocation = (newLocation) => {
    setLocation(newLocation);
  };

  const clearLocation = () => {
    setLocation(null);
  };

  return (
    <LocationContext.Provider
      value={{
        location,
        selectLocation,
        clearLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export function useLocationContext() {
  return useContext(LocationContext);
}