import React from "react";
import ReactModal from "react-modal";
import { MdClose } from "react-icons/md";

import "./profile-modal.css";

const CloseButton = ({ onClose }) => (
  <button className="modal-close" onClick={onClose}>
    <MdClose />
  </button>
);

const ProfileModal = ({ isOpen, mentor, onClose }) => {
  return (
    <ReactModal
      className="modal-container"
      overlayClassName="modal-overlay"
      shouldCloseOnOverlayClick={true}
      onRequestClose={onClose}
      isOpen={isOpen}
      contentLabel="View Details"
    >
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
    </ReactModal>
  );
};

export default ProfileModal;
