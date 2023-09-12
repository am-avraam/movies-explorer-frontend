import React, { useEffect, useRef, useState, useContext } from 'react';
import './Movies.css';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Preloader from './Preloader/Preloader';
import getColumnCount from '../../utils/getColumnCount';
import filterListByQuery from '../../utils/filterListByQuery';
import { SavedMoviesContext } from '../../contexts/SavedMoviesContext';
import { filterListByDuration } from '../../utils/filterListByDuration';

const SavedMovies = ({ onMovieDelete }) => {
  const savedMoviesList = useContext(SavedMoviesContext);

  const [showingShortened, setShowingShortened] = useState(false);

  const [isEmpty, setIsEmpty] = useState(false);
  const [isBigAmount, setIsBigAmount] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const [movieQuery, setMovieQuery] = useState('');

  const [moviesListByQuery, setMoviesListByQuery] = useState([]);
  const [moviesListToShow, setMoviesListToShow] = useState([]);
  const [listCount, setListCount] = useState(0);

  const moviesListRef = useRef();
  function onCheckShortened() {
    setShowingShortened((state) => !state);
  }

  useEffect(() => {
    const filterList = () => {
      setIsEmpty(false);

      const currentColumnCount = getColumnCount(moviesListRef.current);

      setIsLoading(true);

      let entireFilteredList = filterListByQuery(savedMoviesList, movieQuery);
      if (showingShortened) entireFilteredList = filterListByDuration(entireFilteredList);

      if (entireFilteredList.length === 0) {
        setIsLoading(false);
        setIsEmpty(true);
        setMoviesListToShow([]);
        setIsError(false);
        return;
      }

      setMoviesListByQuery(entireFilteredList);

      if (entireFilteredList.length > currentColumnCount * 4) {
        entireFilteredList.length > listCount && setIsBigAmount(true);

        const currentListCount = listCount || currentColumnCount * 4;
        !listCount && setListCount(currentListCount);
        setMoviesListToShow(entireFilteredList.slice(0, currentListCount));
      } else {
        setMoviesListToShow(entireFilteredList);
        setIsBigAmount(false);
      }

      setIsLoading(false);
    };

    filterList();
  }, [showingShortened, movieQuery, savedMoviesList]);

  const getSavedMovieListByQuery = (query) => {
    setIsEmpty(false);
    setMovieQuery(query);
    const currentColumnCount = getColumnCount(moviesListRef.current);

    setIsLoading(true);

    let entireFilteredList = filterListByQuery(savedMoviesList, query);
    if (showingShortened) entireFilteredList = filterListByDuration(entireFilteredList);

    if (entireFilteredList.length === 0) {
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
    const nextListCount = moviesListToShow.length + listCount;
    setListCount(nextListCount);

    if (nextListCount >= moviesListByQuery.length) {
      setIsBigAmount(false);
    }
    setMoviesListToShow(moviesListByQuery.slice(0, nextListCount));
  };

  return (
    <>
      <main className="movies">
        <div className="movies__main">
          <SearchForm
            movieQuery={movieQuery}
            onQuery={getSavedMovieListByQuery}
            onCheck={onCheckShortened}
            isShortened={showingShortened}
          />

          <MoviesCardList
            onMovieDelete={onMovieDelete}
            movies={moviesListToShow}
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
