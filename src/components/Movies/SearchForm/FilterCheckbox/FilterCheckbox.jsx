import React from 'react';
import './FilterCheckbox.css';

const FilterCheckbox = ({ onCheck, isShortened }) => {
  return (
    <div className="movies__container">
      <div className="movies__switch">
        <input
          onChange={onCheck}
          checked={isShortened}
          type="checkbox"
          className="movies__checkbox"
          name={'switch'}
          id={'switch'}
        />
        <label className="movies__label" htmlFor={'switch'}>
          <span className="movies__indicator" />
        </label>
      </div>
    </div>
  );
};

export default FilterCheckbox;
