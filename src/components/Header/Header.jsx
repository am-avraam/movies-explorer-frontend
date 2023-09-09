import React, { useState, useContext } from 'react';
import { UserContext } from '../../contexts/context';

import logo from '../../images/logo.svg';
import './Header.css';
import { Link, useLocation } from 'react-router-dom';
import { SideMenu } from '../SideMenu/SideMenu';

const exceptions = new Set(['/sign-in', '/sign-up', '/404']);
const loggedPages = new Set(['/saved-movies', '/movies', '/profile']);

function Header() {
  const { pathname } = useLocation();
  const isLanding = pathname === '/';

  // const isLoggedIn = loggedPages.has(pathname);

  const isLoggedIn = useContext(UserContext);

  const [isSideMenuOpen, setSideMenuOpen] = useState(false);
  function handleSideMenuClick() {
    setSideMenuOpen(true);
  }

  const handleEscClose = (e) => {
    if (e.key === 'Escape') {
      setSideMenuOpen(false);
    }
  };

  if (exceptions.has(pathname)) return null;

  return (
    <>
      <SideMenu
        handleEscClose={handleEscClose}
        onUpdateAvatar={() => {}}
        isOpen={isSideMenuOpen}
        onClose={() => setSideMenuOpen(false)}
      />
      <header className={`header ${isLanding && 'header__landing'}`}>
        <div className="header__container">
          <div className="header__wrapper">
            <Link className="header__home" to="/">
              <img src={logo} alt="логотип" />
            </Link>
            <div className="header__links">
              {isLoggedIn && (
                <>
                  <Link
                    className={`header__link header__hideable ${pathname === '/movies' && 'header__link_state_active'}`}
                    to="/movies"
                  >
                    Фильмы
                  </Link>
                  <Link
                    className={`header__link header__hideable ${
                      pathname === '/saved-movies' && 'header__link_state_active'
                    }`}
                    to="/saved-movies"
                  >
                    Сохраненные фильмы
                  </Link>
                </>
              )}
            </div>
          </div>
          {isLoggedIn ? (
            <>
              <button onClick={handleSideMenuClick} type="button" className="header__burger" />
              <Link
                to="/profile"
                className={`header__profile header__hideable ${isLanding && 'header__profile_location_landing'}`}
              >
                Аккаунт
              </Link>
            </>
          ) : (
            <div className="header__wrapper header__wrapper_side_right">
              <Link to="sign-up" className="header__button header__button-signup">
                Регистрация
              </Link>
              <Link to="sign-in" className="header__button header__button-signin">
                Войти
              </Link>
            </div>
          )}
        </div>
      </header>
    </>
  );
}

export default Header;
