import React from "react";
import "./profile-card.css";

const ProfileCard = ({ mentor, onReadMore }) => {
  return (
    <div className="profile-card">
      <div className="image-region">
        <img className="image" src={mentor.imageUrl} alt={mentor.name} />
      </div>
      <div className="card-descriptors">
        <div className="name-text">{mentor.name}</div>
        <div className="desc-text">{mentor.role}</div>
        <div className="desc-text">{mentor.organization}</div>
      </div>
      <div>
        <button className="button" onClick={onReadMore}>
          Read More
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
