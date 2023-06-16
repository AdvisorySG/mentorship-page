import Box from "@mui/material/Box";

import { advisoryMentorshipLogo, advisoryMentorshipPartners } from "./assets";
import ResponsiveDrawer from "./Drawer";
import "../styles/Header.css";

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
            id="partners"
            className="header-mentorship-partners"
            src={advisoryMentorshipPartners}
            alt="Advisory Mentorship Programme Partners"
          />
          <div className="header-mentorship-intro" id="aboutus">
            <p>
              The Advisory Mentorship Programme pairs students with working
              professionals in their fields of interest on a 1-1 basis. Over the
              course of four months, mentors give an hour each month to meet
              with their mentee. Over the past 2 years, the programme delivered
              over 8,000 hours of mentorship to 2,211 students with the
              involvement of 1,826 mentors. This year, we’re excited to share
              that over 1,600 working professionals and 27 mentorship partners
              whose fields of expertise range across 48 different industries
              have come aboard in support of this programme.
            </p>
          </div>
        </div>
      </Box>
    </div>
  </div>
);

export default Header;
