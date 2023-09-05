import React, { useRef, useState } from 'react';
import './Movies.css';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Preloader from './Preloader/Preloader';
import movieApi from '../../utils/MoviesApi';
import getColumnCount from '../../utils/getColumnCount';
import filterListByQuery from '../../utils/filterListByQuery';

const Movies = ({ saved }) => {
  const [showingShortened, setShowingShortened] = useState(false);
  const [isBigAmount, setIsBigAmount] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [moviesList, setMoviesList] = useState([]);
  const [moviesListToShow, setMoviesListToShow] = useState([]);

  const moviesListRef = useRef();
  function onCheckShortened() {
    setShowingShortened((state) => !state);
  }

  const getQuery = (query) => {
    const currentColumnCount = getColumnCount(moviesListRef.current);

    setIsLoading(true);

    movieApi
      .getMovies(query)
      .then((movies) => {
        const entireFilteredList = filterListByQuery(movies, query);
        setMoviesList(entireFilteredList);

        console.log(entireFilteredList.length, currentColumnCount * 4);
        if (entireFilteredList.length > currentColumnCount * 4) {
          console.log('Бля');
          setIsBigAmount(true);
          setMoviesListToShow(entireFilteredList.slice(0, currentColumnCount * 4));
        } else {
          setMoviesListToShow(entireFilteredList);
          setIsBigAmount(false);
        }

        setIsLoading(false);
      })
      .catch((err) => console.log(`Ошибка.....: ${err}`));
  };

  const onShowMore = () => {};

  return (
    <>
      <main className="movies">
        <div className="movies__main">
          <SearchForm onQuery={getQuery} onCheck={onCheckShortened} isShortened={showingShortened} />
          {isLoading && <Preloader />}
          {!isLoading && (
            <MoviesCardList
              movies={moviesListToShow}
              ref={moviesListRef}
              saved={saved}
              isShortened={showingShortened}
            />
          )}
          {isBigAmount && (
            <button
              onClick={() => {
                setMoviesListToShow(moviesList.slice(0, getColumnCount(moviesListRef.current) * 2 * 4));
              }}
              className="movies__expand"
            >
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
