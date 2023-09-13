const convertDuration = (duration) => {
  return duration > 60 ? `${Math.floor(duration / 60)}ч ${duration % 60}м` : duration + 'м';
};

export default convertDuration;
