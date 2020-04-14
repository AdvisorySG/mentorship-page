import React from "react";
import "./profile-modal.css";
import { MdClose } from "react-icons/md";

const CloseButton = ({ onClose }) => (
  <button
    style={{ cursor: "pointer" }}
    className="modal-close"
    onClick={onClose}
  >
    <MdClose />
  </button>
);

const ProfileModal = ({ mentor, onClose }) => {
  return (
    <div className="modal">
      <CloseButton onClose={onClose} />
      <div className="modal-content">
        <div className="modal-left">
          <img
            className="modal-image"
            src={mentor.imageUrl}
            alt={mentor.name}
          />
          <h2>{mentor.name}</h2>
          <div className="modal-metadata">Role: {mentor.role}</div>
          <div className="modal-metadata">
            Organization: {mentor.organization}
          </div>
          <div className="modal-metadata">
            School Graduated From: {mentor.school}
          </div>
          <div className="modal-metadata">
            Course of Study: {mentor.courseOfStudy}
          </div>
        </div>
        <div className="modal-right">
          <p className="modal-bio">{mentor.fullBio}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
