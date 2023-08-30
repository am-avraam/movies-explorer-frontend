import React from 'react';
import './MoviesCard.css';

const MoviesCard = ({ film, saved }) => {
  const cardLikeButtonClassName = saved ? 'movies__remove' : `movies__like ${film.like && 'movies__like_state_active'}`;
  return (
    <li className="movies__card">
      <img className="movies__image" src={film.image} alt="заставка фильма" />
      <div className="movies__description">
        <p className="movies__name">{film.name}</p>
        <button className={cardLikeButtonClassName} />
      </div>
      <span className="movies__duration">{film.duration}</span>
    </li>
  );
};

export default MoviesCard;
