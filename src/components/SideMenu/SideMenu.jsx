import React, { useRef } from 'react';
import './SideMenu.css';
import close from '../../images/close.svg';
import { Link, useLocation } from 'react-router-dom';
export const PopupWithForm = ({ onSubmit, children, buttonText, isOpen, onClose }) => {
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
            Главная
          </Link>
          <Link className={`menu__link  ${pathname === '/movies' && 'menu__link_state_active'}`} to="/movies">
            Фильмы
          </Link>
          <Link
            className={`menu__link  ${pathname === '/saved-movies' && 'menu__link_state_active'}`}
            to="/saved-movies"
          >
            Сохраненные фильмы
          </Link>
        </div>

        <Link
          to="/profile"
          className={`header__profile menu__profile ${pathname === '/profile' && 'menu__link_state_active'}`}
        >
          Аккаунт
        </Link>
        <button onClick={onClose} type="button" className="menu__close"></button>
      </div>
    </div>
  );
};
