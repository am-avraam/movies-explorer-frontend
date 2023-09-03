import React, { useEffect, useRef } from 'react';
import './SideMenu.css';
import { Link, useLocation } from 'react-router-dom';

export const SideMenu = ({ handleEscClose, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleEscClose);
    }

    return () => {
      window.removeEventListener('keydown', handleEscClose);
    };
  });

  const popupRef = useRef();
  const { pathname } = useLocation();

  function closeByOutClick(e) {
    if (e.target === popupRef.current) onClose();
  }

  return (
    <div ref={popupRef} onClick={closeByOutClick} className={`menu ${isOpen && 'menu_opened'}`}>
      <div className="menu__container">
        <div className="menu__group">
          <Link className={`menu__link  ${pathname === '/' && 'menu__link_state_active'}`} to="/">
            <span className='menu__span'>Главная</span>
          </Link>
          <Link className={`menu__link  ${pathname === '/movies' && 'menu__link_state_active'}`} to="/movies">
          <span className='menu__span'>Фильмы</span>
          </Link>
          <Link
            className={`menu__link  ${pathname === '/saved-movies' && 'menu__link_state_active'}`}
            to="/saved-movies"
          >
          <span className='menu__span'>Сохраненные фильмы</span>
          </Link>
        </div>

        <Link
          to="/profile"
          className={`header__profile menu__profile ${pathname === '/profile' && 'menu__link_state_active'}`}
        >
          Аккаунт
          <span className='menu__span'></span>
        </Link>
        <button onClick={onClose} type="button" className="menu__close"></button>
      </div>
    </div>
  );
};
