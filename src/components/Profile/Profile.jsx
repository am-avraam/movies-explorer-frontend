import React, { useContext, useState, useEffect } from 'react';
import './../Login/Login.css';
import './Profile.css';
import { Link } from 'react-router-dom';
import { profileValidate } from '../../utils/validation';
import { UserContext } from '../../contexts/context';
import { userUpdateCompleted, userUpdateFailed } from '../../utils/constants';

const Profile = ({ onUpdateUser, onSignOut }) => {
  const currentUser = useContext(UserContext);

  const [isEditing, setEditing] = useState(false);
  const [formValue, setFormValue] = useState(currentUser);

  const [isUpdateCompleted, setIsUpdateCompleted] = useState(null);

  useEffect(() => {
    setFormValue(currentUser);
  }, [currentUser]);

  const [isSuccessfulValidated, setSuccessfulValidated] = useState(false);

  const [validationError, setValidationError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });

    const [validatedSuccessfully, errorCause] = profileValidate({ ...formValue, [name]: value }, currentUser);

    setValidationError(errorCause);

    if (!validatedSuccessfully) {
      setSuccessfulValidated(false);
      return;
    }

    setSuccessfulValidated(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      // validate({ email: formValue.email, name: formValue.name })
      profileValidate({ email: formValue.email, name: formValue.name }, currentUser)
    ) {
      setSuccessfulValidated(true);
      onUpdateUser({ email: formValue.email, name: formValue.name }).then((res) =>
        !res ? setIsUpdateCompleted(false) : setIsUpdateCompleted(true),
      );
      setEditing(false);
    } else {
      setSuccessfulValidated(false);
    }
  };

  const updateTipText =
    isUpdateCompleted === true ? userUpdateCompleted : isUpdateCompleted === false ? userUpdateFailed : '';

  return (
    <main className="profile">
      <div className="profile__content">
        <h1 className="profile__title">Привет, {currentUser?.name}!</h1>

        <form className="profile__form" id="profile-form" onSubmit={handleSubmit}>
          <span
            className={`profile__notification 
            ${updateTipText === userUpdateFailed && 'profile__notification_state_error'}`}
          >
            {updateTipText}
          </span>
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
            disabled={(validationError || !isSuccessfulValidated) && true}
            className={`profile__save ${(validationError || !isSuccessfulValidated) && 'profile__save_state_error'}`}
          >
            {!isSuccessfulValidated && <span className="profile__error">{validationError}</span>}
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
