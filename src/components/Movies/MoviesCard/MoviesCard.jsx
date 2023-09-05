import React from 'react';
import './MoviesCard.css';
import { baseUrl } from '../../../utils/constants';
import convertDuration from '../../../utils/convertDuration';

const MoviesCard = ({ duration, nameRU, trailerLink, url, saved, like = false }) => {
  const cardLikeButtonClassName = saved ? 'movies__remove' : `movies__like ${like && 'movies__like_state_active'}`;
  return (
    <li className="movies__card">
      <img className="movies__image" src={baseUrl + url} alt="заставка фильма" />
      <div className="movies__description">
        <p className="movies__name">{nameRU}</p>
        <button className={cardLikeButtonClassName} />
      </div>
      <span className="movies__duration">{convertDuration(duration)}</span>
    </li>
  );
};

export default MoviesCard;
