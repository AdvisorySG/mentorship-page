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
          With the closure of applications for the final wave of The Mentorship
          Programme: Online, we would like to take the opportunity to thank all
          industry mentors and mentees for their immense support for this
          initiative.
        </p>
        <p>
          As the first public run of the Mentorship Programme, we garnered a
          total of 1942 mentee applications vying for mentorship opportunities
          with 560 industry mentors across all three waves. The large wave of
          applications is testament to the urgent importance of career guidance
          in this era of COVID-19 which has brought about numerous disruptions,
          and we are glad to have been able to support students through this
          difficult time.
        </p>
        <p>
          Moving forward, we are happy to announce that the next cycle of the
          Mentorship Programme will be commencing in 2021! You may keep a
          lookout on our website or social media channels for regular updates on
          Advisory events and in the meantime, we highly encourage you to
          consider joining us for various other career guidance opportunities
          that we offer, such as the Discover+ Series panel discussions that are
          open to all to apply!
        </p>
        <p>
          <small>
            All Mentors have the rights to privacy and non-harassment that must
            be respected. You are hereby informed not to misrepresent your
            relationship or affiliation with Advisory in any way and on any
            platform, if and when you communicate with any mentors. Failing
            which you accept that you have been informed and therefore
            understand that legal action may be taken against you.
          </small>
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
