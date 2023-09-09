import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { ProtectedRouteElement as ProtectedRoute } from './ProtectedRoute';
import Main from './../components/Main/Main';
import Movies from './../components/Movies/Movies';
import { Login } from '../components/Login/Login';
import { Register } from '../components/Register/Register';
import Header from '../components/Header/Header';
import authApi from '../utils/AuthApi';
import { UserContext } from '../contexts/context';

import Profile from '../components/Profile/Profile';
import NotFound from '../components/NotFound/NotFound';
import mainApi from '../utils/MainApi';

const AppRouter = () => {
  const [isAuthRequestCompleted, setIsAuthRequestCompleted] = useState(false);

  const [currentEmail, setCurrentEmail] = useState('');

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthError, setIsAuthError] = useState(null);
  const [isRegisterError, setIsRegisterError] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    function handleTokenCheck() {
      const token = localStorage.getItem('token');
      if (token) {
        authApi
          .checkToken(token)
          .then((data) => {
            if (data) {
              setIsLoggedIn(true);
              setCurrentUser(data);
              setIsAuthRequestCompleted(true);
              if (pathname === '/sign-in' || pathname === '/sign-up') {
                navigate('/movies', { replace: true });
              }
            }
          })
          .catch((err) => console.log(`Ошибка.....: ${err}`));
      }
    }

    handleTokenCheck();
  }, [navigate]);

  // const [currentEmail, setCurrentEmail] = useState('');
  //
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [currentUser, setCurrentUser] = useState({ name: '', email: '' });
  // const [isAuthError, setIsAuthError] = useState(null);
  // const [isRegisterError, setIsRegisterError] = useState(null);

  const onRegister = () => {
    navigate('/movies', { replace: true });
  };

  function handleLogin() {
    setIsLoggedIn(true);
  }

  function handleAuthorization(email, password) {
    return authApi
      .authorize(email, password)
      .then((token) => {
        if (token) {
          handleLogin(true);
          setCurrentEmail(email);
          navigate('/movies', { replace: true });
          localStorage.setItem('token', token);

          isRegisterError && setIsRegisterError(null);
          isAuthError && setIsAuthError(null);
        } else {
          setIsAuthError('Введенные данные не корректны');
        }
      })
      .catch((err) => {
        setIsAuthError('Не удалось авторизоваться. Попробуйте еще раз.');
        console.log(`Ошибка.....: ${err}`);
      });
  }

  function handleRegistrationQuery(email, password) {
    authApi
      .register(email, password)
      .then((res) => {
        if (res.data) {
          setIsLoggedIn(true);
          navigate('/movies', { replace: true });
          setCurrentUser(res.data);

          isRegisterError && setIsRegisterError(null);
          isAuthError && setIsAuthError(null);
        } else {
          setIsRegisterError('Что-то пошло не так. Попробуйте другие данные.');
        }
      })
      .catch((err) => {
        setIsRegisterError('Регистрация не успешна. Попробуйте еще раз.');
        console.log(`Ошибка.....: ${err}`);
      });
  }

  function handleSignOut() {
    localStorage.removeItem('token');
    setCurrentUser(null);
  }

  function handleUpdateUser(updatedInfo) {
    return mainApi
      .patchUser(updatedInfo)
      .then(({ data: newUserInfo }) => {
        setCurrentUser(newUserInfo);
        return newUserInfo;
      })
      .catch((err) => console.log(`Ошибка.....: ${err}`));
  }

  return (
    isAuthRequestCompleted && (
      <UserContext.Provider value={currentUser}>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />

          <Route path="/movies" element={<ProtectedRoute loggedIn={isLoggedIn} element={Movies} />} />
          <Route path="/saved-movies" element={<ProtectedRoute loggedIn={isLoggedIn} saved element={Movies} />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute
                onUpdateUser={handleUpdateUser}
                onSignOut={handleSignOut}
                loggedIn={isLoggedIn}
                element={Profile}
              />
            }
          />

          <Route path="/sign-in" element={<Login onLogin={handleAuthorization} error={isAuthError} />} />
          <Route path="/sign-up" element={<Register onRegister={handleRegistrationQuery} error={isRegisterError} />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="404" replace />} />

          <Route
            path="*"
            element={
              <NotFound
              // handleLogin={handleLogin} setUserEmail={setCurrentEmail} handleRegister={handleRegister}
              />
            }
          />
        </Routes>
      </UserContext.Provider>
    )
  );
};

export default AppRouter;
