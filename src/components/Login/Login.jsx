import React, { useState } from 'react';
import { initFormState } from '../../utils/constants';
import './Login.css';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
export const Login = ({ onLogin }) => {
  const [formValue, setFormValue] = useState(initFormState);

  const error = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(formValue.email, formValue.password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  return (
    <div className="login">
      <div>
        <Link className="login__home" to="/">
          <img src={logo} alt="" />
        </Link>
        <h1 className="login__title">Рады видеть!</h1>
        <form className="login__form" id="login-form-auth" onSubmit={handleSubmit}>
          <label className="login__label" htmlFor="email">
            Email
          </label>
          <input
            onChange={handleChange}
            value={formValue.email}
            className="login__input"
            name="email"
            type="text"
            required
            minLength="2"
            maxLength="40"
          />
          <span className={`login__tip ${!error && 'login__tip_state_active'}`}>Что-то пошло не так...</span>

          <label className="login__label" htmlFor="password">
            Пароль
          </label>
          <input
            onChange={handleChange}
            value={formValue.password}
            className={`login__input ${error && 'login__input_state_error'}`}
            name="password"
            type="password"
            required
            minLength="2"
            maxLength="200"
          />
          <span className={`login__tip ${error && 'login__tip_state_active'}`}>Что-то пошло не так...</span>
        </form>
      </div>

      <div className="login__container_side_bottom">
        <button type="submit" form="login-form-auth" className="login__auth">
          Войти
        </button>
        <section className="login__revision">
          <span className="login__question">Ещё не зарегистрированы?</span>
          <Link to="/sign-up" className="login__link">
            Регистрация
          </Link>
        </section>
      </div>
    </div>
  );
};
