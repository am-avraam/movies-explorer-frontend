import React from 'react';
import logo from '../../images/logo.svg';
import './Header.css';
import { Link, useLocation } from 'react-router-dom';

const exceptions = new Set(['/sign-in', '/sign-up', '/404']);

function Header({ landing }) {
  const { pathname } = useLocation();
  const isLanding = pathname === '/';

  if (exceptions.has(pathname)) return null;

  return (
    <header className={`header ${isLanding && 'header__landing'}`}>
      <div className="header__wrapper">
        <Link className="header__home" to="/">
          <img src={logo} alt="" />
        </Link>
        <div className="header__links">
          <Link className={`header__link ${pathname === '/movies' && 'header__link_state_active'}`} to="/movies">
            Фильмы
          </Link>
          <Link
            className={`header__link ${pathname === '/saved-movies' && 'header__link_state_active'}`}
            to="/saved-movies"
          >
            Сохраненные фильмы
          </Link>
        </div>
      </div>
      {false ? (
        <div className="header__wrapper header__wrapper_side_right">
          <Link to="sign-up" className="header__button header__button-signup">
            Регистрация
          </Link>
          <Link to="sign-in" className="header__button header__button-signin">
            Войти
          </Link>
        </div>
      ) : (
        // <button type="button" className={`header__profile ${isLanding && 'header__profile_location_landing'}`}>
        <Link to="/profile" className={`header__profile ${isLanding && 'header__profile_location_landing'}`}>
          Аккаунт
        </Link>
        // </button>
      )}
    </header>
  );
}

export default Header;
