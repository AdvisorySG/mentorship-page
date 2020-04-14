import React from "react";
import { IoIosArrowBack } from "react-icons/io";

import logo from "../assets/advisory-logo.png";
import "./header.css";

const NavBar = () => (
  <div className="nav-bar">
    <a className="back-to-main-site" href="https://advisory.sg">
      <IoIosArrowBack className="arrow-icon" />
      back to main site
    </a>
    <img className="logo" src={logo} alt="Logo" />
  </div>
);

const SearchBar = ({ onSearch }) => (
  <div className="search-bar">
    <input type="text" onChange={(e) => onSearch(e.target.value)} />
  </div>
);

const Header = ({ onSearch }) => (
  <div>
    <NavBar />
    <div className="bottom-layer">
      <h2>PLACEHOLDER TITLE</h2>
      <div className="mentorship-intro">
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
