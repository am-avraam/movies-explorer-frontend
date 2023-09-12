import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { ProtectedRouteElement as ProtectedRoute } from './ProtectedRoute';
import Main from './../components/Main/Main';
import Movies from './../components/Movies/Movies';
import { Login } from '../components/Login/Login';
import { Register } from '../components/Register/Register';
import Header from '../components/Header/Header';
import authApi from '../utils/AuthApi';
import { UserContext } from '../contexts/UserContext';
import { AllMoviesContext } from '../contexts/AllMoviesContext';
import { SavedMoviesContext } from '../contexts/SavedMoviesContext';

import Profile from '../components/Profile/Profile';
import NotFound from '../components/NotFound/NotFound';
import mainApi from '../utils/MainApi';
import SavedMovies from '../components/Movies/SavedMovies';
import movieApi from '../utils/MoviesApi';
import { extractDataFromMovie } from '../utils/extractDataFromMovie';

const AppRouter = () => {
  const [isAuthRequestCompleted, setIsAuthRequestCompleted] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [moviesListGeneral, setMoviesListGeneral] = useState([]);
  const [savedMoviesList, setSavedMoviesList] = useState([]);

  const [isAuthError, setIsAuthError] = useState(null);
  const [isRegisterError, setIsRegisterError] = useState(null);
  const [isMovieQueryError, setIsMovieQueryError] = useState(null);
  const [isSavedMovieQueryError, setIsSavedMovieQueryError] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();

  const getAllMoviesList = () => {
    return movieApi
      .getMovies()
      .then((movies) => {
        return movies.map((oldData) => extractDataFromMovie(oldData));
      })
      .catch((err) => {
        setIsMovieQueryError(true);
        console.log(`Ошибка.....: ${err}`);
      });
  };

  const getSavedMovies = () => {
    return mainApi
      .getSavedMovies()
      .then(({ data: savedMovies }) => {
        setSavedMoviesList(savedMovies);
        return savedMovies;
      })
      .catch((err) => {
        setIsSavedMovieQueryError(true);
        console.log(`Ошибка.....: ${err}`);
      });
  };
  function handleTokenCheck() {
    const token = localStorage.getItem('token');
    if (token) {
      authApi
        .checkToken(token)
        .then((data) => {
          if (data) {
            getSavedMovies().then((savedMovies) => {
              getAllMoviesList().then((moviesListPrepared) => {
                const savedMoviesMap = new Map();
                savedMovies.forEach((movie) => savedMoviesMap.set(movie.movieId, movie));

                const moviesListWithLikeSign = moviesListPrepared.map((movie) => {
                  return savedMoviesMap.has(movie.movieId) ? savedMoviesMap.get(movie.movieId) : movie;
                });

                setCurrentUser(data);
                setIsAuthRequestCompleted(true);
                setIsLoggedIn(true);

                setMoviesListGeneral(moviesListWithLikeSign);
              });
            });
          }
        })
        .catch((err) => console.log(`Ошибка.....: ${err}`));
    } else {
      setIsAuthRequestCompleted(true);
    }
  }

  useEffect(() => {
    handleTokenCheck();
  }, []);

  function handleAuthorization(email, password) {
    return authApi
      .authorize(email, password)
      .then((token) => {
        if (token) {
          setIsLoggedIn(true);
          navigate('/movies', { replace: true });
          localStorage.setItem('token', token);

          isRegisterError && setIsRegisterError(null);
          isAuthError && setIsAuthError(null);
        } else {
          setIsAuthError('Введенные данные не корректны');
        }
      })
      .then(() => handleTokenCheck())
      .catch((err) => {
        setIsAuthError('Не удалось авторизоваться. Попробуйте еще раз.');
        console.log(`Ошибка.....: ${err}`);
      });
  }

  function handleRegistrationQuery(data) {
    authApi
      .register(data)
      .then((res) => {
        if (res.data) {
          handleAuthorization(data.email, data.password).then(() => handleTokenCheck());
          getAllMoviesList().then((allMovies) => setMoviesListGeneral(allMovies));
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
    localStorage.removeItem('movies');
    setCurrentUser(null);
    navigate('/', { replace: true });
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

  function handleMovieLike(movie) {
    if (!movie._id) {
      mainApi
        .postMovie(movie)
        .then(({ data: savedMovie }) => {
          setMoviesListGeneral((prev) => prev.map((m) => (m.movieId === movie.movieId ? savedMovie : m)));
          setSavedMoviesList((prev) => {
            prev.push(savedMovie);
            return prev;
          });
        })
        .catch((err) => console.log(`Ошибка.....: ${err}`));
    } else {
      mainApi
        .deleteMovie(movie._id)
        .then(({ data: savedMovie }) => {
          delete savedMovie._id;
          delete savedMovie.owner;
          setMoviesListGeneral((prev) => prev.map((m) => (m.movieId === movie.movieId ? savedMovie : m)));
          setSavedMoviesList((prev) => prev.filter((m) => m._id !== movie._id));
        })
        .catch((err) => console.log(`Ошибка.....: ${err}`));
    }
  }

  function handleDeleteMovie(id) {
    mainApi
      .deleteMovie(id)
      .then(({ data: deletedMovie }) => {
        delete deletedMovie._id;
        delete deletedMovie.owner;
        setMoviesListGeneral((prev) => prev.map((m) => (m._id === id ? deletedMovie : m)));
        setSavedMoviesList((prev) => prev.filter((m) => m._id !== id));
      })
      .catch((err) => console.log(`Ошибка.....: ${err}`));
  }

  return (
    isAuthRequestCompleted && (
      <UserContext.Provider value={currentUser}>
        <AllMoviesContext.Provider value={moviesListGeneral}>
          <SavedMoviesContext.Provider value={savedMoviesList}>
            <Header />
            <Routes>
              <Route path="/" element={<Main />} />

              <Route
                path="/movies"
                element={<ProtectedRoute onMovieLike={handleMovieLike} loggedIn={isLoggedIn} element={Movies} />}
              />
              <Route
                path="/saved-movies"
                element={
                  <ProtectedRoute onMovieDelete={handleDeleteMovie} loggedIn={isLoggedIn} saved element={SavedMovies} />
                }
              />

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
              <Route
                path="/sign-up"
                element={<Register onRegister={handleRegistrationQuery} error={isRegisterError} />}
              />
              <Route path="/404" element={<NotFound />} />
              <Route path="*" element={<Navigate to="404" replace />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </SavedMoviesContext.Provider>
        </AllMoviesContext.Provider>
      </UserContext.Provider>
    )
  );
};

export default AppRouter;
