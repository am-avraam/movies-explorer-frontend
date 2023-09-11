import React, { useContext, useEffect, useRef, useState } from 'react';
import './Movies.css';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Preloader from './Preloader/Preloader';
import getColumnCount from '../../utils/getColumnCount';
import filterListByQuery from '../../utils/filterListByQuery';
import { filterListByDuration } from '../../utils/filterListByDuration';
import { AllMoviesContext } from '../../contexts/AllMoviesContext';
import { SavedMoviesContext } from '../../contexts/SavedMoviesContext';

const Movies = ({ saved, onMovieLike }) => {
  const allMoviesList = useContext(AllMoviesContext);
  const savedMovieList = useContext(SavedMoviesContext);

  const [showingShortened, setShowingShortened] = useState(false);

  const [isEmpty, setIsEmpty] = useState(false);
  const [isBigAmount, setIsBigAmount] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [movieQuery, setMovieQuery] = useState('');

  const [moviesListByQuery, setMoviesListByQuery] = useState([]);
  const [moviesListToShow, setMoviesListToShow] = useState([]);

  const moviesListRef = useRef();
  function onCheckShortened() {
    setShowingShortened((state) => !state);
  }

  useEffect(() => {
    const filterList = () => {
      if (!movieQuery) {
        return;
      }
      setIsEmpty(false);

      const currentColumnCount = getColumnCount(moviesListRef.current);

      setIsLoading(true);

      let entireFilteredList = filterListByQuery(allMoviesList, movieQuery);
      if (showingShortened) entireFilteredList = filterListByDuration(entireFilteredList);

      if (entireFilteredList.length === 0) {
        setIsLoading(false);
        setIsEmpty(true);
        setMoviesListToShow([]);
        setIsBigAmount(false);
        setIsError(false);
        return;
      }

      setMoviesListByQuery(entireFilteredList);

      if (entireFilteredList.length > currentColumnCount * 4) {
        setIsBigAmount(true);
        setMoviesListToShow(entireFilteredList.slice(0, currentColumnCount * 4));
      } else {
        setMoviesListToShow(entireFilteredList);
        setIsBigAmount(false);
      }

      setIsLoading(false);
    };

    filterList();
  }, [showingShortened, allMoviesList, movieQuery, savedMovieList]);

  const getMovieListByQuery = (query) => {
    setIsEmpty(false);
    setMovieQuery(query);
    const currentColumnCount = getColumnCount(moviesListRef.current);

    setIsLoading(true);

    let entireFilteredList = filterListByQuery(allMoviesList, query);
    if (showingShortened) entireFilteredList = filterListByDuration(entireFilteredList);

    if (entireFilteredList.length === 0) {
      setIsBigAmount(false);
      setIsLoading(false);
      setIsEmpty(true);
      setMoviesListToShow([]);
      setIsError(false);
      return;
    }

    setMoviesListByQuery(entireFilteredList);

    if (entireFilteredList.length > currentColumnCount * 4) {
      setIsBigAmount(true);
      setMoviesListToShow(entireFilteredList.slice(0, currentColumnCount * 4));
    } else {
      setMoviesListToShow(entireFilteredList);
      setIsBigAmount(false);
    }

    setIsLoading(false);
  };

  const onShowMore = () => {
    const nextListCount = moviesListToShow.length + getColumnCount(moviesListRef.current) * 4;
    if (nextListCount >= moviesListByQuery.length) {
      setIsBigAmount(false);
    }
    setMoviesListToShow(moviesListByQuery.slice(0, nextListCount));
  };

  useEffect(() => {
    movieQuery && localStorage.setItem('movies', JSON.stringify({ moviesListToShow, movieQuery, showingShortened }));
  }, [moviesListToShow, movieQuery, showingShortened]);

  useEffect(() => {
    const data = localStorage.getItem('movies');

    if (data) {
      const { moviesListToShow, movieQuery, showingShortened } = JSON.parse(data);
      moviesListToShow.length > getColumnCount(moviesListRef.current) * 4 && setIsBigAmount(true);
      setMoviesListToShow(moviesListToShow);
      setShowingShortened(showingShortened);
      setMovieQuery(movieQuery);
    }
  }, []);

  return (
    <>
      <main className="movies">
        <div className="movies__main">
          <SearchForm
            movieQuery={movieQuery}
            onQuery={getMovieListByQuery}
            onCheck={onCheckShortened}
            isShortened={showingShortened}
          />

          <MoviesCardList
            onMovieLike={onMovieLike}
            movies={moviesListToShow}
            ref={moviesListRef}
            saved={saved}
            isShortened={showingShortened}
          >
            {isError && (
              <span>
                «Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите
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

export default Movies;
