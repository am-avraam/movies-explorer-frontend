import React from 'react';
import './MoviesCard.css';
import convertDuration from '../../../utils/convertDuration';

const MoviesCard = ({ data, onMovieLike, onMovieDelete, saved, like = false }) => {
  const isLiked = !!data._id;
  console.log(isLiked);
  const cardLikeButtonClassName = saved ? 'movies__remove' : `movies__like ${isLiked && 'movies__like_state_active'}`;

  const handleLikeClick = (movieData) => {
    onMovieLike(movieData);
  };

  const handleDeleteClick = (id) => {
    onMovieDelete(id);
  };

  const onClickButtonFunction = saved ? () => handleDeleteClick(data._id) : () => handleLikeClick(data);

  return (
    <li className="movies__card">
      <img className="movies__image" src={data.image} alt="заставка фильма" />
      <div className="movies__description">
        <p className="movies__name">{data.nameRU}</p>
        <button className={cardLikeButtonClassName} onClick={onClickButtonFunction} />
      </div>
      <span className="movies__duration">{convertDuration(data.duration)}</span>
    </li>
  );
};

export default MoviesCard;
