import React from "react";
import "./profile-modal.css";
import { MdClose } from "react-icons/md";

const ProfileModal = (props) => {
  return (
    <div className="profile-modal">
      <button
        style={{ cursor: "pointer" }}
        className="close-cross"
        onClick={props.onClose}
      >
        <MdClose />
      </button>
      <div className="content">
        <div className="left-half">
          <img className="image" src={props.imageUrl} alt={props.name} />
          <h2>{props.name}</h2>
          <div className="metadata">Role: {props.role}</div>
          <div className="metadata">Organization: {props.organization}</div>
          <div className="metadata">School Graduated From: {props.school}</div>
          <div className="metadata">Course of Study: {props.courseOfStudy}</div>
        </div>
        <div className="right-half">
          <p className="bio">{props.fullBio}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
