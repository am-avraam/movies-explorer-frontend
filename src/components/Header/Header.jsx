import React from 'react';
import logo from '../../images/logo.svg';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header__wrapper">
        <img src={logo} alt="" />
        <div className="header__links">
          <a className="header__link" href="http://localhost:3001/">
            Фильмы
          </a>
          <a className="header__link" href="http://localhost:3001/">
            Сохраненные фильмы
          </a>
        </div>
      </div>
      {true ? (
        <div className="header__wrapper">
          <button type="button" className="header__button header__button-signup">
            Регистрация
          </button>
          <button type="button" className="header__button header__button-signin">
            Войти
          </button>
        </div>
      ) : (
        <button type="button" className="header__profile header__profile_location_landing">
          Аккаунт
        </button>
      )}
    </header>
  );
}

export default Header;
