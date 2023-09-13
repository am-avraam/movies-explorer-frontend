export const filterListByDuration = (movies) => {
  return movies.filter(({ duration }) => duration <= 40);
};
