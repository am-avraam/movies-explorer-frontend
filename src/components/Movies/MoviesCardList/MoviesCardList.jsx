import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import { films } from './constants';
import './MoviesCardList.css';

const MoviesCardList = ({ saved, isShortened }) => {
  return (
    <ul className="movies__list">
      {isShortened &&
        films
          .filter((film) => film.shortened)
          .map((film) => <MoviesCard saved={saved} key={film.name + Math.random()} film={film} />)}
      {!isShortened && films.map((film) => <MoviesCard saved={saved} key={film.name + Math.random()} film={film} />)}
    </ul>
  );
};

export default MoviesCardList;
