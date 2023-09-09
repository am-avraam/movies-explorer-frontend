import React, { useContext, useState } from 'react';
import './../Login/Login.css';
import './Profile.css';
import { Link } from 'react-router-dom';
import { profileInitFormState } from '../../utils/constants';
import { validate, validateEmail, validateName } from '../../utils/validation';
import { UserContext } from '../../contexts/context';
import { logDOM } from '@testing-library/react';

const Profile = ({ onEdit = () => {}, onSignOut }) => {
  const currentUser = useContext(UserContext);

  const [isEditing, setEditing] = useState(false);
  const [formValue, setFormValue] = useState(currentUser);
  const [isSuccessfulValidated, setSuccessfulValidated] = useState(true);

  const [isAppropriateName, setIsAppropriateName] = useState(false);
  const [isAppropriateEmail, setIsAppropriateEmail] = useState(false);

  const validationFailed = !isAppropriateName || !isAppropriateEmail;

  const handleChange = (e) => {
    const { name, value } = e.target;

    let validationResult;
    if (name === 'email') {
      console.log(value);
      validationResult = validateEmail(value);
      setIsAppropriateEmail(validationResult);
    }
    if (name === 'name') {
      console.log(value);
      validationResult = validateName(value);
      setIsAppropriateName(validationResult);
    }

    setFormValue({
      ...formValue,
      [name]: value,
    });

    if (!validationResult) {
      console.log('ошибочки');
      setSuccessfulValidated(false);
      return;
    }

    setSuccessfulValidated(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate({ email: formValue.email, name: formValue.name })) {
      setSuccessfulValidated(true);
      onEdit(formValue.email, formValue.name);
      setEditing(false);
    } else {
      setSuccessfulValidated(false);
    }
  };

  return (
    <main className="profile">
      <div className="profile__content">
        <h1 className="profile__title">Привет, {currentUser?.name}!</h1>

        <form className="profile__form" id="profile-form" onSubmit={handleSubmit}>
          <div className="profile__container">
            <label className="profile__label" htmlFor="name">
              Имя
            </label>
            <input
              onChange={handleChange}
              value={formValue.name}
              className="profile__input"
              name="name"
              type="text"
              placeholder="якшамлар"
              readOnly={!isEditing}
            />
          </div>
          <span className="profile__tip"></span>
          <div className="profile__container">
            <label className=" profile__label" htmlFor="email">
              Email
            </label>
            <input
              onChange={handleChange}
              value={formValue.email}
              className="profile__input"
              name="email"
              type="text"
              placeholder="tvoumat@ya.ru"
              readOnly={!isEditing}
            />
          </div>
        </form>

        {isEditing && (
          <button
            form="profile-form"
            type="submit"
            disabled={validationFailed || !isSuccessfulValidated}
            className={`profile__save ${(validationFailed || !isSuccessfulValidated) && 'profile__save_state_error'}`}
          >
            {!isSuccessfulValidated && <span className="profile__error">При обновлении профиля произошла ошибка.</span>}
            Сохранить
          </button>
        )}

        {!isEditing && (
          <>
            <button onClick={() => setEditing(true)} className="profile__edit">
              Редактировать
            </button>
            <Link className="profile__signout" to="/" onClick={onSignOut}>
              Выйти из аккаунта
            </Link>
          </>
        )}
      </div>
    </main>
  );
};

export default Profile;
