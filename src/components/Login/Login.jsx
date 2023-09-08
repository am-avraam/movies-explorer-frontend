import React, { useState } from 'react';
import { initFormState } from '../../utils/constants';
import './Login.css';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import { validate } from '../../utils/validation';

export const Login = ({ onLogin = (a, b) => {} }) => {
  const [formValue, setFormValue] = useState(initFormState);
  const [isSuccessfulValidated, setSuccessfulValidated] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate({ email: formValue.email, password: formValue.password })) {
      setSuccessfulValidated(true);
      onLogin(formValue.email, formValue.password);
    } else {
      setSuccessfulValidated(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (!isSuccessfulValidated) setSuccessfulValidated(true);

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  return (
    <main className="login">
      <div className="login__content">
        <div>
          <Link className="login__home" to="/">
            <img src={logo} alt="логотип" />
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
              placeholder="putin@president.ru"
              type="text"
            />
            <span className={`login__tip ${!isSuccessfulValidated && 'login__tip_state_active'}`}>
              Что-то пошло не так...
            </span>

            <label className="login__label" htmlFor="password">
              Пароль
            </label>
            <input
              onChange={handleChange}
              value={formValue.password}
              className={`login__input ${!isSuccessfulValidated && 'login__input_state_error'}`}
              name="password"
              type="password"
              placeholder="желательно в заметки сохранить"
            />
            <span className={`login__tip ${!isSuccessfulValidated && 'login__tip_state_active'}`}>
              Что-то пошло не так...
            </span>
          </form>
        </div>

        <div className="login__container_side_bottom">
          <button
            disabled={!isSuccessfulValidated}
            type="submit"
            form="login-form-auth"
            className={`login__auth ${!isSuccessfulValidated && 'login__auth_state_error'}`}
          >
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
    </main>
  );
};
