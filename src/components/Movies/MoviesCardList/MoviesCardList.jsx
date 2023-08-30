import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import { films } from './constants';
import './MoviesCardList.css';

const MoviesCardList = ({ saved }) => {
  return (
    <ul className="movies__list">
      {films.map((film) => (
        <MoviesCard saved={saved} key={film.name + Math.random()} film={film} />
      ))}
    </ul>
  );
};

export default MoviesCardList;
