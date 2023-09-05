const filterListByQuery = (moviesList, query) => {
  const regExp = new RegExp(query, 'gi');
  return moviesList.filter(({ nameRU }) => {
    return nameRU.match(regExp);

    // if (nameRU.match(regExp)) console.log(nameRU.match(regExp));
    // console.log(nameRU, query);
  });
};

export default filterListByQuery;
