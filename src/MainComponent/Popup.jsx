import React from "react";
const Popup = ({ isOpen, onClose }) => {
    return (
      <div className={`popup ${isOpen ? 'open' : ''}`}>
        <div className="popup-content">
          {/* Your pop-up content goes here */}
          <p>This is the pop-up content</p>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  };
  export default Popup;
