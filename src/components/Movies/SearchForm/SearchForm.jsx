import React, { useRef, useState } from 'react';
import './SearchForm.css';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';
const SearchForm = ({ onCheck, onQuery, isShortened, movieQuery }) => {
  const [isEmptyQuery, setIsEmptyQuery] = useState(false);
  const queryRef = useRef();

  const onSubmit = (e) => {
    e.preventDefault();
    if (queryRef.current?.value.length) {
      onQuery(queryRef.current?.value);
      setIsEmptyQuery(false);
      // queryRef.current.value = '';
    } else {
      setIsEmptyQuery(true);
    }
  };

  return (
    <form onSubmit={onSubmit} className="movies__searchform">
      <input
        ref={queryRef}
        defaultValue={movieQuery}
        className={`movies__input ${isEmptyQuery && 'movies__input_state_error'}`}
        type="text"
        placeholder={isEmptyQuery ? 'Нужно ввести ключевое слово' : 'Фильм'}
      />
      <button className="movies__button" type="submit">
        Найти
      </button>
      <FilterCheckbox onCheck={onCheck} isShortened={isShortened} />
    </form>
  );
};

export default SearchForm;
