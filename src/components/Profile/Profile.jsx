import React from 'react';
import './../Login/Login.css';
import './Profile.css';
import { Link } from 'react-router-dom';
const Profile = () => {
  const error = true;
  const editing = false;
  return (
    <main className="profile">
      <h1 className="profile__title">Привет, Виталий!</h1>

      <form
        className="profile__form"
        id="profile-form"
        // onSubmit={handleSubmit}
      >
        <div className="profile__container">
          <label className="profile__label" htmlFor="name">
            Имя
          </label>
          <input
            // onChange={handleChange}
            // value={formValue.email}
            defaultValue="Виталий"
            className="profile__input"
            name="name"
            type="text"
            required
            minLength="2"
            maxLength="40"
          />
        </div>
        <span
          className="profile__tip"
          // className={`login__tip profile__tip ${error && 'login__tip_state_active'}`}
        ></span>
        <div className="profile__container">
          <label className=" profile__label" htmlFor="email">
            Email
          </label>
          <input
            // onChange={handleChange}
            // value={formValue.email}
            defaultValue="1488@mail.ru"
            className="profile__input"
            name="email"
            type="text"
            required
            minLength="2"
            maxLength="40"
          />
        </div>
        {/*<span className={`login__tip profile__tip ${error && 'login__tip_state_active'}`}>Что-то пошло не так...</span>*/}
      </form>

      {editing && (
        <button disabled={false} className={`profile__save ${error && 'profile__save_state_error'}`}>
          {error && <span className="profile__error">При обновлении профиля произошла ошибка.</span>}
          Сохранить
        </button>
      )}

      {!editing && (
        <>
          <button className="profile__edit">Редактировать</button>
          <Link className="profile__signout" to="/sign-in">
            Выйти из аккаунта
          </Link>
        </>
      )}
    </main>
  );
};

export default Profile;
