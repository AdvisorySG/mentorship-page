import React, { useEffect, useState } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import { advisoryLogo } from "../assets";
import { URL_APPLY, URL_FAQ, URL_HOME, URL_MAIN, URL_MENTORS } from "../links";

const drawerWidth = 640;

const desktopLinkStyle = {
  fontWeight: "700",
  whiteSpace: "nowrap",
  marginLeft: "2rem",
};

const mobileLinkStyle = {
  fontWeight: "700",
  whiteSpace: "nowrap",
  padding: "0.5rem",
  margin: "0px",
};

const ResponsiveDrawer = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < drawerWidth);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const image = new Image();
    image.src = advisoryLogo;
    image.onload = () => {
      setImageLoaded(true);
    };

    return () => {
      image.onload = null; // Clean up the event handler
    };
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen((prevMobileOpen) => !prevMobileOpen);
  };

  const LinkList = () => (
    <List
      style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: isMobile ? "flex-start" : "flex-start",
        textAlign: isMobile ? "right" : "right",
        paddingLeft: isMobile ? "62vw" : 0,
      }}
    >
      <ListItem disablePadding style={{ paddingLeft: isMobile ? "60px" : 0 }}>
        <a
          href={URL_HOME}
          onClick={handleDrawerToggle}
          style={isMobile ? mobileLinkStyle : desktopLinkStyle}
        >
          Home
        </a>
      </ListItem>
      <ListItem disablePadding style={{ paddingLeft: isMobile ? 0 : 0 }}>
        <a
          href={URL_MENTORS}
          onClick={handleDrawerToggle}
          style={isMobile ? mobileLinkStyle : desktopLinkStyle}
        >
          Find A Mentor
        </a>
      </ListItem>
      <ListItem disablePadding style={{ paddingLeft: isMobile ? "70px" : 0 }}>
        <a
          href={URL_FAQ}
          onClick={handleDrawerToggle}
          style={isMobile ? mobileLinkStyle : desktopLinkStyle}
        >
          FAQ
        </a>
      </ListItem>
      <ListItem disablePadding>
        <a href={URL_APPLY} target="_blank">
          <button
            style={{
              backgroundColor: "var(--brand-color)",
              color: "white",
              border: "none",
              padding: "10px",
              fontSize: "inherit",
              borderRadius: "5px",
              fontWeight: "700",
              whiteSpace: "nowrap",
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "0 16px",
              cursor: "pointer",
            }}
          >
            Apply Now
          </button>
        </a>
      </ListItem>
    </List>
  );

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        height: "var(--navbar-height)",
      }}
    >
      <AppBar
        style={{
          background: "white",
          boxShadow: "none",
          position: "sticky",
          zIndex: 1300,
        }}
        className="toolbar-component"
      >
        <Toolbar
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0px",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
            {imageLoaded && (
              <a href={URL_MAIN} target="_blank" rel="noopener noreferrer">
                <img
                  className="nav-logo"
                  src={advisoryLogo}
                  alt="Advisory"
                  style={{ maxHeight: "50px" }}
                />
              </a>
            )}
          </Box>
          <Box
            sx={{
              display: isMobile ? "none" : "flex",
              justifyContent: "flex-end",
            }}
          >
            <LinkList />
          </Box>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: isMobile ? "block" : "none", mr: 2 }}
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
        sx={{
          zIndex: 1000,
          ...(isMobile ? { width: drawerWidth, flexShrink: 0 } : {}),
        }}
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
            display: isMobile ? "block" : "none",
            "& .MuiDrawer-paper": {
              position: "inherit",
              boxSizing: "border-box",
              width: drawerWidth,
              paddingTop: "70px",
            },
          }}
        >
          <LinkList />
        </Drawer>
      </Box>
    </Box>
  );
};

export default ResponsiveDrawer;
