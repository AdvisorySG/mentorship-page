import LazyLoad from "react-lazyload";
import React from "react";

import "./profile-card.css";

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
          src={process.env.PUBLIC_URL + mentor.thumbnailImageUrl}
          alt={mentor.name}
        />
      </LazyLoad>
    </div>
    <div className="card-descriptors">
      <div className="card-name">{mentor.name}</div>
      {mentor.role && <div className="card-desc">{mentor.role}</div>}
      {mentor.organisation && (
        <div className="card-desc">{mentor.organisation}</div>
      )}
    </div>
    <ReadMore onReadMore={onReadMore} />
  </div>
);

export default ProfileCard;
