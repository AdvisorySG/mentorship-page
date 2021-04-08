import LazyLoad from "react-lazyload";
import React from "react";

import "./profile-card.css";
import placeholder from "../assets/placeholder.jpg";

const ReadMore = ({ onReadMore }) => (
  <div className="card-read-more-container">
    <button className="card-read-more" onClick={onReadMore}>
      Read More
    </button>
  </div>
);

const ProfileCard = ({ mentor, onReadMore }) => (
  <div className="card">
    <div className="card-image-region">
      <LazyLoad height={160} offset={480} once>
        <img
          className="card-image"
          src={
            mentor.thumbnailImageUrl 
            ? process.env.PUBLIC_URL + mentor.thumbnailImageUrl
            : placeholder
          }
          alt={mentor.name}
        />
      </LazyLoad>
    </div>
    <div className="card-descriptors">
      <div className="card-name">{mentor.name}</div>
      <div className="card-desc">{mentor.role}</div>
      {mentor.organization && (
        <div className="card-desc">{mentor.organization}</div>
      )}
    </div>
    <ReadMore onReadMore={onReadMore} />
  </div>
);

export default ProfileCard;
