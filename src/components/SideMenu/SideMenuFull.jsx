import React, { useEffect, useRef } from 'react';
import { PopupWithForm } from './SideMenu';
import './SideMenu.css';

export const EditAvatarPopup = ({ handleEscClose, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleEscClose);
    }

    return () => {
      window.removeEventListener('keydown', handleEscClose);
    };
  });

  return <PopupWithForm isOpen={isOpen} onClose={onClose} />;
};
