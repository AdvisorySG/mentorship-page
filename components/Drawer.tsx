import React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import LaunchIcon from "@mui/icons-material/Launch";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";

import { advisoryLogo } from "./assets";

const drawerWidth = 240;

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

  const LinkList = () => (
    <div>
      <List>
        <ListItem disablePadding>
          <a
            href={URL_HOME}
            onClick={handleDrawerToggle}
            style={{
              color: "black",
              fontWeight: "700",
              whiteSpace: "nowrap",
              marginRight: "1rem",
              cursor: "pointer",
              textDecoration: "none", // Remove underline
              display: "inline-block", // Ensure proper spacing
            }}
          >
            Home
          </a>
        </ListItem>
        <ListItem disablePadding>
          <a
            href={URL_MENTORS}
            onClick={handleDrawerToggle}
            style={{
              color: "black",
              fontWeight: "700",
              whiteSpace: "nowrap",
              marginRight: "1rem",
              cursor: "pointer",
              textDecoration: "none", // Remove underline
              display: "inline-block", // Ensure proper spacing
            }}
          >
            Find A Mentor
          </a>
        </ListItem>
        <ListItem disablePadding>
          <a
            href={URL_FAQ}
            onClick={handleDrawerToggle}
            style={{
              color: "black",
              fontWeight: "700",
              whiteSpace: "nowrap",
              marginRight: "1rem",
              cursor: "pointer",
              textDecoration: "none", // Remove underline
              display: "inline-block", // Ensure proper spacing
            }}
          >
            FAQ
          </a>
        </ListItem>
        <ListItem disablePadding>
          <a
            href="https://advisorysg.typeform.com/to/Z1MHxaFj#source=mentorsite"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "black",
              fontWeight: "700",
              whiteSpace: "nowrap",
              marginRight: "1rem",
              cursor: "pointer",
              textDecoration: "none", // Remove underline
              display: "inline-block", // Ensure proper spacing
            }}
          >
            Apply Now
            <LaunchIcon style={{ marginLeft: "0.5rem" }} />
          </a>
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex", paddingBottom: "0px" }}>
      <AppBar
        style={{ background: "white", boxShadow: "none" }}
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
            <a
              href={URL_HOME}
              style={{
                color: "black",
                fontWeight: "700",
                whiteSpace: "nowrap",
                marginRight: "1rem",
                cursor: "pointer",
                textDecoration: "none", // Remove underline
              }}
              onClick={handleDrawerToggle}
            >
              Home
            </a>
            <a
              href={URL_MENTORS}
              style={{
                color: "black",
                fontWeight: "700",
                whiteSpace: "nowrap",
                marginRight: "1rem",
                cursor: "pointer",
                textDecoration: "none", // Remove underline
              }}
              onClick={handleDrawerToggle}
            >
              Find A Mentor
            </a>
            <a
              href={URL_FAQ}
              style={{
                color: "black",
                fontWeight: "700",
                whiteSpace: "nowrap",
                marginRight: "1rem",
                cursor: "pointer",
                textDecoration: "none", // Remove underline
              }}
              onClick={handleDrawerToggle}
            >
              FAQ
            </a>
            <a
              href={URL_APPLY}
              style={{
                color: "black",
                fontWeight: "700",
                whiteSpace: "nowrap",
                marginRight: "1rem",
                cursor: "pointer",
                textDecoration: "none", // Remove underline
              }}
              onClick={handleDrawerToggle}
            >
              Apply Now
            </a>
          </Box>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon style={{ color: "black" }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: false,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
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
