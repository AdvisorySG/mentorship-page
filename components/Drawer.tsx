import React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import LaunchIcon from "@mui/icons-material/Launch";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";

import { advisoryLogo } from "./assets";

const drawerWidth = 240;

interface Props {
  window?: () => Window;
}

const URL_APPLY = "/apply";
const URL_HOME = "/";
const URL_MAIN = "https://advisory.sg/";
const URL_FAQ = "/faq";
const URL_MENTORS = "/mentors/0";

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
            <ListItemButton
              component="a"
              href={URL_HOME}
              onClick={handleDrawerToggle}
            >
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component="a"
              href={URL_MENTORS}
              onClick={handleDrawerToggle}
            >
              <ListItemText primary="Find A Mentor" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component="a"
              href={URL_FAQ}
              onClick={handleDrawerToggle}
            >
              <ListItemText primary="FAQ" />
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
    <Box sx={{ display: "flex", paddingBottom: "70px" }}>
      <AppBar style={{ background: "white" }} className="toolbar-component">
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
            <Button component="a" href={URL_HOME}>
              Home
            </Button>
            <Button component="a" href={URL_MENTORS}>
              Find A Mentor
            </Button>
            <Button component="a" href={URL_FAQ}>
              FAQ
            </Button>
            <Button component="a" href={URL_APPLY}>
              Apply Now
            </Button>
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
