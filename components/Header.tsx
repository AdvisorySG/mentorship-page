import Box from "@mui/material/Box";

import ResponsiveDrawer from "./Drawer";
import "../styles/Header.css";

const Header = () => (
  <div className="header">
    <ResponsiveDrawer />
    <div className="content-body"></div>
  </div>
);

export default Header;
