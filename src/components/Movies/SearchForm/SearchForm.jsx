import React from 'react';
import './SearchForm.css';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';
const SearchForm = () => {
  return (
    <form className="movies__searchform">
      <input className="movies__input" type="text" placeholder="Фильм" />
      <button className="movies__button" type="submit">
        Найти
      </button>
      <FilterCheckbox check={true} />
    </form>
  );
};

export default SearchForm;
