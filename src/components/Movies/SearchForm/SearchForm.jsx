import React from 'react';
import './SearchForm.css';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';
const SearchForm = ({ onCheck, isShortened }) => {
  return (
    <form className="movies__searchform">
      <input className="movies__input" type="text" placeholder="Фильм" />
      <button className="movies__button" type="submit">
        Найти
      </button>
      <FilterCheckbox onCheck={onCheck} isShortened={isShortened} />
    </form>
  );
};

export default SearchForm;
