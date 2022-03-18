import React from "react";
import { IoIosArrowBack } from "react-icons/io";

import {
  advisoryLogo,
  advisoryMentorshipLogo,
  advisoryMentorshipPartners,
} from "../assets";

import "./header.css";
//for responsive drawer
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import ListItemButton from "@mui/material/ListItemButton";

const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}
//drawer
function ResponsiveDrawer(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar style={{ background: "#f89b27" }} />
      <Divider style={{ background: "#f89b27" }} />
      <List>
        <ListItem disablePadding>
          <ListItemButton component="a" href="https://advisory.sg">
            <ListItemText primary="Back To Main Site" />
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
            href="#sponsors"
            onClick={handleDrawerToggle}
          >
            <ListItemText primary="Sponsors" />
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
            href="https://advisorysg.typeform.com/to/HQ8nWq2r#source=mentorsite"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ListItemText primary="Apply Now" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </div>
  );
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar style={{ background: "#f89b27" }} className="toolbar-component">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <img
            className="nav-logo"
            src={advisoryLogo}
            alt="Advisory"
            style={{ alignSelf: "center" }}
          />
          <a className="nav-back-to-main-site" href="https://advisory.sg">
            <IoIosArrowBack className="nav-arrow-icon" />
            back to main site
          </a>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: false, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
//const aboutus = document.getElementById("aboutus");
const Header = () => (
  <div className="header">
    <ResponsiveDrawer />
    <div className="content-body">
      <Box component="main">
        <div className="header-bottom">
          <img
            className="header-mentorship-logo"
            src={advisoryMentorshipLogo}
            alt="Advisory Mentorship Programme"
          />
          <img
            id="sponsors"
            className="header-mentorship-logo"
            src={advisoryMentorshipPartners}
            alt="Advisory Mentorship Programme Partners"
          />
          <div className="header-mentorship-intro" id="aboutus">
            <p>
              The Advisory Mentorship Programme pairs students with working
              professionals in their fields of interest on a 1-1 basis. Over the
              course of four months, from September to December 2021, mentors
              give an hour each month to meet with their mentee. In its first
              run in 2020, the programme delivered over 2000 hours of mentorship
              to 694 students with the involvement of over 562 mentors. This
              year, for Wave 1 of the programme which is taking place from June
              to September 2021, nearly 900 working professionals came aboard as
              mentors for 1,104 mentees. For Wave 2, we are pleased to have over
              400 mentors, including from 10 mentorship partners, whose fields
              of expertise range across 48 different industries.
            </p>
            <p>
              Click{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://advisorysg.typeform.com/to/HQ8nWq2r#source=mentorsite"
              >
                here
              </a>{" "}
              to apply as a mentee. Applications close{" "}
              <b>17 September 2021, 2359h (GMT +8).</b>
            </p>
            <p>
              Click{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://drive.google.com/file/d/1w7zlMuGY_7hVXeW0LaNKXWWjLRt3ic4G/view?usp=sharing"
              >
                here
              </a>{" "}
              to view the application guide on CVs and resumes.
            </p>
            <p>
              Click{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://docs.google.com/document/d/1mGjAsgTP7KIheWVDm-TZ5Hxxf8WYPfWemiqcZ40XCwo/edit?usp=sharing"
              >
                here
              </a>{" "}
              to view a list of FAQs for applicants.
            </p>
            <p>
              Click{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://drive.google.com/file/d/1aA3l_WQ1ehGO8UBKuRFLqj4URpQbAVzN/view?usp=sharing"
              >
                here
              </a>{" "}
              to view a sample application response.
            </p>
            <p>
              Click{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://drive.google.com/file/d/19lUr2BchbYFAPMjEbN_M2mf1pyw-n7pj/view?usp=sharing"
              >
                here
              </a>{" "}
              to view a list of 48 industries to filter mentors by industry.
            </p>
          </div>
        </div>
      </Box>
    </div>
  </div>
);

export default Header;
