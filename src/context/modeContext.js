import { createContext } from 'react';



export const modeContext = createContext({
    mode: "light",
    setMode: () => {},
  });
  