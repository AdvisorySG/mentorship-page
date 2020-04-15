import React from "react";
import { IoIosArrowBack } from "react-icons/io";

import logo from "../assets/advisory-logo.png";
import "./header.css";

const NavBar = () => (
  <div className="nav">
    <a className="nav-back-to-main-site" href="https://advisory.sg">
      <IoIosArrowBack className="nav-arrow-icon" />
      back to main site
    </a>
    <img className="nav-logo" src={logo} alt="Advisory" />
  </div>
);

const SearchBar = ({ onSearch }) => (
  <div className="search-bar">
    <input
      className="search-input"
      type="text"
      placeholder="Search for a mentor"
      onChange={(e) => onSearch(e.target.value)}
    />
  </div>
);

const Header = ({ onSearch }) => (
  <div>
    <NavBar />
    <div className="header-bottom">
      <h2>PLACEHOLDER TITLE</h2>
      <div className="header-mentorship-intro">
        <p>
          Lorem ipsum dolor sit amet something something. Scroll on to view the
          mentors that have kindly offered their time to speak with you!
        </p>
      </div>
      <SearchBar onSearch={onSearch} />
    </div>
  </div>
);

export default Header;
