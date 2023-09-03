import React, { useState } from 'react';
import { initFormState } from '../../utils/constants';
import '../Login/Login.css';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import { validate } from 'utils/validation';
export const Register = ({ onRegister = () => {} }) => {
  const [formValue, setFormValue] = useState(initFormState);
  const [isSuccessfulValidated, setSuccessfulValidated] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = { email: formValue.email, password: formValue.password, name: formValue.name };

    if (validate(data)) {
      setSuccessfulValidated(true);
      onRegister(data);
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
    <main className="login login-register">
      <div className="login__content login__content-register">
        <div>
          <Link className="login__home" to="/">
            <img src={logo} alt="логотип" />
          </Link>
          <h1 className="login__title">Добро пожаловать!</h1>
          <form className="login__form" id="login-form-auth" onSubmit={handleSubmit}>
            <label className="login__label" htmlFor="name">
              Имя
            </label>
            <input
              onChange={handleChange}
              value={formValue.name}
              placeholder="Король Вася"
              className={`login__input ${!isSuccessfulValidated && 'login__input_state_error'}`}
              name="name"
              type="text"
            />
            <span className={`login__tip ${!isSuccessfulValidated && 'login__tip_state_active'}`}>
              Что-то пошло не так...
            </span>

            <label className="login__label" htmlFor="email">
              Email
            </label>
            <input
              onChange={handleChange}
              value={formValue.email}
              placeholder="putin@president.ru"
              className={`login__input ${!isSuccessfulValidated && 'login__input_state_error'}`}
              name="email"
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
              placeholder="что-то на безопасном"
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
            Зарегистрироваться
          </button>
          <section className="login__revision">
            <span className="login__question">Уже зарегистрированы?</span>
            <Link to="/sign-in" className="login__link">
              Войти
            </Link>
          </section>
        </div>
      </div>
    </main>
  );
};
