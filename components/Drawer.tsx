import React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import LaunchIcon from "@mui/icons-material/Launch";

import { advisoryLogo } from "./assets";

const drawerWidth = 240;

interface Props {
  window?: () => Window;
}

const ResponsiveDrawer = (props: Props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const LinkList = () => {
    return (
      <div>
        <List>
          <ListItem disablePadding>
            <ListItemButton component="a" href="https://advisory.sg">
              <ListItemText
                primary="Back To Main Site"
                style={{ flexGrow: "0", marginRight: "0.5rem" }}
              />
              <ListItemIcon>
                <LaunchIcon />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component="a"
              href="#aboutus"
              onClick={handleDrawerToggle}
            >
              <ListItemText primary="About Us" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component="a"
              href="#partners"
              onClick={handleDrawerToggle}
            >
              <ListItemText primary="Partners" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component="a"
              href="#mentors"
              onClick={handleDrawerToggle}
            >
              <ListItemText primary="Mentors" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component="a"
              href="https://advisorysg.typeform.com/to/Z1MHxaFj#source=mentorsite"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ListItemText
                primary="Apply Now"
                style={{ flexGrow: "0", marginRight: "0.5rem" }}
              />
              <ListItemIcon>
                <LaunchIcon />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </List>
      </div>
    );
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar style={{ background: "white" }} className="toolbar-component">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon style={{ color: "black" }} />
          </IconButton>
          <img
            className="nav-logo"
            src={advisoryLogo}
            alt="Advisory"
            style={{ alignSelf: "center" }}
          />
          <a className="nav-back-to-main-site" href="https://advisory.sg">
            &#x3c; back to main site
          </a>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          container={
            window !== undefined ? () => window().document.body : undefined
          }
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
