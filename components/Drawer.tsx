import React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close"; // Import CloseIcon

import { advisoryLogo } from "./assets";

const drawerWidth = 600;

const URL_APPLY = "/apply";
const URL_HOME = "/";
const URL_MAIN = "https://advisory.sg/";
const URL_FAQ = "/faq";
const URL_MENTORS = "/mentors/0";

const ResponsiveDrawer = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const LinkListDesktop = () => (
    <List
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
      }}
    >
      <ListItem disablePadding>
        <a
          href={URL_HOME}
          onClick={handleDrawerToggle}
          style={desktopLinkStyle}
        >
          Home
        </a>
      </ListItem>
      <ListItem disablePadding>
        <a
          href={URL_MENTORS}
          onClick={handleDrawerToggle}
          style={desktopLinkStyle}
        >
          Find A Mentor
        </a>
      </ListItem>
      <ListItem disablePadding>
        <a href={URL_FAQ} onClick={handleDrawerToggle} style={desktopLinkStyle}>
          FAQ
        </a>
      </ListItem>
      <ListItem disablePadding>
        <a
          href={URL_APPLY}
          onClick={handleDrawerToggle}
          style={desktopLinkStyle}
        >
          Apply Now
        </a>
      </ListItem>
    </List>
  );

  const LinkListMobile = () => (
    <List style={{ textAlign: "right" }}>
      <ListItem disablePadding>
        <a href={URL_HOME} onClick={handleDrawerToggle} style={mobileLinkStyle}>
          Home
        </a>
      </ListItem>
      <ListItem disablePadding>
        <a
          href={URL_MENTORS}
          onClick={handleDrawerToggle}
          style={mobileLinkStyle}
        >
          Find A Mentor
        </a>
      </ListItem>
      <ListItem disablePadding>
        <a href={URL_FAQ} onClick={handleDrawerToggle} style={mobileLinkStyle}>
          FAQ
        </a>
      </ListItem>
      <ListItem disablePadding>
        <a
          href={URL_APPLY}
          onClick={handleDrawerToggle}
          style={mobileLinkStyle}
        >
          Apply Now
        </a>
      </ListItem>
    </List>
  );

  return (
    <Box sx={{ display: "flex", paddingBottom: "70px" }}>
      <AppBar
        style={{
          background: "white",
          boxShadow: "none",
          position: "sticky",
          zIndex: 1300,
        }}
        className="toolbar-component"
      >
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <Box style={{ display: "flex", justifyContent: "flex-start" }}>
            <a href={URL_MAIN} target="_blank" rel="noopener noreferrer">
              <img className="nav-logo" src={advisoryLogo} alt="Advisory" />
            </a>
          </Box>
          <Box
            style={{ justifyContent: "flex-end" }}
            sx={{ display: { xs: "none", sm: "flex", md: "flex" } }}
          >
            <LinkListDesktop />
          </Box>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            {mobileOpen ? (
              <CloseIcon style={{ color: "black" }} />
            ) : (
              <MenuIcon style={{ color: "black" }} />
            )}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, zIndex: 1000 }}
      >
        <Drawer
          anchor="top"
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: false,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              position: "inherit",
              boxSizing: "border-box",
              width: drawerWidth,
              paddingTop: "70px",
            },
          }}
        >
          <LinkListMobile />
        </Drawer>
      </Box>
    </Box>
  );
};

const desktopLinkStyle = {
  color: "black",
  fontWeight: "700",
  whiteSpace: "nowrap",
  margin: "0.5rem",
  cursor: "pointer",
  textDecoration: "none",
};

const mobileLinkStyle = {
  color: "black",
  fontWeight: "700",
  whiteSpace: "nowrap",
  cursor: "pointer",
  textDecoration: "none",
  margin: "auto",
  padding: "0.5rem",
  minWidth: "100px", // Adjust the value based on your needs
  display: "inline-block",
  textAlign: "right",
};

export default ResponsiveDrawer;
