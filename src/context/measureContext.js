import { createContext } from 'react';



export const measureContext = createContext({
    measurement: "Metric",
    setMeasurement: () => {},
  });
  