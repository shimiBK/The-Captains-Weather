import { createContext } from 'react';



export const locationContext = createContext({
    locationData: {
      value: "215854",
      label: "Tel Aviv, Israel",
    },
    setLocationData: () => {},
  });
  