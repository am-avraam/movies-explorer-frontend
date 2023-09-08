import React, { forwardRef } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import { films } from './constants';
import './MoviesCardList.css';

const MoviesCardList = forwardRef(({ saved, isShortened, movies, children }, ref) => {
  return (
    <>
      {children}
      <ul className="movies__list" ref={ref}>
        {isShortened &&
          films
            .filter((film) => film.shortened)
            .map((film) => <MoviesCard saved={saved} key={film.name + Math.random()} film={film} />)}
        {!isShortened &&
          movies.map(({ duration, nameRU, trailerLink, image: { url } }) => {
            return (
              <MoviesCard
                saved={saved}
                key={nameRU + duration}
                duration={duration}
                nameRU={nameRU}
                trailerLink={trailerLink}
                url={url}
              />
            );
          })}
      </ul>
    </>
  );
});

export default MoviesCardList;
