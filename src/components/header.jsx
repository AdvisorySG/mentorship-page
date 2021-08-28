import React from "react";
import { IoIosArrowBack } from "react-icons/io";

import {
  advisoryLogo,
  advisoryMentorshipLogo,
  advisoryMentorshipPartners,
} from "../assets";

import "./header.css";

const NavBar = () => (
  <div className="nav">
    <a className="nav-back-to-main-site" href="https://advisory.sg">
      <IoIosArrowBack className="nav-arrow-icon" />
      back to main site
    </a>
    <img className="nav-logo" src={advisoryLogo} alt="Advisory" />
  </div>
);

const Header = () => (
  <div className="header">
    <NavBar />
    <div className="header-bottom">
      <img
        className="header-mentorship-logo"
        src={advisoryMentorshipLogo}
        alt="Advisory Mentorship Programme"
      />
      <img
        className="header-mentorship-logo"
        src={advisoryMentorshipPartners}
        alt="Advisory Mentorship Programme Partners"
      />
      <div className="header-mentorship-intro">
        <p>
          The Advisory Mentorship Programme pairs students with working
          professionals in their fields of interest on a 1-1 basis. Over the
          course of four months, from September to December 2021, mentors give
          an hour each month to meet with their mentee. In its first run in
          2020, the programme delivered over 2000 hours of mentorship to 694
          students with the involvement of over 562 mentors. This year, for Wave
          1 of the programme which is taking place from June to September 2021,
          nearly 900 working professionals came aboard as mentors for 1,104
          mentees. For Wave 2, we are pleased to have nearly 430 mentors,
          including from 10 mentorship partners, whose fields of expertise range
          across 48 different industries.
        </p>
        <p>
          Click{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://advisorysg.typeform.com/to/HQ8nWq2r#source=xxxxx"
          >
            here
          </a>{" "}
          to apply as a mentee. Applications close{" "}
          <b>10 September 2021, 2359h (GMT +8).</b>
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
  </div>
);

export default Header;
