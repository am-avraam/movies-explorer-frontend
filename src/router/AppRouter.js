import React from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { ProtectedRouteElement as ProtectedRoute } from './ProtectedRoute';
import Main from './../components/Main/Main';
import Movies from './../components/Movies/Movies';
import SavedMovies from './../components/SavedMovies/SavedMovies';
import { Login } from './../components/Login/Login';
import { Register } from './../components/Register/Register';
import Header from '../components/Header/Header';
import Profile from '../components/Profile/Profile';
import NotFound from '../components/NotFound/NotFound';

const AppRouter = () => {
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  const loggedIn = true;
  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            loggedIn ? (
              <ProtectedRoute
                // cards={cards}
                // onCardDelete={handleCardDelete}
                // onCardLike={handleCardLike}
                // onEditProfile={handleEditProfileClick}
                // onAddPlace={handleAddPlaceClick}
                // onEditAvatar={handleEditAvatarClick}
                // onCardClick={handleCardClick}
                loggedIn={loggedIn}
                element={Main}
                // element={Movies}
              />
            ) : (
              <Navigate to="/sign-in" replace />
            )
          }
        />

        <Route
          path="/movies"
          element={
            loggedIn ? <ProtectedRoute loggedIn={loggedIn} element={Movies} /> : <Navigate to="/sign-in" replace />
          }
        />
        <Route
          path="/saved-movies"
          element={
            loggedIn ? (
              <ProtectedRoute loggedIn={loggedIn} saved element={Movies} />
            ) : (
              <Navigate to="/sign-in" replace />
            )
          }
        />

        <Route
          path="/profile"
          element={
            loggedIn ? <ProtectedRoute loggedIn={loggedIn} element={Profile} /> : <Navigate to="/sign-in" replace />
          }
        />

        <Route
          path="/sign-in"
          element={
            <Login
            // onLogin={handleAuthorization}
            />
          }
        />
        <Route
          path="/sign-up"
          element={
            <Register
            // onRegister={handleRegistrationQuery}
            />
          }
        />
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
    </>
  );
};

export default AppRouter;
