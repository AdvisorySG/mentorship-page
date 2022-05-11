import Box from "@mui/material/Box";

import { advisoryMentorshipLogo, advisoryMentorshipPartners } from "../assets";
import ResponsiveDrawer from "./Drawer";
import "./Header.css";

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
              course of four months, from June to September 2022, mentors give
              an hour each month to meet with their mentee. Over the past 2
              years, the programme delivered over 8,000 hours of mentorship to
              2,211 students with the involvement of 1,826 mentors. This year,
              we’re excited to share that over 1,600 working professionals and
              27 mentorship partners whose fields of expertise range across 48
              different industries have come aboard in support of this
              programme.
            </p>
            <p>
              Click{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://advisorysg.typeform.com/Mentorship2022#source=mentorsite"
              >
                here
              </a>{" "}
              to apply as a mentee. Applications close{" "}
              <b>5 June 2022, 2359h (GMT +8)</b>.
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
