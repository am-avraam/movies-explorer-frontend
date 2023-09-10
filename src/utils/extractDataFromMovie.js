import { baseUrl } from './constants';

export const extractDataFromMovie = (movieInfoRaw) => {
  const { country, director, duration, year, description, trailerLink, image, id, nameRU, nameEN } = movieInfoRaw;

  return {
    country,
    director,
    duration,
    year,
    description,
    image: baseUrl + image.url,
    trailerLink,
    thumbnail: baseUrl + image.formats.thumbnail.url,
    movieId: id,
    nameRU,
    nameEN,
  };
};
