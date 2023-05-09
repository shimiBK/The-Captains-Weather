import { useState } from "react";
import { Box, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { locationContext } from "./context/locationContext.js";
import { measureContext } from "./context/measureContext";
import { modeContext } from "./context/modeContext";
import { darkTheme, lightTheme } from "./theme.js";
import Weather from "./pages/Weather";
import Favorites from "./pages/Favorites";
import Navbar from "./components/Navbar";
import Toast from "./components/Toast";
import "./App.css";

function App() {
  const [locationData, setLocationData] = useState({
    value: "215854",
    label: "Tel Aviv, Israel",
  });
  const [measurement, setMeasurement] = useState("Metric");
  const [mode, setMode] = useState("light");

  return (
      <ThemeProvider theme={mode === "dark" ? darkTheme(mode) : lightTheme}>
        <modeContext.Provider value={{ mode, setMode }}>
          <measureContext.Provider value={{ measurement, setMeasurement }}>
            <locationContext.Provider value={{ locationData, setLocationData }}>
              <Box bgcolor={"background.default"}>
              <Navbar/>
                <Routes>
                  <Route
                    path="/"
                    exact
                    element={<Weather setMode={setMode} mode={mode} />}
                  />
                  <Route path="/favorites" element={<Favorites />} />
                </Routes>
                <Toast/>
              </Box>
            </locationContext.Provider>
          </measureContext.Provider>
        </modeContext.Provider>
      </ThemeProvider>
  );
}

export default App;
