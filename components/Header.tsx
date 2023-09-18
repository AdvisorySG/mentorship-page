import Box from "@mui/material/Box";
import { advisoryMentorshipLogo, advisoryMentorshipPartners } from "./assets";
import ResponsiveDrawer from "./Drawer";
import "../styles/Header.css";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Link,
} from "@mui/material";

const links = [
  {
    text: "Apply as a Mentee",
    url: "https://advisorysg.typeform.com/to/Z1MHxaFj#source=mentorsite",
  },
  {
    text: "Application Guide on CVs and Resumes",
    url: "https://drive.google.com/file/d/1w7zlMuGY_7hVXeW0LaNKXWWjLRt3ic4G/view?usp=sharing",
  },
  {
    text: "FAQs for Applicants",
    url: "https://docs.google.com/document/d/1mGjAsgTP7KIheWVDm-TZ5Hxxf8WYPfWemiqcZ40XCwo/edit?usp=sharing",
  },
  {
    text: "Sample Application Response",
    url: "https://drive.google.com/file/d/1aA3l_WQ1ehGO8UBKuRFLqj4URpQbAVzN/view?usp=sharing",
  },
  {
    text: "Industries to Filter Mentors",
    url: "https://drive.google.com/file/d/19lUr2BchbYFAPMjEbN_M2mf1pyw-n7pj/view?usp=sharing",
  },
];

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
              that over 800 working professionals and 28 mentorship partners
              whose fields of expertise range across 48 different industries
              have come aboard in support of this programme.
            </p>
            <TableContainer>
              <Table>
                <TableBody>
                  {links.map((link, index) => (
                    <TableRow
                      key={index}
                      hover
                      onClick={() =>
                        window.open(link.url, "_blank", "noopener noreferrer")
                      }
                    >
                      <TableCell>
                        <p style={{ textAlign: "center" }}>
                          <Link
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {link.text}
                          </Link>
                        </p>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <p>
              Do take note that matching will commence on a rolling basis from
              20 August onwards, and mentors that have been matched will no
              longer be displayed on the website thereafter.
            </p>
          </div>
        </div>
      </Box>
    </div>
  </div>
);

export default Header;
