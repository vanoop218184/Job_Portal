import React from "react";

const ResumeModal = ({ imageUrl, onClose }) => {
  return (
    <div className="">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <img src={imageUrl} alt="resume" />
      </div>
    </div>
  );
};

export default ResumeModal;
