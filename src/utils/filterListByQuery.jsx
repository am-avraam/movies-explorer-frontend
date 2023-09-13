const filterListByQuery = (moviesList, query) => {
  const regExp = new RegExp(query, 'gi');
  return moviesList.filter(({ nameRU, nameEN }) => nameRU.match(regExp) || nameEN.match(regExp));
};

export default filterListByQuery;
