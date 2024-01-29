// PopupContext.js
import React, { createContext, useState } from 'react';

const PopupContext = createContext();

const PopupProvider = ({ children }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  return (
    <PopupContext.Provider value={{ isPopupOpen, openPopup, closePopup }}>
      {children}
    </PopupContext.Provider>
  );
};

export { PopupContext, PopupProvider };
