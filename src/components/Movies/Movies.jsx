import React, { useEffect, useRef, useState } from 'react';
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
import { filterListByDuration } from '../../utils/filterListByDuration';
import { logDOM } from '@testing-library/react';

const Movies = ({ saved }) => {
  const [showingShortened, setShowingShortened] = useState(false);

  const [isEmpty, setIsEmpty] = useState(false);
  const [isBigAmount, setIsBigAmount] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [movieQuery, setMovieQuery] = useState('');

  const [moviesListGeneral, setMoviesListGeneral] = useState([]);
  const [moviesListByQuery, setMoviesListByQuery] = useState([]);
  const [moviesListToShow, setMoviesListToShow] = useState([]);

  const moviesListRef = useRef();
  function onCheckShortened() {
    setShowingShortened((state) => !state);
  }

  // const getAllMoviesList = () => {
  //   return movieApi
  //     .getMovies()
  //     .then((movies) => {
  //       const moviesListPrepared = movies.map((oldData) => extractDataFromMovie(oldData));
  //       setMoviesListGeneral(moviesListPrepared);
  //       return moviesListPrepared;
  //     })
  //     .catch((err) => {
  //       setIsError(true);
  //       console.log(`Ошибка.....: ${err}`);
  //     });
  // };

  const getMovieListByQuery = (query) => {
    setIsEmpty(false);
    setMovieQuery(query);
    const currentColumnCount = getColumnCount(moviesListRef.current);

    setIsLoading(true);

    movieApi
      .getMovies(query)
      .then((movies) => {
        let entireFilteredList = filterListByQuery(movies, query);

        if (showingShortened) entireFilteredList = filterListByDuration(entireFilteredList);

        if (entireFilteredList.length === 0) {
          setIsLoading(false);
          setIsEmpty(true);
          setMoviesListToShow([]);
          setIsError(false);
          return;
        }

        const entireFilteredListReorganized = entireFilteredList.map((oldData) => extractDataFromMovie(oldData));

        setMoviesListByQuery(entireFilteredListReorganized);

        if (entireFilteredListReorganized.length > currentColumnCount * 4) {
          setIsBigAmount(true);
          setMoviesListToShow(entireFilteredListReorganized.slice(0, currentColumnCount * 4));
        } else {
          setMoviesListToShow(entireFilteredListReorganized);
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
    if (nextListCount >= moviesListByQuery.length) {
      setIsBigAmount(false);
    }
    setMoviesListToShow(moviesListByQuery.slice(0, nextListCount));
  };

  function handleMovieLike(movie) {
    mainApi.postMovie(movie).then(({ data: savedMovie }) => {
      setMoviesListByQuery((prev) => {
        console.log(prev);
        return prev.map((m) => {
          return m.movieId === movie.movieId ? savedMovie : m;
        });
      });
    });

    // const isLiked = card.likes.some(i => i._id === currentUser._id);
    //
    // // Отправляем запрос в API и получаем обновлённые данные карточки
    // api.changeLikeCardStatus(card._id, !isLiked)
    //   .then((newCard) => {
    //     setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    //   })
    //   .catch((err) => console.log(`Ошибка.....: ${err}`))
  }

  // useEffect(() => {
  //   if (!moviesListGeneral.length) getAllMoviesList();
  // }, [moviesListGeneral.length]);

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
            onMovieLike={handleMovieLike}
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
