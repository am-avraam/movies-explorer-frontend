import React from 'react';
import './MoviesCard.css';
import convertDuration from '../../../utils/convertDuration';
import { Link } from 'react-router-dom';

const MoviesCard = ({ data, onMovieLike, onMovieDelete, saved }) => {
  const isLiked = !!data._id;
  const cardLikeButtonClassName = saved ? 'movies__remove' : `movies__like ${isLiked && 'movies__like_state_active'}`;

  const handleLikeClick = (movieData) => {
    onMovieLike(movieData);
  };

  const handleDeleteClick = (id) => {
    onMovieDelete(id);
  };

  const onClickButtonFunction = saved
    ? (e) => {
        e.stopPropagation();
        handleDeleteClick(data._id);
      }
    : (e) => {
        e.stopPropagation();
        handleLikeClick(data);
      };

  return (
    <li className="movies__card">
      <Link className="movies__trailer" to={data.trailerLink} target="_blank">
        <img className="movies__image" src={data.image} alt="заставка фильма" />
        <div className="movies__description">
          <p className="movies__name">{data.nameRU}</p>
        </div>
        <span className="movies__duration">{convertDuration(data.duration)}</span>
      </Link>
      <button className={'movies__action ' + cardLikeButtonClassName} onClick={onClickButtonFunction} />
    </li>
  );
};

export default MoviesCard;
