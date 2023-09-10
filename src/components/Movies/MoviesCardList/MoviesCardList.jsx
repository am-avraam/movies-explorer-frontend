import React, { forwardRef } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import { films } from './constants';
import './MoviesCardList.css';

const MoviesCardList = forwardRef(({ saved, isShortened, movies, children, onMovieLike, onMovieDelete }, ref) => {
  return (
    <>
      {/*{!movies.length && <ul className="movies__list" ref={ref}></ul>}*/}
      {/*{movies.length && (*/}
      <>
        {children}
        <ul className="movies__list" ref={ref}>
          {movies?.map((movie) => {
            return (
              <MoviesCard
                key={movie.nameRU + movie.duration}
                onMovieLike={onMovieLike}
                onMovieDelete={onMovieDelete}
                saved={saved}
                data={movie}
              />
            );
          })}
        </ul>
      </>
      {/*)}*/}
    </>
  );
});

export default MoviesCardList;
