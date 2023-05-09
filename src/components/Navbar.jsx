/* eslint-disable react/prop-types */
import {
  AppBar,
  Box,
  Button,
  Drawer,
  FormControlLabel,
  IconButton,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { measureContext } from "../context/measureContext";
import { modeContext } from "../context/modeContext";
import { useNavigate } from "react-router-dom";
import { lightTheme } from "../theme";
import { capitalizeFirstLetter } from "../utils/utils.js";
import styled from "@emotion/styled";
import CycloneIcon from "@mui/icons-material/Cyclone";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MenuIcon from "@mui/icons-material/Menu";
import Search from "./Search";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const SearchBox = styled(Box)({
  maxWidth: "1024px",
  width: "260px",

  [lightTheme.breakpoints.down("sm")]: {
    width: "250px",
  },
});

const LeftBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "15px",
});

const RightBox = styled(Box)({
  display: "flex",
  alignItems: "center",
});

const CustomSwitch = ({
  label,
  onChange,
  display,
  sxColor,
  switchColor,
  name,
}) => {
  return (
    <FormControlLabel
      sx={{
        display: display,
        color: sxColor,
      }}
      control={<Switch name={name} color={switchColor} onChange={onChange} />}
      label={label}
    />
  );
};

const Navbar = () => {
  const { measurement, setMeasurement } = useContext(measureContext);
  const { mode, setMode } = useContext(modeContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/favorites");
  };

  const handleNavHome = () => {
    navigate("/");
  };

  const handleMeasurment = () => {
    measurement === "Imperial"
      ? setMeasurement("Metric")
      : setMeasurement("Imperial");
  };

  const handleMode = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <LeftBox>
          <CycloneIcon
            sx={{
              display: { xs: "block", md: "none" },
              color: "white",
              fontSize: "30px",
            }}
            onClick={handleNavHome}
          />
          <Typography
            onClick={handleNavHome}
            variant="span"
            color="white"
            fontSize="25px"
            data-testid="app-name"
            sx={{ display: { xs: "none", md: "block" }, cursor: "pointer",fontWeight:"bold" }}
          >
            The Captain&apos;s Weather
          </Typography>
          <SearchBox>
            <Search />
          </SearchBox>
        </LeftBox>
        <RightBox>
          <CustomSwitch 
            name="Metric"
            sxColor="white"
            switchColor="default"
            label={measurement}
            onChange={handleMeasurment}
            display={{ xs: "none", md: "block" }}
            data-testid="test"
          />
          <CustomSwitch
            name="Metric"
            sxColor="white"
            switchColor="default"
            label={capitalizeFirstLetter(mode)}
            onChange={handleMode}
            display={{ xs: "none", md: "block" }}
          />
          <Button
            sx={{ color: "white", display: { xs: "none", md: "flex" } }}
            variant="text"
            startIcon={<FavoriteBorderIcon />}
            onClick={handleClick}
          >
            Favorites
          </Button>
          <IconButton
            sx={{ display: { sm: "block", md: "none" }, color: "white" }}
            edge="start"
            color="inherit"
            onClick={handleToggle}
          >
            <MenuIcon />
          </IconButton>
        </RightBox>
        <Drawer
          sx={{ display: { xs: "block", lg: "none" } }}
          open={open}
          anchor="right"
          onClose={handleToggle}
        >
          <List>
            <ListItem>
              <CustomSwitch
                name="Metric"
                sxColor={lightTheme.palette.primary.main}
                switchColor="primary"
                label={measurement}
                onChange={handleMeasurment}
                display="block"
              />
            </ListItem>
            <ListItem>
              <CustomSwitch
                name="Metric"
                sxColor={lightTheme.palette.primary.main}
                switchColor="primary"
                label={capitalizeFirstLetter(mode)}
                onChange={handleMode}
                display="block"

              />
            </ListItem>
            <ListItem >
              <Button
                sx={{ color: "secondary" }}
                variant="text"
                startIcon={<FavoriteBorderIcon />}
                onClick={handleClick}
              >
                Favorites
              </Button>
            </ListItem>
          </List>
        </Drawer>
      </StyledToolbar>
    </AppBar>
  );
};

export default Navbar;
