import React from "react";
import "./header.css";
import logo from "../assets/advisory-logo.png";
import { IoIosArrowBack } from "react-icons/io";

const Header = () => {
  return (
    <div>
      <div className="nav-bar">
        <a className="back-to-main-site" href="https://advisory.sg">
          <IoIosArrowBack className="arrow-icon" />
          back to main site
        </a>
        <img className="logo" src={logo} alt="Logo" />
      </div>
      <div className="bottom-layer">
        <h2>PLACEHOLDER TITLE</h2>
        <div className="mentorship-intro">
          <p>
            Lorem ipsum dolor sit amet something something. Scroll on to view
            the mentors that have kindly offered their time to speak with you!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
