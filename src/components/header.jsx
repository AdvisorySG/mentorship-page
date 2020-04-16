import React from "react";
import SelectSearch from "react-select-search";
import { IoIosArrowBack } from "react-icons/io";

import { advisoryLogo, advisoryMentorshipLogo } from "../assets";
import { mentors } from "../mentors.json";

import "./header.css";

const searchOptions = [
  { groupName: "Name", key: "name" },
  { groupName: "Role", key: "role" },
  { groupName: "Organization", key: "organization" },
  { groupName: "School", key: "school" },
  { groupName: "Course of Study", key: "courseOfStudy" },
].map(({ groupName, key }) => ({
  type: "group",
  name: groupName,
  items: [...new Set(mentors.map((mentor) => mentor[key]))].map((value) => ({
    name: value,
    value: value
      .toLowerCase()
      .split(" ")
      .map((term) => `${key}:${term}`)
      .join(" "),
  })),
}));

const NavBar = () => (
  <div className="nav">
    <a className="nav-back-to-main-site" href="https://advisory.sg">
      <IoIosArrowBack className="nav-arrow-icon" />
      back to main site
    </a>
    <img className="nav-logo" src={advisoryLogo} alt="Advisory" />
  </div>
);

const SearchBar = ({ onChange }) => (
  <div className="search-bar">
    <SelectSearch
      className="search-input"
      options={searchOptions}
      onChange={onChange}
      placeholder="Type for more suggestions..."
      search={true}
    />
  </div>
);

const Header = ({ onChange }) => (
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
          With the spread of COVID-19, and as many students face concerns,
          frustration and uncertainty about their studies, graduation, and
          career opportunities - Advisory is looking to support affected
          students. By matching students aged 16-25 with industry mentors from
          their field of interest one-to-one on a three-month basis from May to
          July, we hope to assist students to make informed career choices, and
          provide students with support and advice in these uncertain times.
        </p>
        <p>
          Click{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://advisorysg.typeform.com/to/qZFetT"
          >
            here
          </a>{" "}
          to apply as a mentee.
        </p>
      </div>
      <SearchBar onChange={onChange} />
    </div>
  </div>
);

export default Header;
