import LazyLoad from "react-lazyload";
import React from "react";
import Chip from "@material-ui/core/Chip";

import "./profile-card.css";

const ReadMore = ({ onReadMore }) => (
  <div className="card-read-more-container">
    <button className="card-read-more" onClick={onReadMore}>
      Read More
    </button>
  </div>
);

const ProfileCard = ({ mentor, onReadMore }) => (
  <LazyLoad className="card" height={160} offset={800} once>
    <div className="card-image-region">
      <img
        className="card-image"
        src={process.env.PUBLIC_URL + mentor.thumbnailImageUrl}
        alt={mentor.name}
      />
    </div>
    {mentor.industry && (
      <Chip
        className="card-chip"
        size="small"
        label={mentor.industry}
        color="primary"
      />
    )}
    <div className="card-descriptors">
      <div className="card-name">{mentor.name}</div>
      {mentor.role && <div className="card-desc">{mentor.role}</div>}
      {mentor.organisation && (
        <div className="card-desc">{mentor.organisation}</div>
      )}
    </div>
    <ReadMore onReadMore={onReadMore} />
  </LazyLoad>
);

export default ProfileCard;
