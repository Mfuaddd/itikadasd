import React from "react";
import toast from "react-hot-toast";
import "./index.scss";

function ShareModal({ toggleOpen }) {
  const notify = () => toast.success("Copied");

  const HandleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    toggleOpen()
    notify();
  };

  return (
    <div className="share-modal" onClick={toggleOpen}>
      <div
        className="share-modal__content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="share-modal__header">
          <div>Share</div>
          <div className="share-modal__close" onClick={toggleOpen}>
            &times;
          </div>
        </div>
        <div className="share-modal__body">
          <input
            className="share-modal__input"
            type="text"
            name=""
            value={window.location.href}
          />
          <button className="share-modal__copy" onClick={HandleCopy}>
            Copy
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShareModal;
