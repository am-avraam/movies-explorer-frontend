import React, { useState } from 'react';
import './Movies.css';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
const Movies = ({ saved }) => {
  const [showingShortened, setShowingShortened] = useState(false);

  function onCheckShortened() {
    setShowingShortened((state) => !state);
  }

  return (
    <>
      <main className="movies">
        <div className="movies__main">
          <SearchForm onCheck={onCheckShortened} isShortened={showingShortened} />
          <MoviesCardList saved={saved} isShortened={showingShortened} />
          <button className="movies__expand">Еще</button>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Movies;
