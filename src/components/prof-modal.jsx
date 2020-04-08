import React from "react";
import "./prof-modal.css";
import { MdClose } from "react-icons/md";

const ProfModal = (props) => {
  return (
    <div className="modal">
      <button
        style={{ cursor: "pointer" }}
        className="close-cross"
        onClick={props.onClose}
      >
        <MdClose />
      </button>
      <div className="content">
        <div className="left-half">
          <img className="image" src={props.image_url} />
          <h2>{props.name}</h2>
          <div className="metadata">Role: {props.role}</div>
          <div className="metadata">Organization: {props.organization}</div>
          <div className="metadata">School Graduated From: {props.school}</div>
          <div className="metadata">
            Course of Study: {props.course_of_study}
          </div>
        </div>
        <div className="right-half">
          <p className="bio">{props.full_bio}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfModal;
