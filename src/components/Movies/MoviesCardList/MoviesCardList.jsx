import React, { forwardRef } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

const MoviesCardList = forwardRef(({ saved, isShortened, movies, children, onMovieLike, onMovieDelete }, ref) => {
  return (
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
  );
});

export default MoviesCardList;
