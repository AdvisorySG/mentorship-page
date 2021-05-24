import React from "react";
import { IoIosArrowBack } from "react-icons/io";

import { advisoryLogo, advisoryMentorshipLogo } from "../assets";

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
      <div className="header-mentorship-intro">
        <p>
          The Advisory Mentorship Programme pairs students with working
          professionals in their fields of interest on a 1-1 basis. Over the
          course of four months, from June to September 2021, mentors give an
          hour each month to meet with their mentee. In its first run in 2020,
          the programme delivered over 2,000 hours of mentorship to 694 students
          with the involvement of over 562 mentors. This year, we are delighted
          to have more than 800 mentors, whose fields of expertise range across
          48 different industries.
        </p>
        <p>
          Click{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://advisorysg.typeform.com/to/Q5iHzn#source=mentorsite"
          >
            here
          </a>{" "}
          to apply as a mentee.
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
            href="https://drive.google.com/file/d/1aA3l_WQ1ehGO8UBKuRFLqj4URpQbAVzN/view?usp=sharing"
          >
            here
          </a>{" "}
          to view a sample application response.
        </p>
      </div>
    </div>
  </div>
);

export default Header;
