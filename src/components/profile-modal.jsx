import React from "react";
import ReactModal from "react-modal";
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";
import { MdClose } from "react-icons/md";

import "./profile-modal.css";

const CloseButton = ({ onClose }) => (
  <button className="modal-close" onClick={onClose}>
    <MdClose />
  </button>
);

const ProfileModal = ({ isOpen, mentor, onClose }) => {
  mentor || (mentor = {});

  // Disable body scroll when modal is open.
  const onAfterOpenHandler = ({ contentEl }) =>
    disableBodyScroll(contentEl, { reserveScrollBarGap: true });
  const onAfterCloseHandler = () => clearAllBodyScrollLocks();

  return (
    <ReactModal
      className="modal-container"
      overlayClassName="modal-overlay"
      isOpen={isOpen}
      shouldCloseOnOverlayClick={true}
      onAfterOpen={onAfterOpenHandler}
      onRequestClose={onClose}
      onAfterClose={onAfterCloseHandler}
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
