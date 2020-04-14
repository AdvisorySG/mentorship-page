import React from "react";
import { MdClose } from "react-icons/md";

import "./profile-modal.css";

const CloseButton = ({ onClose }) => (
  <button
    style={{ cursor: "pointer" }}
    className="close-cross"
    onClick={onClose}
  >
    <MdClose />
  </button>
);

const ProfileModal = ({ mentor, onClose }) => {
  return (
    <div className="profile-modal">
      <CloseButton onClose={onClose} />
      <div className="content">
        <div className="left-half">
          <img className="image" src={mentor.imageUrl} alt={mentor.name} />
          <h2>{mentor.name}</h2>
          <div className="metadata">Role: {mentor.role}</div>
          <div className="metadata">Organization: {mentor.organization}</div>
          <div className="metadata">School Graduated From: {mentor.school}</div>
          <div className="metadata">
            Course of Study: {mentor.courseOfStudy}
          </div>
        </div>
        <div className="right-half">
          <p className="bio">{mentor.fullBio}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
