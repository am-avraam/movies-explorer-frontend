import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import './Movies.css';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Preloader from './Preloader/Preloader';
import movieApi from '../../utils/MoviesApi';
import getColumnCount from '../../utils/getColumnCount';
import filterListByQuery from '../../utils/filterListByQuery';
import mainApi from '../../utils/MainApi';
import { extractDataFromMovie } from '../../utils/extractDataFromMovie';

const SavedMovies = () => {
  const [savedMoviesList, setSavedMoviesList] = useState([]);
  const [isError, setIsError] = useState(null);

  const [showingShortened, setShowingShortened] = useState(false);

  const [isEmpty, setIsEmpty] = useState(false);
  const [isBigAmount, setIsBigAmount] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [movieQuery, setMovieQuery] = useState('');

  const [moviesList, setMoviesList] = useState([]);
  const [moviesListToShow, setMoviesListToShow] = useState([]);

  useLayoutEffect(() => {
    const getSavedMovies = () => {
      mainApi
        .getSavedMovies()
        .then(({ data: savedMovies }) => {
          console.log(savedMovies);
          // const savedMoviesReorganized = savedMovies.map((oldData) => extractDataFromMovie(oldData));
          setSavedMoviesList(savedMovies);
        })
        .then(() => {})
        .catch((err) => {
          setIsError(true);
          console.log(`Ошибка.....: ${err}`);
        });
    };

    getSavedMovies();
  }, []);

  const moviesListRef = useRef();
  function onCheckShortened() {
    setShowingShortened((state) => !state);
  }

  const getQuery = (query) => {
    setIsEmpty(false);
    setMovieQuery(query);
    const currentColumnCount = getColumnCount(moviesListRef.current);

    setIsLoading(true);

    movieApi
      .getMovies(query)
      .then((movies) => {
        const entireFilteredList = filterListByQuery(movies, query);

        if (entireFilteredList.length === 0) {
          setIsLoading(false);
          setIsEmpty(true);
          setMoviesListToShow([]);
          setIsError(false);
          return;
        }

        setMoviesList(entireFilteredList);

        if (entireFilteredList.length > currentColumnCount * 4) {
          setIsBigAmount(true);
          setMoviesListToShow(entireFilteredList.slice(0, currentColumnCount * 4));
        } else {
          setMoviesListToShow(entireFilteredList);
          setIsBigAmount(false);
        }

        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(true);
        console.log(`Ошибка.....: ${err}`);
      });
  };

  const onShowMore = () => {
    const nextListCount = moviesListToShow.length + getColumnCount(moviesListRef.current) * 4;
    if (nextListCount >= moviesList.length) {
      setIsBigAmount(false);
    }
    setMoviesListToShow(moviesList.slice(0, nextListCount));
  };

  function handleDeleteMovie(id) {
    console.log(id);
    mainApi.deleteMovie(id).then((savedMovie) => {
      setSavedMoviesList((prev) => prev.filter((m) => m._id !== id));
    });
  }

  return (
    <>
      <main className="movies">
        <div className="movies__main">
          <SearchForm
            movieQuery={movieQuery}
            onQuery={getQuery}
            onCheck={onCheckShortened}
            isShortened={showingShortened}
          />

          <MoviesCardList
            onMovieDelete={handleDeleteMovie}
            movies={savedMoviesList}
            ref={moviesListRef}
            saved
            isShortened={showingShortened}
          >
            {isError && (
              <span>
                Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите
                немного и попробуйте ещё раз
              </span>
            )}
            {isLoading && <Preloader />}
            {isEmpty && <span>Ничего не найдено</span>}
          </MoviesCardList>

          {isBigAmount && (
            <button onClick={onShowMore} className="movies__expand">
              Еще
            </button>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default SavedMovies;
