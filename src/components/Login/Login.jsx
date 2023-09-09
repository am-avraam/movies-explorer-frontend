import React, { useState } from 'react';
import { initFormState } from '../../utils/constants';
import './Login.css';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import { validate, validateEmail, validateName, validatePassword } from '../../utils/validation';

export const Login = ({ onLogin, error }) => {
  const [formValue, setFormValue] = useState(initFormState);

  const [isSuccessfulValidated, setSuccessfulValidated] = useState(true);

  const [isAppropriateEmail, setIsAppropriateEmail] = useState(false);
  const [isAppropriatePassword, setIsAppropriatePassword] = useState(false);

  const validationFailed = !isAppropriateEmail || !isAppropriatePassword;

  const handleSubmit = (e) => {
    e.preventDefault();

    // if (validate({ email: formValue.email, password: formValue.password })) {
    // setSuccessfulValidated(true);
    onLogin(formValue.email, formValue.password);
    // } else {
    //   setSuccessfulValidated(false);
    // }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // if (!isSuccessfulValidated) setSuccessfulValidated(true);

    let validationResult;
    if (name === 'email') {
      validationResult = validateEmail(value);
      setIsAppropriateEmail(validationResult);
    }

    if (name === 'password') {
      validationResult = value.length;
      setIsAppropriatePassword(validationResult);
    }

    setFormValue({
      ...formValue,
      [name]: value,
    });

    if (!validationResult) {
      setSuccessfulValidated(false);
      return;
    }

    setSuccessfulValidated(true);
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
              className={`login__input ${!isAppropriateEmail && 'login__input_state_error'}`}
              name="email"
              placeholder="putin@president.ru"
              type="text"
            />
            <span className={`login__tip ${!isAppropriateEmail && 'login__tip_state_active'}`}>
              Необходимо ввести корректный email.
            </span>

            <label className="login__label" htmlFor="password">
              Пароль
            </label>
            <input
              onChange={handleChange}
              value={formValue.password}
              className={`login__input ${!isAppropriatePassword && 'login__input_state_error'}`}
              name="password"
              type="password"
              placeholder="желательно в заметки сохранить"
            />
            <span className={`login__tip ${!isAppropriatePassword && 'login__tip_state_active'}`}>
              Необходимо ввести пароль.
            </span>
          </form>
        </div>

        <div className="login__container_side_bottom">
          {error && <span className="login__error">{error}</span>}
          <button
            disabled={validationFailed || !isSuccessfulValidated}
            type="submit"
            form="login-form-auth"
            className={`login__auth ${(validationFailed || !isSuccessfulValidated) && 'login__auth_state_error'}`}
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
