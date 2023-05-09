import { createTheme } from "@mui/material";

export const darkTheme = (mode) => createTheme({
  palette: {
    mode: mode,
    primary: {
      main: "#22bdd6",
    },
    secondary: {
      main: "#007f95",
    },
    text: {
      primary: "#fff",
      secondary: "#bdbdbd",
    },
  },
});


export const lightTheme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#22bdd6"
    },
    secondary: {
      main: "#007f95",
    },
    background: {
      default: "#f4f4f4"
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
    otherColor:{
      main:"#FFFFFF"
    }
  }
});


