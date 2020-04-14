import LazyLoad from "react-lazyload";
import React from "react";

import "./profile-card.css";

const ReadMore = ({ onReadMore }) => (
  <div className="button-container">
    <button className="button" onClick={onReadMore}>
      Read More
    </button>
  </div>
);

const ProfileCard = ({ mentor, onReadMore }) => (
  <div className="profile-card">
    <div className="card-image-region">
      <LazyLoad height="100%" offset={100} once>
        <img className="card-image" src={mentor.imageUrl} alt={mentor.name} />
      </LazyLoad>
    </div>
    <div className="card-descriptors">
      <div className="name-text">{mentor.name}</div>
      <div className="desc-text">{mentor.role}</div>
      <div className="desc-text">{mentor.organization}</div>
    </div>
    <ReadMore onReadMore={onReadMore} />
  </div>
);

export default ProfileCard;
